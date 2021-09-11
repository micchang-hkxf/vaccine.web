using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace vaccine.web.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            if (!Request.Cookies.ContainsKey("x-token"))
                return Redirect("/login");
            return View();
        }
    }
}