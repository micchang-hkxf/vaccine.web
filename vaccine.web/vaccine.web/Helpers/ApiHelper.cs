using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace vaccine.web.Helpers
{
    public static class ApiHelper
    {

        public static ResultType ApiGet<ResultType>(this HttpClient Client, string ApiUrl)
        {
            try
            {
                var Message = Client.GetAsync(ApiUrl).GetAwaiter().GetResult();
                var Result = Message.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                return JsonConvert.DeserializeObject<ResultType>(Result);
            }
            catch (Exception ex)
            {
                throw new Exception("請確認API位置與結果的指定型別正確。", ex);
            }
        }
    }
}
