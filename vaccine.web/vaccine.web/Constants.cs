using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vaccine.web
{
    public class Constants
    {

        public static Dictionary<string, DateTime> _Timer = new Dictionary<string, DateTime>();
        public static Dictionary<string, DateTime> Timer { get { return _Timer; } }

        public static string ApiRoot => SiteSetting.apiRoot;

        public static CookieOptions GetCookieOption()
        {
            return new CookieOptions()
            {
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.Now.AddMonths(1),
                IsEssential = true
            };
        }

        public static string LogPath => @"D:\Logs\";

        public static string LogPwd => "77326688";

        public static Dictionary<string, string> PageCodes => new Dictionary<string, string>() {
            { "wv_ivoting" , "ivoting" } ,
            { "wv_subscribe" , "subscribe" } ,
        };

        public static dynamic SiteSetting { get; set; }
    }

}
