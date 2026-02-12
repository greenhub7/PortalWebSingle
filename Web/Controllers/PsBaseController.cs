namespace Web.Controllers
{
    using Application.Interfaces;
    using Domain;
    using iText.Html2pdf;
    using iText.Kernel.Geom;
    using iText.Kernel.Pdf;
    using MailKit.Net.Smtp;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.CodeAnalysis;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using MimeKit;
    using Persistence;
    using PsTools;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Common;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Web.Services;

    public abstract class PsBaseController : Controller
    {
        
        

        private PatientService _patientService;
        protected PatientService PatientService => _patientService ??= HttpContext.RequestServices.GetService<PatientService>();
        private IWebHostEnvironment _hostingEnvironment;
        protected IWebHostEnvironment HostingEnvironment => _hostingEnvironment ??= HttpContext.RequestServices.GetService<IWebHostEnvironment>();
        private IUserHelper _userHelper;
        protected IUserHelper UserHelper => _userHelper ??= HttpContext.RequestServices.GetService<IUserHelper>();
        private IServiceProvider _serviceProvider;
        protected IServiceProvider ServiceProvider => _serviceProvider ??= HttpContext.RequestServices.GetService<IServiceProvider>();
        private IRazorRenderService _razorRenderService;
        protected IRazorRenderService RazorRenderService => _razorRenderService ??= HttpContext.RequestServices.GetService<IRazorRenderService>();

        public readonly DataContext Db;
        public readonly UserManager<ApplicationUser> UserManager;
        public readonly IHttpContextAccessor HttpContextAccessor;

        public PsBaseController(DataContext db, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            Db = db;
            UserManager = userManager;
            HttpContextAccessor = httpContextAccessor;
        }

        protected async Task<ApplicationUser> GetCurrentUser()
        {
            return await UserManager.Users.Include(p => p.Author)
             .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
        }


        string BaseHref => $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
        public byte[] GeneratePdfFromHtml(string html)
        {
            ConverterProperties converterProperties = new ConverterProperties();
            converterProperties.SetBaseUri(BaseHref);
            converterProperties.SetCreateAcroForm(true);
            var pdfPageSettings = new PageSize(PageSize.A4);
            var memoryStream = new MemoryStream();
            var pdfWriter = new PdfWriter(memoryStream);
            var pdfDocument = new PdfDocument(pdfWriter);
            pdfDocument.SetDefaultPageSize(pdfPageSettings);

            HtmlConverter.ConvertToPdf(html, pdfDocument, converterProperties);
            pdfDocument.Close();
            return memoryStream.ToArray();
        }


        public byte[] DownloadImage(string url)
        {
            var webClient = new WebClient();
            var image = webClient.DownloadData(url);
            webClient.Dispose();
            return image;
        }

       
        public List<T> RawSqlQuery<T>(string query, Func<DbDataReader, T> map)
        {
            using var command = Db.Database.GetDbConnection().CreateCommand();
            command.CommandText = query;
            command.CommandType = CommandType.Text;

            Db.Database.OpenConnection();

            using var result = command.ExecuteReader();
            var entities = new List<T>();

            while (result.Read())
            {
                entities.Add(map(result));
            }
            return entities;
        }

        static DataTable ConvertToDataTable<TSource>(IEnumerable<TSource> source)
        {
            var props = typeof(TSource).GetProperties();

            var dt = new DataTable();
            dt.Columns.AddRange(
                props.Select(p => new DataColumn(p.Name, p.PropertyType)).ToArray()
            );

            source.ToList().ForEach(
                i => dt.Rows.Add(props.Select(p => p.GetValue(i, null)).ToArray())
            );

            return dt;
        }

  
 

        protected async Task<int> GetAuthorId()
        {
            var currentUser = await UserManager.GetUserAsync(User);
            if (currentUser == null) return 0;
            return currentUser.AuthorId;
        }
        protected async Task<Author> GetAuthor()
        {
            var currentUser = await UserManager.GetUserAsync(User);
            if (currentUser == null) return null;
            return await Db.Authors.AsNoTracking().FirstOrDefaultAsync(p => p.AuthorId == currentUser.AuthorId);
        }
        protected async Task<int> DaysAvailable(int authorId)
        {
            var paymentWithMaxDateTo = await Db.AuthorPayments
                                          .Where(ap => ap.AuthorId == authorId)
                                          .OrderByDescending(ap => ap.DateTo)
                                          .FirstOrDefaultAsync();
            if (paymentWithMaxDateTo == null) return -100;
            var currentDate = DateTime.Now;
            var availableDays = (paymentWithMaxDateTo.DateTo - currentDate).Days;
            return availableDays;
        }

        protected async Task<int> GetAuthorIdFromUser(string id)
        {
            var user = await Db.Users.FirstOrDefaultAsync(p => p.Id == id);
            if (user == null) return 0;
            return user.AuthorId;
        }

        protected string GetUserId()
        {
            return HttpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public async Task<string> RenderRazorViewToString(string viewName, object model)
        {
            return await RazorRenderService.RenderToStringAsync(viewName, model);
        }
    }
}