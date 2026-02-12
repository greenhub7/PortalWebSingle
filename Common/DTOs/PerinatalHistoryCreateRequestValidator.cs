using Common.DTOs;
using System;
using FluentValidation;
using Domain.Enums;
namespace Web.Validators
{ 
    public class PerinatalHistoryCreateRequestValidator : AbstractValidator<PerinatalHistoryRequestResponse>
    {
        public PerinatalHistoryCreateRequestValidator()
        { 
            RuleFor(x => x.AntecedentesMedicos).SetValidator(new AntecedentesMedicosValidator());
            RuleFor(x => x.GestacionActual).SetValidator(new GestacionActualValidator());
            RuleFor(x => x.HabitosToxicos).SetValidator(new HabitosToxicosValidator());
            RuleFor(x => x.VacunasInmunizaciones).SetValidator(new VacunasInmunizacionesValidator());
        }
    }
     
    public class AntecedentesMedicosValidator : AbstractValidator<AntecedentesMedicosDto>
    {
        public AntecedentesMedicosValidator()
        {
            RuleFor(x => x.DiabetesFamiliar).SetValidator(new DiabetesFamiliarInfoValidator());
            RuleFor(x => x.OtraCondicionMedicaGraveFamiliar).SetValidator(new OtraCondicionMedicaInfoValidator());
            RuleFor(x => x.DiabetesPersonal).SetValidator(new DiabetesFamiliarInfoValidator());
            RuleFor(x => x.OtraCondicionMedicaGravePersonal).SetValidator(new OtraCondicionMedicaInfoValidator());
        }
    }

    public class DiabetesFamiliarInfoValidator : AbstractValidator<DiabetesFamiliarInfoDto>
    {
        public DiabetesFamiliarInfoValidator()
        {
            When(x => x.TieneDiabetes == SiNoEnum.Si, () =>
            {
                RuleFor(x => x)
                    .Must(x => x.Tipo1 || x.Tipo2 || x.Gestacional)
                    .WithMessage("Debe seleccionar al menos un tipo de diabetes");
            });
        }
    }

    public class OtraCondicionMedicaInfoValidator : AbstractValidator<OtraCondicionMedicaInfoDto>
    {
        public OtraCondicionMedicaInfoValidator()
        {
            When(x => x.TieneCondicion == SiNoEnum.Si, () =>
            {
                RuleFor(x => x.Descripcion)
                    .NotEmpty().WithMessage("Debe especificar la condición médica")
                    .MaximumLength(500).WithMessage("La descripción no puede exceder los 500 caracteres");
            });
        }
    }
     
    public class GestacionActualValidator : AbstractValidator<GestacionActualDto>
    {
        public GestacionActualValidator()
        {
            RuleFor(x => x.MetodoAnticonceptivo).SetValidator(new MetodoAnticonceptivoInfoValidator());

            RuleFor(x => x.PesoAnteriorKg)
                .GreaterThan(0).WithMessage("El peso anterior debe ser mayor a 0")
                .LessThan(200).WithMessage("El peso anterior debe ser menor a 200 kg");

            RuleFor(x => x.TallaCm)
                .GreaterThan(0).WithMessage("La talla debe ser mayor a 0")
                .LessThan(250).WithMessage("La talla debe ser menor a 250 cm");

            RuleFor(x => x.FUM)
                .NotEmpty().WithMessage("La FUM es requerida")
                .LessThanOrEqualTo(DateTime.Today).WithMessage("La FUM no puede ser futura");

            RuleFor(x => x.FPP)
                .NotEmpty().WithMessage("La FPP es requerida")
                .GreaterThan(x => x.FUM).WithMessage("La FPP debe ser posterior a la FUM");
        }
    }

    public class MetodoAnticonceptivoInfoValidator : AbstractValidator<MetodoAnticonceptivoInfoDto>
    {
        public MetodoAnticonceptivoInfoValidator()
        {
            RuleFor(x => x)
                .Must(x => x.NoUsaba || x.Barrera || x.DIU || x.Hormonal || x.Emergencia || x.Natural)
                .WithMessage("Debe seleccionar al menos un método anticonceptivo o indicar que no usaba");
        }
    }
     
    public class HabitosToxicosValidator : AbstractValidator<HabitosToxicosDto>
    {
        public HabitosToxicosValidator()
        {
            RuleFor(x => x.PrimerTrimestre).SetValidator(new HabitosToxicosTrimestreValidator());
            RuleFor(x => x.SegundoTrimestre).SetValidator(new HabitosToxicosTrimestreValidator());
            RuleFor(x => x.TercerTrimestre).SetValidator(new HabitosToxicosTrimestreValidator());
        }
    }

    public class HabitosToxicosTrimestreValidator : AbstractValidator<HabitosToxicosTrimestreDto>
    {
        public HabitosToxicosTrimestreValidator()
        {
            
        }
    }
     
    public class VacunasInmunizacionesValidator : AbstractValidator<VacunasInmunizacionesDto>
    {
        public VacunasInmunizacionesValidator()
        {
            RuleFor(x => x.TetanosDifteria).SetValidator(new VacunaInfoValidator());
            RuleFor(x => x.Tdap).SetValidator(new VacunaInfoValidator());
            RuleFor(x => x.Influenza).SetValidator(new VacunaInfoValidator());
            RuleFor(x => x.Rubeola).SetValidator(new VacunaInfoValidator());
            RuleFor(x => x.HepatitisB).SetValidator(new VacunaInfoValidator());
            RuleFor(x => x.HepatitisA).SetValidator(new VacunaInfoValidator());
        }
    }

    public class VacunaInfoValidator : AbstractValidator<VacunaInfoDto>
    {
        public VacunaInfoValidator()
        {
            When(x => x.Aplicada == SiNoEnum.Si, () =>
            {
                RuleFor(x => x.Fecha)
                    .NotEmpty().WithMessage("La fecha de aplicación es requerida")
                    .LessThanOrEqualTo(DateTime.Today).WithMessage("La fecha de aplicación no puede ser futura");

                RuleFor(x => x.EdadGestacional)
                    .NotEmpty().WithMessage("La edad gestacional es requerida")
                    .InclusiveBetween(0, 45).WithMessage("La edad gestacional debe estar entre 0 y 45 semanas");

                RuleFor(x => x)
                    .Must(x => x.PreviaEmbarazo || x.DuranteEmbarazo || x.PostPartoOAborto)
                    .WithMessage("Debe seleccionar al menos un momento de aplicación");
            });
        }
    }
}
