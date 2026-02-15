-- Add visible test data for Form 2 sections (Puerperium, Maternal Discharge, Contraception)
-- For PerinatalHistoryRecord #10, Patient 15570

USE [solmeddboblyperinatal]
GO

-- First, check if PuerperiumInformation exists for record 10
-- If not, we need to create it
IF NOT EXISTS (SELECT 1 FROM [dbo].[PuerperiumInformations] WHERE [PerinatalHistoryRecordId] = 10)
BEGIN
    SET IDENTITY_INSERT [dbo].[PuerperiumInformations] ON;
    INSERT INTO [dbo].[PuerperiumInformations] ([Id], [PerinatalHistoryRecordId])
    VALUES (10, 10);
    SET IDENTITY_INSERT [dbo].[PuerperiumInformations] OFF;
END
GO

-- Update or insert PuerperiumDays (postpartum visit records)
-- Delete existing records for puerperium 10
DELETE FROM [dbo].[PuerperiumDays] WHERE [PuerperiumInformationId] = 10;

-- Insert 4 puerperium day records with test data
SET IDENTITY_INSERT [dbo].[PuerperiumDays] ON;

INSERT INTO [dbo].[PuerperiumDays] 
([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], 
[Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId])
VALUES 
(101, 1, N'1er', CAST(36.8 AS Decimal(4, 1)), N'120/80', 75, N'Normal', N'Rubra', N'Sano', N'Exclusiva', N'Sin complicaciones', N'Dra. López', 10),
(102, 2, N'2º', CAST(36.5 AS Decimal(4, 1)), N'118/78', 72, N'Normal', N'Rubra', N'Sano', N'Exclusiva', N'Evolución favorable', N'Dra. López', 10),
(103, 3, N'3er', CAST(36.7 AS Decimal(4, 1)), N'115/75', 70, N'Normal', N'Serosa', N'Sano', N'Exclusiva', N'Alta programada', N'Dra. López', 10),
(104, 4, N'5º a 10º', CAST(36.6 AS Decimal(4, 1)), N'120/75', 68, N'Normal', N'Serosa', N'Sano', N'Exclusiva', N'Control ambulatorio', N'Dra. López', 10);

SET IDENTITY_INSERT [dbo].[PuerperiumDays] OFF;
GO

-- Update MaternalDischargeInformation for record 10
-- First check if it exists
IF NOT EXISTS (SELECT 1 FROM [dbo].[MaternalDischargeInformations] WHERE [PerinatalHistoryRecordId] = 10)
BEGIN
    SET IDENTITY_INSERT [dbo].[MaternalDischargeInformations] ON;
    INSERT INTO [dbo].[MaternalDischargeInformations] 
    ([Id], [PerinatalHistoryRecordId], [DischargeDate], [DischargeTime], [DischargeCondition], 
    [DischargeLocation], [Transferred], [DiedDuringOrInTransferLocation], [Autopsy], 
    [DischargeType], [ResponsiblePerson], [AntiDImmunoglobulin])
    VALUES 
    (10, 10, CAST(N'2026-07-21T00:00:00.0000000' AS DateTime2), N'10:00', N'Sana', 
    N'Domicilio', 0, 0, 0, N'Alta', N'Dra. López', 0);
    SET IDENTITY_INSERT [dbo].[MaternalDischargeInformations] OFF;
END
ELSE
BEGIN
    UPDATE [dbo].[MaternalDischargeInformations]
    SET 
        [DischargeDate] = CAST(N'2026-07-21T00:00:00.0000000' AS DateTime2),
        [DischargeTime] = N'10:00',
        [DischargeCondition] = N'Sana',
        [DischargeLocation] = N'Domicilio',
        [Transferred] = 0,
        [DiedDuringOrInTransferLocation] = 0,
        [Autopsy] = 0,
        [DischargeType] = N'Alta',
        [ResponsiblePerson] = N'Dra. López',
        [AntiDImmunoglobulin] = 0
    WHERE [PerinatalHistoryRecordId] = 10;
END
GO

-- Update ContraceptionInformation for record 10
-- First check if it exists
IF NOT EXISTS (SELECT 1 FROM [dbo].[ContraceptionInformations] WHERE [PerinatalHistoryRecordId] = 10)
BEGIN
    SET IDENTITY_INSERT [dbo].[ContraceptionInformations] ON;
    INSERT INTO [dbo].[ContraceptionInformations] 
    ([Id], [PerinatalHistoryRecordId], [OralCounseling], [WrittenCounseling], [NoCounseling],
    [ContraceptionMethodInitiated], [IUD], [IUDPreferred], [IUDAccepted], [Injectable], 
    [Implant], [Barrier], [Condom], [ResponsiblePerson])
    VALUES 
    (10, 10, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, N'Dra. López');
    SET IDENTITY_INSERT [dbo].[ContraceptionInformations] OFF;
END
ELSE
BEGIN
    UPDATE [dbo].[ContraceptionInformations]
    SET 
        [OralCounseling] = 1,
        [WrittenCounseling] = 0,
        [NoCounseling] = 0,
        [ContraceptionMethodInitiated] = 1,
        [IUD] = 1,
        [IUDPreferred] = 1,
        [IUDAccepted] = 1,
        [Injectable] = 0,
        [Implant] = 0,
        [Barrier] = 0,
        [Condom] = 0,
        [ResponsiblePerson] = N'Dra. López'
    WHERE [PerinatalHistoryRecordId] = 10;
END
GO

PRINT 'Form 2 visible test data updated successfully for record #10';
GO
