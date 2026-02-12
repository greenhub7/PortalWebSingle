using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
        public CurrentUser Get
        {
            get {
                var result = new CurrentUser();

                if (_httpContextAccessor.HttpContext == null || !_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
                {
                    return result;
                }

                
                var claims = _httpContextAccessor.HttpContext.User.Claims.ToList();
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                

                
                
                
                
                if (claims.Any(x => x.Type.Equals("UserId")))
                {
                    result.UserId = claims.First(x => x.Type.Equals("UserId")).Value;
                }
                if (result.UserId == null && claims.Any(x => x.Type.Equals(ClaimTypes.NameIdentifier)))
                {
                    result.UserId = claims.First(x => x.Type.Equals(ClaimTypes.NameIdentifier)).Value; 
                }
                
                
                
                

                if (claims.Any(x => x.Type.Equals(ClaimTypes.Email)))
                {
                    result.Email = claims.First(x => x.Type.Equals(ClaimTypes.Email)).Value;
                }

                if (claims.Any(x => x.Type.Equals("AuthorId")))
                {
                    result.AuthorId = int.Parse(claims.First(x => x.Type.Equals("AuthorId")).Value);
                }

                if (claims.Any(x => x.Type.Equals("Image")))
                {
                    result.Image = claims.First(x => x.Type.Equals("Image")).Value;
                }
                if (claims.Any(x => x.Type.Equals("LastName")))
                {
                    result.Lastname = claims.First(x => x.Type.Equals("LastName")).Value;
                }
                if (claims.Any(x => x.Type.Equals("FirstName")))
                {
                    result.FirstName = claims.First(x => x.Type.Equals("FirstName")).Value;
                }
                
                
                
                
                
                
                
                

                
                
                
                

                
                
                
                

                
                
                
                

                
                
                
                

                return result;
            }
        }
    }


}