using Domain;
using Domain.Tenant;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services
{
    
    
    
    public class TenantProductSyncService
    {
        private readonly DataContext _db;

        public TenantProductSyncService(DataContext db)
        {
            _db = db;
        }

        

 
    }

    
    
    
    public enum SyncAction
    {
        Create,
        Update,
        Delete,
        UpdatePrice
    }
}
