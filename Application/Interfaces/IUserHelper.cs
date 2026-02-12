using Application.Core;
using Application.Models;
using Domain;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserHelper
    {
        Task<ApplicationUser> RemoveClaim(ApplicationUser user, Claim claim);
        Task<List<IdentityRole>> GetAllRols();
        Task<ApplicationUser> AddClaim(ApplicationUser user, Claim claim);
        Task CheckRoleAsync(string roleName);
        Task<bool> IsUserInRoleAsync(ApplicationUser user, string roleName);
        Task<IList<string>> GetUserRols(ApplicationUser user);
        Task<UserView> GetMyAccountAsync(string userId);
        Task<UserView> GetUserViewAsync(string userId);
        Task<List<ApplicationUser>> GetAllUsersAsync(long AuthorId);
        Task<ApplicationUser> GetUserByIdAsync(string userId);
        Task<SignInResult> LoginAsync(LoginViewModel model);
        Task<SignInResult> ValidatePasswordAsync(ApplicationUser user, string password);
    }
}
