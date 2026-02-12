using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services
{
    public class MenuService
    {
        private readonly DataContext _context;
        private readonly IMemoryCache _cache;

        public MenuService(DataContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        
        private async Task<List<Option>> GetOptionsFromCacheOrDb(int? parentOptionId, string userId, bool onlyMainMenu, bool ignoreCache = false)
        {
            string cacheKey = parentOptionId.HasValue ? $"MenuOptions_{userId}_Parent_Medicals" : $"MenuOptions_{userId}";

            
            if (!ignoreCache && _cache.TryGetValue(cacheKey, out List<Option> cachedOptions))
            {
                return cachedOptions;
            }

            
            var user = await _context.Users
                                     .Include(u => u.Author)
                                     .ThenInclude(a => a.Plan)
                                     .ThenInclude(ap => ap.AuthorPlanOptions)
                                     .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null || user.Author == null || user.Author.Plan == null)
            {
                return new List<Option>(); 
            }

            var authorPlanOptionIds = user.Author.Plan.AuthorPlanOptions.Select(apo => apo.OptionId).ToList();

            var query = _context.Options
                                .Where(o => o.StatusId == 1 &&
                                            authorPlanOptionIds.Contains(o.OptionId));
            if (onlyMainMenu)
                query = query.Where(p => p.ShowInMenu);

            if (parentOptionId.HasValue)
            {
                query = query.Where(o => o.ParentOptionId == parentOptionId.Value);
            }

            var options = await query
                                .OrderBy(o => o.ParentOptionId)
                                .ThenBy(o => o.Order)
                                .ToListAsync();

            
            _cache.Set(cacheKey, options, TimeSpan.FromDays(10));

            return options;
        }

        
        public async Task<List<Option>> GetMenuOptionsAsync(int parentOptionId, string userId, bool onlyMainMenu, bool ignoreCache = false)
        {
            return await GetOptionsFromCacheOrDb(parentOptionId, userId, onlyMainMenu, ignoreCache);
        }

        
        public async Task<List<Option>> GetMenuOptionsAsync(string userId, bool onlyMainMenu, bool ignoreCache = false)
        {
            return await GetOptionsFromCacheOrDb(null, userId, onlyMainMenu, ignoreCache);
        }

        
        public void ClearCache(string userId, int? parentOptionId = null)
        {
            string cacheKey = parentOptionId.HasValue ? $"MenuOptions_{userId}_Parent_Medicals" : $"MenuOptions_{userId}";
            _cache.Remove(cacheKey);
        }

        
        public void ClearAllCacheForUser(string userId)
        {
            
            _cache.Remove($"MenuOptions_{userId}");
            _cache.Remove($"MenuOptions_{userId}_Parent_Medicals");
        }
    }
}
