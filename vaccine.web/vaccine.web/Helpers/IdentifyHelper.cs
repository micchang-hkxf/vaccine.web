using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
 namespace vaccine.web.Helpers
{
    public class IdentifyAttribute : Attribute, IActionFilter
    {
        public IdentifyRole Roles { get; set; }
        public string ServiceName { get; set; }
        public IdentifyAttribute(IdentifyRole Roles = IdentifyRole.Guest , string ServiceName = null)
        {
            this.Roles = Roles;
            this.ServiceName = ServiceName;
        }
         public void OnActionExecuted(ActionExecutedContext Context)
        {
             var User = (IdentifyUser)Context.HttpContext.User.Identity;
            var RolesValue = (int)Roles;
            var UserRoleValue = (int)User.Role;
            if (RolesValue != UserRoleValue && RolesValue != 0)
                throw new ToAppException("無權限瀏覽頁面", null);

            if (!string.IsNullOrEmpty(ServiceName)) {
                Context.HttpContext.Response.Cookies.Append("target_page_id", ServiceName, Constants.GetCookieOption());
            }

            if (Context.HttpContext.Request.Query.ContainsKey("tpwv_lang")) {
                var langConfig = Context.HttpContext.Request.Query["tpwv_lang"].FirstOrDefault();
                if (!string.IsNullOrEmpty(langConfig)) {
                    Context.HttpContext.Response.Cookies.Append("tpwv_lang", langConfig , Constants.GetCookieOption());
                }                    
            }

            if (!string.IsNullOrEmpty(User.OutSideToken))
            {
                Context.HttpContext.Response.Cookies.Append("tpass_token", User.OutSideToken, Constants.GetCookieOption());
            }

            if (!string.IsNullOrEmpty(User.Renew))
            {
                 Context.HttpContext.Response.Cookies.Append("access_token", User.Token, Constants.GetCookieOption());
                 var Builder = new UriBuilder(); 
                var Request = Context.HttpContext.Request;
                 if (!string.IsNullOrEmpty(Request.Scheme))
                    Builder.Scheme = Request.Scheme;
                if (!string.IsNullOrEmpty(Request.Host.Host))
                    Builder.Host = Request.Host.Host;
                if (Request.Host.Port.HasValue)
                    Builder.Port = Request.Host.Port.Value;
                if (!string.IsNullOrEmpty(Request.Path))
                    Builder.Path = Request.Path;
                 var Queries = Context.HttpContext.Request.Query.Where(c=>c.Key!="code" && c.Key!="token" && c.Key!= "pxy_frg").Select(s => $"{s.Key}={s.Value}");                
                if (Queries.Count() > 0)
                    Builder.Query = "?" + string.Join("&", Queries);
                 if (Context.HttpContext.Request.Query.ContainsKey("pxy_frg"))
                {
                    Builder.Fragment = $"#{Context.HttpContext.Request.Query["pxy_frg"]}";
                }
                 Context.Result = new RedirectResult(Builder.ToString());
            }
         }
         public void OnActionExecuting(ActionExecutingContext Context)
        {

            var message = string.Empty;
            var isDebugMode = Context.HttpContext.Request.Query.ContainsKey("debugger");
            if (isDebugMode)
            {
                var Code = Context.HttpContext.Request.Query["code"];
                var DebugMode = Context.HttpContext.Request.Query["debugger"];
                if (DebugMode == "showcode")
                {
                    message += $"取得Code:[{Code}]更換網址:[{Constants.ApiRoot}api/token?code={Code}]";
                    throw new MessageException(message, null);
                }
            }
            Context.HttpContext.User = new ClaimsPrincipal(IdentifyUser.CreateUser(Context.HttpContext, ServiceName));

        }
    }
     public enum IdentifyRole
    {
        Guest = 0,
        User = 1,
    }
     public class IdentifyUser : ClaimsIdentity
    {
        public IdentifyRole Role
        {
            get
            {
                var RoleValue = Claims.FirstOrDefault(f => f.Type == "Role")?.Value;
                if (!string.IsNullOrEmpty(RoleValue)) return (IdentifyRole)Convert.ToInt32(RoleValue);
                return (IdentifyRole)0;
            }
        }
         public string Token
        {
            get
            {
                if (Renew != null) return Renew;
                var Token = Claims.FirstOrDefault(c => c.Type == "Token")?.Value;
                if (!string.IsNullOrEmpty(Token)) return Token;
                return null;
            }
        }
         public string Renew
        {
            get
            {
                var Renew = Claims.FirstOrDefault(c => c.Type == "Renew")?.Value;
                if (!string.IsNullOrEmpty(Renew)) return Renew;
                return null;
            }
        }
        public string OutSideToken
        {
            get
            {
                var OutSideToken = Claims.FirstOrDefault(c => c.Type == "OutSideToken")?.Value;
                if (!string.IsNullOrEmpty(OutSideToken)) return OutSideToken;
                return null;
            }
        }
         public static IdentifyUser CreateUser(HttpContext Context,string ServiceName)
        {
            var HasCode = !string.IsNullOrEmpty(Context.Request.Query["code"]);
            var HasToken = !string.IsNullOrEmpty(Context.Request.Query["token"]);
             IdentifyUser User = null;
             if (HasCode || HasToken)
                //User = CreateUserByToken(Context);
                User = CreateUserByCode(Context, ServiceName);
             if (User == null)
                User = CreateUserByCookie(Context);
             if (User == null)
                User = CreateUserByGuest();
             return User;
        }
         private static IdentifyUser CreateUserByGuest()
        {
            var User = new IdentifyUser();
            User.AddClaim(new Claim("Channel", "none"));
            User.AddClaim(new Claim("Role", "0"));
            User.AddClaim(new Claim("Token", ""));
            User.AddClaim(new Claim("Lang", "zh-tw"));
            return User;
        }
         private static IdentifyUser CreateUserByCookie(HttpContext Context)
        {
            var Token = Context.Request.Cookies["access_token"];
             if (string.IsNullOrEmpty(Token)) return null;
             var Renew = string.Empty;
            if (!string.IsNullOrEmpty(Token))
                Renew = GetUserByToken(Token);
             var User = new IdentifyUser();
             User.AddClaim(new Claim("Channel", "cookie"));
            User.AddClaim(new Claim("Role", "1"));
            User.AddClaim(new Claim("Token", Token));
            var Lang = Context.Request.Query["lang"];
            if (!string.IsNullOrEmpty(Lang))
                User.AddClaim(new Claim("Lang", Lang));
            if (Token != Renew)
                User.AddClaim(new Claim("Renew", Renew));
             return User;
         }
         private static StringValues GetUserTokenByCode(object code)
        {
            throw new NotImplementedException();
        }
         private static IdentifyUser CreateUserByNotify(HttpContext Context)
        {
            return null;
        }
        public static IdentifyUser CreateUserByCode(HttpContext Context,string ServiceName)
        {
            var Code = Context.Request.Query["code"];
            var OutSideToken = Context.Request.Query["token"];
             if (string.IsNullOrEmpty(Code) && string.IsNullOrEmpty(OutSideToken)) return null;
             var Token = string.Empty;
             Token = GetUserTokeByCode(Code, OutSideToken,ServiceName);
            var User = new IdentifyUser();
            User.AddClaim(new Claim("Channel", "code"));
            User.AddClaim(new Claim("Role", "1"));
            User.AddClaim(new Claim("Token", Token));
            User.AddClaim(new Claim("Renew", Token));
            if (!string.IsNullOrEmpty(OutSideToken))
                User.AddClaim(new Claim("OutSideToken", OutSideToken));
            var Lang = Context.Request.Query["lang"];
            if (!string.IsNullOrEmpty(Lang))
                User.AddClaim(new Claim("Lang", Lang));
             return User;
         }
         public static IdentifyUser CreateUserByToken(HttpContext Context)
        {
            var Token = Context.Request.Query["token"];
             if (string.IsNullOrEmpty(Token)) return null;
             var User = new IdentifyUser();
            User.AddClaim(new Claim("Channel", "token"));
            User.AddClaim(new Claim("Role", "1"));
            User.AddClaim(new Claim("Token", Token));
            User.AddClaim(new Claim("Renew", Token));
             var Lang = Context.Request.Query["lang"];
            if (!string.IsNullOrEmpty(Lang))
                User.AddClaim(new Claim("Lang", Lang));
             return User;
         }
         private static string GetUserTokeByCode(string Code,string OutSideToken,string ServiceName)
        {
             try
            {
                using (var Client = new HttpClient())
                {
                    var ApiUrl = $"{Constants.ApiRoot}api/token?code={Code}&token={OutSideToken}&target_page_id={ServiceName}";
                    var Tokens = Client.ApiGet<CodeToken>(ApiUrl);
                    return Tokens.access_Token;
                }
            }
            catch (Exception ex)
            {
                var message = $"無法識別使用者!";
                var except = new ToAppException(message, ex);
                except.Data.Add("code",Code );
                except.Data.Add("api", $"{Constants.ApiRoot}api/token?code={Code}");
                throw except;
            }
        }
         private static string GetUserByToken(string Token)
        {
            try
            {
                using (var Client = new HttpClient())
                {
                    var ApiUrl = $"{Constants.ApiRoot}api/my";
                    Client.DefaultRequestHeaders.Add("X-Token", Token);
                    var User = Client.ApiGet<TokenUser>(ApiUrl);
                    return User.renew ?? Token;
                }
            }
            catch (Exception ex)
            {
                throw new ToAppException("無法取得使用者資訊(請確認token是否正確)", ex);
            }
        }
         public IdentifyUser()
        {
         }
     }
     public class TokenUser
    {
        public string uuid { get; set; }
        public string uName { get; set; }
        public string acc { get; set; }
        public string email { get; set; }
       // public Address[] addresses { get; set; }
      //  public string[] plates { get; set; }
        public string renew { get; set; }
     }
     public class Address
    {
        public bool priority { get; set; }
        public string zip3 { get; set; }
        public string city { get; set; }
        public string town { get; set; }
        public string village { get; set; }
        public string street { get; set; }
        public string seq { get; set; }
    }
     public class CodeToken
    {
        public string access_Token { get; set; }
        public string token_Type { get; set; }
    }
 }
