﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace vaccine.web.Controllers
{
    public class RegistController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}