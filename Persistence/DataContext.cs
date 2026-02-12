using Application.Interfaces;
using Application.Models;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        private readonly IUserAccessor _currentUser;

        public DataContext(DbContextOptions<DataContext> options,
            IUserAccessor currentUser = null) : base(options)
        {
            _currentUser = currentUser;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // IMPORTANTE: Llamar primero a base para configurar Identity
            base.OnModelCreating(modelBuilder);

            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
              .SelectMany(t => t.GetForeignKeys())
              .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            // Configuración explícita de relaciones Person <-> ApplicationUser
            modelBuilder.Entity<Person>()
                .HasOne(p => p.User)
                .WithMany(u => u.UserCreations)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Person>()
                .HasOne(p => p.UserUpdate)
                .WithMany(u => u.UserUpdates)
                .HasForeignKey(p => p.UserUpdateId)
                .OnDelete(DeleteBehavior.Restrict);
 
            modelBuilder.Entity<PerinatalHistoryRecord>()
               .HasOne(p => p.MedicalBackground)
               .WithOne(m => m.PerinatalHistoryRecord)
               .HasForeignKey<MedicalBackground>(m => m.PerinatalHistoryRecordId)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.ObstetricBackground)
                .WithOne(o => o.PerinatalHistoryRecord)
                .HasForeignKey<ObstetricBackground>(o => o.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.CurrentPregnancy)
                .WithOne(c => c.PerinatalHistoryRecord)
                .HasForeignKey<CurrentPregnancy>(c => c.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasMany(p => p.PrenatalConsultations)
                .WithOne(c => c.PerinatalHistoryRecord)
                .HasForeignKey(c => c.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.BirthInformation)
                .WithOne(b => b.PerinatalHistoryRecord)
                .HasForeignKey<BirthInformation>(b => b.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.NewbornInformation)
                .WithOne(n => n.PerinatalHistoryRecord)
                .HasForeignKey<NewbornInformation>(n => n.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.PostpartumInformation)
                .WithOne(p => p.PerinatalHistoryRecord)
                .HasForeignKey<PostpartumInformation>(p => p.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PostpartumInformation>()
                .HasMany(p => p.PostpartumVisits)
                .WithOne(v => v.PostpartumInformation)
                .HasForeignKey(v => v.PostpartumInformationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.MorbidityInformation)
                .WithOne(m => m.PerinatalHistoryRecord)
                .HasForeignKey<MorbidityInformation>(m => m.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.NearMissVariables)
                .WithOne(n => n.PerinatalHistoryRecord)
                .HasForeignKey<NearMissVariables>(n => n.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.ContraceptionInformation)
                .WithOne(c => c.PerinatalHistoryRecord)
                .HasForeignKey<ContraceptionInformation>(c => c.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PerinatalHistoryRecord>()
                .HasOne(p => p.MaternalDischargeInformation)
                .WithOne(m => m.PerinatalHistoryRecord)
                .HasForeignKey<MaternalDischargeInformation>(m => m.PerinatalHistoryRecordId)
                .OnDelete(DeleteBehavior.Cascade);

           
            modelBuilder.Entity<BirthInformation>()
                .Property(b => b.Dilation)
                .HasPrecision(18, 2);


            modelBuilder.Entity<CurrentPregnancy>()
                .Property(c => c.Height)
                .HasPrecision(18, 2);


            modelBuilder.Entity<NewbornInformation>()
                .Property(n => n.HeadCircumference)
                .HasPrecision(18, 2);

            modelBuilder.Entity<PostpartumVisit>()
                .Property(p => p.Temperature)
                .HasPrecision(18, 2);

            modelBuilder.Entity<PrenatalConsultation>()
                .Property(p => p.Weight)
                .HasPrecision(18, 2);



            modelBuilder.Entity<PrenatalConsultation>()
                .Property(p => p.FetalHeartRate)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.PercentageServiceNegotiated)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.TaxToRetain)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.ReservePercentage)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.AdministrativeCommissionPercentage)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.DiscountRate)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Author>()
                .Property(a => a.ISRPercentage)
                .HasPrecision(18, 2);

            

            DeletedFilters(ref modelBuilder);
        }
        public DbSet<PerinatalHistoryRecord> PerinatalHistoryRecords { get; set; }
        public DbSet<MedicalBackground> MedicalBackgrounds { get; set; }
        public DbSet<ObstetricBackground> ObstetricBackgrounds { get; set; }
        public DbSet<CurrentPregnancy> CurrentPregnancies { get; set; }
        public DbSet<PrenatalConsultation> PrenatalConsultations { get; set; }
        public DbSet<LaborEntry> LaborEntries { get; set; }
        public DbSet<BirthInformation> BirthInformations { get; set; }
        public DbSet<NewbornInformation> NewbornInformations { get; set; }
        public DbSet<PostpartumInformation> PostpartumInformations { get; set; }
        public DbSet<PostpartumVisit> PostpartumVisits { get; set; }
        public DbSet<MorbidityInformation> MorbidityInformations { get; set; }
        public DbSet<NearMissVariables> NearMissVariables { get; set; }
        public DbSet<PuerperiumInformation> PuerperiumInformations { get; set; }
        public DbSet<PuerperiumDay> PuerperiumDays { get; set; }
        public DbSet<ContraceptionInformation> ContraceptionInformations { get; set; }
        public DbSet<MaternalDischargeInformation> MaternalDischargeInformations { get; set; }
         
        public DbSet<Author> Authors { get; set; }
        public DbSet<AuthorPayment> AuthorPayments { get; set; }
        public DbSet<AuthorPlan> AuthorPlans { get; set; }
        public DbSet<AuthorPlanOption> AuthorPlanOptions { get; set; }
        public DbSet<AuthorType> AuthorTypes { get; set; }
      
        public DbSet<BloodType> BloodTypes { get; set; }
        
        public DbSet<Continent> Continents { get; set; }
        public DbSet<Country> Countries { get; set; }
             public DbSet<Currency> Currencies { get; set; }
       
        public DbSet<Gender> Genders { get; set; }
       
        public DbSet<Insurance> Insurances { get; set; }
       
        public DbSet<MaritalSituation> MaritalSituations { get; set; } 
        public DbSet<Ocupation> Ocupations { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<OptionRol> OptionRols { get; set; }
       
        public DbSet<ParentOption> ParentOptions { get; set; }
        public DbSet<Patient> Patients { get; set; }
       
        public DbSet<Periodicity> Periodicities { get; set; }
        public DbSet<Person> People { get; set; }
       
        public DbSet<Religion> Religions { get; set; } 
        public DbSet<Rol> Rols { get; set; }
       
        public DbSet<SchoolLevel> SchoolLevels { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
            public DbSet<Status> Status { get; set; }
       
        public DbSet<UserType> UserTypes { get; set; }
     

         
        public DbSet<Domain.Tenant.TenantProduct> TenantProducts { get; set; }

        public override int SaveChanges()
        {
            MakeAudit();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            MakeAudit();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void MakeAudit()
        {
            var modifiedEntries = ChangeTracker.Entries().Where(
                x => x.Entity is AuditEntity
                    && (
                    x.State == EntityState.Added
                    || x.State == EntityState.Modified
                )
            );

            var user = new CurrentUser();

            if (_currentUser != null)
            {
                user = _currentUser.Get;
            }

            foreach (var entry in modifiedEntries)
            {
                if (entry.Entity is AuditEntity entity)
                {
                    var date = DateTime.UtcNow;
                    string userId = user.UserId;

                    if (entry.State == EntityState.Added)
                    {
                        entity.CreatedAt = date;
                        if (userId != null)
                            entity.CreatedBy = userId;
                    }
                    else if (entity is ISoftDeleted deleted && deleted.Deleted)
                    {
                        entity.DeletedAt = date;
                        entity.DeletedBy = userId;
                    }

                    Entry(entity).Property(x => x.CreatedAt).IsModified = false;
                    Entry(entity).Property(x => x.CreatedBy).IsModified = false;

                    entity.UpdatedAt = date;
                    entity.UpdatedBy = userId;
                }
            }
        }

        private void DeletedFilters(ref ModelBuilder modelBuilder)
        {
            #region SoftDeleted

            


            #endregion
        }

    }
}