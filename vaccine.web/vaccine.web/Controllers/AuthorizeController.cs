using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace vaccine.web.Controllers
{
    public class AuthorizeController : Controller
    {
        public IActionResult Index()
        {
            return Redirect($"/regist/#/oauth{Request.QueryString}");
            //return View();
        }
        public class TpwvOauth {
            public string State { get; set; }
        }
    }
}