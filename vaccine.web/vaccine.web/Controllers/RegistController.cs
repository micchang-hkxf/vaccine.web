using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vaccine.web.Helpers;

namespace vaccine.web.Controllers
{
    public class RegistController : Controller
    {
        [Identify(IdentifyRole.User, "wv_vaccine_regist")]
        public IActionResult Index()
        {
            return View();
        }
    }
}