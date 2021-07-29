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
                return new RedirectResult($"~/regist/#/oauth?redirect={HttpUtility.UrlEncode(Status.State)}");
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }             

        }

        [Route("tppass"), HttpGet]
        public IActionResult TpPass([FromQuery]TpwvOauthStatus Status)
        {
            try
            {
                return new RedirectResult($"~/authorize?code=testTpPassLogin&state={HttpUtility.UrlEncode(Status.Redirect)}");
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