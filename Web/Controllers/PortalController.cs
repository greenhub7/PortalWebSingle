using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Persistence;
using PsTools;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    public class PortalController : PsBaseController
    {

        public PortalController(DataContext db, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor) : base(db, userManager, httpContextAccessor)
        {
        }


        public async Task<IActionResult> Web(string dateFrom, string dateTo)
        {
            var author = await GetAuthor();
 
            var currentuser = await GetCurrentUser();
              
            DateTime selectedDate = DateTime.Today;
            if (!string.IsNullOrEmpty(dateFrom))
            {
                selectedDate = Dates.FormatedDateDo(dateFrom).Date;
            }

            var newPatientsCount = 0;

            var whatsAppMessages = author?.AvailableWsMessages ?? 0;
            var smsCredits = author?.AvailableSmsMessages ?? 0;
            var emailCredits = author?.AvailableEmailMessages ?? 0;

            return View();
        }



        [AllowAnonymous]
        public ActionResult IndexWeb()
        {
            return View();
        }



        [AllowAnonymous]
        public ActionResult ErrorPage(string message = "")
        {
            ViewBag.Message = message;
            return View();
        }
         


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error(string msg)
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier, Message = msg });
        }
    }
}
