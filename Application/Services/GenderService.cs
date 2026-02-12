using CommonTasks.Data;
using Domain;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services
{
    public class GenderService
    {
        private readonly DataContext Db;
        public GenderService(DataContext db)
        {
            Db = db;
        }

        public async Task<List<Gender>> GetGenders()
        {
            return await Db.Genders.OrderBy(p => p.Name).AsNoTracking().ToListAsync();
        }

        public IEnumerable<SelectListItem> GetGendersToListItem(int genderId = 0 )
        {
            var models = Db.Genders.OrderBy(p => p.Name).AsNoTracking(); 
            if (genderId == 0)
                return models.ToSelectListItems(p => p.Name, p => p.GenderId.ToString());
            return models.ToSelectListItems(p => p.Name, p => p.GenderId.ToString(), l => l.GenderId == genderId);
        }
    }
}