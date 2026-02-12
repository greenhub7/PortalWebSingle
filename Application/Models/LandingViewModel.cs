using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class LandingViewModel
    {
        public List<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
        public List<Plan> Plans { get; set; } = new List<Plan>();
        public List<ApplicationUser> FeaturedDoctors { get; set; } = new List<ApplicationUser>();
        public SpecialOffer SpecialOffer { get; set; }
        public ContactFormModel ContactForm { get; set; } = new ContactFormModel();
    }

    public class Testimonial
    {
        public int TestimonialId { get; set; }
        public string Name { get; set; }
        public string Specialty { get; set; }
        public string Text { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Plan
    {
        public int PlanId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public string BillingPeriod { get; set; }
        public List<string> Features { get; set; } = new List<string>();
        public bool IsPopular { get; set; }
        public bool IsActive { get; set; }
    }


    public class SpecialOffer
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int DiscountPercentage { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string CountryCode { get; set; }
        public string PromoCode { get; set; }
    }

    public class ContactFormModel
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "El apellido es requerido")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "Por favor, ingrese un email válido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "El teléfono es requerido")]
        public string Phone { get; set; }

        public string Specialty { get; set; }

        public string AdditionalInfo { get; set; }
    }
    public class NewsletterSubscriber
    {
        public int NewsletterSubscriberId { get; set; }
        public string Email { get; set; }
        public DateTime SubscribedAt { get; set; }
        public bool IsActive { get; set; }
    }
}