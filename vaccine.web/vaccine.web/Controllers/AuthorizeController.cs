using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vaccine.web.Helpers;

namespace vaccine.web.Controllers
{

    [Route("authorize")]
    public class AuthorizeController : Controller
    {

        public IActionResult Index(TpwvOauthStatus Status)
        {
            if (Constants.SiteSetting.oauthProxy)
                return Redirect($"{Constants.SiteSetting.oauthTerminal}authorize{Request.QueryString}");
            var Result = new TpwvOauthResult();
            try
            {
                if (string.IsNullOrEmpty(Status.Code)) throw new Exception("Code 錯誤");
                if (string.IsNullOrEmpty(Status.State)) throw new Exception("State 錯誤");
                var Token = GetUserTokeByCode(Status.Code);
                var TodayExpire = Constants.GetCookieOption();
                Response.Cookies.Delete("error");
                Response.Cookies.Delete("error_message");
                TodayExpire.Expires = DateTimeOffset.Now.AddDays(1);
                Response.Cookies.Append("x-token", Token, TodayExpire);                
                Result.RedirectTo = $"/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}";
                return View(Result);
            }
            catch (Exception ex)
            {
                var TodayExpire = Constants.GetCookieOption();
                TodayExpire.Expires = DateTimeOffset.Now.AddDays(1);
                Response.Cookies.Append("error", "true", TodayExpire);
                Response.Cookies.Append("error_message", ex.Message, TodayExpire);
                Result.Message = ex.Message;
                Result.RedirectTo = $"/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}";
                return View(Result);
            }
        }
               
        public class TpwvOauthResult {
            public string RedirectTo { get; set; }
            public string Message { get; set; }
        }

        public class TpwvOauthStatus
        {
            public string Code { get; set; }
            public string State { get; set; }
            public string Redirect { get; set; }
        }
        
        public class CodeToken
        {
            public string access_Token { get; set; }
            public string token_Type { get; set; }
        }

        private string GetUserTokeByCode(string Code)
        {
            try
            {
                using (var Client = new HttpClient())
                {
                    var ApiUrl = $"{Constants.ApiRoot}api/token?code={Code}";
                    var Tokens = Client.ApiGet<CodeToken>(ApiUrl);
                    return Tokens.access_Token;
                }
            }
            catch (Exception ex)
            {
                var message = $"無法向台北通識別使用者!(code=>token error)";
                var except = new Exception(message, ex);
                except.Data.Add("code", Code);
                except.Data.Add("api", $"{Constants.ApiRoot}api/token?code={Code}");
                throw except;
            }
        }

    }

}