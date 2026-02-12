using Application.Core;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Web.Helpers;
using Web.Services;

namespace Web.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            config.GetSection(AppSettings.AppSettingsKey).Bind(AppSettings.ApplicationSettings);
            services.Configure<ApplicationSettings>(config.GetSection("ApplicationSettings"));

            services.AddDbContext<DataContext>(opt => { opt.UseSqlServer(config.GetConnectionString("DefaultConnection")); });
           

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials()
                            .WithOrigins(new string[] { "http://localhost:3000", "http://localhost:5000", "http://localhost:5001" });
                });
            });

            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>(); 

            services.AddScoped<IUserHelper, UserHelper>();

            services.AddScoped<AuthorService>();

            services.AddScoped<GenderService>();

            services.AddScoped<PatientService>();

            services.AddSignalR();

            return services;
        }
    }
}