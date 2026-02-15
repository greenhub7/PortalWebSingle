-- Update test data for Form 2 (PerinatalHistoryRecord #10, Patient 15570)
-- This adds data for prenatal consultations, birth, newborn, and postpartum information

USE [solmeddboblyperinatal]
GO

-- Add some prenatal consultation records
-- First, delete any existing consultations for record 10
DELETE FROM [dbo].[PrenatalConsultations] WHERE [PerinatalHistoryRecordId] = 10;

-- Insert 3 prenatal consultations
SET IDENTITY_INSERT [dbo].[PrenatalConsultations] ON;

INSERT INTO [dbo].[PrenatalConsultations] 
([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], 
[Presentation], [FetalHeartRate], [FetalMovements], [Proteinuria], [ControlLocation], [WarningSignsExamsAndTreatments], 
[TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId])
VALUES 
(101, CAST(N'2025-11-15T00:00:00' AS DateTime2), 8, CAST(66.5 AS Decimal(18,2)), N'110/70', CAST(10.0 AS Decimal(10,2)), 
N'Cefálica', 140, 1, 0, N'Hospital Central', N'Ninguno. Tratamiento: Ácido fólico, hierro', N'ABC', 
CAST(N'2025-12-15T00:00:00' AS DateTime2), 10),

(102, CAST(N'2025-12-15T00:00:00' AS DateTime2), 12, CAST(68.0 AS Decimal(18,2)), N'115/75', CAST(14.0 AS Decimal(10,2)), 
N'Cefálica', 145, 1, 0, N'Hospital Central', N'Ninguno. Tratamiento: Vitaminas prenatales', N'ABC', 
CAST(N'2026-01-15T00:00:00' AS DateTime2), 10),

(103, CAST(N'2026-01-15T00:00:00' AS DateTime2), 16, CAST(70.5 AS Decimal(18,2)), N'120/80', CAST(18.0 AS Decimal(10,2)), 
N'Cefálica', 150, 1, 0, N'Hospital Central', N'Ninguno. Tratamiento: Continuar vitaminas', N'ABC', 
CAST(N'2026-02-15T00:00:00' AS DateTime2), 10);

SET IDENTITY_INSERT [dbo].[PrenatalConsultations] OFF;

-- Update BirthInformations for record 10
UPDATE [dbo].[BirthInformations]
SET 
    [AdmissionDate] = CAST(N'2026-07-18T08:30:00' AS DateTime2),
    [PrenatalConsultationsTotal] = 8,
    [HasPrenatalCard] = 1,
    [FirstConsultationGestationalAgeWeeks] = 8,
    [FirstConsultationGestationalAgeDays] = 0,
    [HospitalizedDuringPregnancy] = 0,
    [HospitalizationDays] = 0,
    [Companion] = N'Esposo',
    [CorticosteroidsComplete] = 0,
    [CorticosteroidsIncomplete] = 0,
    [CorticosteroidsNA] = 1,
    [CorticosteroidsNone] = 0,
    [GestationalAgeAtBirthWeeks] = 39,
    [GestationalAgeAtBirthDays] = 2,
    [GestationalAgeByLMP] = 1,
    [GestationalAgeByUltrasound] = 0,
    [CephalicPresentation] = 1,
    [PelvicPresentation] = 0,
    [TransverseSituation] = 0,
    [FetalSizeAppropriate] = 1,
    [SpontaneousOnset] = 1,
    [InducedOnset] = 0,
    [ElectiveCesareanOnset] = 0,
    [MembraneRupture] = 1,
    [MembraneRuptureDate] = CAST(N'2026-07-18T00:00:00' AS DateTime2),
    [MembraneRuptureTime] = N'06:30',
    [MembraneRuptureMoreThan18Hours] = 0,
    [MembraneRuptureBefore37Weeks] = 0,
    [FeverDuringLabor] = 0,
    [Chorioamnionitis] = 0,
    [MeconiumStainedLiquor] = 0,
    [LaborHour] = 8,
    [LaborMinute] = 30,
    [MaternalPosition] = N'Lateral',
    [BloodPressure] = N'120/80',
    [Pulse] = 80,
    [ContractionsPerTenMinutes] = 3,
    [Dilation] = CAST(5.0 AS Decimal(18, 2)),
    [HeightPresentation] = N'-2',
    [PositionVariety] = N'OIA',
    [MeconiumPresent] = 0,
    [FetalHeartRateDips] = 0,
    [SpontaneousBirth] = 1,
    [ForcepsBirth] = 0,
    [VacuumBirth] = 0,
    [CesareanBirth] = 0,
    [BirthTime] = N'14:25',
    [BirthDate] = CAST(N'2026-07-18T00:00:00' AS DateTime2),
    [MultipleBirth] = 0,
    [BirthOrder] = N'1',
    [IsLiveBirth] = 1,
    [BirthType] = NULL,
    [DeadBirthDuringLaborUnknown] = 0,
    [DeadBirthBeforeLabor] = 0,
    [DeadBirthDuringLabor] = 0,
    [Episiotomy] = 1,
    [Tear] = 0,
    [TearGrade] = NULL,
    [ManualRemovalOfPlacenta] = 0,
    [RetainedPlacenta] = 0,
    [CompletePlacenta] = 1,
    [PreDeliveryCordClamping] = 0,
    [PostDeliveryCordClamping] = 1,
    [CordClampingTime] = NULL,
    [LocalAnesthesia] = 1,
    [RegionalAnesthesia] = 0,
    [GeneralAnesthesia] = 0,
    [OxytocicsInLabor] = 0,
    [OxytocicsPreDelivery] = 0,
    [OxytocicsPostDelivery] = 1,
    [AntibioticsTreatment] = 0,
    [AnalgesiaTreatment] = 1,
    [AttendedByDoctor] = 1,
    [AttendedByNurse] = 1,
    [AttendedByStudent] = 0,
    [AttendedByMidwife] = 0,
    [AttendedByOther] = 0,
    [AttendantName] = N'Dr. García',
    [BirthHIVTest] = 1,
    [BirthSyphilisTest] = 1,
    [BirthTARV] = 0,
    [BirthPosition] = N'Litotomía',
    [Transfusion] = 0
WHERE [Id] = 10;

-- Update NewbornInformations for record 10
UPDATE [dbo].[NewbornInformations]
SET 
    [Sex] = N'Masculino',
    [BirthWeight] = CAST(3250 AS Decimal(10, 2)),
    [LowBirthWeight] = 0,
    [HighBirthWeight] = 0,
    [Length] = CAST(50.0 AS Decimal(10, 2)),
    [HeadCircumference] = CAST(34.5 AS Decimal(18, 2)),
    [GestationalAge] = 39,
    [GestationalAgeWeeks] = 39,
    [GestationalAgeDays] = 2,
    [WeightForGestationalAge] = N'Adecuado',
    [ApgarFirstMinute] = 8,
    [ApgarFifthMinute] = 9,
    [ResuscitationStimulation] = 1,
    [ResuscitationAspiration] = 0,
    [ResuscitationMask] = 0,
    [ResuscitationOxygen] = 0,
    [ResuscitationIntubation] = 0,
    [ResuscitationCardiacMassage] = 0,
    [ResuscitationMedication] = 0,
    [EarlyBreastfeedingInitiation] = 1,
    [BirthDefectsNone] = 1,
    [BirthDefectsMajor] = 0,
    [BirthDefectsMinor] = 0,
    [BCGVaccine] = 1,
    [HepatitisB] = 1,
    [DischargeDate] = CAST(N'2026-07-20T00:00:00' AS DateTime2),
    [DischargeWeight] = CAST(3150 AS Decimal(10, 2)),
    [FeedingAtDischarge] = N'Lactancia exclusiva',
    [IsAlive] = 1,
    [Deceased] = 0,
    [NewbornName] = N'Bebé Pérez'
WHERE [Id] = 10;

-- Update PostpartumInformations for record 10
UPDATE [dbo].[PostpartumInformations]
SET 
    [AntiDGlobulin] = 0,
    [DischargeResponsible] = N'Dr. García',
    [NewbornId] = N'RN-2026-001',
    [NewbornName] = N'Bebé Pérez'
WHERE [Id] = 10;

PRINT 'Form 2 test data updated successfully for record #10';
GO
