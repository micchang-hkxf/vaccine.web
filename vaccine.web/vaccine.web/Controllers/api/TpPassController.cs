using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using vaccine.web.Helpers;
using static vaccine.web.Controllers.AuthorizeController;

namespace vaccine.web.Controllers
{
    [ApiController]
    public class TpPassController : ControllerBase
    {
        //[Route("authorize"), HttpGet]
        //public IActionResult Authorze([FromQuery]TpwvOauthStatus Status)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(Status.Code)) throw new Exception("Code 錯誤");
        //        if (string.IsNullOrEmpty(Status.State)) throw new Exception("State 錯誤");
        //        var Token = GetUserTokeByCode(Status.Code);
        //        Response.Cookies.Append("x-token", Token, new CookieOptions() { Expires=DateTimeOffset.Now.AddDays(1) });
        //        return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
        //    }
        //    catch (Exception ex)
        //    {
        //        Response.Cookies.Append("error", "true", new CookieOptions() { Expires = DateTimeOffset.Now.AddDays(1) });
        //        return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
        //    }

        //}

        //[Route("authorize"), HttpGet]
        //public IActionResult Authorze([FromQuery]TpwvOauthStatus Status)
        //{
        //    try
        //    {
        //        return new RedirectResult($"https://localhost:44324/authorize{Request.QueryString}");
        //        return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
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
                var Redirect = new RedirectResult($"{Constants.SiteSetting.tpPassOauth}/oauth/authorize?response_type=code&client_id={Constants.SiteSetting.tpPassClientId}&redirectUri={HttpUtility.UrlEncode(Status.Redirect)}&scope={HttpUtility.UrlEncode(Constants.SiteSetting.tpPassClientScope)}&state={HttpUtility.UrlEncode(Status.Redirect)}");
                return Redirect;
                //return new RedirectResult($"~/authorize?code=testTpPassLogin&state={HttpUtility.UrlEncode(Status.Redirect)}");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }



    }
}