using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using vaccine.web;

namespace VuetifyProjectTemplate
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var SiteSetting = File.ReadAllText($"{AppDomain.CurrentDomain.BaseDirectory}\\site.config.json");
            Constants.SiteSetting = JsonConvert.DeserializeObject<SiteSetting>(SiteSetting);
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
