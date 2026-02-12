using Application.Models;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Persistence;
using System;
using System.Linq;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers
{
    [AllowAnonymous]
    public class AccountController : UserManagerController
    {
        private readonly MenuService _menuService;
        private readonly IMemoryCache _cache;

        public AccountController(DataContext db, UserManager<ApplicationUser> userManager,
            IHttpContextAccessor httpContextAccessor, IConfiguration configuration, MenuService menuService, IMemoryCache cache) : base(db, userManager, httpContextAccessor, configuration)
        {
            _menuService = menuService;
            _cache = cache;
        }

        public IActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Web", "Portal");
            }

            return View(new LoginViewModel());
        }

        [HttpPost]
        public async Task<JsonResult> Login(LoginViewModel model)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine($"[LOGIN] Received request - Email: {model?.Email}");
                
                var success = false;
                string errorMessage = "";

                if (ModelState.IsValid)
                {
                    var result = await UserHelper.LoginAsync(model);
                    if (result.Succeeded)
                    {
                        success = true;
                    }
                    else
                    {
                        errorMessage = "Error de Inicio de Sesión";
                    }
                }
                else
                {
                    errorMessage = "Datos inválidos";
                    System.Diagnostics.Debug.WriteLine($"[LOGIN] ModelState invalid: {string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))}");
                }
                
                return new JsonResult(new { success, errorMessage });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"[LOGIN] Exception: {ex.Message}");
                return new JsonResult(new { success = false, errorMessage = ex.Message });
            }
        }
    }
}
