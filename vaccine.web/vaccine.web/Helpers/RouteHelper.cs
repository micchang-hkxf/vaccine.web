using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
 namespace vaccine.web.Helpers
{
    public class RouteDebuggerAttribute : Attribute, IActionFilter
    {
         public RouteDebuggerAttribute()
        {
         }
         public void OnActionExecuted(ActionExecutedContext Context)
        {
            //var IsEnable = Context.HttpContext.Request.Query.ContainsKey("routedebug");
            //if (!IsEnable) return;
            //var Request = Context.HttpContext.Request;
         }
         public void OnActionExecuting(ActionExecutingContext Context)
        {
         }
     }
     public class RouteInfo {
        public RouteData RouteData { get; set; }
        public RouteSetting RouteSetting { get; set; }
    }
     public class RouteSetting {
        public string Action { get; set; }
        public string Controller { get; set; }
         public string Name { get; set; } 
        public string Template { get; set; }
        public string Contraint { get; set; }
    }
 }
