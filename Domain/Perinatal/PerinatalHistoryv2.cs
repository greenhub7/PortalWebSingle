using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    
    public enum YesNoNotRecorded
    {
        Yes = 1,
        No = 2,
        NotRecorded = 3
    }

    
    public enum DiabetesType
    {
        Type1 = 1,
        Type2 = 2,
        Gestational = 3
    }

    
    public enum BloodGroup
    {
        A = 1,
        B = 2,
        AB = 3,
        O = 4
    }

    
    public enum RhFactor
    {
        Positive = 1,
        Negative = 2
    }

    
    public enum LastPreviousBirthWeight
    {
        NotRecorded = 1,        
        Normal = 2,             
        LessThan2500g = 3,      
        GreaterOrEqual4000g = 4 
    }

    
    public enum VaccineApplicationTime
    {
        No = 1,                     
        PrePregnancy = 2,           
        DuringPregnancy = 3,        
        PostpartumOrAbortion = 4    
    }
    public class PerinatalHistoryRecord
    {
        [Key]
        public int Id { get; set; }

        
        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Domain.Patient Patient { get; set; }
        
        public string PrenatalControlPlace { get; set; }
        public string BirthPlace { get; set; }

        
        public DateTime CreatedDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public string CreatedByUserId { get; set; }
        public string LastModifiedByUserId { get; set; }

        
        public MedicalBackground MedicalBackground { get; set; }
        public ObstetricBackground ObstetricBackground { get; set; }

        
        public CurrentPregnancy CurrentPregnancy { get; set; }

        
        public List<PrenatalConsultation> PrenatalConsultations { get; set; }

        
        public List<LaborEntry> LaborEntries { get; set; }

        
        public BirthInformation BirthInformation { get; set; }

        
        public NewbornInformation NewbornInformation { get; set; }

        
        public PostpartumInformation PostpartumInformation { get; set; }

        
        public MorbidityInformation MorbidityInformation { get; set; }

        
        public NearMissVariables NearMissVariables { get; set; }

        
        public PuerperiumInformation PuerperiumInformation { get; set; }

        
        public ContraceptionInformation ContraceptionInformation { get; set; }

        
        public MaternalDischargeInformation MaternalDischargeInformation { get; set; }
    }

    public class MedicalBackground
    {
        [Key]
        public int Id { get; set; }

        
        public YesNoNotRecorded? FamilyTuberculosis { get; set; }
        public YesNoNotRecorded? FamilyDiabetes { get; set; }
        public DiabetesType? FamilyDiabetesType { get; set; } 
        public YesNoNotRecorded? FamilyHypertension { get; set; }
        public YesNoNotRecorded? FamilyPreeclampsia { get; set; }
        public YesNoNotRecorded? FamilyEclampsia { get; set; }
        public YesNoNotRecorded? FamilyOtherSeriousMedicalCondition { get; set; }
        public string FamilyOtherConditionDetails { get; set; }

        
        public YesNoNotRecorded? PersonalTuberculosis { get; set; }
        public YesNoNotRecorded? PersonalDiabetes { get; set; }
        public DiabetesType? PersonalDiabetesType { get; set; } 
        public YesNoNotRecorded? PersonalHypertension { get; set; }
        public YesNoNotRecorded? PersonalPreeclampsia { get; set; }
        public YesNoNotRecorded? PersonalEclampsia { get; set; }
        public YesNoNotRecorded? PersonalSurgery { get; set; } 
        public YesNoNotRecorded? PersonalInfertility { get; set; }
        public YesNoNotRecorded? PersonalHeartDisease { get; set; } 
        public YesNoNotRecorded? PersonalNephropathy { get; set; }
        public YesNoNotRecorded? PersonalViolence { get; set; }
        public YesNoNotRecorded? PersonalHIVPositive { get; set; }
        public YesNoNotRecorded? PersonalOtherSeriousMedicalCondition { get; set; }
        public string PersonalOtherConditionDetails { get; set; }

        
        public bool? CurrentSmoker { get; set; }
        public bool? PassiveSmoker { get; set; }
        public bool? DrugUse { get; set; }
        public bool? AlcoholUse { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class ObstetricBackground
    {
        [Key]
        public int Id { get; set; }

        public int? PreviousPregnancies { get; set; }
        public int? Abortions { get; set; }
        public string EctopicPregnancy { get; set; } 
        public int? Births { get; set; } 
        public int? VaginalDeliveries { get; set; }
        public int? Cesareans { get; set; }
        public int? LivingBorn { get; set; }
        public int? DeadBorn { get; set; }
        public int? DiedFirstWeek { get; set; }
        public int? DiedAfterFirstWeek { get; set; }
        public int? Living { get; set; } 
        public bool? ThreeConsecutiveSpontaneousAbortions { get; set; } 
        public YesNoNotRecorded? LowBirthWeight { get; set; } 
        public YesNoNotRecorded? HighBirthWeight { get; set; } 
        public LastPreviousBirthWeight? LastPreviousBirthWeightType { get; set; } 
        public bool? TwinsHistory { get; set; } 
        public DateTime? LastPregnancyEndDate { get; set; }
        public bool? LastPregnancyLessThanOneYear { get; set; } 
        public bool? PregnancyPlanned { get; set; } 
        public string ContraceptiveMethodFailure { get; set; } 

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class CurrentPregnancy
    {
        [Key]
        public int Id { get; set; }

        public DateTime? LastMenstrualPeriod { get; set; }
        public DateTime? EstimatedDueDate { get; set; }
        [Precision(10, 2)] public decimal? PreviousWeight { get; set; }
        [Precision(10, 2)] public decimal? Height { get; set; }
        public YesNoNotRecorded? ReliableGestationalAge { get; set; } 
        public string GestationalAgeReliabilityMethod { get; set; } 

        
        public YesNoNotRecorded? ReliableByFUM { get; set; }
        public YesNoNotRecorded? ReliableByEchoLessThan20Weeks { get; set; }

        public YesNoNotRecorded? NormalDentalExamination { get; set; }
        public YesNoNotRecorded? NormalBreastExamination { get; set; }
        public YesNoNotRecorded? OlderThan35 { get; set; }
        public YesNoNotRecorded? YoungerThan15 { get; set; }

        
        public YesNoNotRecorded? SmokingFirstTrimester { get; set; }
        public YesNoNotRecorded? SmokingSecondTrimester { get; set; }
        public YesNoNotRecorded? SmokingThirdTrimester { get; set; }
        public YesNoNotRecorded? PassiveSmokingFirstTrimester { get; set; }
        public YesNoNotRecorded? PassiveSmokingSecondTrimester { get; set; }
        public YesNoNotRecorded? PassiveSmokingThirdTrimester { get; set; }
        public YesNoNotRecorded? DrugUseFirstTrimester { get; set; }
        public YesNoNotRecorded? DrugUseSecondTrimester { get; set; }
        public YesNoNotRecorded? DrugUseThirdTrimester { get; set; }
        public YesNoNotRecorded? AlcoholUseFirstTrimester { get; set; }
        public YesNoNotRecorded? AlcoholUseSecondTrimester { get; set; }
        public YesNoNotRecorded? AlcoholUseThirdTrimester { get; set; }
        public YesNoNotRecorded? ViolenceFirstTrimester { get; set; }
        public YesNoNotRecorded? ViolenceSecondTrimester { get; set; }
        public YesNoNotRecorded? ViolenceThirdTrimester { get; set; }

        
        public YesNoNotRecorded? VaccineTetanusDiphtheria { get; set; } 
        public YesNoNotRecorded? VaccineInfluenza { get; set; } 
        public YesNoNotRecorded? VaccineRubella { get; set; } 
        public YesNoNotRecorded? VaccineHepatitisB { get; set; } 

        
        
        public VaccineApplicationTime? VaccineTetanusDiphtheriaTime { get; set; }
        public DateTime? VaccineTetanusDiphtheriaDate { get; set; }
        public int? VaccineTetanusDiphtheriaGestationalWeeks { get; set; }
        public int? VaccineTetanusDiphtheriaTotalDoses { get; set; }

        
        public VaccineApplicationTime? VaccineTdapTime { get; set; }
        public DateTime? VaccineTdapDate { get; set; }
        public int? VaccineTdapGestationalWeeks { get; set; }
        public int? VaccineTdapTotalDoses { get; set; }

        
        public VaccineApplicationTime? VaccineInfluenzaTime { get; set; }
        public DateTime? VaccineInfluenzaDate { get; set; }
        public int? VaccineInfluenzaGestationalWeeks { get; set; }
        public int? VaccineInfluenzaTotalDoses { get; set; }

        
        public VaccineApplicationTime? VaccineRubellaTime { get; set; }
        public DateTime? VaccineRubellaDate { get; set; }
        public int? VaccineRubellaGestationalWeeks { get; set; }
        public int? VaccineRubellaTotalDoses { get; set; }

        
        public VaccineApplicationTime? VaccineHepatitisBTime { get; set; }
        public DateTime? VaccineHepatitisBDate { get; set; }
        public int? VaccineHepatitisBGestationalWeeks { get; set; }
        public int? VaccineHepatitisBTotalDoses { get; set; }

        
        public VaccineApplicationTime? VaccineHepatitisATime { get; set; }
        public DateTime? VaccineHepatitisADate { get; set; }
        public int? VaccineHepatitisAGestationalWeeks { get; set; }
        public int? VaccineHepatitisATotalDoses { get; set; }

        
        public YesNoNotRecorded? HepatitisBScreening { get; set; }

        
        public BloodGroup? BloodGroupType { get; set; }
        public RhFactor? RhFactorType { get; set; }
        public YesNoNotRecorded? RhSensitization { get; set; } 
        public YesNoNotRecorded? AntiDImmunoglobulinLessThan20Weeks { get; set; } 
        public YesNoNotRecorded? AntiDImmunoglobulinGreaterOrEqual20Weeks { get; set; } 
        public YesNoNotRecorded? AntiDImmunoglobulin { get; set; } 

        
        public YesNoNotRecorded? CervixPapExam { get; set; } 
        public YesNoNotRecorded? CervixColposcopy { get; set; } 
        public YesNoNotRecorded? CervixVisualInspection { get; set; } 

        
        public string MalariaTestResult { get; set; } 
        public string ChagasTestResult { get; set; } 
        public string BacteriuriaTestResultLessThan20Weeks { get; set; } 
        public string BacteriuriaTestResultGreaterOrEqual20Weeks { get; set; } 

        
        public string ToxoplasmosisIgGLessThan20Weeks { get; set; } 
        public string ToxoplasmosisIgGGreaterOrEqual20Weeks { get; set; } 
        public string ToxoplasmosisIgMLessThan20Weeks { get; set; } 
        public string ToxoplasmosisIgMGreaterOrEqual20Weeks { get; set; } 

        
        [Precision(10, 2)]
        public decimal? GlucoseLessThan20Weeks { get; set; }
        [Precision(10, 2)]
        public decimal? GlucoseGreaterOrEqual30Weeks { get; set; }

        
        [Precision(10, 2)]
        public decimal? HemoglobinLessThan20Weeks { get; set; }
        public bool? AnemiaLessThan20Weeks { get; set; } 
        [Precision(10, 2)]
        public decimal? HemoglobinGreaterOrEqual20Weeks { get; set; }
        public bool? AnemiaGreaterOrEqual20Weeks { get; set; } 
        public bool? IronFolateSupplementsIndicated { get; set; }
        
        public bool? IronSupplements { get; set; } 
        public bool? FolateSupplementsLessThan20Weeks { get; set; } 
        
        public bool? IronSupplementsGreaterOrEqual20Weeks { get; set; } 
        public bool? FolateSupplements { get; set; } 

        
        public string StreptococcusBTest3537Weeks { get; set; } 

        
        public bool? BirthPreparation { get; set; }
        public bool? BreastfeedingCounseling { get; set; }

        
        public YesNoNotRecorded? HIVTestRequestedLessThan20Weeks { get; set; }
        public YesNoNotRecorded? HIVTestResultLessThan20Weeks { get; set; } 
        public YesNoNotRecorded? HIVARTLessThan20Weeks { get; set; } 

        public YesNoNotRecorded? HIVTestRequestedGreaterOrEqual20Weeks { get; set; }
        public YesNoNotRecorded? HIVTestResultGreaterOrEqual20Weeks { get; set; } 
        public YesNoNotRecorded? HIVARTGreaterOrEqual20Weeks { get; set; } 

        
        public bool? SyphilisTestLessThan20Weeks { get; set; } 
        public string SyphilisTestTypeLessThan20Weeks { get; set; } 
        public bool? SyphilisTestGreaterOrEqual20Weeks { get; set; } 
        public string SyphilisTestTypeGreaterOrEqual20Weeks { get; set; } 

        
        
        public int? SyphilisNonTreponemalResultLessThan20Weeks { get; set; }
        
        public int? SyphilisTreponemalResultLessThan20Weeks { get; set; }
        
        public int? SyphilisTreatmentOptionLessThan20Weeks { get; set; }
        public int? SyphilisTreatmentWeeksLessThan20Weeks { get; set; }
        
        public int? SyphilisPartnerTreatmentLessThan20Weeks { get; set; }

        
        
        public int? SyphilisNonTreponemalResultGreaterOrEqual20Weeks { get; set; }
        
        public int? SyphilisTreponemalResultGreaterOrEqual20Weeks { get; set; }
        
        public int? SyphilisTreatmentOptionGreaterOrEqual20Weeks { get; set; }
        public int? SyphilisTreatmentWeeksGreaterOrEqual20Weeks { get; set; }
        
        public int? SyphilisPartnerTreatmentGreaterOrEqual20Weeks { get; set; }

        
        public bool? SyphilisTreatmentLessThan20Weeks { get; set; } 
        public bool? PartnerTreatmentLessThan20Weeks { get; set; } 
        public bool? SyphilisTreatmentGreaterOrEqual20Weeks { get; set; } 
        public bool? PartnerTreatmentGreaterOrEqual20Weeks { get; set; } 

        
        public bool? HepatitisB { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class PrenatalConsultation
    {
        [Key]
        public int Id { get; set; }

        public DateTime? ConsultationDate { get; set; }
        public int? GestationalAgeWeeks { get; set; }
        [Precision(10, 2)] public decimal? Weight { get; set; }
        public string BloodPressure { get; set; }
        [Precision(10, 2)] public decimal? UterineHeight { get; set; }
        public string Presentation { get; set; }
        public int? FetalHeartRate { get; set; }
        public bool? FetalMovements { get; set; }
        public string ControlLocation { get; set; }
        public bool? Proteinuria { get; set; }
        public string WarningSignsExamsAndTreatments { get; set; }
        public string TechnicianInitials { get; set; }
        public DateTime? NextAppointment { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    
    
    
    
    public class LaborEntry
    {
        [Key]
        public int Id { get; set; }

        public int? LaborHour { get; set; } 
        public int? LaborMinute { get; set; } 
        public string MaternalPosition { get; set; } 
        public string BloodPressure { get; set; } 
        public int? Pulse { get; set; }
        public int? ContractionsPerTenMinutes { get; set; }
        [Precision(10, 2)] public decimal? Dilation { get; set; }
        public string HeightPresentation { get; set; }
        public string PositionVariety { get; set; }
        public bool? MeconiumPresent { get; set; }
        public string FetalHeartRateDips { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class BirthInformation
    {
        [Key]
        public int Id { get; set; }

        
        public int? BirthType { get; set; }

        public DateTime? AdmissionDate { get; set; }
        public int? PrenatalConsultationsTotal { get; set; }
        public bool? HasPrenatalCard { get; set; }
        public int? FirstConsultationGestationalAgeWeeks { get; set; }
        public int? FirstConsultationGestationalAgeDays { get; set; }
        public bool? HospitalizedDuringPregnancy { get; set; }
        public int? HospitalizationDays { get; set; } 
        public string Companion { get; set; } 
        public string CompanionP { get; set; } 

        
        public bool? CorticosteroidsComplete { get; set; }
        public bool? CorticosteroidsIncomplete { get; set; }
        public bool? CorticosteroidsNone { get; set; } 
        public bool? CorticosteroidsNA { get; set; } 
        public int? CorticosteroidsStartWeek { get; set; } 

        
        public int? GestationalAgeAtBirthWeeks { get; set; }
        public int? GestationalAgeAtBirthDays { get; set; }
        public bool? GestationalAgeByLMP { get; set; }
        public bool? GestationalAgeByUltrasound { get; set; }

        
        public bool? CephalicPresentation { get; set; }
        public bool? PelvicPresentation { get; set; }
        public bool? TransverseSituation { get; set; }

        
        public bool? FetalSizeAppropriate { get; set; }

        
        public bool? SpontaneousOnset { get; set; }
        public bool? InducedOnset { get; set; }
        public bool? ElectiveCesareanOnset { get; set; }

        
        public bool? MembraneRupture { get; set; } 
        public DateTime? MembraneRuptureDate { get; set; }
        public string MembraneRuptureTime { get; set; }
        public bool? MembraneRuptureBefore37Weeks { get; set; } 
        public bool? MembraneRuptureMoreThan18Hours { get; set; } 
        
        public bool? FeverDuringLabor { get; set; } 
        [Precision(4, 1)] public decimal? FeverTemperature { get; set; } 
        public YesNoNotRecorded? Chorioamnionitis { get; set; } 
        public YesNoNotRecorded? MeconiumStainedLiquor { get; set; } 

        
        
        public int? LaborHour { get; set; } 
        public int? LaborMinute { get; set; } 
        public string MaternalPosition { get; set; }
        public string BloodPressure { get; set; }
        public int? Pulse { get; set; }
        public int? ContractionsPerTenMinutes { get; set; }
        [Precision(10, 2)] public decimal? Dilation { get; set; }
        public string HeightPresentation { get; set; }
        public string PositionVariety { get; set; }
        public bool? MeconiumPresent { get; set; }
        public string FetalHeartRateDips { get; set; }

        
        public bool? SpontaneousBirth { get; set; }
        public bool? ForcepsBirth { get; set; }
        public bool? VacuumBirth { get; set; }
        public bool? CesareanBirth { get; set; }

        
        public string BirthTime { get; set; }
        public DateTime? BirthDate { get; set; } 
        public bool? MultipleBirth { get; set; } 
        public string BirthOrder { get; set; } 

        
        public bool? IsLiveBirth { get; set; }

        public bool? DeadBirthDuringLaborUnknown { get; set; }
        public bool? DeadBirthBeforeLabor { get; set; }
        public bool? DeadBirthDuringLabor { get; set; }

        
        public bool? Episiotomy { get; set; } 
        public bool? Tear { get; set; } 
        public int? TearGrade { get; set; } 

        
        public bool? ManualRemovalOfPlacenta { get; set; } 
        public bool? RetainedPlacenta { get; set; } 
        public bool? CompletePlacenta { get; set; } 

        
        public bool? PreDeliveryCordClamping { get; set; }
        public bool? PostDeliveryCordClamping { get; set; }

        
        public bool? LocalAnesthesia { get; set; }
        public bool? RegionalAnesthesia { get; set; }
        public bool? GeneralAnesthesia { get; set; }

        
        public bool? OxytocicsInLabor { get; set; }
        public bool? AntibioticsTreatment { get; set; }
        public bool? AnalgesiaTreatment { get; set; }
        public bool? OtherMedicationOne { get; set; } 
        public string OtherMedicationOneDetail { get; set; }
        public bool? OtherMedicationTwo { get; set; } 
        public string OtherMedicationTwoDetail { get; set; }

        
        public string MainIndicationForInductionOrOperativeDelivery { get; set; }

        
        public bool? AttendedByDoctor { get; set; }
        public bool? AttendedByNurse { get; set; }
        public bool? AttendedByStudent { get; set; }
        public bool? AttendedByMidwife { get; set; }
        public bool? AttendedByOther { get; set; }
        public string AttendantName { get; set; }

        
        public bool? PartogramDetails { get; set; } 

        
        
        public int? BirthSyphilisTest { get; set; } 
        public int? BirthHIVTest { get; set; } 
        public int? BirthTARV { get; set; } 

        
        
        public string InductionCode { get; set; } 
        public string OperativeCode { get; set; } 

        
        public string BirthPosition { get; set; } 

        
        public bool? OxytocicsPreDelivery { get; set; } 
        public bool? OxytocicsPostDelivery { get; set; } 

        
        public int? CordClampingTime { get; set; }

        
        public bool? Transfusion { get; set; } 
        public bool? MagnesiumSulfatePreeclampsia { get; set; } 
        public bool? MagnesiumSulfateEclampsia { get; set; } 

        
        public bool? OtherTermination { get; set; } 

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class NewbornInformation
    {
        [Key]
        public int Id { get; set; }

        

        
        public string Sex { get; set; } 

        
        [Precision(10, 2)] public decimal? BirthWeight { get; set; }
        

        
        [Precision(10, 2)] public decimal? HeadCircumference { get; set; }
        [Precision(10, 2)] public decimal? Length { get; set; }

        
        public int? GestationalAgeWeeks { get; set; }
        public int? GestationalAgeDays { get; set; }
        public string GestationalAgeMethod { get; set; } 

        
        public string WeightForGestationalAge { get; set; } 

        
        public int? ApgarFirstMinute { get; set; }
        public int? ApgarFifthMinute { get; set; }

        
        public bool? EarlyBreastfeedingInitiation { get; set; }

        
        public bool? ResuscitationStimulation { get; set; }
        public bool? ResuscitationAspiration { get; set; }
        public bool? ResuscitationMask { get; set; }
        public bool? ResuscitationOxygen { get; set; }
        public bool? ResuscitationMassage { get; set; } 
        public bool? ResuscitationIntubation { get; set; }
        public bool? ResuscitationMedication { get; set; }

        
        public string DeliveryAttendantType { get; set; } 
        public string DeliveryAttendantName { get; set; }

        
        public string NeonatalAttendantType { get; set; } 
        public string NeonatalAttendantName { get; set; }

        
        
        public string BirthDefectsType { get; set; } 
        public string BirthDefectsCode { get; set; }

        
        [Obsolete("Use BirthDefectsType instead")]
        public bool? BirthDefectsNone { get; set; }
        [Obsolete("Use BirthDefectsType instead")]
        public bool? BirthDefectsMajor { get; set; }
        [Obsolete("Use BirthDefectsType instead")]
        public bool? BirthDefectsMinor { get; set; }
        [Obsolete("Use BirthDefectsCode instead")]
        public string BirthDefectsDescription { get; set; }

        
        
        public string DiseasesOption { get; set; } 
        [StringLength(50)] public string DiseaseCode1 { get; set; }
        [StringLength(50)] public string DiseaseCode2 { get; set; }
        [StringLength(50)] public string DiseaseCode3 { get; set; }
        [StringLength(50)] public string DiseaseCode4 { get; set; }
        [StringLength(50)] public string DiseaseCode5 { get; set; }
        [StringLength(50)] public string DiseaseCode6 { get; set; }

        
        [Obsolete("Use DiseasesOption instead")]
        public bool? DiseasesNone { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public bool? DiseasesRDS { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public bool? DiseasesCongenitalInfection { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public bool? DiseasesSyphilis { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public bool? DiseasesVIH { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public bool? DiseasesOther { get; set; }
        [Obsolete("Use DiseaseCode1-6 instead")]
        public string DiseasesOtherDescription { get; set; }

        
        
        public string HIVExposedStatus { get; set; } 
        
        public string HIVTreatmentStatus { get; set; } 

        
        public string VDRLResult { get; set; } 
        
        public string VDRLTreatment { get; set; } 

        
        public string ScreeningAudic { get; set; } 
        public string ScreeningChagas { get; set; } 
        public string ScreeningBilirrub { get; set; } 
        public string ScreeningToxoIgM { get; set; } 
        public string ScreeningHbPatia { get; set; } 
        public string ScreeningCardiov { get; set; } 

        
        public string ScreeningMetabolicStatus { get; set; } 

        
        [Obsolete("Use HIVExposedStatus instead")]
        public bool? HIVExposed { get; set; }
        [Obsolete("Use HIVTreatmentStatus instead")]
        public bool? HIVTreatment { get; set; }
        [Obsolete("Use VDRLResult instead")]
        public bool? ScreeningVDRL { get; set; }
        [Obsolete("Use ScreeningAudic instead")]
        public bool? ScreeningHearingTest { get; set; }
        [Obsolete("Use ScreeningCardiov instead")]
        public bool? ScreeningCardiovascular { get; set; }
        [Obsolete("Use ScreeningMetabolicStatus instead")]
        public bool? ScreeningMetabolic { get; set; }
        [Obsolete("Use MeconiumFirstDay instead")]
        public bool? ScreeningMeconiumFirstDay { get; set; }
        [Obsolete("Use ScreeningBilirrub instead")]
        public bool? ScreeningBilirubin { get; set; }
        [Obsolete("Use ScreeningToxoIgM instead")]
        public bool? ScreeningToxoplasmosisIgM { get; set; }
        [Obsolete("Use ScreeningChagas instead")]
        public bool? ScreeningChagasDisease { get; set; }
        [Obsolete("Use ScreeningHbPatia instead")]
        public bool? ScreeningHemopathies { get; set; }

        
        public bool? MotherDiedInDeliveryRoom { get; set; } 
        public bool? NewbornDiedInDeliveryRoom { get; set; } 

        
        
        public string ReferredTo { get; set; } 

        
        
        public string DischargeStatus { get; set; } 
        public string DischargeTime { get; set; } 

        
        public string TransferLocation { get; set; }

        
        public string DiedDuringTransferStatus { get; set; } 

        
        
        public bool? FaceUp { get; set; }
        
        public bool? BCGVaccine { get; set; }
        
        public bool? HepatitisB { get; set; }
        
        public bool? MeconiumFirstDay { get; set; }

        
        [Obsolete("Use DeliveryAttendantType instead")]
        public bool? AttendedByDoctor { get; set; }
        [Obsolete("Use DeliveryAttendantType instead")]
        public bool? AttendedByNurse { get; set; }
        [Obsolete("Use DeliveryAttendantType instead")]
        public bool? AttendedByStudent { get; set; }
        [Obsolete("Use DeliveryAttendantType instead")]
        public bool? AttendedByMidwife { get; set; }
        [Obsolete("Use DeliveryAttendantType instead")]
        public bool? AttendedByOther { get; set; }
        [Obsolete("Use DeliveryAttendantName/NeonatalAttendantName instead")]
        public string AttendantName { get; set; }

        
        [Obsolete("Use GestationalAgeWeeks instead")]
        public int? GestationalAge { get; set; }

        
        [Obsolete("Use ResuscitationMassage instead")]
        public bool? ResuscitationCardiacMassage { get; set; }

        
        [Obsolete("Calculated automatically from BirthWeight")]
        public bool? LowBirthWeight { get; set; }
        [Obsolete("Calculated automatically from BirthWeight")]
        public bool? HighBirthWeight { get; set; }

        
        public string DischargeLocation { get; set; } 
        public bool? IsAlive { get; set; }
        public bool? Deceased { get; set; }
        public bool? Transferred { get; set; }
        public int? DischargeAge { get; set; } 
        public bool? DischargeAgeLessThanOneDay { get; set; } 
        public DateTime? DischargeDate { get; set; }
        [Precision(10, 2)]
        public decimal? DischargeWeight { get; set; }
        public string FeedingAtDischarge { get; set; } 
        public bool? DiedDuringOrInTransferLocation { get; set; }
        public string NewbornName { get; set; }
        public string ResponsiblePersonForDischarge { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class PostpartumInformation
    {
        [Key]
        public int Id { get; set; }

        public List<PostpartumVisit> PostpartumVisits { get; set; }

        
        [StringLength(10)]
        public string AntiDGlobulin { get; set; }

        
        [StringLength(50)]
        public string NewbornId { get; set; }

        [StringLength(200)]
        public string NewbornName { get; set; }

        [StringLength(200)]
        public string DischargeResponsible { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class PostpartumVisit
    {
        [Key]
        public int Id { get; set; }

        public int? Day { get; set; } 

        
        [StringLength(50)]
        public string Time { get; set; }

        [Precision(10, 2)] public decimal? Temperature { get; set; }
        public int? Pulse { get; set; }
        public string BloodPressure { get; set; }
        public string UterineInvolution { get; set; }

        
        public string Lochia { get; set; }
        public string Perineum { get; set; }
        public string Breastfeeding { get; set; }
        public string Observations { get; set; }

        
        [StringLength(200)]
        public string Bleeding { get; set; }

        public string Responsible { get; set; }

        public int PostpartumInformationId { get; set; }
        [ForeignKey("PostpartumInformationId")]
        public PostpartumInformation PostpartumInformation { get; set; }
    }

    
    
    
    
    public class PuerperiumInformation
    {
        [Key]
        public int Id { get; set; }

        public List<PuerperiumDay> Days { get; set; } = new List<PuerperiumDay>();

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    
    
    
    public class PuerperiumDay
    {
        [Key]
        public int Id { get; set; }

        
        
        
        public int? DayNumber { get; set; }

        
        
        
        [StringLength(20)]
        public string DayLabel { get; set; }

        
        
        
        [Precision(4, 1)]
        public decimal? Temperature { get; set; }

        
        
        
        [StringLength(20)]
        public string BloodPressure { get; set; }

        
        
        
        public int? Pulse { get; set; }

        
        
        
        [StringLength(100)]
        public string UterineInvolution { get; set; }

        
        
        
        [StringLength(100)]
        public string Lochia { get; set; }

        
        
        
        [StringLength(100)]
        public string Perineum { get; set; }

        
        
        
        [StringLength(100)]
        public string Breastfeeding { get; set; }

        
        
        
        [StringLength(500)]
        public string Observations { get; set; }

        
        
        
        [StringLength(100)]
        public string Responsible { get; set; }

        public int PuerperiumInformationId { get; set; }
        [ForeignKey("PuerperiumInformationId")]
        public PuerperiumInformation PuerperiumInformation { get; set; }
    }

    public class MorbidityInformation
    {
        [Key]
        public int Id { get; set; }

        
        public bool? HasHypertensiveDisorders { get; set; }
        public bool? HasInfections { get; set; }
        public bool? HasFirstTrimesterHemorrhage { get; set; }
        public bool? HasSecondTrimesterHemorrhage { get; set; }
        public bool? HasThirdTrimesterHemorrhage { get; set; }
        public bool? HasMetabolicDisorders { get; set; }
        public bool? HasDiabetesMellitus { get; set; }
        public bool? HasThyroidDisorders { get; set; }
        public bool? HasOtherDisorders { get; set; }
        public bool? HasObstetricComplications { get; set; }

        
        public bool? ChronicHypertension { get; set; }
        public bool? MildPreeclampsia { get; set; }
        public bool? SeverePreeclampsia { get; set; }
        public bool? Eclampsia { get; set; }
        public bool? HELLP { get; set; }
        public bool? GestationalHypertension { get; set; }
        public bool? ChronicHypertensionWithSuperimposedPreeclampsia { get; set; }

        
        public bool? Sepsis { get; set; }
        public bool? Endometritis { get; set; }
        public bool? Chorioamnionitis { get; set; }
        public bool? AsymptomaticBacteriuria { get; set; }
        public bool? Pyelonephritis { get; set; }
        public bool? Pneumonia { get; set; }
        public bool? CesareanWoundInfection { get; set; }
        public bool? EpisiotomyInfection { get; set; }
        public bool? OtherInfection { get; set; }
        [StringLength(200)]
        public string OtherInfectionDetail { get; set; }

        
        
        public bool? PostAbortionHemorrhage { get; set; }
        public bool? HydatidiformMole { get; set; }
        public bool? EctopicPregnancy { get; set; }
        public bool? PlacentaPrevia { get; set; }
        public bool? AccretaPlacentaPP { get; set; }
        public bool? AbruptioPlacentae { get; set; }

        
        public bool? SecondTrimesterHemorrhage { get; set; }

        
        public bool? UterineRupture { get; set; }
        public bool? PostpartumHemorrhage { get; set; }
        public bool? UterineAtony { get; set; }
        public bool? RetainedPlacenta { get; set; }
        public bool? PlacentalTears { get; set; }
        public bool? CoagulationDefect { get; set; }

        
        
        public bool? GlucoseToleranceTest { get; set; }
        public bool? AbnormalOralGlucoseTolerance { get; set; }
        public bool? PreexistingInsulinDependentDM { get; set; }
        public bool? PreexistingNonInsulinDependentDM { get; set; }
        public bool? GestationalDiabetes { get; set; }
        public bool? HyperosmolarState { get; set; }
        public bool? HyperglycemicState { get; set; }
        public bool? Ketoacidosis { get; set; }

        
        public bool? Hypothyroidism { get; set; }
        public bool? Hyperthyroidism { get; set; }
        public bool? ThyroidCrisis { get; set; }
        public bool? OtherMetabolicDisorder { get; set; }
        [StringLength(200)]
        public string OtherMetabolicDetail1 { get; set; }
        [StringLength(200)]
        public string OtherMetabolicDetail2 { get; set; }
        [StringLength(200)]
        public string OtherMetabolicDetail3 { get; set; }
        [StringLength(200)]
        public string OtherMetabolicDetail4 { get; set; }

        
        public bool? HyperemesisGravidarum { get; set; }
        public bool? DeepVeinThrombosis { get; set; }
        public bool? PulmonaryThromboembolism { get; set; }
        public bool? AmniocEmbolism { get; set; }
        public bool? Cardiopathy { get; set; }
        public bool? Valvulopathy { get; set; }
        public bool? Anemia { get; set; }
        public bool? SickleCellAnemia { get; set; }
        public bool? RenalDisease { get; set; }
        public bool? MalignantNeoplasia { get; set; }
        public bool? PsychiatricDisorder { get; set; }
        public bool? Cholestasis { get; set; }
        public bool? Convulsions { get; set; }
        public bool? ConsciousnessAlteration { get; set; }
        public bool? OtherDisorder { get; set; }
        [StringLength(200)]
        public string OtherDisorderDetail1 { get; set; }
        [StringLength(200)]
        public string OtherDisorderDetail2 { get; set; }
        [StringLength(200)]
        public string OtherDisorderDetail3 { get; set; }

        
        public bool? Oliguria { get; set; }
        public bool? ObstructedLabor { get; set; }
        public bool? ProlongedRuptureOfMembranes { get; set; }
        public bool? Polyhydramnios { get; set; }
        public bool? Oligohydramnios { get; set; }
        public bool? IntrauterineGrowthRestriction { get; set; }
        public bool? AcuteFetalDistress { get; set; }
        public bool? OtherObstetricComplication { get; set; }
        [StringLength(200)]
        public string OtherObstetricComplicationDetail { get; set; }

        
        public bool? ManualRemovalOfPlacenta { get; set; }
        public bool? UterotronicsForHemorrhage { get; set; }
        public string OtherUterotronicsDetail { get; set; }
        public bool? CentralVenousAccess { get; set; }
        public bool? BloodProductsTransfusion { get; set; }
        public string BloodProductsDetail { get; set; }
        [Obsolete("Use Laparotomy string field instead")]
        public int? LaparotomyCount { get; set; } 
        [StringLength(10)]
        public string Laparotomy { get; set; } 
        public bool? ICUAdmissionDaysGreaterOrEqualSeven { get; set; }
        public int? ICUAdmissionDays { get; set; }
        public bool? IntravenousAntibioticsForInfection { get; set; }
        public string AntibioticsDetail { get; set; }
        public bool? NonPneumaticAntiShockGarment { get; set; }
        public bool? HydrostaticBalloons { get; set; }
        public bool? BLynchSutures { get; set; }
        public bool? UterineOrHypogastricArteryLigature { get; set; }
        public bool? Embolization { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class NearMissVariables
    {
        [Key]
        public int Id { get; set; }

        
        
        public bool? Shock { get; set; }
        public bool? CardiacArrest { get; set; }

        
        public bool? JaundiceInPreeclampsia { get; set; }

        
        public bool? AcuteCyanosis { get; set; }
        public bool? Gasping { get; set; }
        public bool? SevereTachypnea { get; set; } 
        public bool? SevereBradypnea { get; set; } 

        
        public bool? OliguriaUnresponsiveToFluidsOrDiuretics { get; set; }

        
        public bool? CoagulationDisorders { get; set; }

        
        public bool? Coma { get; set; }
        public bool? ProlongedUnconsciousness { get; set; } 
        public bool? StrokeOrCVA { get; set; }
        public bool? UncontrollableSeizuresOrStatusEpilepticus { get; set; }
        public bool? GeneralizedParalysis { get; set; }

        
        public bool? PlateletsLessThan50000 { get; set; }
        public bool? CreatinineGreaterOrEqual300 { get; set; } 
        public bool? BilirubinGreaterThan100 { get; set; } 
        public bool? PHLessThan7_1 { get; set; } 
        public bool? HemoglobinSaturationLessThan90PercentForOverOneHour { get; set; }
        public bool? PaO2FiO2LessThan200 { get; set; } 
        public bool? LactateGreaterThan5 { get; set; } 

        
        public bool? ContinuousVasoactiveAgentsAdministration { get; set; }
        public string VasoactiveAgentsDetail { get; set; }
        public bool? IntubationAndVentilationNotRelatedToAnesthesia { get; set; }
        public int? IntubationDays { get; set; }
        public bool? BloodProductsAdministrationGreaterOrEqualThreeUnits { get; set; }
        public int? BloodUnits { get; set; }
        public bool? ICUAdmissionLessThanSevenDays { get; set; }
        public int? ICUDaysLessThanSeven { get; set; }
        public bool? Hysterectomy { get; set; }
        public bool? DialysisForAcuteRenalFailure { get; set; }
        public bool? CardiopulmonaryResuscitation { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class ContraceptionInformation
    {
        [Key]
        public int Id { get; set; }

        public bool? OralCounseling { get; set; }
        public bool? WrittenCounseling { get; set; }
        public bool? NoCounseling { get; set; }

        public bool? ContraceptionMethodInitiated { get; set; }

        
        public bool? OralContraceptives { get; set; }
        public bool? OralContraceptivesPreferred { get; set; }
        public bool? OralContraceptivesAccepted { get; set; }

        public bool? OtherHormonalMethods { get; set; } 
        public bool? OtherHormonalMethodsPreferred { get; set; }
        public bool? OtherHormonalMethodsAccepted { get; set; }

        public bool? IUD { get; set; }
        public bool? IUDPreferred { get; set; }
        public bool? IUDAccepted { get; set; }

        public bool? Injectable { get; set; }
        public bool? InjectablePreferred { get; set; }
        public bool? InjectableAccepted { get; set; }

        public bool? Implant { get; set; }
        public bool? ImplantPreferred { get; set; }
        public bool? ImplantAccepted { get; set; }

        public bool? Barrier { get; set; }
        public bool? BarrierPreferred { get; set; }
        public bool? BarrierAccepted { get; set; }

        public bool? Condom { get; set; }
        public bool? CondomPreferred { get; set; }
        public bool? CondomAccepted { get; set; }

        public bool? FemaleSterilization { get; set; }
        public bool? FemaleSterilizationPreferred { get; set; }
        public bool? FemaleSterilizationAccepted { get; set; }

        public bool? MaleSterilization { get; set; }
        public bool? MaleSterilizationPreferred { get; set; }
        public bool? MaleSterilizationAccepted { get; set; }

        public bool? NaturalMethod { get; set; } 
        public bool? NaturalMethodPreferred { get; set; }
        public bool? NaturalMethodAccepted { get; set; }

        [StringLength(100)]
        public string ResponsiblePerson { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }

    public class MaternalDischargeInformation
    {
        [Key]
        public int Id { get; set; }

        public DateTime? DischargeDate { get; set; }
        public string DischargeTime { get; set; }
        public string DischargeCondition { get; set; } 
        public string DischargeLocation { get; set; }
        public bool? Transferred { get; set; }
        public bool? DiedDuringOrInTransferLocation { get; set; }
        public bool? Autopsy { get; set; }

        public string DischargeType { get; set; } 
        public string ResponsiblePerson { get; set; }

        public bool? AntiDImmunoglobulin { get; set; }

        public int PerinatalHistoryRecordId { get; set; }
        [ForeignKey("PerinatalHistoryRecordId")]
        public PerinatalHistoryRecord PerinatalHistoryRecord { get; set; }
    }
}