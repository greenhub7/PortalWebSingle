using Domain;
using System;
using System.Collections.Generic;

namespace Web.Controllers
{
    public class IndexViewModel
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int? InsuranceId { get; set; }
        public int? StatusId { get; set; }
        public int? CategoryId { get; set; }
        public string SearchText { get; set; }
        public bool IsClaim { get; set; } 
    }
}