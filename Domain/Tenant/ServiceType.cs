using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ServiceType
    {
        [Key]
        public int ServiceTypeId { get; set; }

        public string Name { get; set; }
 
    }
}
