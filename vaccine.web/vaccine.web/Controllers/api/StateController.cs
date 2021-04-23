using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;

namespace vaccine.web.Controllers.api
{
    [ApiController]
    public class StateController : ControllerBase
    {

        [Route("api/state"), HttpGet]
        public IActionResult ApiState([FromQuery]string uuid)
        {
            return Content(@"{
              ""axiosEnabled"": ""axios通訊工具已啟用""
            }", MediaTypeHeaderValue.Parse("application/json"));
        }

    }
}