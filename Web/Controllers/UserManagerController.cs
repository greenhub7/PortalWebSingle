using Application.Core;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
    public class UserManagerController : PsBaseController
    {
        public readonly IConfiguration Configuration;

        public UserManagerController(DataContext db, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor,
            IConfiguration configuration 
         ) : base(db, userManager, httpContextAccessor)
        {
            Configuration = configuration;
        }

         

    }
}
