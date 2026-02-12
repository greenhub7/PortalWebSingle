using Domain;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    [NotMapped]
    public class PatientRequest
    {
        public IFormFile File { get; set; }

        public byte[] ImageArray { get; set; }
        public string Rnc { get; set; }

        public string LastName { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime? BornDate { get; set; }

        public int GenderId { get; set; }

        public int? SchoolLevelId { get; set; }

        public int CountryId { get; set; }

        public string Email { get; set; }

        public string Tel { get; set; }

        public string Cel { get; set; }

        public int MaritalSituationId { get; set; }

        public int OcupationId { get; set; }

        public int ReligionId { get; set; }

        public string Address { get; set; }

        public string Imagen { get; set; }

        public string Record2 { get; set; }

        public string Record3 { get; set; }

        public int Record { get; set; }

        public string FullName => $"{Name} {LastName}";

        public int? UserId { get; set; }

        public int? UserUpdateId { get; set; }
        public int StatusId { get; set; }
        public int AuthorId { get; set; }

        public int PatientId { get; set; }

        public int PersonId { get; set; }

        public int InsuranceId { get; set; }
        public string InsuranceName { get; set; }

        public string InsuranceNumber { get; set; }

        public string Nss { get; set; }

        public int BloodTypeId { get; set; }

        public string Age { get; set; }

        public int? CustomerId { get; set; }

        public string CompanionRnc { get; set; }

        public string Companion { get; set; }

        public string Name { get; set; }
        public bool IsExternal { get; set; }

        public string ImageLink
        {
            get {
                if (string.IsNullOrEmpty(Imagen))
                    return $"{AppConstants.CurrentUrl}/Content/no_image.png";
                return !IsExternal ? Imagen : $"{AppConstants.CurrentUrl}{Imagen.Substring(1)}";
            }
        }

       
        public string BloodTypeName { get; set; }
 

    }
}