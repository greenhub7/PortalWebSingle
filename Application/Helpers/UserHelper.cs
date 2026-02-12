using Application.Core;
using Application.Interfaces;
using Application.Models;
using CommonTasks.Data;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Web.Helpers
{
    public class UserHelper : IUserHelper
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<Rol> _roleManager;
        private readonly DataContext _context;

        public UserHelper(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<Rol> roleManager, DataContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
        }


        

     

        public async Task<ApplicationUser> AddClaim(ApplicationUser user, Claim claim)
        {
            var existingClaim = (await _userManager.GetClaimsAsync(user)).FirstOrDefault(x => x.Type == claim.Type);
            if (existingClaim != null)
                await _userManager.RemoveClaimAsync(user, existingClaim);
            await _userManager.AddClaimAsync(user, claim);

            return user;
        }
        public async Task<ApplicationUser> RemoveClaim(ApplicationUser user, Claim claim)
        {
            var existingClaim = (await _userManager.GetClaimsAsync(user)).FirstOrDefault(x => x.Type == claim.Type);
            if (existingClaim != null)
                await _userManager.RemoveClaimAsync(user, existingClaim);
            return user;
        }
        public async Task AddUserToRoleAsync(ApplicationUser user, string roleName)
        {
            var rol = await _userManager.IsInRoleAsync(user, roleName);
            if (!rol)
                await _userManager.AddToRoleAsync(user, roleName);
        }

        public async Task<Result<ApplicationUser>> AddUserAsync(UserView userview)
        {
            return await CreateUser(userview);
        }

        private static ApplicationUser ToUser(UserView view)
        {
            if (view == null) throw new ArgumentNullException(nameof(view));
            var m = new ApplicationUser();
            view.Transfer(ref m, null, false);
            return m;
        }

        private async Task<Result<ApplicationUser>> CreateUser(UserView userview)
        {
            var newUser = ToUser(userview);
            if (newUser.AuthorId == 0)
                return new Result<ApplicationUser> { IsSuccess = false, Error = "Debe especificar un Tenant" };
            if (newUser.UserTypeId == 0)
                newUser.UserTypeId = 1;
            if (newUser.StatusId == 0)
                newUser.StatusId = 1;

            newUser.Roles.Add("User");

            if (string.IsNullOrEmpty(newUser.UserName))
                newUser.UserName = newUser.Email;
            var result = await _userManager.CreateAsync(newUser, userview.Password);
            if (result.Succeeded)
            {
                if (newUser.Roles.Any())
                    await _userManager.AddToRolesAsync(newUser, newUser.Roles);
                await AddClaim(newUser, new Claim("AuthorId", newUser.AuthorId.ToString()));
                
                await AddClaim(newUser, new Claim("LastName", newUser.LastName));
                await AddClaim(newUser, new Claim("FirstName", newUser.FirstName));
                await AddClaim(newUser, new Claim("UserId", newUser.Id));
                return Result<ApplicationUser>.Success(newUser);

            }
            else
                return Result<ApplicationUser>.Failure(result.Errors.FirstOrDefault().Description);
        }

        public async Task<IdentityResult> ChangePasswordAsync(ApplicationUser user, string oldPassword, string newPassword)
        {
            return await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
        }

        public async Task CheckRoleAsync(string roleName)
        {
            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                await _roleManager.CreateAsync(new Rol
                {
                    Name = roleName
                });
            }
        }

        public async Task<IdentityResult> ConfirmEmailAsync(ApplicationUser user, string token)
        {
            return await _userManager.ConfirmEmailAsync(user, token);
        }

        public async Task<Response> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
                return new Response { Success = false, Code = 1 };

            var user = await GetUserByIdAsync(userId);
            if (user == null)
                return new Response { Success = false, Code = 1 };

            var result = await ConfirmEmailAsync(user, token);
            if (!result.Succeeded)
                return new Response { Success = false, Code = 1 };

            return new Response { Success = true, Code = 0 };
        }

        public async Task<bool> DisabledUserAsync(ApplicationUser user)
        {
            try
            {
                var lockoutEndDate = new DateTime(2999, 01, 01);
                await _userManager.SetLockoutEnabledAsync(user, true);
                await _userManager.SetLockoutEndDateAsync(user, lockoutEndDate);
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public async Task DeleteUserAsync(ApplicationUser user)
        {
            await _userManager.DeleteAsync(user);
        }

        public async Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<bool> HaveOpenCashier(string userId)
        {
            

            return true;
        }

        public async Task<ApplicationUser> GetBasicUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<ApplicationUser> GetBasicUserByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public async Task<IList<string>> GetUserRols(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            return userRoles;
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<string> GenerateEmailChangeTokenAsync(ApplicationUser user, string email)
        {
            return await _userManager.GenerateChangeEmailTokenAsync(user, email);
        }

        public async Task<List<IdentityRole>> GetAllRols()
        {
            return await _context.Roles.Where(p => p.Name != "Admin" && p.Name != "Root").ToListAsync();
        }

        public async Task<List<ApplicationUser>> GetAllUsersAsync(long AuthorId)
        {
            return await _userManager.Users
                .OrderBy(u => u.FirstName)
                .ThenBy(u => u.LastName)
                .ToListAsync();
        }

        private IIncludableQueryable<ApplicationUser, Author> GetFullUser()
        {
            return _context.Users
                  .Include(p => p.Author);
        }


        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            return await GetFullUser().FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<ApplicationUser> GetUserByEmailAsync(string email)
        {
            return await GetFullUser().FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<UserView> GetMyAccountAsync(string userId)
        {
            return await GetUserViewAsync(userId);
        }

        public async Task<UserView> GetUserViewAsync(string userId)
        {
            var usr = await GetFullUser().FirstOrDefaultAsync(u => u.Id == userId);
            var vm = new UserView();
            usr.Transfer(ref vm, null, false);
            return vm;
        }

        public async Task<bool> IsUserInRoleAsync(ApplicationUser user, string roleName)
        {
            return await _userManager.IsInRoleAsync(user, roleName);
        }

        public async Task<SignInResult> LoginAsync(LoginViewModel model)
        {
            return await _signInManager.PasswordSignInAsync(
                model.Email,
                model.Password,
                model.RememberMe,
                false);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> ResetPasswordAsync(ApplicationUser user, string token, string password)
        {
            return await _userManager.ResetPasswordAsync(user, token, password);
        }

        public async Task RemoveUserFromRoleAsync(ApplicationUser user, string roleName)
        {
            await _userManager.RemoveFromRoleAsync(user, roleName);
        }

        public async Task<IdentityResult> UpdateUserAsync(ApplicationUser user)
        {
            var usr = await GetBasicUserByIdAsync(user.Id);
            usr.StatusId = user.StatusId;
            usr.Picture = user.Picture;
            usr.FirstName = user.FirstName;
            usr.LastName = user.LastName;
            usr.ShopId = user.ShopId;

            return await _userManager.UpdateAsync(usr);
        }

        public async Task<IdentityResult> UpdateEmailAsync(ApplicationUser user, string email, string token)
        {
            return await _userManager.ChangeEmailAsync(user, email, token);
        }

        public async Task<SignInResult> ValidatePasswordAsync(ApplicationUser user, string password)
        {
            return await _signInManager.CheckPasswordSignInAsync(
                user,
                password,
                false);
        }

   
    }
}
