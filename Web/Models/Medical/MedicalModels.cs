using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models.Medical
{
    
    
    
    public abstract class BaseMedicalViewModel
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }

    
    
    
    public class MedicalAnalyticsModel
    {
        public int TotalPatients { get; set; }
        public int TotalAppointments { get; set; }
        public int CompletedAppointments { get; set; }
        public int CancelledAppointments { get; set; }
        public decimal RevenueCurrent { get; set; }
        public decimal RevenuePrevious { get; set; }
        public List<MonthlyStatistic> MonthlyStats { get; set; } = new List<MonthlyStatistic>();
        public List<SpecialtyStatistic> SpecialtyStats { get; set; } = new List<SpecialtyStatistic>();
    }

    
    
    
    public class MonthlyStatistic
    {
        public string Month { get; set; }
        public int Appointments { get; set; }
        public decimal Revenue { get; set; }
        public int NewPatients { get; set; }
    }

    
    
    
    public class SpecialtyStatistic
    {
        public string SpecialtyName { get; set; }
        public int AppointmentCount { get; set; }
        public decimal Revenue { get; set; }
        public int PatientCount { get; set; }
    }

    
    
    
    public class ICD10CodeModel
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
        public int UsageCount { get; set; }
    }

    
    
    
    public class MedicalAIPredictionModel
    {
        public int PredictionId { get; set; }
        public int PatientId { get; set; }
        public string PatientName { get; set; }
        public string PredictionType { get; set; }
        public string Result { get; set; }
        public decimal Confidence { get; set; }
        public DateTime PredictionDate { get; set; }
        public string Status { get; set; }
        public string Recommendations { get; set; }
    }

    
    
    
    public class MedicalDashboardModel
    {
        public int TodayAppointments { get; set; }
        public int PendingAppointments { get; set; }
        public int TotalActivePatients { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public List<RecentAppointment> RecentAppointments { get; set; } = new List<RecentAppointment>();
        public List<Alert> SystemAlerts { get; set; } = new List<Alert>();
    }

    
    
    
    public class RecentAppointment
    {
        public int AppointmentId { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; }
        public string Specialty { get; set; }
    }

    
    
    
    public class Alert
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Severity { get; set; }
        public bool IsRead { get; set; }
    }
}