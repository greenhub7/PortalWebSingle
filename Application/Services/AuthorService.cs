using CommonTasks.Data;
using Domain;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services
{
    public class AuthorService
    {
        private readonly DataContext Db;
        public AuthorService(DataContext db)
        {
            Db = db;
        }

        public async Task<Author> GetAuthor(int authorId)
        {
            return await Db.Authors.FirstOrDefaultAsync(p => p.AuthorId == authorId);
        }

        public async Task<List<Author>> GetAuthors(Guid? tenantId, int authorId)
        {
            var authors = Db.Authors.Where(p => p.StatusId != 2);
            if (authorId != 1)
                authors = authors.Where(p => p.TenantId == tenantId);
            return await authors.ToListAsync();
        }


        public async Task<int> GetNextLiquidationSequence(int authorId)
        {
            var author = await GetAuthor(authorId);

            if (author == null)
                return 1;

            int seqLiq = author.SeqLiq;
            seqLiq++;

            author.SeqLiq = seqLiq;
            await Db.SaveChangesAsync();

            return seqLiq;
        }

        public async Task<string> GenerateInvoiceNo(int authorId, int sequence)
        {
            var author = await GetAuthor(authorId);

            if (author == null)
                return $"LIQ{sequence:00000}";

            string prefix = author.PrefixLiq ?? "LIQ";

            return $"{prefix}{sequence:00000}";
        }

        public async Task<string> GenerateNcf(int authorId)
        {
            var author = await GetAuthor(authorId);

            if (author == null)
                return null;

            int seqNcf = author.SeqNcf ?? 0;
            seqNcf++;

            
            author.SeqNcf = seqNcf;
            await Db.SaveChangesAsync();

            string prefix = author.PrefixNcf ?? "B01";

            return $"{prefix}{seqNcf:00000000}";
        }

        public async Task<string> GenerateNcfGub(int authorId)
        {
            var author = await GetAuthor(authorId);

            if (author == null)
                return null;

            int seqNcfGub = author.SeqNcfGub ?? 0;
            seqNcfGub++;

            
            author.SeqNcfGub = seqNcfGub;
            await Db.SaveChangesAsync();

            string prefix = author.PrefixNcfGub ?? "G01";

            return $"{prefix}{seqNcfGub:00000000}";
        }

        public IEnumerable<SelectListItem> GetAuthorsToListItem(int authorId, Guid? tenantId, int ownerId = 0)
        {
            var query = Db.Authors.Where(p => p.StatusId != 2);
            if (ownerId != 1)
            {
                query = query.Where(p => p.TenantId == tenantId);
            }
            if (authorId == 0)
                return query.ToSelectListItems(p => p.Name, p => p.AuthorId.ToString());
            return query.ToSelectListItems(p => p.Name, p => p.AuthorId.ToString(), l => l.AuthorId == authorId);
        }

        public async Task<int> AddOrUpdate(Author view)
        {
            if (view.AuthorId == 0)
            {
                view.UpdateMessagesAvailability = DateTime.Now;
                view.AvailableEmailMessages = 100;
                view.AvailableSmsMessages = 10;
                view.AvailableWsMessages = 10;
                view.NotificationEmailBody = "<h1>Hola:&nbsp {0}</h1><p>Este es un recordatorio de la cita que tienes el dia: <strong>{1:dd/MM/yyyy}</strong></p><p>Para:&nbsp {2} </p><br><p> &nbsp {3} </p><br><br>, Recuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente: &nbsp {4}<br><hr><p><span style='color: #0000ff;'>Has recibido esta Notificación enviada desde el <strong>Sistema de Coordinacion de Citas</strong> <strong>SolMed</strong>, ya que uno de nuestros colaboradores tiene registrado tus datos en nuestro sistema, si entiendes que esto es un error, favor notifícalo escribiendo un mail a: <strong><a href='mailto:solmedapp@outlook.com'>solmedapp@outlook.com</a></strong> con el asunto : '<strong>Remover mis datos de SOLMED</strong>'</span></p> <p> <br> Visita nuestra pagina web para mas información <a href = 'http://solmed.app/'><strong> www.solmed.app </strong ></a></p>";
                view.NotificationSmsBody = "Recordatorio de Cita con:  {DoctorName},\n\nHola {PatientName},\n\nEste es un recordatorio de tu cita el {AppointmentDate} con {DoctorName}.\n\nRazón: {VisitReason}\n\nNotas: {Notes}\n\nRecuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente, {ClinicName}";
                view.NotificationWsBody = "Recordatorio de Cita con:  {DoctorName},\n\nHola {PatientName},\n\nEste es un recordatorio de tu cita el {AppointmentDate} con {DoctorName}.\n\nRazón: {VisitReason}\n\nNotas: {Notes}\n\nRecuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente, {ClinicName}";
                Db.Authors.Add(view);
            }
            else
                Db.Authors.Update(view);
            await Db.SaveChangesAsync();
            return view.AuthorId;
        }
    }
}