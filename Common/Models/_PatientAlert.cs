using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PatientAlert
    {
        public string Message { get; set; }
        public string Details { get; set; }
        public AlertSeverity Severity { get; set; }
        public string Category { get; set; }
        public string SourceModule { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public enum AlertSeverity
    {
        Info,
        Warning,
        Danger,
        Critical
    }
}
