-- Add test data for OTROS TRASTORNOS section in Form 2
-- For PerinatalHistoryRecord #10, Patient 15570

USE [solmeddboblyperinatal]
GO

-- Update MorbidityInformation with test data for "OTROS TRASTORNOS" section
UPDATE [dbo].[MorbidityInformations]
SET 
    -- Thyroid disorders (TRASTORNOS METABÓLICOS - Thyroid section)
    [Hypothyroidism] = 1,           -- Yes
    [Hyperthyroidism] = 0,          -- No
    [ThyroidCrisis] = 1,            -- Yes
    [OtherMetabolicDisorder] = 0,   -- No
    
    -- Other disorders (OTROS TRASTORNOS section)
    [HyperemesisGravidarum] = 1,                    -- Yes
    [DeepVeinThrombosis] = 0,                       -- No
    [PulmonaryThromboembolism] = 1,                 -- Yes
    [AmniocEmbolism] = 0,                           -- No (Embolia L.A.)
    [Cardiopathy] = 1,                              -- Yes
    [Valvulopathy] = 0,                             -- No
    [Convulsions] = 1,                              -- Yes
    [ConsciousnessAlteration] = 0,                  -- No (Alteración conciencia)
    [Oliguria] = 1,                                 -- Yes
    [Anemia] = 1,                                   -- Yes
    [SickleCellAnemia] = 0,                         -- No (Anemia falciforme)
    [RenalDisease] = 1,                             -- Yes (Enfermedad renal)
    [MalignantNeoplasia] = 0,                       -- No (Neoplasia maligna)
    [PsychiatricDisorder] = 1,                      -- Yes (Trastorno psiquiátrico)
    [Cholestasis] = 0,                              -- No
    [OtherDisorder] = 1                             -- Yes (Otros enfermedades)
WHERE [PerinatalHistoryRecordId] = 10;

PRINT 'OTROS TRASTORNOS test data updated successfully for record #10';
GO
