using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace vaccine.web.Controllers
{
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        [Route("authorize"), HttpGet]
        public IActionResult Authorze([FromQuery]TpwvOauthStatus Status)
        {
            try
            {
                if (string.IsNullOrEmpty(Status.Code)) throw new Exception("Code 錯誤");
                if (string.IsNullOrEmpty(Status.State)) throw new Exception("State 錯誤");
                Response.Cookies.Append("x-token", "xxxxxxxxxxxx", Constants.GetCookieOption());
                Response.Cookies.Append("red_url",string.Empty,new CookieOptions() { Expires = DateTimeOffset.Now.AddSeconds(-1) });
                return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
            }
            catch (Exception ex)
            {
                return new RedirectResult($"~/regist/#/oauth/error?redirect={HttpUtility.UrlEncode(Status.State)}");                
            }

        }
        //[Route("authorize"), HttpGet]
        //public IActionResult Authorze([FromQuery]TpwvOauthStatus Status)
        //{
        //    try
        //    {
        //        return new RedirectResult($"https://localhost:44324/authorize{Request.QueryString}");
        //        //return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
        //    }
        //    catch (Exception ex)
        //    {
        //        return Ok(ex.Message);
        //    }

        //}

        [Route("tppass"), HttpGet]
        public IActionResult TpPass([FromQuery]TpwvOauthStatus Status)
        {
            try
            {
                var Redirect = new RedirectResult($"{Constants.SiteSetting.tpPassOauth}/oauth/authorize?response_type=code&client_id={Constants.SiteSetting.tpPassClientId}&redirectUri={HttpUtility.UrlEncode(Status.Redirect)}&scope={HttpUtility.UrlEncode(Constants.SiteSetting.tpPassClientScope)}&state=abcd123456");
                Response.Cookies.Append("red_url", HttpUtility.UrlEncode(Status.Redirect));
                return Redirect;
                //return new RedirectResult($"~/authorize?code=testTpPassLogin&state={HttpUtility.UrlEncode(Status.Redirect)}");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }

        public class TpwvOauthStatus
        {
            public string Code { get; set; }
            public string State { get; set; }
            public string Redirect { get; set; }
        }

    }
}