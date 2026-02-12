using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Web.Middleware
{
    public class DomainMiddleware
    {
        private readonly RequestDelegate _next;

        public DomainMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            
            var host = context.Request.Host.Host.ToLower();

            
            if (host.Contains("facturexrd.com"))
            {
                
                context.Items["DomainTheme"] = "Facturex";
                context.Items["CompanyLogo"] = "/content/facturex/logo.png";
                context.Items["CompanyName"] = "Facturex";
            }
            else
            {
                
                context.Items["DomainTheme"] = "SolMed";
                context.Items["CompanyLogo"] = "/content/icons/_SolmedSmall.png";
                context.Items["CompanyName"] = "SolMed";
            }

            
            await _next(context);
        }
    }
}