using Domain.Enums;
using System;

namespace Common.DTOs
{
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    

    
    public class PerinatalHistoryListRequest
    {
        
        public string SearchTerm { get; set; }

        public bool? EdadMenor15 { get; set; }
        public bool? EdadMayor35 { get; set; }
        public int? EdadMinima { get; set; }
        public int? EdadMaxima { get; set; }

        
        public string LugarControlPrenatal { get; set; }
        public string LugarParto { get; set; }

        
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? FechaIngresoDesde { get; set; }
        public DateTime? FechaIngresoHasta { get; set; }
        public DateTime? FechaNacimientoDesde { get; set; }
        public DateTime? FechaNacimientoHasta { get; set; }
        public DateTime? FechaEgresoDesde { get; set; }
        public DateTime? FechaEgresoHasta { get; set; }

        
        public bool? TieneDiabetes { get; set; }
        public bool? TieneHipertension { get; set; }
        public bool? EmbarazoRiesgo { get; set; }
        public bool? EmbarazoMultiple { get; set; }
        public bool? CesareaPreviaTrue { get; set; }

        
        public SexoEnum? SexoRecienNacido { get; set; }
        public bool? PesoMenor2500g { get; set; }
        public bool? PesoMayor4000g { get; set; }
        public decimal? PesoMinimo { get; set; }
        public decimal? PesoMaximo { get; set; }
        public bool? RequirioReanimacion { get; set; }
        public bool? IngresoNeonatologia { get; set; }

        
        public bool? PartoVaginal { get; set; }
        public bool? PartoCesarea { get; set; }
        public PresentacionSituacionEnum? PresentacionSituacion { get; set; }
        public bool? ComplicacionesObstetricas { get; set; }

        
        public EgresoEstadoEnum? EstadoEgresoRN { get; set; }
        public CondicionEgresoEnum? CondicionEgresoMaterno { get; set; }
        public bool? RequirioUCI { get; set; }

        
        public int? ConsultasPreNatalesMinimo { get; set; }
        public bool? TieneControlPrenatal { get; set; }
        public bool? RequirioReferencia { get; set; }

        
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SortBy { get; set; } = "CreatedAt";
        public bool SortDesc { get; set; } = true;
        
        public int? EdadGestacionalMinima { get; set; }
        public int? EdadGestacionalMaxima { get; set; }
        public int? ApgarMinimo { get; set; }
        public bool? LactanciaInmediata { get; set; }
        public bool? HemorragiaPostParto { get; set; }
        public bool? PreeclampsiaEclampsia { get; set; }
        public bool? InfeccionPuerperal { get; set; }

        
        public int? GestasPreviasMinimo { get; set; }
        public int? GestasPreviasMaximo { get; set; }
        public int? AbortosPreviosMinimo { get; set; }
        public int? AbortosPreviosMaximo { get; set; }
        public int? CesareasPreviasMinimo { get; set; }
        public int? CesareasPreviasMaximo { get; set; }
        public bool? HijoUnico { get; set; }

        
        public bool? PreeclampsiaPasada { get; set; }
        public bool? DiabetesGestacional { get; set; }
        public bool? InfeccionUrinaria { get; set; }
        public bool? AmenazaPartoPretermino { get; set; }
        public bool? RupturaPrematuraMembranas { get; set; }
        public bool? RestriccionCrecimiento { get; set; }
        public bool? HemorragiaPrimerTrimestre { get; set; }
        public bool? HemorragiaSegundoTrimestre { get; set; }
        public bool? HemorragiaTercerTrimestre { get; set; }

        
        public bool? VacunasTetanoCompletas { get; set; }
        public bool? VacunaInfluenza { get; set; }
        public bool? VacunaCovid { get; set; }

        
        public bool? ExamenOdontologico { get; set; }
        public bool? ExamenMamas { get; set; }
        public bool? PapanicolaouRealizado { get; set; }
        public string GrupoSanguineo { get; set; }
        public bool? RhNegativo { get; set; }
        public bool? VihPositivo { get; set; }
        public bool? SifilisPositivo { get; set; }
        public bool? HepatitisPositivo { get; set; }

        
        public int? ControlPreNatalSemanas { get; set; }
        public bool? ControlPrenatalPrimer { get; set; }
        public bool? UltrasonidoMorfologico { get; set; }
        public bool? ConsejeriaPlanificacion { get; set; }
        public int PatientId { get; set; } = 0;
    }


    
    public class PerinatalHistoryRequestResponse
    {
        public int Id { get; set; }
        public string LugarControlPrenatal { get; set; }
        public string LugarParto { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DatosEgresoMaternoDto DatosEgresoMaterno { get; set; }

        public AntecedentesMedicosDto AntecedentesMedicos { get; set; }
        public SiNoEnum? TBCFamiliar { get; set; }
        public DiabetesFamiliarInfoDto DiabetesFamiliar { get; set; }
        public SiNoEnum? HipertensionFamiliar { get; set; }
        public SiNoEnum? PreeclamsiaFamiliar { get; set; }
        public SiNoEnum? EclamsiaFamiliar { get; set; }
        public OtraCondicionMedicaInfoDto OtraCondicionMedicaGraveFamiliar { get; set; }

        public SiNoEnum? TBCPersonal { get; set; }
        public DiabetesFamiliarInfoDto DiabetesPersonal { get; set; }
        public SiNoEnum? HipertensionPersonal { get; set; }
        public SiNoEnum? PreeclamsiaPersonal { get; set; }
        public SiNoEnum? EclamsiaPersonal { get; set; }
        public OtraCondicionMedicaInfoDto OtraCondicionMedicaGravePersonal { get; set; }

        public SiNoEnum? CirugiaGenitoUrinaria { get; set; }
        public SiNoEnum? Infertilidad { get; set; }
        public SiNoEnum? Cardiopatia { get; set; }
        public SiNoEnum? Nefropatia { get; set; }
        public SiNoEnum? Violencia { get; set; }
        public SiNoEnum? VIH { get; set; }
        public HistoriaObstetricaDto HistoriaObstetrica { get; set; }
        public GestacionActualDto GestacionActual { get; set; }
        public HabitosToxicosDto HabitosToxicos { get; set; }
        public VacunasInmunizacionesDto VacunasInmunizaciones { get; set; }
        public ExamenesYTamizajesDto ExamenesYTamizajes { get; set; }
        public LaboratorioYPruebasDto LaboratorioYPruebas { get; set; }
        public int PatientId { get; set; }

        public PerinatalHistoryRequestResponse()
        {
            DatosEgresoMaterno = new DatosEgresoMaternoDto();
            AntecedentesMedicos = new AntecedentesMedicosDto();
            DiabetesFamiliar = new DiabetesFamiliarInfoDto();
            OtraCondicionMedicaGraveFamiliar = new OtraCondicionMedicaInfoDto();
            DiabetesPersonal = new DiabetesFamiliarInfoDto();
            OtraCondicionMedicaGravePersonal = new OtraCondicionMedicaInfoDto();
            HistoriaObstetrica = new HistoriaObstetricaDto();
            GestacionActual = new GestacionActualDto();
            HabitosToxicos = new HabitosToxicosDto();
            VacunasInmunizaciones = new VacunasInmunizacionesDto();
            ExamenesYTamizajes = new ExamenesYTamizajesDto();
            LaboratorioYPruebas = new LaboratorioYPruebasDto();
        }
    }

    
    public class AuditInfoDto
    {
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }

    
    public class AntecedentesMedicosDto
    {
        public SiNoEnum? TBCFamiliar { get; set; }
        public DiabetesFamiliarInfoDto DiabetesFamiliar { get; set; }
        public SiNoEnum? HipertensionFamiliar { get; set; }
        public SiNoEnum? PreeclamsiaFamiliar { get; set; }
        public SiNoEnum? EclamsiaFamiliar { get; set; }
        public OtraCondicionMedicaInfoDto OtraCondicionMedicaGraveFamiliar { get; set; }

        public SiNoEnum? TBCPersonal { get; set; }
        public DiabetesFamiliarInfoDto DiabetesPersonal { get; set; }
        public SiNoEnum? HipertensionPersonal { get; set; }
        public SiNoEnum? PreeclamsiaPersonal { get; set; }
        public SiNoEnum? EclamsiaPersonal { get; set; }
        public OtraCondicionMedicaInfoDto OtraCondicionMedicaGravePersonal { get; set; }

        public SiNoEnum? CirugiaGenitoUrinaria { get; set; }
        public SiNoEnum? Infertilidad { get; set; }
        public SiNoEnum? Cardiopatia { get; set; }
        public SiNoEnum? Nefropatia { get; set; }
        public SiNoEnum? Violencia { get; set; }
        public SiNoEnum? VIH { get; set; }
        public AntecedentesMedicosDto()
        {
            OtraCondicionMedicaGravePersonal = new OtraCondicionMedicaInfoDto();
            DiabetesPersonal = new DiabetesFamiliarInfoDto();
            DiabetesFamiliar = new DiabetesFamiliarInfoDto();
        }
    }

    public class DiabetesFamiliarInfoDto
    {
        public SiNoEnum? TieneDiabetes { get; set; }
        public bool Tipo1 { get; set; }
        public bool Tipo2 { get; set; }
        public bool Gestacional { get; set; }
    }

    public class OtraCondicionMedicaInfoDto
    {
        public SiNoEnum? TieneCondicion { get; set; }
        public string Descripcion { get; set; }
    }

    
    public class HistoriaObstetricaDto
    {
        public UltimoPrevioInfoDto UltimoPrevio { get; set; }
        public SiNoEnum? AntecedenteDeGemelares { get; set; }
        public int GestasPrevias { get; set; }
        public int EmbarazoEctopico { get; set; }
        public bool TresConsecutivos { get; set; }
        public int Abortos { get; set; }
        public int Partos { get; set; }
        public int Vaginales { get; set; }
        public int Cesareas { get; set; }
        public int NacidosVivos { get; set; }
        public int NacidosMuertos { get; set; }
        public int MuertosPrimeraSemana { get; set; }
        public int MuertosDespuesPrimeraSemana { get; set; }
        public int Viven { get; set; }
        public DateTime FechaFinEmbarazoAnterior { get; set; }
        public bool MenosDeUnAnio { get; set; }
        public SiNoEnum? EmbarazoPlaneado { get; set; }
    }

    public class UltimoPrevioInfoDto
    {
        public bool Nc { get; set; }
        public bool Normal { get; set; }
        public bool PesoMenor2500g { get; set; }
        public bool PesoMayor4000g { get; set; }
    }

    
    public class GestacionActualDto
    {
        public MetodoAnticonceptivoInfoDto MetodoAnticonceptivo { get; set; }
        public decimal PesoAnteriorKg { get; set; }
        public decimal TallaCm { get; set; }
        public DateTime FUM { get; set; }
        public DateTime FPP { get; set; }
        public SiNoEnum? EGConfiablePorFUM { get; set; }
        public SiNoEnum? EGConfiablePorEcoMayor20s { get; set; }
        public GestacionActualDto()
        {
            MetodoAnticonceptivo = new MetodoAnticonceptivoInfoDto();
        }
    }

    public class MetodoAnticonceptivoInfoDto
    {
        public bool NoUsaba { get; set; }
        public bool Barrera { get; set; }
        public bool DIU { get; set; }
        public bool Hormonal { get; set; }
        public bool Emergencia { get; set; }
        public bool Natural { get; set; }
    }

    
    public class HabitosToxicosDto
    {
        public HabitosToxicosTrimestreDto PrimerTrimestre { get; set; }
        public HabitosToxicosTrimestreDto SegundoTrimestre { get; set; }
        public HabitosToxicosTrimestreDto TercerTrimestre { get; set; }
    }

    public class HabitosToxicosTrimestreDto
    {
        public SiNoEnum? FumaActualmente { get; set; }
        public SiNoEnum? FumaPasivo { get; set; }
        public SiNoEnum? Drogas { get; set; }
        public SiNoEnum? Alcohol { get; set; }
        public SiNoEnum? Violencia { get; set; }
    }
    
    public class VacunasInmunizacionesDto
    {
        public VacunaInfoDto TetanosDifteria { get; set; }
        public VacunaInfoDto Tdap { get; set; }
        public VacunaInfoDto Influenza { get; set; }
        public VacunaInfoDto Rubeola { get; set; }
        public VacunaInfoDto HepatitisB { get; set; }
        public VacunaInfoDto HepatitisA { get; set; }
        public SiNoEnum? TamizajeHepatitisB { get; set; }
    }

    public class VacunaInfoDto
    {
        public SiNoEnum? Aplicada { get; set; }
        public DateTime? Fecha { get; set; }
        public int? EdadGestacional { get; set; }
        public int? TotalDosis { get; set; }
        public bool PreviaEmbarazo { get; set; }
        public bool DuranteEmbarazo { get; set; }
        public bool PostPartoOAborto { get; set; }
    }

    
    public class ExamenesYTamizajesDto
    {
        public SiNoEnum? ExamenOdontologico { get; set; }
        public SiNoEnum? ExamenMamas { get; set; }

        public ResultadoExamenEnum? CervixInspeccionVisual { get; set; }
        public ResultadoExamenEnum? CervixPap { get; set; }
        public ResultadoExamenEnum? CervixColp { get; set; }

        public GrupoSanguineoInfoDto GrupoSanguineo { get; set; }
        public ConsejeriasInfoDto Consejerias { get; set; }
    }

    public class GrupoSanguineoInfoDto
    {
        public string Grupo { get; set; }
        public bool RhNegativo { get; set; }
        public bool RhPositivo { get; set; }
        public SiNoEnum? Inmunizada { get; set; }
        public SiNoNcEnum? GammaglobulinaAntiD { get; set; }
    }

    public class ConsejeriasInfoDto
    {
        public SiNoEnum? PreparacionParaParto { get; set; }
        public SiNoEnum? ConsejeriaLactanciaMaterna { get; set; }
    }

    
    public class LaboratorioYPruebasDto
    {
        public ToxoplasmosisInfoDto Toxoplasmosis { get; set; }
        public HemoglobinaInfoDto Hemoglobina { get; set; }
        public ResultadoExamenEnum? Chagas { get; set; }
        public PaludismoMalariaInfoDto PaludismoMalaria { get; set; }
        public GlucemiaInfoDto Glucemia { get; set; }
        public ResultadoExamenEnum? EstrepoconoB { get; set; }
        public PruebaVIHInfoDto VIHMenor20Sem { get; set; }
        public PruebaVIHInfoDto VIHMayor20Sem { get; set; }
        public PruebaSifilisInfoDto SifilisMenor20Sem { get; set; }
        public PruebaSifilisInfoDto SifilisMayor20Sem { get; set; }
    }

    public class ToxoplasmosisInfoDto
    {
        public ResultadoExamenEnum? Antes20SemIgG { get; set; }
        public ResultadoExamenEnum? Desp20SemIgG { get; set; }
        public ResultadoExamenEnum? ConsultaIgM { get; set; }
    }

    public class HemoglobinaInfoDto
    {
        public string Valor { get; set; }
        public bool Mayor110gdl { get; set; }
        public SiNoEnum? FeFolatosIndicadosFe { get; set; }
        public SiNoEnum? FeFolatosIndicadosFolatos { get; set; }
    }

    public class PaludismoMalariaInfoDto
    {
        public ResultadoExamenEnum? Menor20Sem { get; set; }
        public ResultadoExamenEnum? Mayor20Sem { get; set; }
    }

    public class GlucemiaInfoDto
    {
        public decimal Menor20Sem { get; set; }
        public decimal Mayor30Sem { get; set; }
    }

    public class PruebaVIHInfoDto
    {
        public SiNoNcEnum? Solicitado { get; set; }
        public SiNoSdNcEnum? Resultado { get; set; }
        public SiNoNcEnum? TarvEnEmbarazo { get; set; }
    }

    public class PruebaSifilisInfoDto
    {
        public PruebaSifilisDetalleDto NoTreponemica { get; set; }
        public PruebaSifilisDetalleDto Treponemica { get; set; }
        public PruebaSifilisDetalleDto Tratamiento { get; set; }
        public PruebaSifilisDetalleDto TratamientoPareja { get; set; }
    }

    public class PruebaSifilisDetalleDto
    {
        public SiNoSdNcEnum? Resultado { get; set; }
        public string ValorSemanas { get; set; }
    }

    
    public class ConsultaAntenatalDto
    {
        public DateTime FechaConsulta { get; set; }
        public decimal EdadGestacional { get; set; }
        public decimal Peso { get; set; }
        public string PresionArterialPASistolica { get; set; }
        public string PresionArterialPADiastolica { get; set; }
        public decimal AlturaUterina { get; set; }
        public string Presentacion { get; set; }
        public decimal FrecuenciaCardiacaFetalFCFLpm { get; set; }
        public string MovimientosFetales { get; set; }
        public string Proteinuria { get; set; }
        public string LugarControl { get; set; }
        public string SignosAlarmaExamenesYTratamientos { get; set; }
        public string InicialesTecnico { get; set; }
        public DateTime ProximaCita { get; set; }
    }
    
    public class TrabajoDePartoDto
    {
        public DateTime FechaIngreso { get; set; }
        public int ConsultasPreNatalesTotal { get; set; }
        public SiNoEnum? Carne { get; set; }
        public decimal EdadGestPrimeraConsultaSemanas { get; set; }
        public HospitalizacionInfoDto Hospitalizacion { get; set; }
        public CorticoidesInfoDto Corticoides { get; set; }
        public TipoInicioEnum? Inicio { get; set; }
        public RoturaMembranaInfoDto RoturaMembranasAnteparto { get; set; }
        public EdadGestacionalInfoDto EdadGestacional { get; set; }
        public PresentacionSituacionEnum? PresentacionSituacion { get; set; }
        public SiNoEnum? TamanoFetalAcorde { get; set; }
        public AcompananteInfoDto AcompananteTDP { get; set; }
        public AcompananteInfoDto AcompananteP { get; set; }
        public EnfermedadesPartoInfoDto Enfermedades { get; set; }
    }

    public class HospitalizacionInfoDto
    {
        public SiNoEnum? Hospitalizada { get; set; }
        public int Dias { get; set; }
    }

    public class CorticoidesInfoDto
    {
        public CorticoidesAntenatalesEnum? Estado { get; set; }
        public string SemanaInicio { get; set; }
    }

    public class RoturaMembranaInfoDto
    {
        public SiNoEnum? Ocurrio { get; set; }
        public DateTime? Fecha { get; set; }
        public TimeSpan? Hora { get; set; }
    }

    public class EdadGestacionalInfoDto
    {
        public bool Menor37Sem { get; set; }
        public bool LaborMayorIgual18Hs { get; set; }
        public bool TemperaturaMayor38c { get; set; }
        public decimal Semanas { get; set; }
        public decimal Dias { get; set; }
        public bool PorFUM { get; set; }
        public bool PorEco { get; set; }
    }

    public class AcompananteInfoDto
    {
        public bool Pareja { get; set; }
        public bool Familiar { get; set; }
        public bool Otro { get; set; }
        public bool Ninguno { get; set; }
    }

    public class EnfermedadesPartoInfoDto
    {
        public ResultadoExamenNcEnum? Sifilis { get; set; }
        public ResultadoExamenNcEnum? VIH { get; set; }
        public SiNoNcEnum? TARV { get; set; }
    }

    
    public class DetalleTrabajoPartoDto
    {
        public DateTime Hora { get; set; }
        public string PosicionMadre { get; set; }
        public string PresionArterial { get; set; }
        public string Pulso { get; set; }
        public string ContraccionesPor10min { get; set; }
        public string Dilatacion { get; set; }
        public string AlturaPresentacion { get; set; }
        public string VariedadPosicion { get; set; }
        public string Meconio { get; set; }
        public string FCFdips { get; set; }
    }

    
    public class DatosNacimientoDto
    {
        public EstadoNacimientoEnum? EstadoNacimiento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public TimeSpan HoraNacimiento { get; set; }
        public MultipleInfoDto Multiple { get; set; }
        public TerminacionInfoDto Terminacion { get; set; }
        public string IndicacionPrincipalInduccionPartoOperatorio { get; set; }
        public bool Induccion { get; set; }
        public bool Operacion { get; set; }
        public PosicionPartoEnum? PosicionParto { get; set; }
        public SiNoEnum? Episiotomia { get; set; }
        public DesgarrosInfoDto Desgarros { get; set; }
        public SiNoEnum? OcitocicosPrelumbramiento { get; set; }
        public SiNoEnum? OcitocicosPostlumbramiento { get; set; }
        public PlacentaInfoDto Placenta { get; set; }
        public LigaduraCordonEnum? LigaduraCordón { get; set; }
        public MedicacionInfoDto Medicacion { get; set; }
    }

    public class MultipleInfoDto
    {
        public SiNoEnum? EsMultiple { get; set; }
        public string Orden { get; set; }
    }

    public class TerminacionInfoDto
    {
        public bool Espontanea { get; set; }
        public bool Cesarea { get; set; }
        public bool Forceps { get; set; }
        public bool Vacuum { get; set; }
        public bool Otra { get; set; }
    }

    public class DesgarrosInfoDto
    {
        public SiNoEnum? TuvoDesgarros { get; set; }
        public int? Grado { get; set; }
    }

    public class PlacentaInfoDto
    {
        public SiNoEnum? Completa { get; set; }
        public SiNoEnum? Retenida { get; set; }
    }

    public class MedicacionInfoDto
    {
        public SiNoEnum? Ocitocicos { get; set; }
        public SiNoEnum? Antibiotico { get; set; }
        public SiNoEnum? Analgesia { get; set; }
        public SiNoEnum? AnestesiaLocal { get; set; }
        public SiNoEnum? AnestesiaRegional { get; set; }
        public SiNoEnum? AnestesiaGeneral { get; set; }
        public SiNoEnum? Transfusion { get; set; }
        public SiNoEnum? SulfatoMg { get; set; }
        public string OtroMedicamento1 { get; set; }
        public string OtroMedicamento2 { get; set; }
    }
    
    public class DatosRecienNacidoDto
    {
        public SexoEnum? Sexo { get; set; }
        public MedicionPesoInfoDto PesoAlNacer { get; set; }
        public decimal PerimetroCefalicoCm { get; set; }
        public decimal LongitudCm { get; set; }
        public EdadGestacionalRNInfoDto EdadGestacional { get; set; }
        public PesoEdadGestacionalEnum? PesoEdadGestacional { get; set; }
        public SiNoEnum? LactanciaMaternaInicioPrecoz { get; set; }
        public ReanimacionInfoDto Reanimacion { get; set; }
        public ApgarInfoDto Apgar { get; set; }
        public AtencionPartoInfoDto AtendioParto { get; set; }
        public AtencionPartoInfoDto AtendioNeonato { get; set; }
        public DefectosCongenitosInfoDto DefectosCongenitos { get; set; }
        public EnfermedadesRNInfoDto Enfermedades { get; set; }
        public TamizajeNeonatalInfoDto TamizajeNeonatal { get; set; }
        public FallecimientosInfoDto Fallecimientos { get; set; }
        public ReferidoInfoDto Referido { get; set; }
        public DatosEgresoRNInfoDto DatosEgreso { get; set; }
        public AlimentacionInfoDto Alimentacion { get; set; }
        public ProcedimientosRNInfoDto Procedimientos { get; set; }
        public string NombreRN { get; set; }
        public string IdRN { get; set; }
        public string Responsable { get; set; }
    }

    public class MedicionPesoInfoDto
    {
        public decimal PesoGramos { get; set; }
        public bool Menor2500g { get; set; }
        public bool Mayor4000g { get; set; }
    }

    public class EdadGestacionalRNInfoDto
    {
        public decimal Semanas { get; set; }
        public decimal Dias { get; set; }
        public EdadGestacionalMetodoEnum? Metodo { get; set; }
    }

    public class ReanimacionInfoDto
    {
        public SiNoEnum? Estimulacion { get; set; }
        public SiNoEnum? Aspiracion { get; set; }
        public SiNoEnum? Mascara { get; set; }
        public SiNoEnum? Oxigeno { get; set; }
        public SiNoEnum? Masaje { get; set; }
        public SiNoEnum? Intubacion { get; set; }
        public SiNoEnum? Medicacion { get; set; }
    }

    public class ApgarInfoDto
    {
        public int Min1er { get; set; }
        public int Min5to { get; set; }
    }

    public class AtencionPartoInfoDto
    {
        public TipoPersonalEnum? TipoPersonal { get; set; }
        public string Nombre { get; set; }
    }

    public class DefectosCongenitosInfoDto
    {
        public DefectosCongenitosEnum? Tipo { get; set; }
        public string CodigoDefecto1 { get; set; }
        public string CodigoDefecto2 { get; set; }
        public string CodigoDefecto3 { get; set; }
    }

    public class EnfermedadesRNInfoDto
    {
        public bool Ninguna { get; set; }
        public bool UnaOMas { get; set; }
        public string CodigoEnfermedad1 { get; set; }
        public string CodigoEnfermedad2 { get; set; }
        public string CodigoEnfermedad3 { get; set; }
    }

    public class TamizajeNeonatalInfoDto
    {
        public SiNoSdNcEnum? VIHRNExpuesto { get; set; }
        public SiNoSdNcEnum? VIHRNTratamiento { get; set; }
        public VDRLInfoDto VDRL { get; set; }
        public ResultadoExamenEnum? TamizajeAudiologico { get; set; }
        public ResultadoExamenEnum? TamizajeBilirrubina { get; set; }
        public ResultadoExamenEnum? TamizajeToxoIgM { get; set; }
        public ResultadoExamenEnum? TamizajeChagas { get; set; }
        public ResultadoExamenEnum? TamizajeHbPatia { get; set; }
        public ResultadoExamenEnum? TamizajeCardiovascular { get; set; }
        public SiNoEnum? TamizajeMetabolico { get; set; }
    }

    public class VDRLInfoDto
    {
        public ResultadoExamenEnum? Resultado { get; set; }
        public SiNoSdNcEnum? Tratamiento { get; set; }
    }

    public class FallecimientosInfoDto
    {
        public SiNoEnum? FalleceSalaPartoMadre { get; set; }
        public SiNoEnum? FalleceSalaPartoRN { get; set; }
    }

    public class ReferidoInfoDto
    {
        public bool AlojamientoConjunto { get; set; }
        public bool Neonatologia { get; set; }
        public bool OtroHospital { get; set; }
    }

    public class DatosEgresoRNInfoDto
    {
        public EgresoEstadoEnum? Estado { get; set; }
        public DateTime FechaEgreso { get; set; }
        public TimeSpan HoraEgreso { get; set; }
        public bool Trasladado { get; set; }
        public string TrasladoLugar { get; set; }
        public SiNoSdEnum? FalleceDuranteOLugarTraslado { get; set; }
        public int EdadAlEgresoDiasCompletosAlEgreso { get; set; }
        public bool MenosDeUnDia { get; set; }
    }

    public class AlimentacionInfoDto
    {
        public AlimentacionTipoEnum? Tipo { get; set; }
    }

    public class ProcedimientosRNInfoDto
    {
        public SiNoEnum? BocaArriba { get; set; }
        public SiNoEnum? BCG { get; set; }
        public SiNoEnum? InmunizacionHepatitisB { get; set; }
        public SiNoEnum? MeconioPrimerDia { get; set; }
        public decimal PesoAlEgreso { get; set; }
        public SiNoNcEnum? GammaglobulinaAntiD { get; set; }
    }

    
    public class DatosPostpartoDto
    {
        public string Tiempo { get; set; }
        public decimal Temperatura { get; set; }
        public string PresionArterial { get; set; }
        public string Pulso { get; set; }
        public string InvolucionUterina { get; set; }
        public string Sangrado { get; set; }
        public string Responsable { get; set; }
    }

    
    public class DatosPuerperioDto
    {
        public DateTime Fecha { get; set; }
        public decimal Temperatura { get; set; }
        public string PresionArterial { get; set; }
        public string Pulso { get; set; }
        public string InvolucionUterina { get; set; }
        public string Loquios { get; set; }
        public string Perine { get; set; }
        public string Lactancia { get; set; }
        public string Observaciones { get; set; }
        public string Responsable { get; set; }
    }
    
    public class DatosMorbilidadDto
    {
        public TrastornosHipertensivosInfoDto TrastornosHipertensivos { get; set; }
        public InfeccionesInfoDto Infecciones { get; set; }
        public HemorragiasInfoDto Hemorragias { get; set; }
        public TrastornosMetabolicosInfoDto TrastornosMetabolicos { get; set; }
        public OtrosTrastornosInfoDto OtrosTrastornos { get; set; }
        public ComplicacionesObstetricasInfoDto ComplicacionesObstetricas { get; set; }
    }

    public class TrastornosHipertensivosInfoDto
    {
        public SiNoEnum? TrastornosPresentes { get; set; }
        public SiNoEnum? HipertensionCronica { get; set; }
        public SiNoEnum? PreeclampsiaLeve { get; set; }
        public SiNoEnum? PreeclampsiaSevera { get; set; }
        public SiNoEnum? Eclampsia { get; set; }
        public SiNoEnum? HELLP { get; set; }
        public SiNoEnum? HipertensionGestacional { get; set; }
        public SiNoEnum? HipertensionCronicaPESobreimpuesta { get; set; }
    }

    public class InfeccionesInfoDto
    {
        public SiNoEnum? InfeccionesPresentes { get; set; }
        public SiNoEnum? Sepsis { get; set; }
        public SiNoEnum? Endometritis { get; set; }
        public SiNoEnum? Corioamnionitis { get; set; }
        public SiNoEnum? BacteruriaAsintomatica { get; set; }
        public SiNoEnum? Pielonefritis { get; set; }
        public SiNoEnum? Neumonia { get; set; }
        public SiNoEnum? InfeccionHeridaCesarea { get; set; }
        public SiNoEnum? InfeccionEpisiorrafia { get; set; }
        public OtraInfeccionInfoDto OtraInfeccion { get; set; }
    }

    public class HemorragiasInfoDto
    {
        public HemorragiaPrimerTrimestreInfoDto PrimerTrimestre { get; set; }
        public HemorragiaSegundoTrimestreInfoDto SegundoTrimestre { get; set; }
        public HemorragiaTercerTrimestreInfoDto TercerTrimestre { get; set; }
    }

    

    
    public class DatosIntervencionesDto
    {
        public SiNoSdEnum? AlumbramientoManual { get; set; }
        public UterotonicosTtoInfoDto UterotonicosTtoHemorragia { get; set; }
        public AccesosAdministracionInfoDto AccesosAdministracion { get; set; }
        public ProcedimientosQuirurgicosInfoDto ProcedimientosQuirurgicos { get; set; }
        public IntervencionesEspecificasInfoDto IntervencionesEspecificas { get; set; }
    }

    
    public class DatosNearMissDto
    {
        public CriteriosCardiovascularesInfoDto CriteriosCardiovasculares { get; set; }
        public SiNoEnum? IctericiaPreeclampsia { get; set; }
        public CriteriosRespiratoriosInfoDto CriteriosRespiratorios { get; set; }
        public CriteriosRenalesInfoDto CriteriosRenales { get; set; }
        public CriteriosNeurologicosInfoDto CriteriosNeurologicos { get; set; }
        public CriteriosLaboratorioInfoDto CriteriosLaboratorio { get; set; }
        public IntervencionesNearMissInfoDto Intervenciones { get; set; }
    }
    
    public class CriteriosCardiovascularesInfoDto
    {
        public SiNoEnum? Shock { get; set; }
        public SiNoEnum? ParoCardiaco { get; set; }
    }

    public class CriteriosRespiratoriosInfoDto
    {
        public SiNoEnum? CianosisAguda { get; set; }
        public SiNoEnum? RespiracionJadeante { get; set; }
        public SiNoEnum? TaquipneaSevera { get; set; }
        public SiNoEnum? BradipneaSevera { get; set; }
    }

    public class CriteriosRenalesInfoDto
    {
        public SiNoEnum? OliguriaResistenteLiquidosDiureticos { get; set; }
    }

    public class CriteriosNeurologicosInfoDto
    {
        public SiNoEnum? Coma { get; set; }
        public SiNoEnum? InconcienciaProlongada { get; set; }
        public SiNoEnum? AccidenteCerebroVascular { get; set; }
        public SiNoEnum? ConvulsionesIncontrolables { get; set; }
        public SiNoEnum? ParalisisGeneralizada { get; set; }
    }

    public class CriteriosLaboratorioInfoDto
    {
        public SiNoEnum? PlaquetasMenor50000 { get; set; }
        public SiNoEnum? CreatininaMayor300 { get; set; }
        public SiNoEnum? BilirrubinaMayor100 { get; set; }
        public SiNoEnum? PHMenor71 { get; set; }
        public SiNoEnum? SatHbMenor90 { get; set; }
        public SiNoEnum? PaO2FiO2Menor200 { get; set; }
        public SiNoEnum? LactatoMayor5 { get; set; }
    }

    public class IntervencionesNearMissInfoDto
    {
        public AgentesVasoactivosInfoDto AgentesVasoactivos { get; set; }
        public IntubacionInfoDto IntubacionVentilacion { get; set; }
        public HemoderivadosInfoDto HemoderivadosMayor3Vol { get; set; }
        public IngresoUCIMayorInfoDto IngresoUCIMayor7Dias { get; set; }
        public SiNoEnum? Histerectomia { get; set; }
        public SiNoEnum? DialisisIRA { get; set; }
        public SiNoEnum? ReanimacionCardiopulmonar { get; set; }
    }

    public class AgentesVasoactivosInfoDto
    {
        public SiNoEnum? Utilizados { get; set; }
        public string Cuales { get; set; }
    }

    public class IntubacionInfoDto
    {
        public SiNoEnum? Realizada { get; set; }
        public int Dias { get; set; }
    }

    public class HemoderivadosInfoDto
    {
        public SiNoEnum? Administrados { get; set; }
        public int Dias { get; set; }
    }

    public class IngresoUCIMayorInfoDto
    {
        public SiNoEnum? Ingreso { get; set; }
        public int Dias { get; set; }
    }
    
    public class DatosEgresoMaternoDto
    {
        public DateTime FechaEgreso { get; set; }
        public DateTime HoraEgreso { get; set; }
        public TipoEgresoEnum? TipoEgreso { get; set; }
        public CondicionEgresoEnum? CondicionEgreso { get; set; }
        public string LugarTraslado { get; set; }
        public SiNoEnum? FalleceDuranteOEnLugarTraslado { get; set; }
        public SiNoEnum? Autopsia { get; set; }
        public string Responsable { get; set; }
    }

    
    public class DatosAnticoncepcionDto
    {
        public ConsejeriaAnticoncepcionInfoDto Consejeria { get; set; }
        public string Responsable { get; set; }
        public MetodosAnticonceptivosInfoDto MetodosAnticonceptivos { get; set; }
        public SiNoEnum? InicioMAC { get; set; }
    }

    public class ConsejeriaAnticoncepcionInfoDto
    {
        public bool Oral { get; set; }
        public bool Escrita { get; set; }
        public bool Ninguna { get; set; }
    }

    public class MetodosAnticonceptivosInfoDto
    {
        public PreferenciaAnticonceptivoEnum? ACOPildora { get; set; }
        public PreferenciaAnticonceptivoEnum? OtroHormonal { get; set; }
        public PreferenciaAnticonceptivoEnum? DIU { get; set; }
        public PreferenciaAnticonceptivoEnum? Inyectable { get; set; }
        public PreferenciaAnticonceptivoEnum? Implante { get; set; }
        public PreferenciaAnticonceptivoEnum? Barrera { get; set; }
        public PreferenciaAnticonceptivoEnum? Condon { get; set; }
        public PreferenciaAnticonceptivoEnum? EQVFemenino { get; set; }
        public PreferenciaAnticonceptivoEnum? EQVMasculino { get; set; }
        public PreferenciaAnticonceptivoEnum? Abstinencia { get; set; }
    }
    
    public class TrastornosMetabolicosInfoDto
    {
        public SiNoEnum? TrastornosPresentes { get; set; }
        public DiabetesInfoDto DiabetesMellitus { get; set; }
        public TrastornosTiroideosInfoDto TrastornosTiroideos { get; set; }
        public OtroTrastornoMetabolicoInfoDto OtroTrastorno { get; set; }
    }

    public class DiabetesInfoDto
    {
        public SiNoEnum? DiabetesPresente { get; set; }
        public ToleranciaGlucosaInfoDto ToleranciaOralGlucosa { get; set; }
        public SiNoEnum? DMInsulinoDependientePrevia { get; set; }
        public SiNoEnum? DMNoInsulinoDependientePrevia { get; set; }
        public SiNoEnum? DMGestacional { get; set; }
        public SiNoEnum? EstadoHiperosmolar { get; set; }
        public SiNoEnum? Cetoacidosis { get; set; }
        public SiNoEnum? EstadoHiperglicemico { get; set; }
    }

    public class ToleranciaGlucosaInfoDto
    {
        public SiNoEnum? Anormal { get; set; }
        public bool NoSeHizo { get; set; }
    }

    public class TrastornosTiroideosInfoDto
    {
        public SiNoEnum? TrastornosPresentes { get; set; }
        public SiNoEnum? Hipotiroidismo { get; set; }
        public SiNoEnum? Hipertiroidismo { get; set; }
        public SiNoEnum? CrisisTiroidea { get; set; }
    }

    public class OtroTrastornoMetabolicoInfoDto
    {
        public SiNoEnum? Presente { get; set; }
        public string Descripcion { get; set; }
    }

    
    public class OtrosTrastornosInfoDto
    {
        public SiNoEnum? TrastornosPresentes { get; set; }
        public string Descripcion { get; set; }
        public SiNoEnum? HiperemesisGravidica { get; set; }
        public SiNoEnum? TrombosisVenosaProfunda { get; set; }
        public SiNoEnum? TromboembolismoPulmonar { get; set; }
        public SiNoEnum? EmboliaLA { get; set; }
        public SiNoEnum? Cardiopatia { get; set; }
        public SiNoEnum? Valvulopatia { get; set; }
        public SiNoEnum? Convulsiones { get; set; }
        public SiNoEnum? AlteracionEstadoConciencia { get; set; }
        public SiNoEnum? Oliguria { get; set; }
        public SiNoEnum? Anemia { get; set; }
        public SiNoEnum? AnemiaFalciforme { get; set; }
        public SiNoEnum? EnfermedadRenal { get; set; }
        public SiNoEnum? NeoplasiaMaligna { get; set; }
        public SiNoEnum? TrastornoPsiquiatrico { get; set; }
        public SiNoEnum? Colestasis { get; set; }
    }

    
    public class ComplicacionesObstetricasInfoDto
    {
        public SiNoEnum? ComplicacionesPresentes { get; set; }
        public SiNoEnum? PartoObstruido { get; set; }
        public SiNoEnum? RoturaProlongadaMembranas { get; set; }
        public SiNoEnum? Oligoamnios { get; set; }
        public SiNoEnum? Polihidramnios { get; set; }
        public SiNoEnum? SufrimientoFetalAgudo { get; set; }
        public SiNoEnum? RestriccionCrecimientoIntrauterino { get; set; }
        public OtraComplicacionInfoDto OtraComplicacion { get; set; }
    }

    public class OtraComplicacionInfoDto
    {
        public SiNoEnum? Presente { get; set; }
        public string Descripcion { get; set; }
    }

    
    public class OtraInfeccionInfoDto
    {
        public SiNoEnum? Presente { get; set; }
        public string Descripcion { get; set; }
    }

    
    public class HemorragiaPrimerTrimestreInfoDto
    {
        public SiNoEnum? HemorragiaPresente { get; set; }
        public SiNoEnum? PostAborto { get; set; }
        public SiNoEnum? MolaHidatiforme { get; set; }
        public SiNoEnum? EmbarazoEctopico { get; set; }
    }

    public class HemorragiaSegundoTrimestreInfoDto
    {
        public SiNoEnum? HemorragiaPresente { get; set; }
        public SiNoEnum? PlacentaPrevia { get; set; }
        public SiNoEnum? AcretismoPlacentario { get; set; }
        public SiNoEnum? DPPNI { get; set; }
    }

    public class HemorragiaTercerTrimestreInfoDto
    {
        public SiNoEnum? HemorragiaPresente { get; set; }
        public SiNoEnum? RoturaUterina { get; set; }
        public SiNoEnum? HemorragiaPostparto { get; set; }
        public SiNoEnum? AtoniaUterina { get; set; }
        public SiNoEnum? Desgarros { get; set; }
        public SiNoEnum? Restos { get; set; }
        public SiNoEnum? DefectoCoagulacion { get; set; }
    }

    
    public class UterotonicosTtoInfoDto
    {
        public SiNoSdEnum? Aplicados { get; set; }
        public string Cuales { get; set; }
    }

    public class AccesosAdministracionInfoDto
    {
        public SiNoSdEnum? ViaVenosaCentral { get; set; }
        public AdministracionHemoderivadosInfoDto Hemoderivados { get; set; }
    }

    public class AdministracionHemoderivadosInfoDto
    {
        public SiNoSdEnum? Administrados { get; set; }
        public int NumeroVolumenes { get; set; }
    }

    public class ProcedimientosQuirurgicosInfoDto
    {
        public SiNoSdEnum? LaparotomiaExcluyeCesarea { get; set; }
        public IngresoUCIInfoDto IngresoUCIMenor7Dias { get; set; }
        public UsoATBInfoDto UsoATBIVComplicacionInfecciosa { get; set; }
    }

    public class IngresoUCIInfoDto
    {
        public SiNoSdEnum? Ingreso { get; set; }
        public int DiasEnUCI { get; set; }
    }

    public class UsoATBInfoDto
    {
        public SiNoSdEnum? Uso { get; set; }
        public string AntibioticosUtilizados { get; set; }
    }

    public class IntervencionesEspecificasInfoDto
    {
        public SiNoEnum? TrajeAntishockNoNeumatico { get; set; }
        public SiNoEnum? BalonesHidrostaticos { get; set; }
        public SiNoEnum? SuturasBLynchOSimilares { get; set; }
        public SiNoEnum? LigadurasHemostaticasArteriasUterinasHipogastricas { get; set; }
        public SiNoEnum? Embolizaciones { get; set; }
    }
}
