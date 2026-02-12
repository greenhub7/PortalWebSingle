using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.DTOs;
using Web.Services;

namespace Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        private DataContext _db;
        protected DataContext Db => _db ??= HttpContext.RequestServices.GetService<DataContext>();

        private UserManager<ApplicationUser> _userManager;
        protected UserManager<ApplicationUser> UserManager => _userManager ??= HttpContext.RequestServices.GetService<UserManager<ApplicationUser>>();

        private TokenService _tokenService;
        protected TokenService TokenService => _tokenService ??= HttpContext.RequestServices.GetService<TokenService>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        [Authorize]
        [HttpGet]
        [Route("getCurrentUser")]
        protected async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await UserManager.Users
             .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        [Route("getLocalConectedUser")]
        protected async Task<ApplicationUser> GetLocalConectedUser()
        {
            return await Db.Users.Where(p => p.Email.ToLower() == User.FindFirstValue(ClaimTypes.Email).ToLower()).FirstOrDefaultAsync();
        }

        [Route("createUserObject")]
        public UserDto CreateUserObject(ApplicationUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Token = TokenService.CreateToken(user),
                
            };
        }


    }
}