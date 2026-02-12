using Domain;
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
[NotMapped]
public class UserView : ApplicationUser
{
    [Display(Name = "Picture")]
    public IFormFile PictureFile { get; set; }
    [DataType(DataType.Password)]
    [StringLength(20, ErrorMessage = "La longitud maxima para el campo {0} debe ser de {1}")]
    public string Password { get; set; }
    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "La contraseña y la confirmacion deben coincidir")]
    [Display(Name = "Password Confirm")]
    public string PasswordConfirm { get; set; }
    public bool IsNew { get; set; }
    public int TypeId { get; set; }
    public string ActualPassword { get; set; }
    public int CashierId { get; set; }
     
    [Display(Name = "Es Médico")]
    public bool IsDoctor { get; set; }
     
    [Display(Name = "Exequartur")]
    [MaxLength(25)]
    public string Record { get; set; }

    [Display(Name = "Especialidad")]
    public int? SpecialtyId { get; set; }

    [Display(Name = "CMD")]
    [MaxLength(15)]
    public string Cmd { get; set; }

    [Display(Name = "Ubicación Principal")]
    [MaxLength(100)]
    public string City { get; set; }

    [Display(Name = "Prefijo de Liquidación")]
    [MaxLength(8)]
    public string PrefixLiq { get; set; }

    [Display(Name = "Secuencia Liquidación")]
    public int SeqLiq { get; set; } = 0;

    [Display(Name = "Prefijo de NCF")]
    [MaxLength(20)]
    public string PrefixNcf { get; set; }

    [Display(Name = "Secuencia Actual NCF")]
    public int? SeqNcf { get; set; }

    [Display(Name = "Prefijo de NCF-Gub")]
    [MaxLength(20)]
    public string PrefixNcfGub { get; set; }

    [Display(Name = "Secuencia Actual NCF-Gub")]
    public int? SeqNcfGub { get; set; }

    [Display(Name = "Teléfono de Contacto")]
    [MaxLength(20)]
    public string ContactPhone { get; set; }

    [Display(Name = "Correo de Contacto")]
    [MaxLength(100)]
    public string ContactEmail { get; set; } 
}