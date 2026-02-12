
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using System;
using Vereyon.Web;
using Web.Extensions;
using Web.Middleware;
using Web.Services;

namespace Web
{
    public class Startup
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _hostingEnvironment = env;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IActionContextAccessor, ActionContextAccessor>();
            services.AddScoped<IRazorRenderService, RazorRenderService>();
           
            services.AddScoped<MenuService>();
            services.AddScoped<TenantProductSyncService>();


            services.AddControllersWithViews(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddRazorRuntimeCompilation(); 
            services.AddRazorPages();
            services.AddFlashMessage();
            services.AddApplicationServices(Configuration);
            services.AddIdentityServices(Configuration);

            
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(365);
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });

        }

        public void Configure(IApplicationBuilder app)
        {
            
            app.Use(async (context, next) =>
            {
                context.Request.EnableBuffering();
                await next();
            });

            app.UseMiddleware<ExceptionMiddleware>();

            if (_hostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Portal/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            
            
            
            
            
            
            app.Use(async (context, next) =>
            {
                
                
                context.Response.Headers.Add("Content-Security-Policy",
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://code.jquery.com https://stackpath.bootstrapcdn.com https://unpkg.com; " +
                    "style-src 'self' 'unsafe-inline' https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net https://fonts.googleapis.com; " +
                    "font-src 'self' https://stackpath.bootstrapcdn.com https://cdn.jsdelivr.net https://fonts.gstatic.com data:; " +
                    "img-src 'self' data: https:; " +
                    "connect-src 'self'; " +
                    "frame-ancestors 'self'");

                
                context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");

                
                context.Response.Headers.Add("X-Content-Type-Options", "nosniff");

                
                context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");

                
                context.Response.Headers.Add("Permissions-Policy",
                    "geolocation=(), microphone=(), camera=(), payment=()");

                
                
                if (!_hostingEnvironment.IsDevelopment())
                {
                    context.Response.Headers.Add("Strict-Transport-Security",
                        "max-age=31536000; includeSubDomains; preload");
                }

                
                context.Response.Headers.Remove("Server");
                context.Response.Headers.Remove("X-Powered-By");
                context.Response.Headers.Remove("X-AspNet-Version");
                context.Response.Headers.Remove("X-AspNetMvc-Version");

                await next();
            });

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            
            app.UseSession();

            app.UseAuthentication();
            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "login-explicit",
                    pattern: "Account/Login",
                    defaults: new { controller = "Account", action = "Login" });

                endpoints.MapControllerRoute(
                    name: "login",
                    pattern: "login",
                    defaults: new { controller = "Account", action = "Login" });

                endpoints.MapControllerRoute(
                    name: "landing",
                    pattern: "",
                    defaults: new { controller = "Portal", action = "Index" });

                endpoints.MapControllerRoute(
                    name: "landing-explicit",
                    pattern: "index",
                    defaults: new { controller = "Portal", action = "Index" });

                endpoints.MapControllerRoute(
                    name: "error",
                    pattern: "error",
                    defaults: new { controller = "Portal", action = "ErrorPage" });

                endpoints.MapControllerRoute(
                    name: "features",
                    pattern: "features",
                    defaults: new { controller = "Portal", action = "Features" });

                endpoints.MapControllerRoute(
                    name: "gallery",
                    pattern: "gallery",
                    defaults: new { controller = "Portal", action = "Gallery" });

                endpoints.MapControllerRoute(
                    name: "plans",
                    pattern: "plans",
                    defaults: new { controller = "Portal", action = "Plans" });

                endpoints.MapControllerRoute(
                    name: "contact",
                    pattern: "contact",
                    defaults: new { controller = "Portal", action = "Contact" });

                endpoints.MapControllerRoute(
                    name: "privacy",
                    pattern: "privacy",
                    defaults: new { controller = "Portal", action = "Privacy" });

                endpoints.MapControllerRoute(
                    name: "dashboard",
                    pattern: "web",
                    defaults: new { controller = "Portal", action = "Web" });

                endpoints.MapControllerRoute(
                    name: "dashboard-explicit",
                    pattern: "portal/web",
                    defaults: new { controller = "Portal", action = "Web" });
                endpoints.MapControllerRoute(
                     name: "directory-resumed",
                     pattern: "d",
                     defaults: new { controller = "Providers", action = "Directory" });
                endpoints.MapControllerRoute(
                    name: "directory",
                    pattern: "directory",
                    defaults: new { controller = "Providers", action = "Directory" });

                endpoints.MapControllerRoute(
                     name: "doctorProfile-resumed",
                     pattern: "p/{name}",
                     defaults: new { controller = "Providers", action = "Profile" }); endpoints.MapControllerRoute(
                      name: "doctorProfile",
                      pattern: "providers/{name}",
                      defaults: new { controller = "Providers", action = "Profile" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Portal}/{action=Index}/{id?}");

                endpoints.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Portal}/{action=Index}/{id?}");

                endpoints.MapRazorPages();
            });
        }
    }

}
