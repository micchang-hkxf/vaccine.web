using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
 namespace vaccine.web.Helpers
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            try
            {
                 var Ext = JsonConvert.SerializeObject(context.Exception, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                var Log = JsonConvert.DeserializeObject<HttpLogException>(Ext);
                Log.OriginException = context.Exception;
                var Builder = new UriBuilder();
                var Request = context.HttpContext.Request;
                 if (!string.IsNullOrEmpty(Request.Scheme))
                    Builder.Scheme = Request.Scheme;
                if (!string.IsNullOrEmpty(Request.Host.Host))
                    Builder.Host = Request.Host.Host;
                if (Request.Host.Port.HasValue)
                    Builder.Port = Request.Host.Port.Value;
                if (!string.IsNullOrEmpty(Request.Path))
                    Builder.Path = Request.Path;
                 var Queries = context.HttpContext.Request.Query.Select(s => $"{s.Key}={s.Value}");
                if (Queries.Count() > 0)
                    Builder.Query = "?" + string.Join("&", Queries);
                 Log.Url = Builder.ToString();
                 Log.LogTime = DateTime.Now;
                 try
                {
                    if (!Directory.Exists(Constants.LogPath)) Directory.CreateDirectory(Constants.LogPath);
                     File.WriteAllText($"{Constants.LogPath}{DateTime.Now.ToString("yyyyMMddHHmmss")}_{(new Random().Next(100)).ToString("000")}_{context.RouteData.Values["controller"]}.log", JsonConvert.SerializeObject(Log));
                }
                catch (Exception ex)
                {
                 }
                 if (context.Exception is ToAppException)
                {
                    var builder = new UriBuilder()
                    {
                        Scheme = "except",
                        Host = "tpwv.gov.taipei",
                    };
                    context.Result = new RedirectResult(builder.ToString());
                    return;
                }
                 if (context.Exception is MessageException)
                {
                    context.HttpContext.Response.Cookies.Append("error_message", Log.Message, Constants.GetCookieOption());
                     context.Result = new RedirectResult("~/error");
                     return;
                 }
             }
            catch (Exception ex)
            {
             }
        }
    }
     public class RedirectExceptionAttribute : ExceptionFilterAttribute
    {
        protected string RedirectUrl { get; set; }
         public RedirectExceptionAttribute(string RedirectUrl) {
            this.RedirectUrl = RedirectUrl;
        }
         public override void OnException(ExceptionContext context)
        {
            try
            {
                 var Ext = JsonConvert.SerializeObject(context.Exception, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                var Log = JsonConvert.DeserializeObject<HttpLogException>(Ext);
                Log.OriginException = context.Exception;
                var Builder = new UriBuilder();
                var Request = context.HttpContext.Request;
                 if (!string.IsNullOrEmpty(Request.Scheme))
                    Builder.Scheme = Request.Scheme;
                if (!string.IsNullOrEmpty(Request.Host.Host))
                    Builder.Host = Request.Host.Host;
                if (Request.Host.Port.HasValue)
                    Builder.Port = Request.Host.Port.Value;
                if (!string.IsNullOrEmpty(Request.Path))
                    Builder.Path = Request.Path;
                 var Queries = context.HttpContext.Request.Query.Select(s => $"{s.Key}={s.Value}");
                if (Queries.Count() > 0)
                    Builder.Query = "?" + string.Join("&", Queries);
                 Log.Url = Builder.ToString();
                 Log.LogTime = DateTime.Now;
                 try
                {
                    if (!Directory.Exists(Constants.LogPath)) Directory.CreateDirectory(Constants.LogPath);
                     File.WriteAllText($"{Constants.LogPath}{DateTime.Now.ToString("yyyyMMddHHmmss")}_{(new Random().Next(100)).ToString("000")}_{context.RouteData.Values["controller"]}.log", JsonConvert.SerializeObject(Log));
                }
                catch (Exception ex)
                {
                 }
                 context.HttpContext.Response.Cookies.Append("error_message", Log.Message, Constants.GetCookieOption());
                 context.Result = new RedirectResult(RedirectUrl);
                 return;
             }
            catch (Exception ex)
            {
             }
        }
     }
     public class ToAppException : Exception
    {
        public ToAppException(string Message, Exception Inner) : base(Message, Inner)
        {
         }
    }
     public class MessageException : Exception
    {
        public MessageException(string Message, Exception Inner) : base(Message, Inner)
        {
         }
     }
     public static class ExceptionHelper {
         public static List<HttpLogException> GetLogs(string Date=null) {
            var Results = new List<HttpLogException>();
            try
            {
                var Logs = new DirectoryInfo(Constants.LogPath).GetFiles().ToList();
                Logs.ForEach(f => {
                    Results.Add(JsonConvert.DeserializeObject<HttpLogException>(File.ReadAllText(f.FullName)));
                });
            }
            catch (Exception ex)
            {
            }
            return Results;
        }
     }
     public class HttpLogException {
         public string Url { get; set; }
         [JsonIgnore]
        public Exception OriginException { get; set; }
         public IDictionary<object,object> Data { get; set; }
         public string Stack { get; set; } 
         public string Message { get; set; }
         public HttpLogException InnerException { get; set; }
         public DateTime LogTime { get; set; }
     }
 }
