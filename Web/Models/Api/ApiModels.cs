using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models.Api
{
    #region Base Response Models

    public class ApiSuccessResponse<T>
    {
        public bool Success { get; set; } = true;
        public T Data { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }

    public class ApiErrorResponse
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; }
        public string Code { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public object Details { get; set; }
    }

    #endregion

    #region Patient Models

    public class ApiPatientResponse
    {
        public int PersonId { get; set; }
        public int PatientId { get; set; }
        public string FullName { get; set; }
        public string Record { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Insurance { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class ApiDiagnosisResponse
    {
        public int DiagnosisId { get; set; }
        public string ICD10Code { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Observations { get; set; }
    }

    #endregion
        
    #region Validation Models

    public class ApiValidationError
    {
        public string Field { get; set; }
        public string Message { get; set; }
        public string Code { get; set; }
        public object RejectedValue { get; set; }
    }

    public class ApiValidationResponse
    {
        public bool IsValid { get; set; }
        public List<ApiValidationError> Errors { get; set; }
        public string Summary { get; set; }
    }

    #endregion
}