USE [master]
GO
/****** Object:  Database [solmeddboblyperinatal]    Script Date: 2/17/2026 4:12:12 PM ******/
CREATE DATABASE [solmeddboblyperinatal]
 go
USE [solmeddboblyperinatal]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Discriminator] [nvarchar](13) NOT NULL,
	[Description] [nvarchar](100) NULL,
	[IsCashier] [bit] NULL,
	[IsDoctor] [bit] NULL,
	[AuthorId] [int] NULL,
	[StatusId] [int] NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[DisplayName] [nvarchar](max) NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Rnc] [nvarchar](max) NULL,
	[UserTypeId] [int] NOT NULL,
	[Picture] [nvarchar](max) NULL,
	[StatusId] [int] NOT NULL,
	[AuthorId] [int] NOT NULL,
	[ShopId] [int] NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[IsTenantRoot] [bit] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuthorPayments]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthorPayments](
	[AuthorPaymentId] [int] IDENTITY(1,1) NOT NULL,
	[AuthorId] [int] NOT NULL,
	[AuthorPlanId] [int] NOT NULL,
	[CurrencyId] [int] NOT NULL,
	[Amount] [decimal](10, 2) NOT NULL,
	[StatusId] [int] NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[DateTo] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AuthorPayments] PRIMARY KEY CLUSTERED 
(
	[AuthorPaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuthorPlanOptions]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthorPlanOptions](
	[AuthorPlanOptionId] [int] IDENTITY(1,1) NOT NULL,
	[AuthorPlanId] [int] NOT NULL,
	[OptionId] [int] NOT NULL,
 CONSTRAINT [PK_AuthorPlanOptions] PRIMARY KEY CLUSTERED 
(
	[AuthorPlanOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuthorPlans]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthorPlans](
	[AuthorPlanId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[CurrencyId] [int] NOT NULL,
	[PeriodicityId] [int] NOT NULL,
	[Amount] [decimal](10, 2) NOT NULL,
	[StatusId] [int] NULL,
	[ShowAsBuyable] [bit] NOT NULL,
 CONSTRAINT [PK_AuthorPlans] PRIMARY KEY CLUSTERED 
(
	[AuthorPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Authors]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Authors](
	[AuthorId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](15) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Imagen] [nvarchar](max) NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Tel] [nvarchar](50) NOT NULL,
	[Prefix] [nvarchar](8) NULL,
	[PrefixFact] [nvarchar](16) NULL,
	[PrefixOrder] [nvarchar](8) NULL,
	[StartDate] [datetime2](7) NULL,
	[IsAutoPay] [bit] NOT NULL,
	[PrefixNcf] [nvarchar](20) NULL,
	[SeqNcf] [int] NULL,
	[PrefixNcfGub] [nvarchar](20) NULL,
	[SeqNcfGub] [int] NULL,
	[PrefixFinalFact] [nvarchar](16) NULL,
	[NcfEnds] [nvarchar](25) NULL,
	[SeqFact] [int] NULL,
	[AuthorTypeId] [int] NOT NULL,
	[AuthorPlanId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
	[SeqOrd] [int] NULL,
	[IsBarber] [bit] NOT NULL,
	[IsGeneral] [bit] NOT NULL,
	[IsMedical] [bit] NOT NULL,
	[AvailableEmailMessages] [int] NOT NULL,
	[AvailableSmsMessages] [int] NOT NULL,
	[AvailableWsMessages] [int] NOT NULL,
	[NotificationWsBody] [nvarchar](max) NULL,
	[UpdateMessagesAvailability] [datetime2](7) NOT NULL,
	[NotificationEmailBody] [nvarchar](max) NULL,
	[NotificationSmsBody] [nvarchar](max) NULL,
	[LastEmailReminderDate] [datetime2](7) NULL,
	[LastWhatsAppReminderDate] [datetime2](7) NULL,
	[PrefixLiq] [nvarchar](max) NULL,
	[SeqLiq] [int] NOT NULL,
	[TenantId] [uniqueidentifier] NULL,
	[TotalEmailUsed] [int] NOT NULL,
	[TotalSmsUsed] [int] NOT NULL,
	[TotalWhatsAppUsed] [int] NOT NULL,
	[HideBuyPriceInProducts] [bit] NOT NULL,
	[HideCategoryInProducts] [bit] NOT NULL,
	[HideCodeInProducts] [bit] NOT NULL,
	[HideMeasureInProducts] [bit] NOT NULL,
	[HideTaxInProducts] [bit] NOT NULL,
	[PercentageServiceNegotiated] [decimal](18, 2) NULL,
	[TaxToRetain] [decimal](18, 2) NULL,
	[AdministrativeCommissionPercentage] [decimal](18, 2) NULL,
	[DiscountRate] [decimal](18, 2) NULL,
	[ISRPercentage] [decimal](18, 2) NULL,
	[ReservePercentage] [decimal](18, 2) NULL,
	[Address] [nvarchar](200) NULL,
	[Exequatur] [nvarchar](25) NULL,
	[RNC] [nvarchar](20) NULL,
	[NotificationWhatsAppWebBody] [nvarchar](max) NULL,
	[SeqPurchase] [int] NOT NULL,
	[PrefixPurchase] [nvarchar](16) NULL,
 CONSTRAINT [PK_Authors] PRIMARY KEY CLUSTERED 
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuthorTypes]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuthorTypes](
	[AuthorTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_AuthorTypes] PRIMARY KEY CLUSTERED 
(
	[AuthorTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BirthInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BirthInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AdmissionDate] [datetime2](7) NULL,
	[PrenatalConsultationsTotal] [int] NULL,
	[HasPrenatalCard] [bit] NULL,
	[FirstConsultationGestationalAgeWeeks] [int] NULL,
	[FirstConsultationGestationalAgeDays] [int] NULL,
	[HospitalizedDuringPregnancy] [bit] NULL,
	[HospitalizationDays] [int] NULL,
	[Companion] [nvarchar](max) NULL,
	[CorticosteroidsComplete] [bit] NULL,
	[CorticosteroidsIncomplete] [bit] NULL,
	[CorticosteroidsNA] [bit] NULL,
	[GestationalAgeAtBirthWeeks] [int] NULL,
	[GestationalAgeAtBirthDays] [int] NULL,
	[GestationalAgeByLMP] [bit] NULL,
	[GestationalAgeByUltrasound] [bit] NULL,
	[CephalicPresentation] [bit] NULL,
	[PelvicPresentation] [bit] NULL,
	[TransverseSituation] [bit] NULL,
	[FetalSizeAppropriate] [bit] NULL,
	[SpontaneousOnset] [bit] NULL,
	[InducedOnset] [bit] NULL,
	[ElectiveCesareanOnset] [bit] NULL,
	[MembraneRupture] [bit] NULL,
	[MembraneRuptureDate] [datetime2](7) NULL,
	[MembraneRuptureTime] [nvarchar](max) NULL,
	[MembraneRuptureMoreThan18Hours] [bit] NULL,
	[FeverDuringLabor] [bit] NULL,
	[Chorioamnionitis] [int] NULL,
	[MeconiumStainedLiquor] [int] NULL,
	[LaborHour] [int] NULL,
	[LaborMinute] [int] NULL,
	[MaternalPosition] [nvarchar](max) NULL,
	[BloodPressure] [nvarchar](max) NULL,
	[Pulse] [int] NULL,
	[ContractionsPerTenMinutes] [int] NULL,
	[Dilation] [decimal](18, 2) NULL,
	[HeightPresentation] [nvarchar](max) NULL,
	[PositionVariety] [nvarchar](max) NULL,
	[MeconiumPresent] [bit] NULL,
	[FetalHeartRateDips] [nvarchar](max) NULL,
	[SpontaneousBirth] [bit] NULL,
	[ForcepsBirth] [bit] NULL,
	[VacuumBirth] [bit] NULL,
	[CesareanBirth] [bit] NULL,
	[BirthTime] [nvarchar](max) NULL,
	[BirthDate] [datetime2](7) NULL,
	[MultipleBirth] [bit] NULL,
	[BirthOrder] [nvarchar](max) NULL,
	[DeadBirthDuringLaborUnknown] [bit] NULL,
	[DeadBirthBeforeLabor] [bit] NULL,
	[DeadBirthDuringLabor] [bit] NULL,
	[Episiotomy] [bit] NULL,
	[Tear] [bit] NULL,
	[TearGrade] [int] NULL,
	[ManualRemovalOfPlacenta] [bit] NULL,
	[RetainedPlacenta] [bit] NULL,
	[CompletePlacenta] [bit] NULL,
	[PreDeliveryCordClamping] [bit] NULL,
	[PostDeliveryCordClamping] [bit] NULL,
	[LocalAnesthesia] [bit] NULL,
	[RegionalAnesthesia] [bit] NULL,
	[GeneralAnesthesia] [bit] NULL,
	[OxytocicsInLabor] [bit] NULL,
	[AntibioticsTreatment] [bit] NULL,
	[AnalgesiaTreatment] [bit] NULL,
	[OtherMedicationOne] [bit] NULL,
	[OtherMedicationOneDetail] [nvarchar](max) NULL,
	[OtherMedicationTwo] [bit] NULL,
	[OtherMedicationTwoDetail] [nvarchar](max) NULL,
	[MainIndicationForInductionOrOperativeDelivery] [nvarchar](max) NULL,
	[AttendedByDoctor] [bit] NULL,
	[AttendedByNurse] [bit] NULL,
	[AttendedByStudent] [bit] NULL,
	[AttendedByMidwife] [bit] NULL,
	[AttendedByOther] [bit] NULL,
	[AttendantName] [nvarchar](max) NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[IsLiveBirth] [bit] NULL,
	[BirthType] [int] NULL,
	[MembraneRuptureBefore37Weeks] [bit] NULL,
	[CorticosteroidsNone] [bit] NULL,
	[CorticosteroidsStartWeek] [int] NULL,
	[FeverTemperature] [decimal](4, 1) NULL,
	[CompanionP] [nvarchar](max) NULL,
	[BirthHIVTest] [int] NULL,
	[BirthSyphilisTest] [int] NULL,
	[BirthTARV] [int] NULL,
	[PartogramDetails] [bit] NULL,
	[BirthPosition] [nvarchar](max) NULL,
	[CordClampingTime] [int] NULL,
	[InductionCode] [nvarchar](max) NULL,
	[MagnesiumSulfateEclampsia] [bit] NULL,
	[MagnesiumSulfatePreeclampsia] [bit] NULL,
	[OperativeCode] [nvarchar](max) NULL,
	[OtherTermination] [bit] NULL,
	[OxytocicsPostDelivery] [bit] NULL,
	[OxytocicsPreDelivery] [bit] NULL,
	[Transfusion] [bit] NULL,
 CONSTRAINT [PK_BirthInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BloodTypes]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BloodTypes](
	[BloodTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_BloodTypes] PRIMARY KEY CLUSTERED 
(
	[BloodTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Continents]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Continents](
	[ContinentId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](5) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Demonym] [nvarchar](25) NOT NULL,
 CONSTRAINT [PK_Continents] PRIMARY KEY CLUSTERED 
(
	[ContinentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContraceptionInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContraceptionInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OralCounseling] [bit] NULL,
	[WrittenCounseling] [bit] NULL,
	[NoCounseling] [bit] NULL,
	[ContraceptionMethodInitiated] [bit] NULL,
	[OralContraceptives] [bit] NULL,
	[OralContraceptivesPreferred] [bit] NULL,
	[OralContraceptivesAccepted] [bit] NULL,
	[OtherHormonalMethods] [bit] NULL,
	[OtherHormonalMethodsPreferred] [bit] NULL,
	[OtherHormonalMethodsAccepted] [bit] NULL,
	[IUD] [bit] NULL,
	[IUDPreferred] [bit] NULL,
	[IUDAccepted] [bit] NULL,
	[Injectable] [bit] NULL,
	[InjectablePreferred] [bit] NULL,
	[InjectableAccepted] [bit] NULL,
	[Implant] [bit] NULL,
	[ImplantPreferred] [bit] NULL,
	[ImplantAccepted] [bit] NULL,
	[Barrier] [bit] NULL,
	[BarrierPreferred] [bit] NULL,
	[BarrierAccepted] [bit] NULL,
	[FemaleSterilization] [bit] NULL,
	[FemaleSterilizationPreferred] [bit] NULL,
	[FemaleSterilizationAccepted] [bit] NULL,
	[MaleSterilization] [bit] NULL,
	[MaleSterilizationPreferred] [bit] NULL,
	[MaleSterilizationAccepted] [bit] NULL,
	[NaturalMethod] [bit] NULL,
	[NaturalMethodPreferred] [bit] NULL,
	[NaturalMethodAccepted] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[Condom] [bit] NULL,
	[CondomAccepted] [bit] NULL,
	[CondomPreferred] [bit] NULL,
	[ResponsiblePerson] [nvarchar](100) NULL,
 CONSTRAINT [PK_ContraceptionInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Countries]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Countries](
	[CountryId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](5) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Demonym] [nvarchar](25) NULL,
	[Imagen] [nvarchar](max) NULL,
	[ContinentId] [int] NULL,
 CONSTRAINT [PK_Countries] PRIMARY KEY CLUSTERED 
(
	[CountryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Currencies]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Currencies](
	[CurrencyId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Currencies] PRIMARY KEY CLUSTERED 
(
	[CurrencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CurrentPregnancies]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CurrentPregnancies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LastMenstrualPeriod] [datetime2](7) NULL,
	[EstimatedDueDate] [datetime2](7) NULL,
	[PreviousWeight] [decimal](18, 2) NULL,
	[Height] [decimal](18, 2) NULL,
	[ReliableGestationalAge] [int] NULL,
	[GestationalAgeReliabilityMethod] [nvarchar](max) NULL,
	[NormalDentalExamination] [int] NULL,
	[NormalBreastExamination] [int] NULL,
	[OlderThan35] [int] NULL,
	[YoungerThan15] [int] NULL,
	[VaccineTetanusDiphtheria] [int] NULL,
	[VaccineInfluenza] [int] NULL,
	[VaccineRubella] [int] NULL,
	[VaccineHepatitisB] [int] NULL,
	[BloodGroupType] [int] NULL,
	[RhFactorType] [int] NULL,
	[RhSensitization] [int] NULL,
	[AntiDImmunoglobulinLessThan20Weeks] [int] NULL,
	[AntiDImmunoglobulinGreaterOrEqual20Weeks] [int] NULL,
	[CervixPapExam] [int] NULL,
	[CervixColposcopy] [int] NULL,
	[CervixVisualInspection] [int] NULL,
	[MalariaTestResult] [nvarchar](max) NULL,
	[ChagasTestResult] [nvarchar](max) NULL,
	[BacteriuriaTestResultLessThan20Weeks] [nvarchar](max) NULL,
	[BacteriuriaTestResultGreaterOrEqual20Weeks] [nvarchar](max) NULL,
	[ToxoplasmosisIgGLessThan20Weeks] [nvarchar](max) NULL,
	[ToxoplasmosisIgGGreaterOrEqual20Weeks] [nvarchar](max) NULL,
	[ToxoplasmosisIgMLessThan20Weeks] [nvarchar](max) NULL,
	[ToxoplasmosisIgMGreaterOrEqual20Weeks] [nvarchar](max) NULL,
	[GlucoseLessThan20Weeks] [decimal](10, 2) NULL,
	[GlucoseGreaterOrEqual30Weeks] [decimal](10, 2) NULL,
	[HemoglobinLessThan20Weeks] [decimal](10, 2) NULL,
	[HemoglobinGreaterOrEqual20Weeks] [decimal](10, 2) NULL,
	[IronFolateSupplementsIndicated] [bit] NULL,
	[IronSupplements] [bit] NULL,
	[FolateSupplements] [bit] NULL,
	[StreptococcusBTest3537Weeks] [nvarchar](max) NULL,
	[BirthPreparation] [bit] NULL,
	[BreastfeedingCounseling] [bit] NULL,
	[HIVTestRequestedLessThan20Weeks] [int] NULL,
	[HIVTestResultLessThan20Weeks] [int] NULL,
	[HIVARTLessThan20Weeks] [int] NULL,
	[HIVTestRequestedGreaterOrEqual20Weeks] [int] NULL,
	[HIVTestResultGreaterOrEqual20Weeks] [int] NULL,
	[HIVARTGreaterOrEqual20Weeks] [int] NULL,
	[SyphilisTestLessThan20Weeks] [bit] NULL,
	[SyphilisTestTypeLessThan20Weeks] [nvarchar](max) NULL,
	[SyphilisTreatmentLessThan20Weeks] [bit] NULL,
	[PartnerTreatmentLessThan20Weeks] [bit] NULL,
	[SyphilisTreatmentWeeksLessThan20Weeks] [int] NULL,
	[SyphilisTestGreaterOrEqual20Weeks] [bit] NULL,
	[SyphilisTestTypeGreaterOrEqual20Weeks] [nvarchar](max) NULL,
	[SyphilisTreatmentGreaterOrEqual20Weeks] [bit] NULL,
	[PartnerTreatmentGreaterOrEqual20Weeks] [bit] NULL,
	[SyphilisTreatmentWeeksGreaterOrEqual20Weeks] [int] NULL,
	[HepatitisB] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[AlcoholUseFirstTrimester] [int] NULL,
	[AlcoholUseSecondTrimester] [int] NULL,
	[AlcoholUseThirdTrimester] [int] NULL,
	[DrugUseFirstTrimester] [int] NULL,
	[DrugUseSecondTrimester] [int] NULL,
	[DrugUseThirdTrimester] [int] NULL,
	[HepatitisBScreening] [int] NULL,
	[PassiveSmokingFirstTrimester] [int] NULL,
	[PassiveSmokingSecondTrimester] [int] NULL,
	[PassiveSmokingThirdTrimester] [int] NULL,
	[ReliableByEchoLessThan20Weeks] [int] NULL,
	[ReliableByFUM] [int] NULL,
	[SmokingFirstTrimester] [int] NULL,
	[SmokingSecondTrimester] [int] NULL,
	[SmokingThirdTrimester] [int] NULL,
	[VaccineHepatitisADate] [datetime2](7) NULL,
	[VaccineHepatitisAGestationalWeeks] [int] NULL,
	[VaccineHepatitisATime] [int] NULL,
	[VaccineHepatitisATotalDoses] [int] NULL,
	[VaccineHepatitisBDate] [datetime2](7) NULL,
	[VaccineHepatitisBGestationalWeeks] [int] NULL,
	[VaccineHepatitisBTime] [int] NULL,
	[VaccineHepatitisBTotalDoses] [int] NULL,
	[VaccineInfluenzaDate] [datetime2](7) NULL,
	[VaccineInfluenzaGestationalWeeks] [int] NULL,
	[VaccineInfluenzaTime] [int] NULL,
	[VaccineInfluenzaTotalDoses] [int] NULL,
	[VaccineRubellaDate] [datetime2](7) NULL,
	[VaccineRubellaGestationalWeeks] [int] NULL,
	[VaccineRubellaTime] [int] NULL,
	[VaccineRubellaTotalDoses] [int] NULL,
	[VaccineTdapDate] [datetime2](7) NULL,
	[VaccineTdapGestationalWeeks] [int] NULL,
	[VaccineTdapTime] [int] NULL,
	[VaccineTdapTotalDoses] [int] NULL,
	[VaccineTetanusDiphtheriaDate] [datetime2](7) NULL,
	[VaccineTetanusDiphtheriaGestationalWeeks] [int] NULL,
	[VaccineTetanusDiphtheriaTime] [int] NULL,
	[VaccineTetanusDiphtheriaTotalDoses] [int] NULL,
	[ViolenceFirstTrimester] [int] NULL,
	[ViolenceSecondTrimester] [int] NULL,
	[ViolenceThirdTrimester] [int] NULL,
	[FolateSupplementsLessThan20Weeks] [bit] NULL,
	[IronSupplementsGreaterOrEqual20Weeks] [bit] NULL,
	[AnemiaGreaterOrEqual20Weeks] [bit] NULL,
	[AnemiaLessThan20Weeks] [bit] NULL,
	[AntiDImmunoglobulin] [int] NULL,
	[SyphilisNonTreponemalResultGreaterOrEqual20Weeks] [int] NULL,
	[SyphilisNonTreponemalResultLessThan20Weeks] [int] NULL,
	[SyphilisPartnerTreatmentGreaterOrEqual20Weeks] [int] NULL,
	[SyphilisPartnerTreatmentLessThan20Weeks] [int] NULL,
	[SyphilisTreatmentOptionGreaterOrEqual20Weeks] [int] NULL,
	[SyphilisTreatmentOptionLessThan20Weeks] [int] NULL,
	[SyphilisTreponemalResultGreaterOrEqual20Weeks] [int] NULL,
	[SyphilisTreponemalResultLessThan20Weeks] [int] NULL,
 CONSTRAINT [PK_CurrentPregnancies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genders]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genders](
	[GenderId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Genders] PRIMARY KEY CLUSTERED 
(
	[GenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Insurances]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Insurances](
	[InsuranceId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ForSpecial] [bit] NOT NULL,
	[AditionalInfo] [nvarchar](400) NULL,
	[Rnc] [nvarchar](15) NULL,
 CONSTRAINT [PK_Insurances] PRIMARY KEY CLUSTERED 
(
	[InsuranceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LaborEntries]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LaborEntries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LaborHour] [int] NULL,
	[LaborMinute] [int] NULL,
	[MaternalPosition] [nvarchar](max) NULL,
	[BloodPressure] [nvarchar](max) NULL,
	[Pulse] [int] NULL,
	[ContractionsPerTenMinutes] [int] NULL,
	[Dilation] [decimal](10, 2) NULL,
	[HeightPresentation] [nvarchar](max) NULL,
	[PositionVariety] [nvarchar](max) NULL,
	[MeconiumPresent] [bit] NULL,
	[FetalHeartRateDips] [nvarchar](max) NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
 CONSTRAINT [PK_LaborEntries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaritalSituations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaritalSituations](
	[MaritalSituationId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_MaritalSituations] PRIMARY KEY CLUSTERED 
(
	[MaritalSituationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaternalDischargeInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaternalDischargeInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DischargeDate] [datetime2](7) NULL,
	[DischargeTime] [nvarchar](max) NULL,
	[DischargeCondition] [nvarchar](max) NULL,
	[DischargeLocation] [nvarchar](max) NULL,
	[Transferred] [bit] NULL,
	[DiedDuringOrInTransferLocation] [bit] NULL,
	[Autopsy] [bit] NULL,
	[DischargeType] [nvarchar](max) NULL,
	[ResponsiblePerson] [nvarchar](max) NULL,
	[AntiDImmunoglobulin] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
 CONSTRAINT [PK_MaternalDischargeInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MedicalBackgrounds]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MedicalBackgrounds](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FamilyTuberculosis] [int] NULL,
	[FamilyDiabetes] [int] NULL,
	[FamilyDiabetesType] [int] NULL,
	[FamilyHypertension] [int] NULL,
	[FamilyPreeclampsia] [int] NULL,
	[FamilyEclampsia] [int] NULL,
	[FamilyOtherSeriousMedicalCondition] [int] NULL,
	[FamilyOtherConditionDetails] [nvarchar](max) NULL,
	[PersonalTuberculosis] [int] NULL,
	[PersonalDiabetes] [int] NULL,
	[PersonalDiabetesType] [int] NULL,
	[PersonalHypertension] [int] NULL,
	[PersonalPreeclampsia] [int] NULL,
	[PersonalEclampsia] [int] NULL,
	[PersonalSurgery] [int] NULL,
	[PersonalInfertility] [int] NULL,
	[PersonalHeartDisease] [int] NULL,
	[PersonalNephropathy] [int] NULL,
	[PersonalViolence] [int] NULL,
	[PersonalHIVPositive] [int] NULL,
	[CurrentSmoker] [bit] NULL,
	[PassiveSmoker] [bit] NULL,
	[DrugUse] [bit] NULL,
	[AlcoholUse] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[PersonalOtherConditionDetails] [nvarchar](max) NULL,
	[PersonalOtherSeriousMedicalCondition] [int] NULL,
 CONSTRAINT [PK_MedicalBackgrounds] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MorbidityInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MorbidityInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ChronicHypertension] [bit] NULL,
	[MildPreeclampsia] [bit] NULL,
	[SeverePreeclampsia] [bit] NULL,
	[Eclampsia] [bit] NULL,
	[HELLP] [bit] NULL,
	[GestationalHypertension] [bit] NULL,
	[ChronicHypertensionWithSuperimposedPreeclampsia] [bit] NULL,
	[Sepsis] [bit] NULL,
	[Endometritis] [bit] NULL,
	[Chorioamnionitis] [bit] NULL,
	[AsymptomaticBacteriuria] [bit] NULL,
	[Pyelonephritis] [bit] NULL,
	[Pneumonia] [bit] NULL,
	[CesareanWoundInfection] [bit] NULL,
	[EpisiotomyInfection] [bit] NULL,
	[OtherInfection] [bit] NULL,
	[PostAbortionHemorrhage] [bit] NULL,
	[HydatidiformMole] [bit] NULL,
	[EctopicPregnancy] [bit] NULL,
	[PlacentaPrevia] [bit] NULL,
	[AccretaPlacentaPP] [bit] NULL,
	[AbruptioPlacentae] [bit] NULL,
	[SecondTrimesterHemorrhage] [bit] NULL,
	[UterineRupture] [bit] NULL,
	[PostpartumHemorrhage] [bit] NULL,
	[UterineAtony] [bit] NULL,
	[RetainedPlacenta] [bit] NULL,
	[PlacentalTears] [bit] NULL,
	[CoagulationDefect] [bit] NULL,
	[GlucoseToleranceTest] [bit] NULL,
	[AbnormalOralGlucoseTolerance] [bit] NULL,
	[PreexistingInsulinDependentDM] [bit] NULL,
	[PreexistingNonInsulinDependentDM] [bit] NULL,
	[GestationalDiabetes] [bit] NULL,
	[HyperosmolarState] [bit] NULL,
	[HyperglycemicState] [bit] NULL,
	[Ketoacidosis] [bit] NULL,
	[Hypothyroidism] [bit] NULL,
	[Hyperthyroidism] [bit] NULL,
	[ThyroidCrisis] [bit] NULL,
	[OtherMetabolicDisorder] [bit] NULL,
	[HyperemesisGravidarum] [bit] NULL,
	[DeepVeinThrombosis] [bit] NULL,
	[PulmonaryThromboembolism] [bit] NULL,
	[AmniocEmbolism] [bit] NULL,
	[Cardiopathy] [bit] NULL,
	[Valvulopathy] [bit] NULL,
	[Anemia] [bit] NULL,
	[SickleCellAnemia] [bit] NULL,
	[RenalDisease] [bit] NULL,
	[MalignantNeoplasia] [bit] NULL,
	[PsychiatricDisorder] [bit] NULL,
	[Cholestasis] [bit] NULL,
	[Convulsions] [bit] NULL,
	[ConsciousnessAlteration] [bit] NULL,
	[OtherDisorder] [bit] NULL,
	[Oliguria] [bit] NULL,
	[ObstructedLabor] [bit] NULL,
	[ProlongedRuptureOfMembranes] [bit] NULL,
	[Polyhydramnios] [bit] NULL,
	[Oligohydramnios] [bit] NULL,
	[IntrauterineGrowthRestriction] [bit] NULL,
	[AcuteFetalDistress] [bit] NULL,
	[OtherObstetricComplication] [bit] NULL,
	[ManualRemovalOfPlacenta] [bit] NULL,
	[UterotronicsForHemorrhage] [bit] NULL,
	[OtherUterotronicsDetail] [nvarchar](max) NULL,
	[CentralVenousAccess] [bit] NULL,
	[BloodProductsTransfusion] [bit] NULL,
	[BloodProductsDetail] [nvarchar](max) NULL,
	[LaparotomyCount] [int] NULL,
	[ICUAdmissionDaysGreaterOrEqualSeven] [bit] NULL,
	[IntravenousAntibioticsForInfection] [bit] NULL,
	[AntibioticsDetail] [nvarchar](max) NULL,
	[NonPneumaticAntiShockGarment] [bit] NULL,
	[HydrostaticBalloons] [bit] NULL,
	[BLynchSutures] [bit] NULL,
	[UterineOrHypogastricArteryLigature] [bit] NULL,
	[Embolization] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[HasDiabetesMellitus] [bit] NULL,
	[HasFirstTrimesterHemorrhage] [bit] NULL,
	[HasInfections] [bit] NULL,
	[HasMetabolicDisorders] [bit] NULL,
	[HasObstetricComplications] [bit] NULL,
	[HasOtherDisorders] [bit] NULL,
	[HasSecondTrimesterHemorrhage] [bit] NULL,
	[HasThirdTrimesterHemorrhage] [bit] NULL,
	[HasThyroidDisorders] [bit] NULL,
	[HasHypertensiveDisorders] [bit] NULL,
	[ICUAdmissionDays] [int] NULL,
	[OtherDisorderDetail1] [nvarchar](200) NULL,
	[OtherDisorderDetail2] [nvarchar](200) NULL,
	[OtherDisorderDetail3] [nvarchar](200) NULL,
	[OtherInfectionDetail] [nvarchar](200) NULL,
	[OtherMetabolicDetail1] [nvarchar](200) NULL,
	[OtherMetabolicDetail2] [nvarchar](200) NULL,
	[OtherMetabolicDetail3] [nvarchar](200) NULL,
	[OtherMetabolicDetail4] [nvarchar](200) NULL,
	[OtherObstetricComplicationDetail] [nvarchar](200) NULL,
	[Laparotomy] [nvarchar](10) NULL,
 CONSTRAINT [PK_MorbidityInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NearMissVariables]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NearMissVariables](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Shock] [bit] NULL,
	[CardiacArrest] [bit] NULL,
	[JaundiceInPreeclampsia] [bit] NULL,
	[AcuteCyanosis] [bit] NULL,
	[Gasping] [bit] NULL,
	[SevereTachypnea] [bit] NULL,
	[SevereBradypnea] [bit] NULL,
	[OliguriaUnresponsiveToFluidsOrDiuretics] [bit] NULL,
	[CoagulationDisorders] [bit] NULL,
	[Coma] [bit] NULL,
	[ProlongedUnconsciousness] [bit] NULL,
	[StrokeOrCVA] [bit] NULL,
	[UncontrollableSeizuresOrStatusEpilepticus] [bit] NULL,
	[GeneralizedParalysis] [bit] NULL,
	[PlateletsLessThan50000] [bit] NULL,
	[CreatinineGreaterOrEqual300] [bit] NULL,
	[BilirubinGreaterThan100] [bit] NULL,
	[PHLessThan7_1] [bit] NULL,
	[HemoglobinSaturationLessThan90PercentForOverOneHour] [bit] NULL,
	[PaO2FiO2LessThan200] [bit] NULL,
	[LactateGreaterThan5] [bit] NULL,
	[ContinuousVasoactiveAgentsAdministration] [bit] NULL,
	[VasoactiveAgentsDetail] [nvarchar](max) NULL,
	[IntubationAndVentilationNotRelatedToAnesthesia] [bit] NULL,
	[IntubationDays] [int] NULL,
	[BloodProductsAdministrationGreaterOrEqualThreeUnits] [bit] NULL,
	[BloodUnits] [int] NULL,
	[ICUAdmissionLessThanSevenDays] [bit] NULL,
	[ICUDaysLessThanSeven] [int] NULL,
	[Hysterectomy] [bit] NULL,
	[DialysisForAcuteRenalFailure] [bit] NULL,
	[CardiopulmonaryResuscitation] [bit] NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
 CONSTRAINT [PK_NearMissVariables] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NewbornInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NewbornInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Sex] [nvarchar](max) NULL,
	[BirthWeight] [decimal](10, 2) NULL,
	[LowBirthWeight] [bit] NULL,
	[HighBirthWeight] [bit] NULL,
	[Length] [decimal](10, 2) NULL,
	[HeadCircumference] [decimal](18, 2) NULL,
	[GestationalAge] [int] NULL,
	[WeightForGestationalAge] [nvarchar](max) NULL,
	[ApgarFirstMinute] [int] NULL,
	[ApgarFifthMinute] [int] NULL,
	[ResuscitationStimulation] [bit] NULL,
	[ResuscitationAspiration] [bit] NULL,
	[ResuscitationMask] [bit] NULL,
	[ResuscitationOxygen] [bit] NULL,
	[ResuscitationIntubation] [bit] NULL,
	[ResuscitationCardiacMassage] [bit] NULL,
	[ResuscitationMedication] [bit] NULL,
	[EarlyBreastfeedingInitiation] [bit] NULL,
	[BirthDefectsNone] [bit] NULL,
	[BirthDefectsMajor] [bit] NULL,
	[BirthDefectsMinor] [bit] NULL,
	[BirthDefectsDescription] [nvarchar](max) NULL,
	[BirthDefectsCode] [nvarchar](max) NULL,
	[DiseasesNone] [bit] NULL,
	[DiseasesRDS] [bit] NULL,
	[DiseasesCongenitalInfection] [bit] NULL,
	[DiseasesSyphilis] [bit] NULL,
	[DiseasesVIH] [bit] NULL,
	[DiseasesOther] [bit] NULL,
	[DiseasesOtherDescription] [nvarchar](max) NULL,
	[ScreeningVDRL] [bit] NULL,
	[ScreeningHearingTest] [bit] NULL,
	[ScreeningCardiovascular] [bit] NULL,
	[ScreeningMetabolic] [bit] NULL,
	[ScreeningMeconiumFirstDay] [bit] NULL,
	[ScreeningBilirubin] [bit] NULL,
	[ScreeningToxoplasmosisIgM] [bit] NULL,
	[ScreeningChagasDisease] [bit] NULL,
	[ScreeningHemopathies] [bit] NULL,
	[HIVExposed] [bit] NULL,
	[HIVTreatment] [bit] NULL,
	[AttendedByDoctor] [bit] NULL,
	[AttendedByNurse] [bit] NULL,
	[AttendedByStudent] [bit] NULL,
	[AttendedByMidwife] [bit] NULL,
	[AttendedByOther] [bit] NULL,
	[AttendantName] [nvarchar](max) NULL,
	[DischargeLocation] [nvarchar](max) NULL,
	[IsAlive] [bit] NULL,
	[Deceased] [bit] NULL,
	[Transferred] [bit] NULL,
	[DischargeAge] [int] NULL,
	[DischargeDate] [datetime2](7) NULL,
	[DischargeWeight] [decimal](10, 2) NULL,
	[FeedingAtDischarge] [nvarchar](max) NULL,
	[DiedDuringOrInTransferLocation] [bit] NULL,
	[NewbornName] [nvarchar](max) NULL,
	[ResponsiblePersonForDischarge] [nvarchar](max) NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[DischargeAgeLessThanOneDay] [bit] NULL,
	[BCGVaccine] [bit] NULL,
	[BirthDefectsType] [nvarchar](max) NULL,
	[DeliveryAttendantName] [nvarchar](max) NULL,
	[DeliveryAttendantType] [nvarchar](max) NULL,
	[DiedDuringTransferStatus] [nvarchar](max) NULL,
	[DischargeStatus] [nvarchar](max) NULL,
	[DischargeTime] [nvarchar](max) NULL,
	[DiseaseCode1] [nvarchar](50) NULL,
	[DiseaseCode2] [nvarchar](50) NULL,
	[DiseaseCode3] [nvarchar](50) NULL,
	[DiseaseCode4] [nvarchar](50) NULL,
	[DiseaseCode5] [nvarchar](50) NULL,
	[DiseaseCode6] [nvarchar](50) NULL,
	[DiseasesOption] [nvarchar](max) NULL,
	[FaceUp] [bit] NULL,
	[GestationalAgeDays] [int] NULL,
	[GestationalAgeMethod] [nvarchar](max) NULL,
	[GestationalAgeWeeks] [int] NULL,
	[HIVExposedStatus] [nvarchar](max) NULL,
	[HIVTreatmentStatus] [nvarchar](max) NULL,
	[HepatitisB] [bit] NULL,
	[MeconiumFirstDay] [bit] NULL,
	[MotherDiedInDeliveryRoom] [bit] NULL,
	[NeonatalAttendantName] [nvarchar](max) NULL,
	[NeonatalAttendantType] [nvarchar](max) NULL,
	[NewbornDiedInDeliveryRoom] [bit] NULL,
	[ReferredTo] [nvarchar](max) NULL,
	[ResuscitationMassage] [bit] NULL,
	[ScreeningAudic] [nvarchar](max) NULL,
	[ScreeningBilirrub] [nvarchar](max) NULL,
	[ScreeningCardiov] [nvarchar](max) NULL,
	[ScreeningChagas] [nvarchar](max) NULL,
	[ScreeningHbPatia] [nvarchar](max) NULL,
	[ScreeningMetabolicStatus] [nvarchar](max) NULL,
	[ScreeningToxoIgM] [nvarchar](max) NULL,
	[TransferLocation] [nvarchar](max) NULL,
	[VDRLResult] [nvarchar](max) NULL,
	[VDRLTreatment] [nvarchar](max) NULL,
 CONSTRAINT [PK_NewbornInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ObstetricBackgrounds]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ObstetricBackgrounds](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PreviousPregnancies] [int] NULL,
	[Abortions] [int] NULL,
	[VaginalDeliveries] [int] NULL,
	[Cesareans] [int] NULL,
	[LivingBorn] [int] NULL,
	[DeadBorn] [int] NULL,
	[DiedFirstWeek] [int] NULL,
	[DiedAfterFirstWeek] [int] NULL,
	[LowBirthWeight] [int] NULL,
	[HighBirthWeight] [int] NULL,
	[LastPregnancyEndDate] [datetime2](7) NULL,
	[ContraceptiveMethodFailure] [nvarchar](max) NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[Living] [int] NULL,
	[Births] [int] NULL,
	[LastPreviousBirthWeightType] [int] NULL,
	[TwinsHistory] [bit] NULL,
	[ThreeConsecutiveSpontaneousAbortions] [bit] NULL,
	[PregnancyPlanned] [bit] NULL,
	[LastPregnancyLessThanOneYear] [bit] NULL,
	[EctopicPregnancy] [nvarchar](max) NULL,
 CONSTRAINT [PK_ObstetricBackgrounds] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ocupations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ocupations](
	[OcupationId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Ocupations] PRIMARY KEY CLUSTERED 
(
	[OcupationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OptionRols]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OptionRols](
	[OptionRolId] [int] IDENTITY(1,1) NOT NULL,
	[OptionId] [int] NOT NULL,
	[RolId] [nvarchar](450) NULL,
	[FromDate] [datetime2](7) NOT NULL,
	[ToDate] [datetime2](7) NOT NULL,
	[Undefined] [bit] NOT NULL,
	[Index] [bit] NOT NULL,
	[Delete] [bit] NOT NULL,
	[Create] [bit] NOT NULL,
	[Edit] [bit] NOT NULL,
	[Details] [bit] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_OptionRols] PRIMARY KEY CLUSTERED 
(
	[OptionRolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Options]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Options](
	[OptionId] [int] IDENTITY(1,1) NOT NULL,
	[ParentOptionId] [int] NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Link] [nvarchar](100) NULL,
	[Area] [nvarchar](25) NULL,
	[Controller] [nvarchar](50) NULL,
	[Action] [nvarchar](50) NULL,
	[Order] [int] NULL,
	[Class] [nvarchar](100) NULL,
	[Icon] [nvarchar](max) NULL,
	[StatusId] [int] NOT NULL,
	[IsGeneralNoteOption] [bit] NOT NULL,
	[ShowInMenu] [bit] NOT NULL,
	[RouteParameters] [nvarchar](max) NULL,
 CONSTRAINT [PK_Options] PRIMARY KEY CLUSTERED 
(
	[OptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParentOptions]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParentOptions](
	[ParentOptionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Link] [nvarchar](100) NULL,
	[Order] [int] NULL,
	[Class] [nvarchar](100) NULL,
	[Icon] [nvarchar](max) NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_ParentOptions] PRIMARY KEY CLUSTERED 
(
	[ParentOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patients]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patients](
	[PatientId] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[InsuranceId] [int] NOT NULL,
	[InsuranceNumber] [nvarchar](50) NULL,
	[Nss] [nvarchar](50) NULL,
	[BloodTypeId] [int] NOT NULL,
	[Age] [nvarchar](30) NULL,
	[CustomerId] [int] NULL,
	[CompanionRnc] [nvarchar](max) NULL,
	[Companion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Patients] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[People]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[People](
	[PersonId] [int] IDENTITY(1,1) NOT NULL,
	[Rnc] [nvarchar](15) NULL,
	[Name] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[BornDate] [datetime2](7) NULL,
	[GenderId] [int] NOT NULL,
	[SchoolLevelId] [int] NULL,
	[CountryId] [int] NOT NULL,
	[Email] [nvarchar](50) NULL,
	[Tel] [nvarchar](15) NULL,
	[Cel] [nvarchar](15) NULL,
	[MaritalSituationId] [int] NOT NULL,
	[OcupationId] [int] NOT NULL,
	[ReligionId] [int] NOT NULL,
	[Address] [nvarchar](200) NULL,
	[Imagen] [nvarchar](max) NULL,
	[Record2] [nvarchar](max) NULL,
	[Record3] [nvarchar](max) NULL,
	[Record] [int] NOT NULL,
	[CreationDate] [datetime2](7) NULL,
	[UserId] [nvarchar](450) NULL,
	[DebAmount] [decimal](16, 2) NULL,
	[CreditAmount] [decimal](16, 2) NULL,
	[WastedAmount] [decimal](16, 2) NULL,
	[UserUpdateId] [nvarchar](450) NULL,
	[StatusId] [int] NOT NULL,
	[AuthorId] [int] NOT NULL,
	[IsExternal] [bit] NOT NULL,
	[Clinical] [nvarchar](max) NULL,
	[Doctor] [nvarchar](max) NULL,
	[EthnicityId] [int] NULL,
	[Literated] [bit] NOT NULL,
	[LiveAlone] [bit] NOT NULL,
	[Location] [nvarchar](max) NULL,
	[YearsInTheGreatestLevel] [int] NOT NULL,
	[LastUpdatedDate] [datetime2](7) NULL,
 CONSTRAINT [PK_People] PRIMARY KEY CLUSTERED 
(
	[PersonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PerinatalHistoryRecords]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PerinatalHistoryRecords](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NOT NULL,
	[PrenatalControlPlace] [nvarchar](max) NULL,
	[BirthPlace] [nvarchar](max) NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[LastModifiedDate] [datetime2](7) NULL,
	[CreatedByUserId] [nvarchar](max) NULL,
	[LastModifiedByUserId] [nvarchar](max) NULL,
 CONSTRAINT [PK_PerinatalHistoryRecords] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Periodicities]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Periodicities](
	[PeriodicityId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](100) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Periodicities] PRIMARY KEY CLUSTERED 
(
	[PeriodicityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostpartumInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostpartumInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
	[AntiDGlobulin] [nvarchar](10) NULL,
	[DischargeResponsible] [nvarchar](200) NULL,
	[NewbornId] [nvarchar](50) NULL,
	[NewbornName] [nvarchar](200) NULL,
 CONSTRAINT [PK_PostpartumInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostpartumVisits]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostpartumVisits](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Day] [int] NULL,
	[Temperature] [decimal](18, 2) NULL,
	[Pulse] [int] NULL,
	[BloodPressure] [nvarchar](max) NULL,
	[UterineInvolution] [nvarchar](max) NULL,
	[Lochia] [nvarchar](max) NULL,
	[Perineum] [nvarchar](max) NULL,
	[Breastfeeding] [nvarchar](max) NULL,
	[Observations] [nvarchar](max) NULL,
	[Responsible] [nvarchar](max) NULL,
	[PostpartumInformationId] [int] NOT NULL,
	[Bleeding] [nvarchar](200) NULL,
	[Time] [nvarchar](50) NULL,
 CONSTRAINT [PK_PostpartumVisits] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PrenatalConsultations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PrenatalConsultations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ConsultationDate] [datetime2](7) NULL,
	[GestationalAgeWeeks] [int] NULL,
	[Weight] [decimal](18, 2) NULL,
	[BloodPressure] [nvarchar](max) NULL,
	[UterineHeight] [decimal](10, 2) NULL,
	[Presentation] [nvarchar](max) NULL,
	[FetalHeartRate] [int] NULL,
	[FetalMovements] [bit] NULL,
	[ControlLocation] [nvarchar](max) NULL,
	[Proteinuria] [bit] NULL,
	[WarningSignsExamsAndTreatments] [nvarchar](max) NULL,
	[TechnicianInitials] [nvarchar](max) NULL,
	[NextAppointment] [datetime2](7) NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
 CONSTRAINT [PK_PrenatalConsultations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PuerperiumDays]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PuerperiumDays](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DayNumber] [int] NULL,
	[DayLabel] [nvarchar](20) NULL,
	[Temperature] [decimal](4, 1) NULL,
	[BloodPressure] [nvarchar](20) NULL,
	[Pulse] [int] NULL,
	[UterineInvolution] [nvarchar](100) NULL,
	[Lochia] [nvarchar](100) NULL,
	[Perineum] [nvarchar](100) NULL,
	[Breastfeeding] [nvarchar](100) NULL,
	[Observations] [nvarchar](500) NULL,
	[Responsible] [nvarchar](100) NULL,
	[PuerperiumInformationId] [int] NOT NULL,
 CONSTRAINT [PK_PuerperiumDays] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PuerperiumInformations]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PuerperiumInformations](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PerinatalHistoryRecordId] [int] NOT NULL,
 CONSTRAINT [PK_PuerperiumInformations] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Religions]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Religions](
	[ReligionId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Religions] PRIMARY KEY CLUSTERED 
(
	[ReligionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SchoolLevels]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SchoolLevels](
	[SchoolLevelId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_SchoolLevels] PRIMARY KEY CLUSTERED 
(
	[SchoolLevelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceTypes]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceTypes](
	[ServiceTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_ServiceTypes] PRIMARY KEY CLUSTERED 
(
	[ServiceTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Table] [nvarchar](50) NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TenantProducts]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TenantProducts](
	[TenantProductId] [int] IDENTITY(1,1) NOT NULL,
	[TenantId] [uniqueidentifier] NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[BasePrice] [decimal](10, 2) NOT NULL,
	[ServiceTypeId] [int] NULL,
	[CategoryId] [int] NULL,
	[ClassificationCode] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDate] [datetime2](7) NOT NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[ModifiedDate] [datetime2](7) NULL,
	[ModifiedBy] [nvarchar](max) NULL,
 CONSTRAINT [PK_TenantProducts] PRIMARY KEY CLUSTERED 
(
	[TenantProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypes]    Script Date: 2/17/2026 4:12:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypes](
	[UserTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_UserTypes] PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'07cdf94b-24a0-4fd5-beba-d143084eb39f', N'Rol', N'Tesorero', 0, 0, NULL, NULL, N'Tesorero', N'TESORERO', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'10c12112-6d84-4e81-a8c5-13cab628811f', N'Rol', N'Promotor', 1, 1, NULL, NULL, N'Promotor', N'PROMOTOR', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'24a625d4-0722-455f-af25-c7b3ce8875a3', N'Rol', N'Administrador', 1, 1, NULL, NULL, N'Administrador', N'ADMINISTRADOR', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'3cfe8893-950d-407d-9cc2-3334904c4cd8', N'Rol', N'Emergencista', 1, 1, NULL, NULL, N'Emergencista', N'EMERGENCISTA', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'5a0abab5-0320-4581-b99c-0063782d4827', N'Rol', N'User', 0, 0, NULL, NULL, N'User', N'USER', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'724c33a7-d113-4bc5-8b16-07b5a2010c0f', N'Rol', N'Supervisor', 1, 1, NULL, NULL, N'Supervisor', N'SUPERVISOR', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'827374bd-62f1-4ab1-ac4d-157537760615', N'Rol', N'Cajero', 1, 1, NULL, NULL, N'Cajero', N'CAJERO', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'82eb20cd-e6d3-412f-a9b4-f1a8e26f7438', N'Rol', N'Admin', 1, 1, NULL, NULL, N'Admin', N'ADMIN', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'c19c1e48-edd6-46e3-b23e-6e40e7f80d33', N'Rol', N'Callcenter', 1, 1, NULL, NULL, N'Callcenter', N'CALLCENTER', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'd1a05cba-74a2-49a1-aceb-605ad60ca3f5', N'Rol', N'Secretaria', 1, 1, NULL, NULL, N'Secretaria', N'SECRETARIA', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'd553651c-31a1-47b8-ac8f-c9f31cea0b59', N'Rol', N'Almacen', 1, 0, NULL, NULL, N'Almacen', N'ALMACEN', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'd5defd2c-7550-4d0d-9c5a-b651611b5f64', N'Rol', N'Tecnico', 1, 1, NULL, NULL, N'Tecnico', N'TECNICO', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'de102070-1161-402c-a1b4-9fb7e2aacc59', N'Rol', N'Root', 0, 0, NULL, NULL, N'Root', N'ROOT', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Discriminator], [Description], [IsCashier], [IsDoctor], [AuthorId], [StatusId], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'de702070-1161-402c-a1b4-9fb7e2aacc57', N'Rol', N'Medico', 0, 1, NULL, NULL, N'Medico', N'MEDICO', N'bb5f1d6f-f13a-44a7-a6a1-765603c2ef65')
GO
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] ON 
GO
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (76, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'AuthorId', N'1')
GO
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (77, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'UserId', N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af')
GO
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (78, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'Image', N'https://res.cloudinary.com/dpcby3kyy/image/upload/v1684108268/njlwdlnowja3ltjd7jvd.png')
GO
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (79, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'LastName', N'App')
GO
INSERT [dbo].[AspNetUserClaims] ([Id], [UserId], [ClaimType], [ClaimValue]) VALUES (80, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'FirstName', N'SolMed')
GO
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] OFF
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'07cdf94b-24a0-4fd5-beba-d143084eb39f')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'24a625d4-0722-455f-af25-c7b3ce8875a3')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'5a0abab5-0320-4581-b99c-0063782d4827')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'827374bd-62f1-4ab1-ac4d-157537760615')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'd553651c-31a1-47b8-ac8f-c9f31cea0b59')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'd5defd2c-7550-4d0d-9c5a-b651611b5f64')
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', N'de702070-1161-402c-a1b4-9fb7e2aacc57')
GO
INSERT [dbo].[AspNetUsers] ([Id], [DisplayName], [FirstName], [LastName], [Rnc], [UserTypeId], [Picture], [StatusId], [AuthorId], [ShopId], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [IsTenantRoot]) VALUES (N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, N'SolMed', N'App', NULL, 1, N'https://res.cloudinary.com/dpcby3kyy/image/upload/v1684108268/njlwdlnowja3ltjd7jvd.png', 1, 1, 1, N'test@solmed.app', N'TEST@SOLMED.APP', N'test@solmed.app', N'TEST@SOLMED.APP', 0, N'AQAAAAIAAYagAAAAEE9FO/L8sRB6GCFGLCkqX4JZQHJ4gfvUiYMBJAsnGA5ciah5BuBy8JNQq6ZCCXzPNQ==', N'UH4XLPFR3EYHRZB72ETK6W3FFACOWJJO', N'64c61353-0d7c-42ee-acef-238c9356f622', NULL, 0, 0, NULL, 1, 0, 0)
GO
SET IDENTITY_INSERT [dbo].[AuthorPayments] ON 
GO
INSERT [dbo].[AuthorPayments] ([AuthorPaymentId], [AuthorId], [AuthorPlanId], [CurrencyId], [Amount], [StatusId], [Date], [DateTo]) VALUES (99, 1, 2, 2, CAST(0.00 AS Decimal(10, 2)), 1, CAST(N'2024-08-11T13:33:47.3428936' AS DateTime2), CAST(N'2100-09-13T00:00:00.0000000' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[AuthorPayments] OFF
GO
SET IDENTITY_INSERT [dbo].[AuthorPlanOptions] ON 
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (145, 1, 700)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (218, 3, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (219, 3, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (220, 3, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (221, 3, 303)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (222, 3, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (223, 3, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (224, 3, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (225, 3, 309)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (226, 3, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (227, 3, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (228, 3, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (229, 3, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (230, 3, 316)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (231, 15, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (232, 15, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (233, 15, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (234, 15, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (235, 15, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (236, 15, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (237, 15, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (238, 15, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (239, 15, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (240, 15, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (241, 15, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (242, 15, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (243, 15, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (244, 15, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (245, 15, 319)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (246, 15, 320)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (247, 15, 321)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (248, 15, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (249, 10, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (250, 10, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (251, 10, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (252, 10, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (253, 10, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (254, 10, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (255, 10, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (256, 10, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (257, 10, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (258, 10, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (259, 10, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (260, 10, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (261, 10, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (262, 10, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (263, 10, 329)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (264, 10, 330)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (265, 10, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (266, 8, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (267, 8, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (268, 8, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (269, 8, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (270, 8, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (271, 8, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (272, 8, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (273, 8, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (274, 8, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (275, 8, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (276, 8, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (277, 8, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (278, 8, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (279, 8, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (280, 8, 321)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (281, 8, 322)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (282, 8, 323)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (283, 8, 324)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (284, 8, 333)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (285, 8, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (286, 14, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (287, 14, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (288, 14, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (289, 14, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (290, 14, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (291, 14, 303)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (292, 14, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (293, 14, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (294, 14, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (295, 14, 307)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (296, 14, 308)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (297, 14, 309)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (298, 14, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (299, 14, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (300, 14, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (301, 14, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (302, 14, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (303, 14, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (304, 14, 316)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (305, 14, 317)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (306, 14, 318)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (307, 14, 319)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (308, 14, 320)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (309, 14, 321)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (310, 14, 333)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (311, 14, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (350, 17, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (351, 17, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (352, 17, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (353, 17, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (354, 17, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (355, 17, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (356, 17, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (357, 17, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (358, 17, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (359, 17, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (360, 17, 325)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (361, 17, 326)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (362, 17, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (363, 17, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (364, 17, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (365, 17, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (388, 16, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (389, 16, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (390, 16, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (391, 16, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (392, 16, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (393, 16, 303)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (394, 16, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (395, 16, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (396, 16, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (397, 16, 308)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (398, 16, 309)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (399, 16, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (400, 16, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (401, 16, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (402, 16, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (403, 16, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (404, 16, 317)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (405, 16, 318)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (406, 16, 319)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (407, 16, 320)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (408, 16, 321)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (409, 16, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (410, 18, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (411, 18, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (412, 18, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (413, 18, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (414, 18, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (415, 18, 303)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (416, 18, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (417, 18, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (418, 18, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (419, 18, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (420, 18, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (421, 18, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (422, 18, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (423, 18, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (424, 18, 315)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (425, 18, 318)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (426, 18, 329)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (427, 18, 330)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (428, 18, 351)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (429, 18, 352)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (430, 18, 353)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (431, 18, 354)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (432, 18, 355)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (433, 18, 356)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (434, 18, 357)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (435, 18, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (436, 18, 600)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (437, 18, 700)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (740, 2, 302)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (741, 2, 301)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (742, 2, 700)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (743, 2, 400)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (744, 2, 200)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (745, 2, 365)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (746, 2, 366)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (747, 2, 380)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (748, 2, 500)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (749, 2, 300)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (750, 2, 600)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (751, 2, 369)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (752, 2, 370)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (753, 2, 100)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (754, 2, 303)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (755, 2, 0)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (756, 2, 1)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (757, 2, 368)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (758, 2, 308)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (759, 2, 306)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (760, 2, 312)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (761, 2, 310)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (762, 2, 311)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (763, 2, 317)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (764, 2, 320)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (765, 2, 316)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (766, 2, 307)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (767, 2, 335)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (768, 2, 342)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (769, 2, 341)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (770, 2, 343)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (771, 2, 334)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (772, 2, 319)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (773, 2, 330)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (774, 2, 322)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (775, 2, 327)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (776, 2, 321)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (777, 2, 323)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (778, 2, 329)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (779, 2, 331)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (780, 2, 324)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (781, 2, 371)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (782, 2, 358)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (783, 2, 325)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (784, 2, 326)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (785, 2, 318)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (786, 2, 328)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (787, 2, 305)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (788, 2, 309)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (789, 2, 337)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (790, 2, 338)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (791, 2, 340)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (792, 2, 313)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (793, 2, 304)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (794, 2, 314)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (795, 2, 333)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (796, 2, 336)
GO
INSERT [dbo].[AuthorPlanOptions] ([AuthorPlanOptionId], [AuthorPlanId], [OptionId]) VALUES (797, 2, 315)
GO
SET IDENTITY_INSERT [dbo].[AuthorPlanOptions] OFF
GO
SET IDENTITY_INSERT [dbo].[AuthorPlans] ON 
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (1, N'TEST', N'Plan de Prueba', 2, 11, CAST(0.00 AS Decimal(10, 2)), 1, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (2, N'All', N'Plan All Power', 2, 11, CAST(0.00 AS Decimal(10, 2)), 1, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (3, N'Cardiologia', N'Cardiología General', 2, 4, CAST(29.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (5, N'Urologia M', N'Urologia M', 1, 4, CAST(29.00 AS Decimal(10, 2)), NULL, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (6, N'Pediatria M', N'Pediatria M', 1, 4, CAST(29.00 AS Decimal(10, 2)), NULL, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (7, N'Psiquiatria M', N'Psiquiatria M', 1, 4, CAST(29.00 AS Decimal(10, 2)), NULL, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (8, N'GinecologiaObstetricia', N'Ginecologia y Obstetricia', 2, 4, CAST(39.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (9, N'Psi-Car-Gin', N'Psi-Car-Gin', 1, 4, CAST(19.00 AS Decimal(10, 2)), NULL, 0)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (10, N'Geriatria', N'Geriatria', 2, 4, CAST(39.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (14, N'Cirugia', N'Cirugia General', 2, 4, CAST(39.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (15, N'Nutricion', N'Nutrición', 2, 4, CAST(39.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (16, N'Bariatrica', N'Bariatrica', 2, 4, CAST(39.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (17, N'Psicologia', N'Psicologia', 1, 4, CAST(1200.00 AS Decimal(10, 2)), NULL, 1)
GO
INSERT [dbo].[AuthorPlans] ([AuthorPlanId], [Code], [Name], [CurrencyId], [PeriodicityId], [Amount], [StatusId], [ShowAsBuyable]) VALUES (18, N'Ortopedia', N'Ortopedia', 2, 4, CAST(27.00 AS Decimal(10, 2)), NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[AuthorPlans] OFF
GO
SET IDENTITY_INSERT [dbo].[Authors] ON 
GO
INSERT [dbo].[Authors] ([AuthorId], [Code], [Name], [Imagen], [Email], [Tel], [Prefix], [PrefixFact], [PrefixOrder], [StartDate], [IsAutoPay], [PrefixNcf], [SeqNcf], [PrefixNcfGub], [SeqNcfGub], [PrefixFinalFact], [NcfEnds], [SeqFact], [AuthorTypeId], [AuthorPlanId], [StatusId], [SeqOrd], [IsBarber], [IsGeneral], [IsMedical], [AvailableEmailMessages], [AvailableSmsMessages], [AvailableWsMessages], [NotificationWsBody], [UpdateMessagesAvailability], [NotificationEmailBody], [NotificationSmsBody], [LastEmailReminderDate], [LastWhatsAppReminderDate], [PrefixLiq], [SeqLiq], [TenantId], [TotalEmailUsed], [TotalSmsUsed], [TotalWhatsAppUsed], [HideBuyPriceInProducts], [HideCategoryInProducts], [HideCodeInProducts], [HideMeasureInProducts], [HideTaxInProducts], [PercentageServiceNegotiated], [TaxToRetain], [AdministrativeCommissionPercentage], [DiscountRate], [ISRPercentage], [ReservePercentage], [Address], [Exequatur], [RNC], [NotificationWhatsAppWebBody], [SeqPurchase], [PrefixPurchase]) VALUES (1, N'SOLMED', N'SOLMED', NULL, N'solmed@gmail.com', N'84763333', N'E-', N'F-', N'O-', NULL, 1, N'23456045000000', 978, N'63456045000000', 162, NULL, NULL, 15, 1, 2, 1, 2, 0, 0, 1, 250, 25, 25, N'Recordatorio de Cita con:  {DoctorName},\n\nHola {PatientName},\n\nEste es un recordatorio de tu cita el {AppointmentDate} con {DoctorName}.\n\nRazón: {VisitReason}\n\nNotas: {Notes}\n\nRecuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente, {ClinicName}', CAST(N'2024-12-01T20:00:07.7313137' AS DateTime2), N'<h1>Hola: {0}</h1><p>Este es un recordatorio de la cita que tienes el dia: <strong>{1:dd/MM/yyyy}</strong></p><p>Para: {2} </p><br><p> {3} </p><br><br>Recuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente: {4}<br><hr><p><span style=''color: #0000ff;''>Has recibido esta Notificación enviada desde el <strong>Sistema de Coordinacion de Citas</strong> <strong>SolMed</strong>, ya que uno de nuestros colaboradores tiene registrado tus datos en nuestro sistema, si entiendes que esto es un error, favor notifícalo escribiendo un mail a: <strong><a href=''mailto:info@solmedapp.com''>Info@solmedapp.com</a></strong> con el asunto : ''<strong>Remover mis datos de SOLMED</strong>''</span></p> <p> <br> Visita nuestra pagina web para mas información <a href = ''http://solmed.app/''><strong> www.solmed.app </strong ></a></p>', N'Recordatorio de Cita con:  {DoctorName},\n\nHola {PatientName},\n\nEste es un recordatorio de tu cita el {AppointmentDate} con {DoctorName}.\n\nRazón: {VisitReason}\n\nNotas: {Notes}\n\nRecuerda, que las cancelaciones no notificadas con el suficiente tiempo de antelación, podria generar cargos, según las politicas individuales de cada colaborador, se despide cordialmente, {ClinicName}', NULL, NULL, NULL, 0, N'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL)
GO
SET IDENTITY_INSERT [dbo].[Authors] OFF
GO
SET IDENTITY_INSERT [dbo].[AuthorTypes] ON 
GO
INSERT [dbo].[AuthorTypes] ([AuthorTypeId], [Name]) VALUES (1, N'Empresa')
GO
INSERT [dbo].[AuthorTypes] ([AuthorTypeId], [Name]) VALUES (2, N'Persona')
GO
SET IDENTITY_INSERT [dbo].[AuthorTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[BirthInformations] ON 
GO
INSERT [dbo].[BirthInformations] ([Id], [AdmissionDate], [PrenatalConsultationsTotal], [HasPrenatalCard], [FirstConsultationGestationalAgeWeeks], [FirstConsultationGestationalAgeDays], [HospitalizedDuringPregnancy], [HospitalizationDays], [Companion], [CorticosteroidsComplete], [CorticosteroidsIncomplete], [CorticosteroidsNA], [GestationalAgeAtBirthWeeks], [GestationalAgeAtBirthDays], [GestationalAgeByLMP], [GestationalAgeByUltrasound], [CephalicPresentation], [PelvicPresentation], [TransverseSituation], [FetalSizeAppropriate], [SpontaneousOnset], [InducedOnset], [ElectiveCesareanOnset], [MembraneRupture], [MembraneRuptureDate], [MembraneRuptureTime], [MembraneRuptureMoreThan18Hours], [FeverDuringLabor], [Chorioamnionitis], [MeconiumStainedLiquor], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [SpontaneousBirth], [ForcepsBirth], [VacuumBirth], [CesareanBirth], [BirthTime], [BirthDate], [MultipleBirth], [BirthOrder], [DeadBirthDuringLaborUnknown], [DeadBirthBeforeLabor], [DeadBirthDuringLabor], [Episiotomy], [Tear], [TearGrade], [ManualRemovalOfPlacenta], [RetainedPlacenta], [CompletePlacenta], [PreDeliveryCordClamping], [PostDeliveryCordClamping], [LocalAnesthesia], [RegionalAnesthesia], [GeneralAnesthesia], [OxytocicsInLabor], [AntibioticsTreatment], [AnalgesiaTreatment], [OtherMedicationOne], [OtherMedicationOneDetail], [OtherMedicationTwo], [OtherMedicationTwoDetail], [MainIndicationForInductionOrOperativeDelivery], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [PerinatalHistoryRecordId], [IsLiveBirth], [BirthType], [MembraneRuptureBefore37Weeks], [CorticosteroidsNone], [CorticosteroidsStartWeek], [FeverTemperature], [CompanionP], [BirthHIVTest], [BirthSyphilisTest], [BirthTARV], [PartogramDetails], [BirthPosition], [CordClampingTime], [InductionCode], [MagnesiumSulfateEclampsia], [MagnesiumSulfatePreeclampsia], [OperativeCode], [OtherTermination], [OxytocicsPostDelivery], [OxytocicsPreDelivery], [Transfusion]) VALUES (9, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 0, 0, 0, 0, 0, 0, N'1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), N'2', 0, 0, 1, 1, 0, 0, N'1', N'1', 0, 0, CAST(0.00 AS Decimal(18, 2)), N'1', N'1', 0, N'1', 0, 0, 0, 0, N'12-12-2012', CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 0, N'12', 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, N'12', 0, N'2', N'3', 0, 0, 0, 0, 0, N'1', 9, 1, 1, 0, 0, 0, CAST(1.0 AS Decimal(4, 1)), N'1', 1, 1, 1, 1, N'1', 1, N'1', 1, 1, N'1', 0, 1, 1, 1)
GO
INSERT [dbo].[BirthInformations] ([Id], [AdmissionDate], [PrenatalConsultationsTotal], [HasPrenatalCard], [FirstConsultationGestationalAgeWeeks], [FirstConsultationGestationalAgeDays], [HospitalizedDuringPregnancy], [HospitalizationDays], [Companion], [CorticosteroidsComplete], [CorticosteroidsIncomplete], [CorticosteroidsNA], [GestationalAgeAtBirthWeeks], [GestationalAgeAtBirthDays], [GestationalAgeByLMP], [GestationalAgeByUltrasound], [CephalicPresentation], [PelvicPresentation], [TransverseSituation], [FetalSizeAppropriate], [SpontaneousOnset], [InducedOnset], [ElectiveCesareanOnset], [MembraneRupture], [MembraneRuptureDate], [MembraneRuptureTime], [MembraneRuptureMoreThan18Hours], [FeverDuringLabor], [Chorioamnionitis], [MeconiumStainedLiquor], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [SpontaneousBirth], [ForcepsBirth], [VacuumBirth], [CesareanBirth], [BirthTime], [BirthDate], [MultipleBirth], [BirthOrder], [DeadBirthDuringLaborUnknown], [DeadBirthBeforeLabor], [DeadBirthDuringLabor], [Episiotomy], [Tear], [TearGrade], [ManualRemovalOfPlacenta], [RetainedPlacenta], [CompletePlacenta], [PreDeliveryCordClamping], [PostDeliveryCordClamping], [LocalAnesthesia], [RegionalAnesthesia], [GeneralAnesthesia], [OxytocicsInLabor], [AntibioticsTreatment], [AnalgesiaTreatment], [OtherMedicationOne], [OtherMedicationOneDetail], [OtherMedicationTwo], [OtherMedicationTwoDetail], [MainIndicationForInductionOrOperativeDelivery], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [PerinatalHistoryRecordId], [IsLiveBirth], [BirthType], [MembraneRuptureBefore37Weeks], [CorticosteroidsNone], [CorticosteroidsStartWeek], [FeverTemperature], [CompanionP], [BirthHIVTest], [BirthSyphilisTest], [BirthTARV], [PartogramDetails], [BirthPosition], [CordClampingTime], [InductionCode], [MagnesiumSulfateEclampsia], [MagnesiumSulfatePreeclampsia], [OperativeCode], [OtherTermination], [OxytocicsPostDelivery], [OxytocicsPreDelivery], [Transfusion]) VALUES (10, CAST(N'2026-07-18T08:30:00.0000000' AS DateTime2), 8, 1, 8, 0, 0, 0, N'Esposo', 0, 0, 1, 39, 2, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, CAST(N'2026-07-18T00:00:00.0000000' AS DateTime2), N'06:30', 0, 0, 0, 0, 8, 30, N'Lateral', N'120/80', 80, 3, CAST(5.00 AS Decimal(18, 2)), N'-2', N'OIA', 0, N'0', 1, 0, 0, 0, N'14:25', CAST(N'2026-07-18T00:00:00.0000000' AS DateTime2), 0, N'1', 0, 0, 0, 1, 0, NULL, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, N'2', 0, N'2', N'2', 1, 1, 0, 0, 0, N'Dr. García', 10, 1, NULL, 0, 0, 0, CAST(1.0 AS Decimal(4, 1)), N'1', 1, 1, 0, 1, N'Litotomía', NULL, N'1', 1, 1, N'1', 0, 1, 0, 0)
GO
INSERT [dbo].[BirthInformations] ([Id], [AdmissionDate], [PrenatalConsultationsTotal], [HasPrenatalCard], [FirstConsultationGestationalAgeWeeks], [FirstConsultationGestationalAgeDays], [HospitalizedDuringPregnancy], [HospitalizationDays], [Companion], [CorticosteroidsComplete], [CorticosteroidsIncomplete], [CorticosteroidsNA], [GestationalAgeAtBirthWeeks], [GestationalAgeAtBirthDays], [GestationalAgeByLMP], [GestationalAgeByUltrasound], [CephalicPresentation], [PelvicPresentation], [TransverseSituation], [FetalSizeAppropriate], [SpontaneousOnset], [InducedOnset], [ElectiveCesareanOnset], [MembraneRupture], [MembraneRuptureDate], [MembraneRuptureTime], [MembraneRuptureMoreThan18Hours], [FeverDuringLabor], [Chorioamnionitis], [MeconiumStainedLiquor], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [SpontaneousBirth], [ForcepsBirth], [VacuumBirth], [CesareanBirth], [BirthTime], [BirthDate], [MultipleBirth], [BirthOrder], [DeadBirthDuringLaborUnknown], [DeadBirthBeforeLabor], [DeadBirthDuringLabor], [Episiotomy], [Tear], [TearGrade], [ManualRemovalOfPlacenta], [RetainedPlacenta], [CompletePlacenta], [PreDeliveryCordClamping], [PostDeliveryCordClamping], [LocalAnesthesia], [RegionalAnesthesia], [GeneralAnesthesia], [OxytocicsInLabor], [AntibioticsTreatment], [AnalgesiaTreatment], [OtherMedicationOne], [OtherMedicationOneDetail], [OtherMedicationTwo], [OtherMedicationTwoDetail], [MainIndicationForInductionOrOperativeDelivery], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [PerinatalHistoryRecordId], [IsLiveBirth], [BirthType], [MembraneRuptureBefore37Weeks], [CorticosteroidsNone], [CorticosteroidsStartWeek], [FeverTemperature], [CompanionP], [BirthHIVTest], [BirthSyphilisTest], [BirthTARV], [PartogramDetails], [BirthPosition], [CordClampingTime], [InductionCode], [MagnesiumSulfateEclampsia], [MagnesiumSulfatePreeclampsia], [OperativeCode], [OtherTermination], [OxytocicsPostDelivery], [OxytocicsPreDelivery], [Transfusion]) VALUES (11, CAST(N'2026-02-18T00:00:00.0000000' AS DateTime2), 1, 0, 1, 0, 1, 1, N'pareja', 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, CAST(N'2026-02-17T00:00:00.0000000' AS DateTime2), N'15:35', 1, 1, NULL, 1, 1, 1, NULL, NULL, 0, 0, CAST(0.00 AS Decimal(18, 2)), NULL, NULL, 0, NULL, 0, 0, 0, 0, N'15:34', CAST(N'2026-02-17T00:00:00.0000000' AS DateTime2), 0, N'1', 1, 0, 0, 0, 0, 2, NULL, 0, 1, NULL, NULL, 0, 0, 0, 0, 0, 0, 0, N'2', 0, N'2', N'1', 0, 0, 0, 0, 0, NULL, 11, 0, 1, 1, 0, 1, CAST(1.0 AS Decimal(4, 1)), N'pareja', 1, 3, 1, 1, N'sentada', 1, N'1', 0, 0, N'1', 1, 1, 0, 1)
GO
SET IDENTITY_INSERT [dbo].[BirthInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[BloodTypes] ON 
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (1, N'_D', N'_Desconocido')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (2, N'O+', N'O+')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (3, N'A+', N'A+')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (4, N'B+', N'B+')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (5, N'AB+', N'AB+')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (6, N'O-', N'O-')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (7, N'A-', N'A-')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (8, N'B-', N'B-')
GO
INSERT [dbo].[BloodTypes] ([BloodTypeId], [Code], [Name]) VALUES (9, N'AB-', N'AB-')
GO
SET IDENTITY_INSERT [dbo].[BloodTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Continents] ON 
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (1, N'AS', N'Asia', N'Asiatic@')
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (2, N'AM', N'America', N'American@')
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (3, N'AF', N'África', N'African@')
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (4, N'AN', N'Antártida', N'Antartic@')
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (5, N'EU', N'AEuropa', N'Europe@')
GO
INSERT [dbo].[Continents] ([ContinentId], [Code], [Name], [Demonym]) VALUES (6, N'OC', N'Oceanía', N'Oceanic@')
GO
SET IDENTITY_INSERT [dbo].[Continents] OFF
GO
SET IDENTITY_INSERT [dbo].[ContraceptionInformations] ON 
GO
INSERT [dbo].[ContraceptionInformations] ([Id], [OralCounseling], [WrittenCounseling], [NoCounseling], [ContraceptionMethodInitiated], [OralContraceptives], [OralContraceptivesPreferred], [OralContraceptivesAccepted], [OtherHormonalMethods], [OtherHormonalMethodsPreferred], [OtherHormonalMethodsAccepted], [IUD], [IUDPreferred], [IUDAccepted], [Injectable], [InjectablePreferred], [InjectableAccepted], [Implant], [ImplantPreferred], [ImplantAccepted], [Barrier], [BarrierPreferred], [BarrierAccepted], [FemaleSterilization], [FemaleSterilizationPreferred], [FemaleSterilizationAccepted], [MaleSterilization], [MaleSterilizationPreferred], [MaleSterilizationAccepted], [NaturalMethod], [NaturalMethodPreferred], [NaturalMethodAccepted], [PerinatalHistoryRecordId], [Condom], [CondomAccepted], [CondomPreferred], [ResponsiblePerson]) VALUES (9, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 9, 1, 0, 0, N'')
GO
INSERT [dbo].[ContraceptionInformations] ([Id], [OralCounseling], [WrittenCounseling], [NoCounseling], [ContraceptionMethodInitiated], [OralContraceptives], [OralContraceptivesPreferred], [OralContraceptivesAccepted], [OtherHormonalMethods], [OtherHormonalMethodsPreferred], [OtherHormonalMethodsAccepted], [IUD], [IUDPreferred], [IUDAccepted], [Injectable], [InjectablePreferred], [InjectableAccepted], [Implant], [ImplantPreferred], [ImplantAccepted], [Barrier], [BarrierPreferred], [BarrierAccepted], [FemaleSterilization], [FemaleSterilizationPreferred], [FemaleSterilizationAccepted], [MaleSterilization], [MaleSterilizationPreferred], [MaleSterilizationAccepted], [NaturalMethod], [NaturalMethodPreferred], [NaturalMethodAccepted], [PerinatalHistoryRecordId], [Condom], [CondomAccepted], [CondomPreferred], [ResponsiblePerson]) VALUES (10, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 10, 0, 0, 0, N'Dra. López')
GO
INSERT [dbo].[ContraceptionInformations] ([Id], [OralCounseling], [WrittenCounseling], [NoCounseling], [ContraceptionMethodInitiated], [OralContraceptives], [OralContraceptivesPreferred], [OralContraceptivesAccepted], [OtherHormonalMethods], [OtherHormonalMethodsPreferred], [OtherHormonalMethodsAccepted], [IUD], [IUDPreferred], [IUDAccepted], [Injectable], [InjectablePreferred], [InjectableAccepted], [Implant], [ImplantPreferred], [ImplantAccepted], [Barrier], [BarrierPreferred], [BarrierAccepted], [FemaleSterilization], [FemaleSterilizationPreferred], [FemaleSterilizationAccepted], [MaleSterilization], [MaleSterilizationPreferred], [MaleSterilizationAccepted], [NaturalMethod], [NaturalMethodPreferred], [NaturalMethodAccepted], [PerinatalHistoryRecordId], [Condom], [CondomAccepted], [CondomPreferred], [ResponsiblePerson]) VALUES (11, 1, 1, 1, 1, NULL, 1, 1, NULL, 1, 1, NULL, 1, 1, NULL, 1, 1, NULL, 1, 0, NULL, 1, 1, NULL, 1, 1, NULL, 1, 0, NULL, 1, 0, 11, NULL, 0, 1, N'7777')
GO
SET IDENTITY_INSERT [dbo].[ContraceptionInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[Countries] ON 
GO
INSERT [dbo].[Countries] ([CountryId], [Code], [Name], [Demonym], [Imagen], [ContinentId]) VALUES (1, N'RD', N'_Republica Dominicana', N'_Dominican@', NULL, NULL)
GO
INSERT [dbo].[Countries] ([CountryId], [Code], [Name], [Demonym], [Imagen], [ContinentId]) VALUES (2, N'Ha', N'Haiti', N'Haitian@', NULL, NULL)
GO
INSERT [dbo].[Countries] ([CountryId], [Code], [Name], [Demonym], [Imagen], [ContinentId]) VALUES (3, N'Ven', N'Venezuela', N'Venezolano', NULL, NULL)
GO
INSERT [dbo].[Countries] ([CountryId], [Code], [Name], [Demonym], [Imagen], [ContinentId]) VALUES (4, N'O', N'Otros', N'Extranjero', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Countries] OFF
GO
SET IDENTITY_INSERT [dbo].[Currencies] ON 
GO
INSERT [dbo].[Currencies] ([CurrencyId], [Code], [Name]) VALUES (1, N'DOP', N'Pesos Dominicanos')
GO
INSERT [dbo].[Currencies] ([CurrencyId], [Code], [Name]) VALUES (2, N'USD', N'Dollar')
GO
INSERT [dbo].[Currencies] ([CurrencyId], [Code], [Name]) VALUES (3, N'EUR', N'Euro')
GO
SET IDENTITY_INSERT [dbo].[Currencies] OFF
GO
SET IDENTITY_INSERT [dbo].[CurrentPregnancies] ON 
GO
INSERT [dbo].[CurrentPregnancies] ([Id], [LastMenstrualPeriod], [EstimatedDueDate], [PreviousWeight], [Height], [ReliableGestationalAge], [GestationalAgeReliabilityMethod], [NormalDentalExamination], [NormalBreastExamination], [OlderThan35], [YoungerThan15], [VaccineTetanusDiphtheria], [VaccineInfluenza], [VaccineRubella], [VaccineHepatitisB], [BloodGroupType], [RhFactorType], [RhSensitization], [AntiDImmunoglobulinLessThan20Weeks], [AntiDImmunoglobulinGreaterOrEqual20Weeks], [CervixPapExam], [CervixColposcopy], [CervixVisualInspection], [MalariaTestResult], [ChagasTestResult], [BacteriuriaTestResultLessThan20Weeks], [BacteriuriaTestResultGreaterOrEqual20Weeks], [ToxoplasmosisIgGLessThan20Weeks], [ToxoplasmosisIgGGreaterOrEqual20Weeks], [ToxoplasmosisIgMLessThan20Weeks], [ToxoplasmosisIgMGreaterOrEqual20Weeks], [GlucoseLessThan20Weeks], [GlucoseGreaterOrEqual30Weeks], [HemoglobinLessThan20Weeks], [HemoglobinGreaterOrEqual20Weeks], [IronFolateSupplementsIndicated], [IronSupplements], [FolateSupplements], [StreptococcusBTest3537Weeks], [BirthPreparation], [BreastfeedingCounseling], [HIVTestRequestedLessThan20Weeks], [HIVTestResultLessThan20Weeks], [HIVARTLessThan20Weeks], [HIVTestRequestedGreaterOrEqual20Weeks], [HIVTestResultGreaterOrEqual20Weeks], [HIVARTGreaterOrEqual20Weeks], [SyphilisTestLessThan20Weeks], [SyphilisTestTypeLessThan20Weeks], [SyphilisTreatmentLessThan20Weeks], [PartnerTreatmentLessThan20Weeks], [SyphilisTreatmentWeeksLessThan20Weeks], [SyphilisTestGreaterOrEqual20Weeks], [SyphilisTestTypeGreaterOrEqual20Weeks], [SyphilisTreatmentGreaterOrEqual20Weeks], [PartnerTreatmentGreaterOrEqual20Weeks], [SyphilisTreatmentWeeksGreaterOrEqual20Weeks], [HepatitisB], [PerinatalHistoryRecordId], [AlcoholUseFirstTrimester], [AlcoholUseSecondTrimester], [AlcoholUseThirdTrimester], [DrugUseFirstTrimester], [DrugUseSecondTrimester], [DrugUseThirdTrimester], [HepatitisBScreening], [PassiveSmokingFirstTrimester], [PassiveSmokingSecondTrimester], [PassiveSmokingThirdTrimester], [ReliableByEchoLessThan20Weeks], [ReliableByFUM], [SmokingFirstTrimester], [SmokingSecondTrimester], [SmokingThirdTrimester], [VaccineHepatitisADate], [VaccineHepatitisAGestationalWeeks], [VaccineHepatitisATime], [VaccineHepatitisATotalDoses], [VaccineHepatitisBDate], [VaccineHepatitisBGestationalWeeks], [VaccineHepatitisBTime], [VaccineHepatitisBTotalDoses], [VaccineInfluenzaDate], [VaccineInfluenzaGestationalWeeks], [VaccineInfluenzaTime], [VaccineInfluenzaTotalDoses], [VaccineRubellaDate], [VaccineRubellaGestationalWeeks], [VaccineRubellaTime], [VaccineRubellaTotalDoses], [VaccineTdapDate], [VaccineTdapGestationalWeeks], [VaccineTdapTime], [VaccineTdapTotalDoses], [VaccineTetanusDiphtheriaDate], [VaccineTetanusDiphtheriaGestationalWeeks], [VaccineTetanusDiphtheriaTime], [VaccineTetanusDiphtheriaTotalDoses], [ViolenceFirstTrimester], [ViolenceSecondTrimester], [ViolenceThirdTrimester], [FolateSupplementsLessThan20Weeks], [IronSupplementsGreaterOrEqual20Weeks], [AnemiaGreaterOrEqual20Weeks], [AnemiaLessThan20Weeks], [AntiDImmunoglobulin], [SyphilisNonTreponemalResultGreaterOrEqual20Weeks], [SyphilisNonTreponemalResultLessThan20Weeks], [SyphilisPartnerTreatmentGreaterOrEqual20Weeks], [SyphilisPartnerTreatmentLessThan20Weeks], [SyphilisTreatmentOptionGreaterOrEqual20Weeks], [SyphilisTreatmentOptionLessThan20Weeks], [SyphilisTreponemalResultGreaterOrEqual20Weeks], [SyphilisTreponemalResultLessThan20Weeks]) VALUES (9, CAST(N'2025-10-19T21:45:49.0558891' AS DateTime2), CAST(N'2026-07-19T21:45:49.0559537' AS DateTime2), CAST(1.00 AS Decimal(18, 2)), CAST(1.00 AS Decimal(18, 2)), 1, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, 0, 0, N'1', 0, 0, 1, 1, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 1, N'1', 1, 1, 1, 1, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-01-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-01-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1)
GO
INSERT [dbo].[CurrentPregnancies] ([Id], [LastMenstrualPeriod], [EstimatedDueDate], [PreviousWeight], [Height], [ReliableGestationalAge], [GestationalAgeReliabilityMethod], [NormalDentalExamination], [NormalBreastExamination], [OlderThan35], [YoungerThan15], [VaccineTetanusDiphtheria], [VaccineInfluenza], [VaccineRubella], [VaccineHepatitisB], [BloodGroupType], [RhFactorType], [RhSensitization], [AntiDImmunoglobulinLessThan20Weeks], [AntiDImmunoglobulinGreaterOrEqual20Weeks], [CervixPapExam], [CervixColposcopy], [CervixVisualInspection], [MalariaTestResult], [ChagasTestResult], [BacteriuriaTestResultLessThan20Weeks], [BacteriuriaTestResultGreaterOrEqual20Weeks], [ToxoplasmosisIgGLessThan20Weeks], [ToxoplasmosisIgGGreaterOrEqual20Weeks], [ToxoplasmosisIgMLessThan20Weeks], [ToxoplasmosisIgMGreaterOrEqual20Weeks], [GlucoseLessThan20Weeks], [GlucoseGreaterOrEqual30Weeks], [HemoglobinLessThan20Weeks], [HemoglobinGreaterOrEqual20Weeks], [IronFolateSupplementsIndicated], [IronSupplements], [FolateSupplements], [StreptococcusBTest3537Weeks], [BirthPreparation], [BreastfeedingCounseling], [HIVTestRequestedLessThan20Weeks], [HIVTestResultLessThan20Weeks], [HIVARTLessThan20Weeks], [HIVTestRequestedGreaterOrEqual20Weeks], [HIVTestResultGreaterOrEqual20Weeks], [HIVARTGreaterOrEqual20Weeks], [SyphilisTestLessThan20Weeks], [SyphilisTestTypeLessThan20Weeks], [SyphilisTreatmentLessThan20Weeks], [PartnerTreatmentLessThan20Weeks], [SyphilisTreatmentWeeksLessThan20Weeks], [SyphilisTestGreaterOrEqual20Weeks], [SyphilisTestTypeGreaterOrEqual20Weeks], [SyphilisTreatmentGreaterOrEqual20Weeks], [PartnerTreatmentGreaterOrEqual20Weeks], [SyphilisTreatmentWeeksGreaterOrEqual20Weeks], [HepatitisB], [PerinatalHistoryRecordId], [AlcoholUseFirstTrimester], [AlcoholUseSecondTrimester], [AlcoholUseThirdTrimester], [DrugUseFirstTrimester], [DrugUseSecondTrimester], [DrugUseThirdTrimester], [HepatitisBScreening], [PassiveSmokingFirstTrimester], [PassiveSmokingSecondTrimester], [PassiveSmokingThirdTrimester], [ReliableByEchoLessThan20Weeks], [ReliableByFUM], [SmokingFirstTrimester], [SmokingSecondTrimester], [SmokingThirdTrimester], [VaccineHepatitisADate], [VaccineHepatitisAGestationalWeeks], [VaccineHepatitisATime], [VaccineHepatitisATotalDoses], [VaccineHepatitisBDate], [VaccineHepatitisBGestationalWeeks], [VaccineHepatitisBTime], [VaccineHepatitisBTotalDoses], [VaccineInfluenzaDate], [VaccineInfluenzaGestationalWeeks], [VaccineInfluenzaTime], [VaccineInfluenzaTotalDoses], [VaccineRubellaDate], [VaccineRubellaGestationalWeeks], [VaccineRubellaTime], [VaccineRubellaTotalDoses], [VaccineTdapDate], [VaccineTdapGestationalWeeks], [VaccineTdapTime], [VaccineTdapTotalDoses], [VaccineTetanusDiphtheriaDate], [VaccineTetanusDiphtheriaGestationalWeeks], [VaccineTetanusDiphtheriaTime], [VaccineTetanusDiphtheriaTotalDoses], [ViolenceFirstTrimester], [ViolenceSecondTrimester], [ViolenceThirdTrimester], [FolateSupplementsLessThan20Weeks], [IronSupplementsGreaterOrEqual20Weeks], [AnemiaGreaterOrEqual20Weeks], [AnemiaLessThan20Weeks], [AntiDImmunoglobulin], [SyphilisNonTreponemalResultGreaterOrEqual20Weeks], [SyphilisNonTreponemalResultLessThan20Weeks], [SyphilisPartnerTreatmentGreaterOrEqual20Weeks], [SyphilisPartnerTreatmentLessThan20Weeks], [SyphilisTreatmentOptionGreaterOrEqual20Weeks], [SyphilisTreatmentOptionLessThan20Weeks], [SyphilisTreponemalResultGreaterOrEqual20Weeks], [SyphilisTreponemalResultLessThan20Weeks]) VALUES (10, CAST(N'2025-10-19T21:48:19.0393703' AS DateTime2), CAST(N'2026-07-19T21:48:19.0394521' AS DateTime2), CAST(1.00 AS Decimal(18, 2)), CAST(1.00 AS Decimal(18, 2)), 1, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, 0, 0, N'1', 0, 0, 1, 1, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 1, N'1', 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-01-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-01-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1)
GO
INSERT [dbo].[CurrentPregnancies] ([Id], [LastMenstrualPeriod], [EstimatedDueDate], [PreviousWeight], [Height], [ReliableGestationalAge], [GestationalAgeReliabilityMethod], [NormalDentalExamination], [NormalBreastExamination], [OlderThan35], [YoungerThan15], [VaccineTetanusDiphtheria], [VaccineInfluenza], [VaccineRubella], [VaccineHepatitisB], [BloodGroupType], [RhFactorType], [RhSensitization], [AntiDImmunoglobulinLessThan20Weeks], [AntiDImmunoglobulinGreaterOrEqual20Weeks], [CervixPapExam], [CervixColposcopy], [CervixVisualInspection], [MalariaTestResult], [ChagasTestResult], [BacteriuriaTestResultLessThan20Weeks], [BacteriuriaTestResultGreaterOrEqual20Weeks], [ToxoplasmosisIgGLessThan20Weeks], [ToxoplasmosisIgGGreaterOrEqual20Weeks], [ToxoplasmosisIgMLessThan20Weeks], [ToxoplasmosisIgMGreaterOrEqual20Weeks], [GlucoseLessThan20Weeks], [GlucoseGreaterOrEqual30Weeks], [HemoglobinLessThan20Weeks], [HemoglobinGreaterOrEqual20Weeks], [IronFolateSupplementsIndicated], [IronSupplements], [FolateSupplements], [StreptococcusBTest3537Weeks], [BirthPreparation], [BreastfeedingCounseling], [HIVTestRequestedLessThan20Weeks], [HIVTestResultLessThan20Weeks], [HIVARTLessThan20Weeks], [HIVTestRequestedGreaterOrEqual20Weeks], [HIVTestResultGreaterOrEqual20Weeks], [HIVARTGreaterOrEqual20Weeks], [SyphilisTestLessThan20Weeks], [SyphilisTestTypeLessThan20Weeks], [SyphilisTreatmentLessThan20Weeks], [PartnerTreatmentLessThan20Weeks], [SyphilisTreatmentWeeksLessThan20Weeks], [SyphilisTestGreaterOrEqual20Weeks], [SyphilisTestTypeGreaterOrEqual20Weeks], [SyphilisTreatmentGreaterOrEqual20Weeks], [PartnerTreatmentGreaterOrEqual20Weeks], [SyphilisTreatmentWeeksGreaterOrEqual20Weeks], [HepatitisB], [PerinatalHistoryRecordId], [AlcoholUseFirstTrimester], [AlcoholUseSecondTrimester], [AlcoholUseThirdTrimester], [DrugUseFirstTrimester], [DrugUseSecondTrimester], [DrugUseThirdTrimester], [HepatitisBScreening], [PassiveSmokingFirstTrimester], [PassiveSmokingSecondTrimester], [PassiveSmokingThirdTrimester], [ReliableByEchoLessThan20Weeks], [ReliableByFUM], [SmokingFirstTrimester], [SmokingSecondTrimester], [SmokingThirdTrimester], [VaccineHepatitisADate], [VaccineHepatitisAGestationalWeeks], [VaccineHepatitisATime], [VaccineHepatitisATotalDoses], [VaccineHepatitisBDate], [VaccineHepatitisBGestationalWeeks], [VaccineHepatitisBTime], [VaccineHepatitisBTotalDoses], [VaccineInfluenzaDate], [VaccineInfluenzaGestationalWeeks], [VaccineInfluenzaTime], [VaccineInfluenzaTotalDoses], [VaccineRubellaDate], [VaccineRubellaGestationalWeeks], [VaccineRubellaTime], [VaccineRubellaTotalDoses], [VaccineTdapDate], [VaccineTdapGestationalWeeks], [VaccineTdapTime], [VaccineTdapTotalDoses], [VaccineTetanusDiphtheriaDate], [VaccineTetanusDiphtheriaGestationalWeeks], [VaccineTetanusDiphtheriaTime], [VaccineTetanusDiphtheriaTotalDoses], [ViolenceFirstTrimester], [ViolenceSecondTrimester], [ViolenceThirdTrimester], [FolateSupplementsLessThan20Weeks], [IronSupplementsGreaterOrEqual20Weeks], [AnemiaGreaterOrEqual20Weeks], [AnemiaLessThan20Weeks], [AntiDImmunoglobulin], [SyphilisNonTreponemalResultGreaterOrEqual20Weeks], [SyphilisNonTreponemalResultLessThan20Weeks], [SyphilisPartnerTreatmentGreaterOrEqual20Weeks], [SyphilisPartnerTreatmentLessThan20Weeks], [SyphilisTreatmentOptionGreaterOrEqual20Weeks], [SyphilisTreatmentOptionLessThan20Weeks], [SyphilisTreponemalResultGreaterOrEqual20Weeks], [SyphilisTreponemalResultLessThan20Weeks]) VALUES (11, CAST(N'2026-02-09T00:00:00.0000000' AS DateTime2), CAST(N'2026-11-16T00:00:00.0000000' AS DateTime2), CAST(11.00 AS Decimal(18, 2)), CAST(12.00 AS Decimal(18, 2)), NULL, NULL, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 2, NULL, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, N'Positive', N'Positive', N'Positive', NULL, CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), CAST(1.00 AS Decimal(10, 2)), CAST(1.00 AS Decimal(10, 2)), NULL, 0, 0, NULL, 0, 0, 2, 1, 3, 2, 4, 2, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 3, NULL, 11, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, CAST(N'2026-02-03T00:00:00.0000000' AS DateTime2), 1, 4, NULL, CAST(N'2026-02-27T00:00:00.0000000' AS DateTime2), 2, 3, NULL, CAST(N'2026-02-28T00:00:00.0000000' AS DateTime2), 2, 2, NULL, CAST(N'2026-01-29T00:00:00.0000000' AS DateTime2), 1, 1, NULL, CAST(N'2026-02-05T00:00:00.0000000' AS DateTime2), 1, 2, NULL, CAST(N'2026-02-27T00:00:00.0000000' AS DateTime2), 2, 1, 1, 1, 2, 1, 0, 0, 1, 1, 2, NULL, 3, 1, 3, NULL, 1, 1, 3)
GO
SET IDENTITY_INSERT [dbo].[CurrentPregnancies] OFF
GO
SET IDENTITY_INSERT [dbo].[Genders] ON 
GO
INSERT [dbo].[Genders] ([GenderId], [Name]) VALUES (1, N'_M')
GO
INSERT [dbo].[Genders] ([GenderId], [Name]) VALUES (2, N'F')
GO
INSERT [dbo].[Genders] ([GenderId], [Name]) VALUES (3, N'I')
GO
SET IDENTITY_INSERT [dbo].[Genders] OFF
GO
SET IDENTITY_INSERT [dbo].[Insurances] ON 
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (1, N'N/A', N'_PRIVADO, Desconocido o No Aplica', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (2, N'APS', N'ARS APS', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (3, N'ASEMAP', N'ARS ASEMAP', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (4, N'BMI', N'ARS BMI', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (5, N'CMD', N'ARS CMD (Colegio Médico Dominicano)', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (6, N'Bupa', N'Bupa Dominicana, S.A.', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (7, N'APSa', N'Compañia de Seguros APS, S.R.L.', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (8, N'COOPSEGUROS', N'Cooperativa Nacional de Seguros, C por A', 0, N'C/Hnos. Deligne No. 156.
Gascue, Santo Domingo, R.D.
Tel.: (809) 682-6118 / 6313
Email:coop.seguros@verizon.net.do', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (9, N'General de Seguros', N'General de Seguros, S.A. ', 0, N'Av. Sarasota No. 39, Torre Sarasota Center,
Bella Vista, Apartado 2183
Santo Domingo, R.D.
Tel.: (809) 535-8888', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (10, N'La Colonial', N'La Colonial, S.A. ', 0, N'Av. Sarasota No. 75, Bella Vista
Santo Domingo, R.D.
Tel.: (809) 508-0707 / (809) 533-8969
Fax: (809) 508-0608
Email: luis.guerrero@lacolonial.com.do', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (11, N'La Monumental', N'La Monumental de Seguros, C por A ', 0, N'Max Henríquez Ureña No.79
Santo Domingo, R.D.
Tel.: (809) 686-4744 - Fax: (809) 685-5381
www.lamonumental.com.do', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (12, N'Mehr', N'Multiseguros Mehr, S.A. ', 0, N'Av. Lope de Vega, Torre Novocentro,
Piso 3, Suite C8C
Ensanche Naco, Santo Domingo, D.N.
Tel.: (809) 378-1820', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (13, N'REHSA', N'REHSA Compañía de Seguros y Reaseguros, S.A.', 0, N'Av. Gustavo Mejía Ricart No.8, 
Edif. Angloamericana, 2do nivel,
El Millón, Santo Domingo, D.N.
Tel.: (809) 548-7171', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (14, N'Ademi', N'Seguros Ademi, S.A.', 0, N'Calle Madame Curie No. 21, La Esperilla 
Santo Domingo, D.N.
Tel.: (809) 683-0203 ext.2616', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (15, N'Patria', N'Seguros Patria, S. A. ', 0, N'Av. 27 de Febrero #215, Entre Ortega y Gasset y 
Tiradentes, Ens. Naco, Santo Domingo, D.N.
Tel: (809) 547-1234 Reclam (809) 687-3151
1(809) 200-1160 - Fax: 809) 221-8128
Email: patria@verizon.net.do', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (16, N'Reservas', N'Seguros Reservas, S.A. ', 0, N'Av. Jiménez Moya, esq Calle 4 
Ens. La Paz, Santo Domingo, R.D.
Tel.: (809) 960-7200 - Fax: (809) 960-6148
Email: smahfoud@segbanreservas.com', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (17, N'Universal', N'Seguros Universal, S. A. ', 0, N'Av. Winston Churchill 1100, Apartado 1052
Santo Domingo, R.D.
Tels.: (809)544-7200 / (809) 544-7968
Fax: (809) 544-7914 - Santiago: (809) 530-5282
Email: universal.seguros@codetel.net.do', NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (18, N'Humano', N'Humano', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (19, N'Palic', N'Palic', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (20, N'Senasa Contributivo', N'Senasa Contributivo', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (21, N'Renacer ', N'Renacer ', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (22, N'Semma', N'Semma', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (23, N'Futuro', N'Futuro', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (24, N'Semunace', N'Semunace', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (25, N'Simag', N'Simag', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (26, N'Senasa Contributivo', N'Seg. UASD', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (27, N'UASD', N'UASD', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (28, N'GMA', N'GMA', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (29, N'Metasalud', N'Metasalud', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (30, N'F.F.A.A.', N'F.F.A.A.', 0, N'', N'')
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (43, N'MAPFRE', N'MAPFRE', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (44, N'IDOPPRIL', N'IDOPPRIL', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (45, N'Conani', N'Conani', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (46, N'Ayuntamiento', N'Ayuntamiento', 0, NULL, NULL)
GO
INSERT [dbo].[Insurances] ([InsuranceId], [Code], [Name], [ForSpecial], [AditionalInfo], [Rnc]) VALUES (47, N'Ministerio Publico', N'Ministerio Publico', 0, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Insurances] OFF
GO
SET IDENTITY_INSERT [dbo].[LaborEntries] ON 
GO
INSERT [dbo].[LaborEntries] ([Id], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [PerinatalHistoryRecordId]) VALUES (1, 1, 1, N'1', N'1', 1, 1, CAST(1.00 AS Decimal(10, 2)), N'1', N'1', 1, N'1', 9)
GO
INSERT [dbo].[LaborEntries] ([Id], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [PerinatalHistoryRecordId]) VALUES (2, 1, 1, N'sentada', N'1', 1, 1, CAST(1.00 AS Decimal(10, 2)), N'1', N'1', 1, N'1', 11)
GO
INSERT [dbo].[LaborEntries] ([Id], [LaborHour], [LaborMinute], [MaternalPosition], [BloodPressure], [Pulse], [ContractionsPerTenMinutes], [Dilation], [HeightPresentation], [PositionVariety], [MeconiumPresent], [FetalHeartRateDips], [PerinatalHistoryRecordId]) VALUES (3, 2, 2, N'acostada', N'2', 2, 2, CAST(2.00 AS Decimal(10, 2)), N'2', N'2', 1, N'2', 11)
GO
SET IDENTITY_INSERT [dbo].[LaborEntries] OFF
GO
SET IDENTITY_INSERT [dbo].[MaritalSituations] ON 
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (1, N'_N/A (Desconocido)')
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (2, N'Solter@')
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (3, N'Union Libre')
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (4, N'Casad@')
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (5, N'Divorciad@')
GO
INSERT [dbo].[MaritalSituations] ([MaritalSituationId], [Name]) VALUES (6, N'Viud@')
GO
SET IDENTITY_INSERT [dbo].[MaritalSituations] OFF
GO
SET IDENTITY_INSERT [dbo].[MaternalDischargeInformations] ON 
GO
INSERT [dbo].[MaternalDischargeInformations] ([Id], [DischargeDate], [DischargeTime], [DischargeCondition], [DischargeLocation], [Transferred], [DiedDuringOrInTransferLocation], [Autopsy], [DischargeType], [ResponsiblePerson], [AntiDImmunoglobulin], [PerinatalHistoryRecordId]) VALUES (9, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), N'12-12-2012', N'1', N'1', 1, 1, 1, N'1', N'1', 0, 9)
GO
INSERT [dbo].[MaternalDischargeInformations] ([Id], [DischargeDate], [DischargeTime], [DischargeCondition], [DischargeLocation], [Transferred], [DiedDuringOrInTransferLocation], [Autopsy], [DischargeType], [ResponsiblePerson], [AntiDImmunoglobulin], [PerinatalHistoryRecordId]) VALUES (10, CAST(N'2026-07-21T00:00:00.0000000' AS DateTime2), N'10:00', N'Sana', N'Domicilio', 0, 0, 0, N'Alta', N'Dra. López', 0, 10)
GO
INSERT [dbo].[MaternalDischargeInformations] ([Id], [DischargeDate], [DischargeTime], [DischargeCondition], [DischargeLocation], [Transferred], [DiedDuringOrInTransferLocation], [Autopsy], [DischargeType], [ResponsiblePerson], [AntiDImmunoglobulin], [PerinatalHistoryRecordId]) VALUES (11, NULL, NULL, N'With Pathology', NULL, NULL, 0, 0, N'Fallece', NULL, 0, 11)
GO
SET IDENTITY_INSERT [dbo].[MaternalDischargeInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[MedicalBackgrounds] ON 
GO
INSERT [dbo].[MedicalBackgrounds] ([Id], [FamilyTuberculosis], [FamilyDiabetes], [FamilyDiabetesType], [FamilyHypertension], [FamilyPreeclampsia], [FamilyEclampsia], [FamilyOtherSeriousMedicalCondition], [FamilyOtherConditionDetails], [PersonalTuberculosis], [PersonalDiabetes], [PersonalDiabetesType], [PersonalHypertension], [PersonalPreeclampsia], [PersonalEclampsia], [PersonalSurgery], [PersonalInfertility], [PersonalHeartDisease], [PersonalNephropathy], [PersonalViolence], [PersonalHIVPositive], [CurrentSmoker], [PassiveSmoker], [DrugUse], [AlcoholUse], [PerinatalHistoryRecordId], [PersonalOtherConditionDetails], [PersonalOtherSeriousMedicalCondition]) VALUES (9, 1, 1, 1, 1, 11, 1, 1, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 9, N'1', 1)
GO
INSERT [dbo].[MedicalBackgrounds] ([Id], [FamilyTuberculosis], [FamilyDiabetes], [FamilyDiabetesType], [FamilyHypertension], [FamilyPreeclampsia], [FamilyEclampsia], [FamilyOtherSeriousMedicalCondition], [FamilyOtherConditionDetails], [PersonalTuberculosis], [PersonalDiabetes], [PersonalDiabetesType], [PersonalHypertension], [PersonalPreeclampsia], [PersonalEclampsia], [PersonalSurgery], [PersonalInfertility], [PersonalHeartDisease], [PersonalNephropathy], [PersonalViolence], [PersonalHIVPositive], [CurrentSmoker], [PassiveSmoker], [DrugUse], [AlcoholUse], [PerinatalHistoryRecordId], [PersonalOtherConditionDetails], [PersonalOtherSeriousMedicalCondition]) VALUES (10, 1, 3, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 10, N'1', 1)
GO
INSERT [dbo].[MedicalBackgrounds] ([Id], [FamilyTuberculosis], [FamilyDiabetes], [FamilyDiabetesType], [FamilyHypertension], [FamilyPreeclampsia], [FamilyEclampsia], [FamilyOtherSeriousMedicalCondition], [FamilyOtherConditionDetails], [PersonalTuberculosis], [PersonalDiabetes], [PersonalDiabetesType], [PersonalHypertension], [PersonalPreeclampsia], [PersonalEclampsia], [PersonalSurgery], [PersonalInfertility], [PersonalHeartDisease], [PersonalNephropathy], [PersonalViolence], [PersonalHIVPositive], [CurrentSmoker], [PassiveSmoker], [DrugUse], [AlcoholUse], [PerinatalHistoryRecordId], [PersonalOtherConditionDetails], [PersonalOtherSeriousMedicalCondition]) VALUES (11, 1, 1, NULL, 1, 1, 1, 1, N'algo ', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 11, N'algo', 1)
GO
SET IDENTITY_INSERT [dbo].[MedicalBackgrounds] OFF
GO
SET IDENTITY_INSERT [dbo].[MorbidityInformations] ON 
GO
INSERT [dbo].[MorbidityInformations] ([Id], [ChronicHypertension], [MildPreeclampsia], [SeverePreeclampsia], [Eclampsia], [HELLP], [GestationalHypertension], [ChronicHypertensionWithSuperimposedPreeclampsia], [Sepsis], [Endometritis], [Chorioamnionitis], [AsymptomaticBacteriuria], [Pyelonephritis], [Pneumonia], [CesareanWoundInfection], [EpisiotomyInfection], [OtherInfection], [PostAbortionHemorrhage], [HydatidiformMole], [EctopicPregnancy], [PlacentaPrevia], [AccretaPlacentaPP], [AbruptioPlacentae], [SecondTrimesterHemorrhage], [UterineRupture], [PostpartumHemorrhage], [UterineAtony], [RetainedPlacenta], [PlacentalTears], [CoagulationDefect], [GlucoseToleranceTest], [AbnormalOralGlucoseTolerance], [PreexistingInsulinDependentDM], [PreexistingNonInsulinDependentDM], [GestationalDiabetes], [HyperosmolarState], [HyperglycemicState], [Ketoacidosis], [Hypothyroidism], [Hyperthyroidism], [ThyroidCrisis], [OtherMetabolicDisorder], [HyperemesisGravidarum], [DeepVeinThrombosis], [PulmonaryThromboembolism], [AmniocEmbolism], [Cardiopathy], [Valvulopathy], [Anemia], [SickleCellAnemia], [RenalDisease], [MalignantNeoplasia], [PsychiatricDisorder], [Cholestasis], [Convulsions], [ConsciousnessAlteration], [OtherDisorder], [Oliguria], [ObstructedLabor], [ProlongedRuptureOfMembranes], [Polyhydramnios], [Oligohydramnios], [IntrauterineGrowthRestriction], [AcuteFetalDistress], [OtherObstetricComplication], [ManualRemovalOfPlacenta], [UterotronicsForHemorrhage], [OtherUterotronicsDetail], [CentralVenousAccess], [BloodProductsTransfusion], [BloodProductsDetail], [LaparotomyCount], [ICUAdmissionDaysGreaterOrEqualSeven], [IntravenousAntibioticsForInfection], [AntibioticsDetail], [NonPneumaticAntiShockGarment], [HydrostaticBalloons], [BLynchSutures], [UterineOrHypogastricArteryLigature], [Embolization], [PerinatalHistoryRecordId], [HasDiabetesMellitus], [HasFirstTrimesterHemorrhage], [HasInfections], [HasMetabolicDisorders], [HasObstetricComplications], [HasOtherDisorders], [HasSecondTrimesterHemorrhage], [HasThirdTrimesterHemorrhage], [HasThyroidDisorders], [HasHypertensiveDisorders], [ICUAdmissionDays], [OtherDisorderDetail1], [OtherDisorderDetail2], [OtherDisorderDetail3], [OtherInfectionDetail], [OtherMetabolicDetail1], [OtherMetabolicDetail2], [OtherMetabolicDetail3], [OtherMetabolicDetail4], [OtherObstetricComplicationDetail], [Laparotomy]) VALUES (9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, NULL, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1')
GO
INSERT [dbo].[MorbidityInformations] ([Id], [ChronicHypertension], [MildPreeclampsia], [SeverePreeclampsia], [Eclampsia], [HELLP], [GestationalHypertension], [ChronicHypertensionWithSuperimposedPreeclampsia], [Sepsis], [Endometritis], [Chorioamnionitis], [AsymptomaticBacteriuria], [Pyelonephritis], [Pneumonia], [CesareanWoundInfection], [EpisiotomyInfection], [OtherInfection], [PostAbortionHemorrhage], [HydatidiformMole], [EctopicPregnancy], [PlacentaPrevia], [AccretaPlacentaPP], [AbruptioPlacentae], [SecondTrimesterHemorrhage], [UterineRupture], [PostpartumHemorrhage], [UterineAtony], [RetainedPlacenta], [PlacentalTears], [CoagulationDefect], [GlucoseToleranceTest], [AbnormalOralGlucoseTolerance], [PreexistingInsulinDependentDM], [PreexistingNonInsulinDependentDM], [GestationalDiabetes], [HyperosmolarState], [HyperglycemicState], [Ketoacidosis], [Hypothyroidism], [Hyperthyroidism], [ThyroidCrisis], [OtherMetabolicDisorder], [HyperemesisGravidarum], [DeepVeinThrombosis], [PulmonaryThromboembolism], [AmniocEmbolism], [Cardiopathy], [Valvulopathy], [Anemia], [SickleCellAnemia], [RenalDisease], [MalignantNeoplasia], [PsychiatricDisorder], [Cholestasis], [Convulsions], [ConsciousnessAlteration], [OtherDisorder], [Oliguria], [ObstructedLabor], [ProlongedRuptureOfMembranes], [Polyhydramnios], [Oligohydramnios], [IntrauterineGrowthRestriction], [AcuteFetalDistress], [OtherObstetricComplication], [ManualRemovalOfPlacenta], [UterotronicsForHemorrhage], [OtherUterotronicsDetail], [CentralVenousAccess], [BloodProductsTransfusion], [BloodProductsDetail], [LaparotomyCount], [ICUAdmissionDaysGreaterOrEqualSeven], [IntravenousAntibioticsForInfection], [AntibioticsDetail], [NonPneumaticAntiShockGarment], [HydrostaticBalloons], [BLynchSutures], [UterineOrHypogastricArteryLigature], [Embolization], [PerinatalHistoryRecordId], [HasDiabetesMellitus], [HasFirstTrimesterHemorrhage], [HasInfections], [HasMetabolicDisorders], [HasObstetricComplications], [HasOtherDisorders], [HasSecondTrimesterHemorrhage], [HasThirdTrimesterHemorrhage], [HasThyroidDisorders], [HasHypertensiveDisorders], [ICUAdmissionDays], [OtherDisorderDetail1], [OtherDisorderDetail2], [OtherDisorderDetail3], [OtherInfectionDetail], [OtherMetabolicDetail1], [OtherMetabolicDetail2], [OtherMetabolicDetail3], [OtherMetabolicDetail4], [OtherObstetricComplicationDetail], [Laparotomy]) VALUES (10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, NULL, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1')
GO
INSERT [dbo].[MorbidityInformations] ([Id], [ChronicHypertension], [MildPreeclampsia], [SeverePreeclampsia], [Eclampsia], [HELLP], [GestationalHypertension], [ChronicHypertensionWithSuperimposedPreeclampsia], [Sepsis], [Endometritis], [Chorioamnionitis], [AsymptomaticBacteriuria], [Pyelonephritis], [Pneumonia], [CesareanWoundInfection], [EpisiotomyInfection], [OtherInfection], [PostAbortionHemorrhage], [HydatidiformMole], [EctopicPregnancy], [PlacentaPrevia], [AccretaPlacentaPP], [AbruptioPlacentae], [SecondTrimesterHemorrhage], [UterineRupture], [PostpartumHemorrhage], [UterineAtony], [RetainedPlacenta], [PlacentalTears], [CoagulationDefect], [GlucoseToleranceTest], [AbnormalOralGlucoseTolerance], [PreexistingInsulinDependentDM], [PreexistingNonInsulinDependentDM], [GestationalDiabetes], [HyperosmolarState], [HyperglycemicState], [Ketoacidosis], [Hypothyroidism], [Hyperthyroidism], [ThyroidCrisis], [OtherMetabolicDisorder], [HyperemesisGravidarum], [DeepVeinThrombosis], [PulmonaryThromboembolism], [AmniocEmbolism], [Cardiopathy], [Valvulopathy], [Anemia], [SickleCellAnemia], [RenalDisease], [MalignantNeoplasia], [PsychiatricDisorder], [Cholestasis], [Convulsions], [ConsciousnessAlteration], [OtherDisorder], [Oliguria], [ObstructedLabor], [ProlongedRuptureOfMembranes], [Polyhydramnios], [Oligohydramnios], [IntrauterineGrowthRestriction], [AcuteFetalDistress], [OtherObstetricComplication], [ManualRemovalOfPlacenta], [UterotronicsForHemorrhage], [OtherUterotronicsDetail], [CentralVenousAccess], [BloodProductsTransfusion], [BloodProductsDetail], [LaparotomyCount], [ICUAdmissionDaysGreaterOrEqualSeven], [IntravenousAntibioticsForInfection], [AntibioticsDetail], [NonPneumaticAntiShockGarment], [HydrostaticBalloons], [BLynchSutures], [UterineOrHypogastricArteryLigature], [Embolization], [PerinatalHistoryRecordId], [HasDiabetesMellitus], [HasFirstTrimesterHemorrhage], [HasInfections], [HasMetabolicDisorders], [HasObstetricComplications], [HasOtherDisorders], [HasSecondTrimesterHemorrhage], [HasThirdTrimesterHemorrhage], [HasThyroidDisorders], [HasHypertensiveDisorders], [ICUAdmissionDays], [OtherDisorderDetail1], [OtherDisorderDetail2], [OtherDisorderDetail3], [OtherInfectionDetail], [OtherMetabolicDetail1], [OtherMetabolicDetail2], [OtherMetabolicDetail3], [OtherMetabolicDetail4], [OtherObstetricComplicationDetail], [Laparotomy]) VALUES (11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, NULL, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[MorbidityInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[NearMissVariables] ON 
GO
INSERT [dbo].[NearMissVariables] ([Id], [Shock], [CardiacArrest], [JaundiceInPreeclampsia], [AcuteCyanosis], [Gasping], [SevereTachypnea], [SevereBradypnea], [OliguriaUnresponsiveToFluidsOrDiuretics], [CoagulationDisorders], [Coma], [ProlongedUnconsciousness], [StrokeOrCVA], [UncontrollableSeizuresOrStatusEpilepticus], [GeneralizedParalysis], [PlateletsLessThan50000], [CreatinineGreaterOrEqual300], [BilirubinGreaterThan100], [PHLessThan7_1], [HemoglobinSaturationLessThan90PercentForOverOneHour], [PaO2FiO2LessThan200], [LactateGreaterThan5], [ContinuousVasoactiveAgentsAdministration], [VasoactiveAgentsDetail], [IntubationAndVentilationNotRelatedToAnesthesia], [IntubationDays], [BloodProductsAdministrationGreaterOrEqualThreeUnits], [BloodUnits], [ICUAdmissionLessThanSevenDays], [ICUDaysLessThanSeven], [Hysterectomy], [DialysisForAcuteRenalFailure], [CardiopulmonaryResuscitation], [PerinatalHistoryRecordId]) VALUES (9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, N'1', 1, 0, 1, 0, 1, 0, 1, 1, 1, 9)
GO
INSERT [dbo].[NearMissVariables] ([Id], [Shock], [CardiacArrest], [JaundiceInPreeclampsia], [AcuteCyanosis], [Gasping], [SevereTachypnea], [SevereBradypnea], [OliguriaUnresponsiveToFluidsOrDiuretics], [CoagulationDisorders], [Coma], [ProlongedUnconsciousness], [StrokeOrCVA], [UncontrollableSeizuresOrStatusEpilepticus], [GeneralizedParalysis], [PlateletsLessThan50000], [CreatinineGreaterOrEqual300], [BilirubinGreaterThan100], [PHLessThan7_1], [HemoglobinSaturationLessThan90PercentForOverOneHour], [PaO2FiO2LessThan200], [LactateGreaterThan5], [ContinuousVasoactiveAgentsAdministration], [VasoactiveAgentsDetail], [IntubationAndVentilationNotRelatedToAnesthesia], [IntubationDays], [BloodProductsAdministrationGreaterOrEqualThreeUnits], [BloodUnits], [ICUAdmissionLessThanSevenDays], [ICUDaysLessThanSeven], [Hysterectomy], [DialysisForAcuteRenalFailure], [CardiopulmonaryResuscitation], [PerinatalHistoryRecordId]) VALUES (10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 0, 1, 0, 1, 1, 1, 10)
GO
INSERT [dbo].[NearMissVariables] ([Id], [Shock], [CardiacArrest], [JaundiceInPreeclampsia], [AcuteCyanosis], [Gasping], [SevereTachypnea], [SevereBradypnea], [OliguriaUnresponsiveToFluidsOrDiuretics], [CoagulationDisorders], [Coma], [ProlongedUnconsciousness], [StrokeOrCVA], [UncontrollableSeizuresOrStatusEpilepticus], [GeneralizedParalysis], [PlateletsLessThan50000], [CreatinineGreaterOrEqual300], [BilirubinGreaterThan100], [PHLessThan7_1], [HemoglobinSaturationLessThan90PercentForOverOneHour], [PaO2FiO2LessThan200], [LactateGreaterThan5], [ContinuousVasoactiveAgentsAdministration], [VasoactiveAgentsDetail], [IntubationAndVentilationNotRelatedToAnesthesia], [IntubationDays], [BloodProductsAdministrationGreaterOrEqualThreeUnits], [BloodUnits], [ICUAdmissionLessThanSevenDays], [ICUDaysLessThanSeven], [Hysterectomy], [DialysisForAcuteRenalFailure], [CardiopulmonaryResuscitation], [PerinatalHistoryRecordId]) VALUES (13, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, N'8', 0, 8, 0, 8, 0, 8, 0, 0, 0, 11)
GO
SET IDENTITY_INSERT [dbo].[NearMissVariables] OFF
GO
SET IDENTITY_INSERT [dbo].[NewbornInformations] ON 
GO
INSERT [dbo].[NewbornInformations] ([Id], [Sex], [BirthWeight], [LowBirthWeight], [HighBirthWeight], [Length], [HeadCircumference], [GestationalAge], [WeightForGestationalAge], [ApgarFirstMinute], [ApgarFifthMinute], [ResuscitationStimulation], [ResuscitationAspiration], [ResuscitationMask], [ResuscitationOxygen], [ResuscitationIntubation], [ResuscitationCardiacMassage], [ResuscitationMedication], [EarlyBreastfeedingInitiation], [BirthDefectsNone], [BirthDefectsMajor], [BirthDefectsMinor], [BirthDefectsDescription], [BirthDefectsCode], [DiseasesNone], [DiseasesRDS], [DiseasesCongenitalInfection], [DiseasesSyphilis], [DiseasesVIH], [DiseasesOther], [DiseasesOtherDescription], [ScreeningVDRL], [ScreeningHearingTest], [ScreeningCardiovascular], [ScreeningMetabolic], [ScreeningMeconiumFirstDay], [ScreeningBilirubin], [ScreeningToxoplasmosisIgM], [ScreeningChagasDisease], [ScreeningHemopathies], [HIVExposed], [HIVTreatment], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [DischargeLocation], [IsAlive], [Deceased], [Transferred], [DischargeAge], [DischargeDate], [DischargeWeight], [FeedingAtDischarge], [DiedDuringOrInTransferLocation], [NewbornName], [ResponsiblePersonForDischarge], [PerinatalHistoryRecordId], [DischargeAgeLessThanOneDay], [BCGVaccine], [BirthDefectsType], [DeliveryAttendantName], [DeliveryAttendantType], [DiedDuringTransferStatus], [DischargeStatus], [DischargeTime], [DiseaseCode1], [DiseaseCode2], [DiseaseCode3], [DiseaseCode4], [DiseaseCode5], [DiseaseCode6], [DiseasesOption], [FaceUp], [GestationalAgeDays], [GestationalAgeMethod], [GestationalAgeWeeks], [HIVExposedStatus], [HIVTreatmentStatus], [HepatitisB], [MeconiumFirstDay], [MotherDiedInDeliveryRoom], [NeonatalAttendantName], [NeonatalAttendantType], [NewbornDiedInDeliveryRoom], [ReferredTo], [ResuscitationMassage], [ScreeningAudic], [ScreeningBilirrub], [ScreeningCardiov], [ScreeningChagas], [ScreeningHbPatia], [ScreeningMetabolicStatus], [ScreeningToxoIgM], [TransferLocation], [VDRLResult], [VDRLTreatment]) VALUES (9, N'1', CAST(1.00 AS Decimal(10, 2)), 1, 0, CAST(1.00 AS Decimal(10, 2)), CAST(1.00 AS Decimal(18, 2)), 0, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, N'1', N'1', 1, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, N'1', N'1', 0, 0, 0, 0, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), CAST(0.00 AS Decimal(10, 2)), N'1', 0, N'1', N'1', 9, 0, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', 1, 1, N'1', 1, N'1', N'1', 1, 1, 1, N'q', N'1', 1, N'1', 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1')
GO
INSERT [dbo].[NewbornInformations] ([Id], [Sex], [BirthWeight], [LowBirthWeight], [HighBirthWeight], [Length], [HeadCircumference], [GestationalAge], [WeightForGestationalAge], [ApgarFirstMinute], [ApgarFifthMinute], [ResuscitationStimulation], [ResuscitationAspiration], [ResuscitationMask], [ResuscitationOxygen], [ResuscitationIntubation], [ResuscitationCardiacMassage], [ResuscitationMedication], [EarlyBreastfeedingInitiation], [BirthDefectsNone], [BirthDefectsMajor], [BirthDefectsMinor], [BirthDefectsDescription], [BirthDefectsCode], [DiseasesNone], [DiseasesRDS], [DiseasesCongenitalInfection], [DiseasesSyphilis], [DiseasesVIH], [DiseasesOther], [DiseasesOtherDescription], [ScreeningVDRL], [ScreeningHearingTest], [ScreeningCardiovascular], [ScreeningMetabolic], [ScreeningMeconiumFirstDay], [ScreeningBilirubin], [ScreeningToxoplasmosisIgM], [ScreeningChagasDisease], [ScreeningHemopathies], [HIVExposed], [HIVTreatment], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [DischargeLocation], [IsAlive], [Deceased], [Transferred], [DischargeAge], [DischargeDate], [DischargeWeight], [FeedingAtDischarge], [DiedDuringOrInTransferLocation], [NewbornName], [ResponsiblePersonForDischarge], [PerinatalHistoryRecordId], [DischargeAgeLessThanOneDay], [BCGVaccine], [BirthDefectsType], [DeliveryAttendantName], [DeliveryAttendantType], [DiedDuringTransferStatus], [DischargeStatus], [DischargeTime], [DiseaseCode1], [DiseaseCode2], [DiseaseCode3], [DiseaseCode4], [DiseaseCode5], [DiseaseCode6], [DiseasesOption], [FaceUp], [GestationalAgeDays], [GestationalAgeMethod], [GestationalAgeWeeks], [HIVExposedStatus], [HIVTreatmentStatus], [HepatitisB], [MeconiumFirstDay], [MotherDiedInDeliveryRoom], [NeonatalAttendantName], [NeonatalAttendantType], [NewbornDiedInDeliveryRoom], [ReferredTo], [ResuscitationMassage], [ScreeningAudic], [ScreeningBilirrub], [ScreeningCardiov], [ScreeningChagas], [ScreeningHbPatia], [ScreeningMetabolicStatus], [ScreeningToxoIgM], [TransferLocation], [VDRLResult], [VDRLTreatment]) VALUES (10, N'Masculino', CAST(3250.00 AS Decimal(10, 2)), 0, 0, CAST(50.00 AS Decimal(10, 2)), CAST(34.50 AS Decimal(18, 2)), 39, N'Adecuado', 8, 9, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, N'1', N'1', 1, 1, 1, 1, 1, 1, N'1', 1, 1, 1, 1, NULL, 1, 1, NULL, 1, 1, 1, 1, 0, 0, 0, 0, N'1', N'1', 1, 0, 0, 0, CAST(N'2026-07-20T00:00:00.0000000' AS DateTime2), CAST(3150.00 AS Decimal(10, 2)), N'Lactancia exclusiva', 0, N'Bebé Pérez', N'1', 10, 0, 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', 1, 2, N'1', 39, N'1', N'1', 1, 1, 1, N'q', N'1', 1, N'1', 1, N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1', N'1')
GO
INSERT [dbo].[NewbornInformations] ([Id], [Sex], [BirthWeight], [LowBirthWeight], [HighBirthWeight], [Length], [HeadCircumference], [GestationalAge], [WeightForGestationalAge], [ApgarFirstMinute], [ApgarFifthMinute], [ResuscitationStimulation], [ResuscitationAspiration], [ResuscitationMask], [ResuscitationOxygen], [ResuscitationIntubation], [ResuscitationCardiacMassage], [ResuscitationMedication], [EarlyBreastfeedingInitiation], [BirthDefectsNone], [BirthDefectsMajor], [BirthDefectsMinor], [BirthDefectsDescription], [BirthDefectsCode], [DiseasesNone], [DiseasesRDS], [DiseasesCongenitalInfection], [DiseasesSyphilis], [DiseasesVIH], [DiseasesOther], [DiseasesOtherDescription], [ScreeningVDRL], [ScreeningHearingTest], [ScreeningCardiovascular], [ScreeningMetabolic], [ScreeningMeconiumFirstDay], [ScreeningBilirubin], [ScreeningToxoplasmosisIgM], [ScreeningChagasDisease], [ScreeningHemopathies], [HIVExposed], [HIVTreatment], [AttendedByDoctor], [AttendedByNurse], [AttendedByStudent], [AttendedByMidwife], [AttendedByOther], [AttendantName], [DischargeLocation], [IsAlive], [Deceased], [Transferred], [DischargeAge], [DischargeDate], [DischargeWeight], [FeedingAtDischarge], [DiedDuringOrInTransferLocation], [NewbornName], [ResponsiblePersonForDischarge], [PerinatalHistoryRecordId], [DischargeAgeLessThanOneDay], [BCGVaccine], [BirthDefectsType], [DeliveryAttendantName], [DeliveryAttendantType], [DiedDuringTransferStatus], [DischargeStatus], [DischargeTime], [DiseaseCode1], [DiseaseCode2], [DiseaseCode3], [DiseaseCode4], [DiseaseCode5], [DiseaseCode6], [DiseasesOption], [FaceUp], [GestationalAgeDays], [GestationalAgeMethod], [GestationalAgeWeeks], [HIVExposedStatus], [HIVTreatmentStatus], [HepatitisB], [MeconiumFirstDay], [MotherDiedInDeliveryRoom], [NeonatalAttendantName], [NeonatalAttendantType], [NewbornDiedInDeliveryRoom], [ReferredTo], [ResuscitationMassage], [ScreeningAudic], [ScreeningBilirrub], [ScreeningCardiov], [ScreeningChagas], [ScreeningHbPatia], [ScreeningMetabolicStatus], [ScreeningToxoIgM], [TransferLocation], [VDRLResult], [VDRLTreatment]) VALUES (13, N'M', CAST(5.00 AS Decimal(10, 2)), 0, 0, CAST(5.00 AS Decimal(10, 2)), CAST(5.00 AS Decimal(18, 2)), 5, NULL, 5, 5, 0, 1, NULL, 1, 0, 0, 0, 0, NULL, NULL, 1, NULL, N'5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 1, 0, N'5', NULL, 1, 0, 1, 5, CAST(N'2026-02-07T00:00:00.0000000' AS DateTime2), CAST(5.00 AS Decimal(10, 2)), N'parcial', 1, NULL, NULL, 11, 1, 0, N'menor', N'5', N'obst', N'si', N'vivo', N'18:38', N'5', N'5', N'5', N'5', N'5', N'5', N'una_o_mas', 0, 5, N'FUM', 5, N'si', N'no', 0, 0, 0, NULL, N'enf', 0, N'neonatolog', 0, N'+', N'+', N'-', N'-', N'+', N'realizado', N'-', N'5', N'+', N'no')
GO
SET IDENTITY_INSERT [dbo].[NewbornInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[ObstetricBackgrounds] ON 
GO
INSERT [dbo].[ObstetricBackgrounds] ([Id], [PreviousPregnancies], [Abortions], [VaginalDeliveries], [Cesareans], [LivingBorn], [DeadBorn], [DiedFirstWeek], [DiedAfterFirstWeek], [LowBirthWeight], [HighBirthWeight], [LastPregnancyEndDate], [ContraceptiveMethodFailure], [PerinatalHistoryRecordId], [Living], [Births], [LastPreviousBirthWeightType], [TwinsHistory], [ThreeConsecutiveSpontaneousAbortions], [PregnancyPlanned], [LastPregnancyLessThanOneYear], [EctopicPregnancy]) VALUES (9, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, CAST(N'2025-01-19T21:45:49.0559546' AS DateTime2), N'7', 9, 0, 0, 1, 1, 1, 1, 1, N'1')
GO
INSERT [dbo].[ObstetricBackgrounds] ([Id], [PreviousPregnancies], [Abortions], [VaginalDeliveries], [Cesareans], [LivingBorn], [DeadBorn], [DiedFirstWeek], [DiedAfterFirstWeek], [LowBirthWeight], [HighBirthWeight], [LastPregnancyEndDate], [ContraceptiveMethodFailure], [PerinatalHistoryRecordId], [Living], [Births], [LastPreviousBirthWeightType], [TwinsHistory], [ThreeConsecutiveSpontaneousAbortions], [PregnancyPlanned], [LastPregnancyLessThanOneYear], [EctopicPregnancy]) VALUES (10, 0, 0, 0, 0, 0, 0, 0, 0, 4, 6, CAST(N'2025-01-19T21:48:19.0394534' AS DateTime2), N'8', 10, 0, 0, 1, 1, 1, 1, 1, N'1')
GO
INSERT [dbo].[ObstetricBackgrounds] ([Id], [PreviousPregnancies], [Abortions], [VaginalDeliveries], [Cesareans], [LivingBorn], [DeadBorn], [DiedFirstWeek], [DiedAfterFirstWeek], [LowBirthWeight], [HighBirthWeight], [LastPregnancyEndDate], [ContraceptiveMethodFailure], [PerinatalHistoryRecordId], [Living], [Births], [LastPreviousBirthWeightType], [TwinsHistory], [ThreeConsecutiveSpontaneousAbortions], [PregnancyPlanned], [LastPregnancyLessThanOneYear], [EctopicPregnancy]) VALUES (11, 1, 1, 1, 1, 1, 1, 1, 1, NULL, NULL, CAST(N'2026-02-10T00:00:00.0000000' AS DateTime2), N'Barrier', 11, 1, 0, 3, 1, 1, 1, 1, N'1')
GO
SET IDENTITY_INSERT [dbo].[ObstetricBackgrounds] OFF
GO
SET IDENTITY_INSERT [dbo].[Ocupations] ON 
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (1, N'N/A')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (2, N'Otr@')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (3, N'Vendedor')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (4, N'Independiente')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (5, N'Ama de Casa')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (6, N'Pintor')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (7, N'Operario')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (8, N'Tec')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (9, N'Que haceres del hogar')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (10, N'Estudiante')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (11, N'Quehaceres Domesticos')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (12, N'Empleado(a) Privado')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (13, N'Agricultor(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (14, N'Comerciante')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (15, N'Operario(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (16, N'Chofer')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (17, N'Empleado(a) Publico')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (18, N'Empleado(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (19, N'Trabajador(a) Independiente')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (20, N'Albañil')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (21, N'Mecanico')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (22, N'Licenciado(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (23, N'Tecnico')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (24, N'Maestro(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (25, N'Estilista')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (26, N'Jubilado(a)/Pensionado(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (27, N'Secretario(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (28, N'Ebanista')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (29, N'Chiripero(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (30, N'Ingeniero(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (31, N'Modista')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (32, N'Pintor(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (33, N'Vendedor(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (34, N'Abogado(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (35, N'')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (36, N'Enfermero(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (37, N'Carpintero')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (38, N'Doctor(a)')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (39, N'Otras')
GO
INSERT [dbo].[Ocupations] ([OcupationId], [Name]) VALUES (40, N'xxx')
GO
SET IDENTITY_INSERT [dbo].[Ocupations] OFF
GO
SET IDENTITY_INSERT [dbo].[Options] ON 
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (0, NULL, N'Clientes Root', N'Root Clients', NULL, NULL, N'Authors', N'Index', 1, N'menu-link', N'/<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor" /><rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor" /></svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (1, NULL, N'Planes Root', N'Root Plans', NULL, NULL, N'AuthorPlans', N'Index', 1, N'menu-link', N'/<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor" /><rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor" /></svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (6, 3, N'Appointments', N'Citas & Notificaciones', N'~/Medicals/Patients/IndexAppointments/', N'Medicals', N'Appointments', N'Index', 3, N'btn btn-default', N'/Content/Icons/appoint.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (28, 3, N'Inmunizations', N'Vacunas e Inmunizaciones', N'~/Medicals/Patients/IndexInmunizations/', N'Medicals', N'Patients', N'IndexInmunizations', 3, N'btn btn-default', N'', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (29, 3, N'LaboratoryResultsOld', N'Hist. Analitica (Resultados) Old', N'~/Medicals/Patients/IndexLaboratoryResultsOld/', N'Medicals', N'Patients', N'IndexLaboratoryResultsOld', 3, N'btn btn-default', N'/Content/Icons/histanaliticold.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (30, 3, N'IndexLaboratoryResults', N'Hist. Analitica (Resultados) Am', N'~/Medicals/Patients/IndexLaboratoryResults/', N'Medicals', N'Patients', N'IndexLaboratoryResults', 3, N'btn btn-default', N'/Content/Icons/histanalitic.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (31, 3, N'AnalyticalSheetsB', N'Analitica Bar (Pruebas de Lab.)', N'~/Medicals/Patients/IndexAnalyticalSheetsB/', N'Medicals', N'Patients', N'IndexAnalyticalSheetsB', 3, N'btn btn-default', N'/Content/Icons/lab.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (33, 3, N'LaboratoryResultsOld', N'Hist. Analitica (Resultados) Old', N'~/Medicals/Patients/IndexLaboratoryResultsOld/', N'Medicals', N'Patients', N'IndexLaboratoryResultsOld', 3, N'btn btn-default', N'/Content/Icons/histanaliticold.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (34, 3, N'IndexLaboratoryResults', N'Hist. Analitica (Resultados) Am', N'~/Medicals/Patients/IndexLaboratoryResults/', N'Medicals', N'Patients', N'IndexLaboratoryResults', 3, N'btn btn-default', N'/Content/Icons/histanalitic.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (35, 3, N'AnalyticalSheetsB', N'Analitica Bar (Pruebas de Lab.)', N'~/Medicals/Patients/IndexAnalyticalSheetsB/', N'Medicals', N'Patients', N'IndexAnalyticalSheetsB', 3, N'btn btn-default', N'/Content/Icons/lab.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (36, 3, N'Areas', N'Adm. Areas (Pisos/Zonas)', N'~/Medicals/Patients/IndexAnalyticalSheetsB/', N'Medicals', N'Areas', N'Index', 3, N'btn btn-default', N'/Content/Icons/place.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (37, 3, N'Billing', N'Facturacion', N'~/Medicals/Billing/Index/', N'Medicals', N'Billing', N'Index', 1, N'btn btn-default', N'/Content/Icons/payment_icon.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (38, 3, N'Billing Private', N'Facturacion Privada', N'~/Medicals/Billing/Create/', N'Medicals', N'Billing', N'Create', 2, N'btn btn-default', N'/Content/Icons/private.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (39, 3, N'Billing Insurance', N'Facturacion ARS', N'~/Medicals/Billing/Create/', N'Medicals', N'Billing', N'Create', 2, N'btn btn-default', N'/Content/Icons/insurrancebill.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (40, 3, N'Imagens', N'Hist. Imagenológica', N'~/Medicals/Billing/Create/', N'Medicals', N'Imagings', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 0, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (100, NULL, N'Mi Perfil', N'Perfil del Usuario', NULL, NULL, N'Manage', N'Profile', 1, N'menu-link', N'/<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor" /><rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor" /></svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (200, NULL, N'Configuración GEN', N'Configuración General', NULL, NULL, N'Manage', N'Index', 2, N'menu-link', N'/                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path d="M18 21.6C16.6 20.4 9.1 20.3 6.3 21.2C5.7 21.4 5.1 21.2 4.7 20.8L2 18C4.2 15.8 10.8 15.1 15.8 15.8C16.2 18.3 17 20.5 18 21.6ZM18.8 2.8C18.4 2.4 17.8 2.20001 17.2 2.40001C14.4 3.30001 6.9 3.2 5.5 2C6.8 3.3 7.4 5.5 7.7 7.7C9 7.9 10.3 8 11.7 8C15.8 8 19.8 7.2 21.5 5.5L18.8 2.8Z" fill="currentColor" />                                <path opacity="0.3" d="M21.2 17.3C21.4 17.9 21.2 18.5 20.8 18.9L18 21.6C15.8 19.4 15.1 12.8 15.8 7.8C18.3 7.4 20.4 6.70001 21.5 5.60001C20.4 7.00001 20.2 14.5 21.2 17.3ZM8 11.7C8 9 7.7 4.2 5.5 2L2.8 4.8C2.4 5.2 2.2 5.80001 2.4 6.40001C2.7 7.40001 3.00001 9.2 3.10001 11.7C3.10001 15.5 2.40001 17.6 2.10001 18C3.20001 16.9 5.3 16.2 7.8 15.8C8 14.2 8 12.7 8 11.7Z" fill="currentColor" />                            </svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (300, NULL, N'Historia Medica', N'Gestión de la historia médica', NULL, NULL, N'Patients', N'Index', 3, N'menu-link', N'/<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z" fill="currentColor" />                                <path opacity="0.3" d="M13 6.5C13 4 15 2 17.5 2C20 2 22 4 22 6.5C22 9 20 11 17.5 11C15 11 13 9 13 6.5ZM6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22ZM17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22Z" fill="currentColor" />                            </svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (301, 300, N'Ordenes Hosp.', N'Acceso a órdenes hospitalarias', NULL, NULL, N'Billing', N'IndexOrderPat', 1, NULL, N'/content/icons/insurrancebill.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (302, 300, N'Facturación Hosp.', N'Acceso a facturación hospitalaria', NULL, NULL, N'Billing', N'Index', 2, NULL, N'/content/icons/payment_icon.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (303, 300, N'Citas', N'Programar citas médicas', NULL, NULL, N'Appointments', N'Index', 3, NULL, N'/content/icons/apoint.png', 1, 0, 0, N'PersonIdComplete')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (304, 300, N'Recetas', N'Ver y gestionar recetas', NULL, NULL, N'Patients', N'IndexRecipes', 5, NULL, N'/content/icons/receta.png', 1, 0, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (305, 300, N'Indicaciones', N'Ver y gestionar indicaciones médicas', NULL, NULL, N'Patients', N'IndexIndications', 4, NULL, N'/content/icons/rx.png', 1, 0, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (306, 300, N'Certificado Médico', N'Ver y gestionar certificados médicos', NULL, NULL, N'Patients', N'IndexMedicalCertificates', 6, NULL, N'/content/Icons/licence.png', 1, 0, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (307, 300, N'Hist. Emergencia', N'Ver y gestionar historial de emergencia', NULL, NULL, N'Emergencies', N'Index', 7, NULL, N'/content/icons/emergency.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (308, 300, N'Adminisiones/Hospitalización', N'Ver y gestionar admisiones', NULL, NULL, N'Admisions', N'Index', 8, NULL, N'/content/icons/admision.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (309, 300, N'Ordenes Médicas', N'Ver y gestionar órdenes médicas', NULL, NULL, N'MedicalOrders', N'Index', 9, NULL, N'/content/icons/medicalorder.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (310, 300, N'Historia Clínica', N'Ver y gestionar historia clínica simplificada', NULL, NULL, N'GeneralNotes', N'Index', 11, NULL, N'/content/icons/gennotes.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (311, 300, N'Historia General', N'Ver y gestionar historia general del paciente', NULL, NULL, N'Patients', N'DetailsGeneral', 12, NULL, N'/content/icons/general.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (312, 300, N'Hist. Diagnostica/Consultas', N'Ver y gestionar diagnósticos y consultas', NULL, NULL, N'Patients', N'IndexGeneralAfections', 13, NULL, N'/content/icons/cie.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (313, 300, N'Analítica (Pruebas de Lab.)', N'Ver y gestionar pruebas de laboratorio', NULL, NULL, N'Patients', N'IndexAnalyticalSheets', 10, NULL, N'/content/icons/lab.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (314, 300, N'Hist. Analítica (Resultados)', N'Ver y gestionar resultados de análisis', NULL, NULL, N'Patients', N'IndexAnalyticals', 14, NULL, N'/content/icons/histanalitic.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (315, 300, N'Hist. Terapeutica/Tratamientos', N'Ver y gestionar tratamientos terapéuticos', NULL, NULL, N'Patients', N'IndexTreatments', 15, NULL, N'/content/icons/vacines.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (316, 300, N'Hist. Cardiológica', N'Ver y gestionar historial cardiológico', NULL, NULL, N'Patients', N'IndexCardiologies', 16, NULL, N'/content/icons/cardiograma.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (317, 300, N'Hist. Anestésica', N'Ver y gestionar historial anestésico', NULL, NULL, N'Anesthetics', N'Index', 17, NULL, N'/content/icons/anestesia.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (318, 300, N'Hist. Quirúrgica', N'Ver y gestionar historial quirúrgico', NULL, NULL, N'Patients', N'IndexSurgeries', 18, NULL, N'/content/icons/surgery.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (319, 300, N'Hist. Endocrino', N'Ver y gestionar historial endocrino', NULL, NULL, N'Patients', N'IndexEndocrines', 19, NULL, N'/content/icons/endocrine2.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (320, 300, N'Hist. Bariátrica', N'Ver y gestionar historial bariátrico', NULL, NULL, N'Patients', N'IndexBariatrics', 20, NULL, N'/content/icons/bariatric.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (321, 300, N'Hist. Nutricional', N'Ver y gestionar historial nutricional', NULL, NULL, N'Nutritions', N'Index', 21, NULL, N'/content/icons/diet.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (322, 300, N'Hist. Ginecológica', N'Ver y gestionar historial ginecológico', NULL, NULL, N'Patients', N'DetailsGynecology', 22, NULL, N'/content/icons/ginecology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (323, 300, N'Hist. Obstétrica (Pre Natal)', N'Ver y gestionar historial obstétrico (Pre Natal)', NULL, NULL, N'Patients', N'IndexObstetrics', 23, NULL, N'/content/icons/obstetric.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (324, 300, N'Hist. Pediátrica', N'Ver y gestionar historial pediátrico', NULL, NULL, N'Pediatrics', N'DetailsPediatric', 24, NULL, N'/content/icons/pediatric.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (325, 300, N'Hist. Psicológica', N'Ver y gestionar historial psicológico', NULL, NULL, N'Psychologies', N'Index', 26, NULL, N'/content/icons/psicology2.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (326, 300, N'Hist. Psiquiátrica', N'Ver y gestionar historial psiquiátrico', NULL, NULL, N'Patients', N'IndexPsychiatrys', 26, NULL, N'/content/icons/psiquiatric.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (327, 300, N'Hist. Neumológica', N'Ver y gestionar historial neumológico', NULL, NULL, N'Pneumologies', N'Index', 27, NULL, N'/content/icons/neumologia.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (328, 300, N'Hist. Urológica', N'Ver y gestionar historial urológico', NULL, NULL, N'Patients', N'IndexUrologys', 28, NULL, N'/content/icons/urology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (329, 300, N'Hist. Ortopédica', N'Ver y gestionar historial ortopédico', NULL, NULL, N'Patients', N'IndexOrthopedics', 29, NULL, N'/content/icons/ortopeda.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (330, 300, N'Hist. Fisiátrica', N'Ver y gestionar historial fisiátrico', NULL, NULL, N'Patients', N'IndexPhisiatries', 30, NULL, N'/content/icons/fisiatria.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (331, 300, N'Hist. Patológica', N'Ver y gestionar historial patológico', NULL, NULL, N'Pathologies', N'Index', 31, NULL, N'/content/icons/pathology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (332, 300, N'Imágenes', N'Ver y gestionar imágenes', NULL, NULL, N'Imagings', N'Index', 32, NULL, N'/content/icons/imaging.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (333, 300, N'Hist. Analítica (Resultados) Old', N'Ver y gestionar resultados de análisis antiguos', NULL, NULL, N'Patients', N'IndexLaboratoryResultsOld', 33, NULL, N'/content/icons/histanaliticold.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (334, 300, N'Hist. Dermatológica', N'Ver y gestionar historial dermatológico', NULL, NULL, N'Dermatologies', N'DetailsDermatology', 41, NULL, N'/content/icons/dermatology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (335, 300, N'Medicina Estética', N'Ver y gestionar historial de medicina estética', NULL, NULL, N'AestheticMedicine', N'Details', 42, NULL, N'/content/icons/aesthetic.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (336, 300, N'Tratamientos Faciales y Corporales', N'Ver y gestionar tratamientos faciales y corporales', NULL, NULL, N'FacialBodyTreatment', N'DetailsFacialBodyTreatment', 43, NULL, N'/content/icons/facial-body.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (337, 300, N'Gineco-Estética', N'Ver y gestionar procedimientos de gineco-estética', NULL, NULL, N'GynoAesthetic', N'DetailsGynoAesthetic', 23, NULL, N'/content/icons/gynoaesthetic.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (338, 300, N'Sala de Curas', N'Ver y gestionar procedimientos de sala de curas', NULL, NULL, N'TreatmentRoom', N'Index', 44, NULL, N'/content/icons/treatment-room.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (339, 300, N'Hist. Hematológica', N'Ver y gestionar historial hematológico', NULL, NULL, N'Patients', N'IndexHematology', 378, NULL, N'/content/icons/hematology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (340, 300, N'Procedimientos Especiales', N'Ver y gestionar procedimientos especiales realizados', NULL, NULL, N'SpecialProcedure', N'Index', 50, NULL, N'/content/icons/special-procedures.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (341, 300, N'Medicina Interna', N'Ver y gestionar historial de medicina interna', NULL, NULL, N'InternalMedicine', N'Index', 13, NULL, N'/content/icons/internal-medicine.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (342, 300, N'Medicina Familiar', N'Ver y gestionar historial de medicina familiar', NULL, NULL, N'FamilyMedicine', N'Index', 13, NULL, N'/content/icons/family-medicine.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (343, 300, N'Hist. Neumologica Pediátrica', N'Ver y gestionar historial de neumología pediátrica', NULL, NULL, N'PediatricPulmonology', N'Index', 27, NULL, N'/content/icons/pediatric-pulmonology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (344, 300, N'Hist. Oftalmológica', N'Ver y gestionar historial oftalmológico', NULL, NULL, N'Patients', N'IndexOphthalmology', 373, NULL, N'/content/icons/ophthalmology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (345, 300, N'Hist. Otorrinolaringológica', N'Ver y gestionar historial otorrinolaringológico', NULL, NULL, N'Patients', N'IndexENT', 374, NULL, N'/content/icons/ent.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (346, 300, N'Hist. Neurológica', N'Ver y gestionar historial neurológico', NULL, NULL, N'Patients', N'IndexNeurology', 375, NULL, N'/content/icons/neurology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (347, 300, N'Hist. Gastroenterológica', N'Ver y gestionar historial gastroenterológico', NULL, NULL, N'Patients', N'IndexGastroenterology', 376, NULL, N'/content/icons/gastroenterology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (348, 300, N'Hist. Medicina Deportiva', N'Ver y gestionar historial de medicina deportiva', NULL, NULL, N'Patients', N'IndexSportsMedicine', 377, NULL, N'/content/icons/sportsmedicine.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (349, 300, N'Hist. Cirugía Estética', N'Ver y gestionar historial de cirugía estética', NULL, NULL, N'Patients', N'IndexPlasticSurgery', 379, NULL, N'/content/icons/plasticsurgery.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (350, 300, N'Hist. Geriátrica', N'Ver y gestionar historial geriátrico', NULL, NULL, N'Patients', N'IndexGeriatrics', 380, NULL, N'/content/icons/geriatrics.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (351, 300, N'_DETALLE DE HISTORIA CLINICA', N'Hist. Imagenológica', N'~/Medicals/Billing/Create/', N'Medicals', N'Imagings', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (352, 300, N'Descripción Quirurgica', N'Hist. Imagenológica', N'~/Medicals/Billing/Create/', N'Medicals', N'Imagings', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (353, 300, N'Detalle de Cirugia', N'Hist. Imagenológica', N'~/Medicals/Billing/Create/', N'Medicals', N'Imagings', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (354, 300, N'Pre Autorización Quirúrgica', N'Pre Autorización Quirúrgica', N'~/Medicals/GeneralNotes/Create/', N'Medicals', N'GeneralNotes', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (355, 300, N'Detalle de Emergencia', N'Detalle de Emergencia', N'~/Medicals/Nutritions/Create/', N'Medicals', N'Nutritions', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (356, 300, N'Detalle de Hospitalización', N'Detalle de Hospitalización', N'~/Medicals/Nutritions/Create/', N'Medicals', N'Nutritions', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (357, 300, N'Detalle de Orden Medica', N'Detalle de Orden Medica', N'~/Medicals/Nutritions/Create/', N'Medicals', N'Nutritions', N'Index', 3, N'btn btn-default', N'/Content/Icons/imaging.png', 1, 1, 0, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (358, 300, N'Hist. Perinatal', N'Ver y gestionar historial perinatal', N'', NULL, N'PerinatalHistories', N'Index', 25, NULL, N'/content/icons/perinatal1.png', 1, 0, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (359, 300, N'Hist. Basada En Plantillas', N'Hist. Basada En Plantillas', N'', NULL, N'GeneralNotes', N'IndexGeneralTemplate', 10, NULL, N'/Content/Icons/general.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (360, 300, N'Biopsias', N'Biopsias', N'', NULL, N'CommonScreenDatas', N'Index', 31, NULL, N'/Content/Icons/pathology.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (361, 300, N'Citologia Ginecologica', N'Citologia Ginecologica', N'', NULL, N'CommonScreenDatas', N'Index', 32, NULL, N'/Content/Icons/pathology.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (362, 300, N'Citologia Especial', N'Citologia Especial', N'', NULL, N'CommonScreenDatas', N'Index', 33, NULL, N'/Content/Icons/pathology.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (363, 300, N'Citologia Liquida', N'Citologia Liquida', N'', NULL, N'CommonScreenDatas', N'Index', 34, NULL, N'/Content/Icons/pathology.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (364, 300, N'Clasificación Heridas', N'Clasificación Heridas', N'', NULL, N'TemplateImages', N'Index', 35, NULL, N'/Content/Icons/pie.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (365, 300, N'Escala de Severidad', N'Escala de Severidad', N'', NULL, N'TemplateImages', N'Index', 36, NULL, N'/Content/Icons/pie.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (366, 300, N'Evaluación Inicial Heridas', N'Evaluación Inicial Heridas', N'', NULL, N'TemplateImages', N'Index', 37, NULL, N'/Content/Icons/pie.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (367, 300, N'Evaluación Seguimiento Heridas', N'Evaluación Seguimiento Heridas', N'', NULL, N'TemplateImages', N'Index', 38, NULL, N'/Content/Icons/pie.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (368, 300, N'Vacunas', N'Vacunas', N'', NULL, N'Inmunizations', N'Index', 11, NULL, N'/Content/Icons/vacines.png', 1, 0, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (369, 300, N'Historia Clinica Odontologica', N'Historia Clinica Odontologica', N'', NULL, N'TemplateImages', N'Index', 39, NULL, N'/Content/Icons/odontology.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (370, 300, N'Odontograma', N'Odontograma', N'', NULL, N'TemplateImages', N'Index', 40, NULL, N'/Content/Icons/odontograma.jpg', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (371, 300, N'Planilla Perinatal', N'Ver y gestionar historial perinatal', N'', NULL, N'TemplateImages', N'Index', 25, NULL, N'/content/icons/perinatal1.png', 1, 1, 0, N'PersonId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (372, 300, N'Hist. Alergológica', N'Ver y gestionar historial alergológico', NULL, NULL, N'Patients', N'IndexAllergology', 381, NULL, N'/content/icons/allergology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (373, 300, N'Hist. Rehumatologica', N'Ver y gestionar historial reumatologica', NULL, NULL, N'Patients', N'IndexRehumathology', 381, NULL, N'/content/icons/allergology.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (380, 300, N'Historia Oftalmológica', N'Gestión completa de historias y consultas oftalmológicas', N'', NULL, N'Ophthalmologies', N'Index', 26, NULL, N'/content/icons/eye.png', 1, 1, 0, N'PatientId')
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (400, NULL, N'Configuración POS', N'Configuración del Punto de Venta', NULL, NULL, N'Manage', N'PosAdministration', 4, N'menu-link', N'/<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="currentColor" />                                <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="currentColor" />                            </svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (500, NULL, N'Manejo de Citas', N'Gestión de Citas', NULL, NULL, N'Appointments', N'IndexPatients', 5, N'menu-link', N'/                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path opacity="0.3" d="M7 20.5L2 17.6V11.8L7 8.90002L12 11.8V17.6L7 20.5ZM21 20.8V18.5L19 17.3L17 18.5V20.8L19 22L21 20.8Z" fill="currentColor" />                                <path d="M22 14.1V6L15 2L8 6V14.1L15 18.2L22 14.1Z" fill="currentColor" />  </svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (600, NULL, N'Manejo de Citas Gen', N'Gestión General de Citas', NULL, NULL, N'Appointments', N'IndexAllNew', 6, N'menu-link', N'/                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" /> <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" /><path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" /> </svg>', 1, 0, 1, NULL)
GO
INSERT [dbo].[Options] ([OptionId], [ParentOptionId], [Name], [Description], [Link], [Area], [Controller], [Action], [Order], [Class], [Icon], [StatusId], [IsGeneralNoteOption], [ShowInMenu], [RouteParameters]) VALUES (700, NULL, N'Adm. POS (ADV)', N'Administración del Punto de Venta Avanzada', NULL, NULL, N'Manage', N'BillingAdministration', 7, N'menu-link', N'/                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5.91517C15.8 6.41517 18 8.81519 18 11.8152C18 12.5152 17.9 13.2152 17.6 13.9152L20.1 15.3152C20.6 15.6152 21.4 15.4152 21.6 14.8152C21.9 13.9152 22.1 12.9152 22.1 11.8152C22.1 7.01519 18.8 3.11521 14.3 2.01521C13.7 1.91521 13.1 2.31521 13.1 3.01521V5.91517H13Z" fill="currentColor" /> <path opacity="0.3" d="M19.1 17.0152C19.7 17.3152 19.8 18.1152 19.3 18.5152C17.5 20.5152 14.9 21.7152 12 21.7152C9.1 21.7152 6.50001 20.5152 4.70001 18.5152C4.30001 18.0152 4.39999 17.3152 4.89999 17.0152L7.39999 15.6152C8.49999 16.9152 10.2 17.8152 12 17.8152C13.8 17.8152 15.5 17.0152 16.6 15.6152L19.1 17.0152ZM6.39999 13.9151C6.19999 13.2151 6 12.5152 6 11.8152C6 8.81517 8.2 6.41515 11 5.91515V3.01519C11 2.41519 10.4 1.91519 9.79999 2.01519C5.29999 3.01519 2 7.01517 2 11.8152C2 12.8152 2.2 13.8152 2.5 14.8152C2.7 15.4152 3.4 15.7152 4 15.3152L6.39999 13.9151Z" fill="currentColor" /></svg>', 1, 0, 1, NULL)
GO
SET IDENTITY_INSERT [dbo].[Options] OFF
GO
SET IDENTITY_INSERT [dbo].[ParentOptions] ON 
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (1, N'Seguridad', N'Seguridad', N'#menuSeguridad', 0, N'fa fa-user', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (2, N'Configuracion Gen', N'Configuracion Gen', N'~/Manage', 1, N'fa fa-cog', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (3, N'Pacientes', N'Pacientes', N'~/Medicals/Patients', 2, N'fa fa-user-md', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (4, N'Control de Gastos', N'Control de Gastos', N'~/Expenses/Clasifications/Resume', 3, N'fa fa-money', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (5, N'Administracion', N'Administracion', N'#menuconfigPos', 4, N'fa fa-tasks', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (6, N'Operaciones', N'Operaciones', N'#menuconfig', 5, N'fa fa-dollar', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (7, N'Configuracion Iguala', N'Configuracion Iguala', N'#menuconfig2', 6, N'fa fa-cog', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (8, N'Administracion', N'Administracion', N'#menuconfigPos', 4, N'fa fa-tasks', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (9, N'Operaciones', N'Operaciones', N'#menuconfig', 5, N'fa fa-dollar', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (10, N'Configuracion Iguala', N'Configuracion Iguala', N'#menuconfig2', 6, N'fa fa-cog', N'', 1)
GO
INSERT [dbo].[ParentOptions] ([ParentOptionId], [Name], [Description], [Link], [Order], [Class], [Icon], [StatusId]) VALUES (300, N'Pacientes', N'', N'', 3, N'', N'', 1)
GO
SET IDENTITY_INSERT [dbo].[ParentOptions] OFF
GO
SET IDENTITY_INSERT [dbo].[Patients] ON 
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (508, 515, 1, NULL, NULL, 1, N'15', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (529, 536, 1, NULL, NULL, 1, N'33 Años, 1 Mes, y 17 Dias', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (530, 537, 1, NULL, NULL, 1, N'33 Años, 1 Mes, y 17 Dias', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (532, 539, 3, NULL, NULL, 5, N'40 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (969, 979, 18, NULL, NULL, 2, N'39 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (981, 991, 1, NULL, NULL, 1, N'2 Meses', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (982, 992, 1, NULL, NULL, 1, N'6 Meses', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (1014, 1024, 1, NULL, NULL, 1, N'2 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (1059, 1069, 1, NULL, NULL, 1, N'92 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (1074, 1084, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (1126, 1136, 17, NULL, NULL, 1, N'10 Dias', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (1816, 1827, 1, NULL, NULL, 1, N'19 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2143, 2154, 1, N'334343434', NULL, 1, N'2 Meses', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2209, 2220, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2243, 2254, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2244, 2255, 20, N'12456789', NULL, 1, N'33 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2245, 2256, 20, NULL, NULL, 1, N'30 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2248, 2259, 2, N'0985314', NULL, 1, N'27 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2249, 2260, 2, N'4444', NULL, 5, N'8 Meses', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2250, 2261, 2, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2252, 2263, 2, N'1245879732', NULL, 1, N'28 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2254, 2265, 2, N'12487990', NULL, 1, N'28 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2267, 2278, 3, N'23', NULL, 1, N'19 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2353, 2364, 1, NULL, NULL, 7, N'4 Meses', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2578, 2589, 20, N'54799999', N'xxxxxxxxxx', 5, N'3 Años', 658, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2680, 2694, 20, N'123456788', NULL, 1, N'28 Años', NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (2685, 2699, 1, NULL, NULL, 7, N'30 Años', 789, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (3190, 3204, 1, NULL, NULL, 1, N'17 Dias', 1350, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (3305, 3319, 20, N'54896554', NULL, 7, N'10 Años', 1473, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (4227, 4241, 1, NULL, NULL, 1, N'12 Dias', 2471, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (4573, 4589, 1, NULL, NULL, 1, NULL, 2840, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (6268, 6297, 11, NULL, NULL, 9, N'9 Dias', 4605, NULL, N'Martines rijos')
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (7030, 7059, 18, NULL, NULL, 1, N'19 Dias', 5379, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (7032, 7061, 19, NULL, NULL, 1, N'2 Meses', 5381, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (7035, 7064, 23, NULL, NULL, 1, N'1 Mes', 5384, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (8304, 8333, 23, NULL, NULL, 1, N'22 Años', 6659, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (11308, 11342, 1, NULL, NULL, 1, N'33 Anios', 9670, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (11877, 11914, 18, NULL, N'1234543', 7, N'33 Años', 10249, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12053, 12096, 43, N'2342342343', NULL, 5, N'33 Años', 10427, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12359, 12403, 1, NULL, NULL, 1, NULL, 10735, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12360, 12404, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12361, 12405, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12387, 12431, 1, NULL, NULL, 1, NULL, NULL, N'45645646', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12396, 12440, 1, N'546565465', N'44454', 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12397, 12441, 1, N'5465654656', N'444546', 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12398, 12442, 1, N'5674445', N'4545', 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12399, 12443, 1, N'56744457', N'45457', 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12400, 12444, 1, N'567567', N'567567', 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12408, 12452, 1, NULL, NULL, 4, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12409, 12453, 1, N'werwer', NULL, 4, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12410, 12454, 1, NULL, NULL, 4, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12422, 12466, 1, N'KjJ', NULL, 7, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12542, 12586, 1, N'susus', NULL, 7, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12543, 12587, 1, N'ddd', NULL, 4, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12544, 12588, 1, N'dddd', NULL, 3, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12545, 12589, 1, N'ggggg', NULL, 5, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12546, 12590, 1, N'gggggcggg', NULL, 5, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12557, 12601, 1, N'44444444', NULL, 2, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12558, 12602, 1, N'34535', NULL, 3, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12559, 12603, 1, N'hzhzhzhz', NULL, 7, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12560, 12604, 1, N'hgfjgg', NULL, 6, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12561, 12605, 1, N'jzjzjz', NULL, 7, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12564, 12608, 1, N'6788994', NULL, 3, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12909, 12953, 1, NULL, NULL, 1, NULL, NULL, N'dfdf', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (12910, 12954, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13292, 13342, 1, N'bsbsj', NULL, 5, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13384, 13434, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13391, 13441, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13396, 13446, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13397, 13447, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13427, 13477, 1, NULL, NULL, 9, N'32 Años', NULL, N'2230056214462', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13565, 13615, 1, NULL, NULL, 1, N'40 Años', NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13763, 13813, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13769, 13819, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13770, 13820, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13878, 13928, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13879, 13929, 1, NULL, NULL, 1, N'23 Años', NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (13892, 13942, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (15568, 15618, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (15569, 15619, 1, NULL, NULL, 1, NULL, NULL, N'', NULL)
GO
INSERT [dbo].[Patients] ([PatientId], [PersonId], [InsuranceId], [InsuranceNumber], [Nss], [BloodTypeId], [Age], [CustomerId], [CompanionRnc], [Companion]) VALUES (15570, 15620, 10, N'858585858', N'8858585', 3, N'26 años', NULL, NULL, N'5555555')
GO
SET IDENTITY_INSERT [dbo].[Patients] OFF
GO
SET IDENTITY_INSERT [dbo].[People] ON 
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (515, N'00122326541', N'Manuel', N'Caceres', CAST(N'1977-05-23T00:00:00.0000000' AS DateTime2), 1, NULL, 1, NULL, NULL, NULL, 1, 1, 1, NULL, N'', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (536, N'0013342567', N'Sonnia', N'Balquez', CAST(N'1978-09-10T00:00:00.0000000' AS DateTime2), 2, NULL, 1, NULL, N'8492213321', NULL, 1, 27, 1, NULL, N'~/Content/Patients/IMG_0246.PNG', NULL, NULL, 2, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (537, N'0013342567', N'Sonnia', N'Balquez', CAST(N'1978-09-10T00:00:00.0000000' AS DateTime2), 2, NULL, 1, NULL, N'8492213321', NULL, 1, 27, 1, NULL, N'~/Content/Patients/IMG_0246.PNG', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (539, N'0024536798', N'Blas ramon', N'Pérez ruiz', CAST(N'1977-05-23T00:00:00.0000000' AS DateTime2), 1, NULL, 1, NULL, N'8092344567', NULL, 1, 14, 3, NULL, N'~/Content/Patients/IMG_0053.JPG', NULL, NULL, 4, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (979, NULL, N'Maria', N'Santana', CAST(N'1978-05-23T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 34, 1, NULL, N'', NULL, NULL, 5, NULL, NULL, CAST(2450.25 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(33552.09 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (991, NULL, N'wwwwwwwwwwwwwwwwwwww', N'eeeeeeeeeeeeeeeeeeee', CAST(N'2018-01-08T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 34, 1, NULL, N'~/Content/Patients/starlingmicr.jpg', NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (992, N'99999999999', N'paciante ', N'asasdasd', CAST(N'2017-08-28T00:00:00.0000000' AS DateTime2), 1, 1, 1, N'asdnajsndjas@jjj.com', N'5454545454', NULL, 3, 12, 1, NULL, N'~/Content/Patients/starlingmicr.jpg', NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (1024, NULL, N'Jaun', N'Malesh', CAST(N'2015-08-08T00:00:00.0000000' AS DateTime2), 3, 1, 1, N'sgermosen@outlook.com', N'2222222222', NULL, 2, 31, 15, NULL, N'~/Content/Patients/starlingmicr.jpg', N'00008', NULL, 8, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (1069, N'22222222222', N'Carlos', N'Morales', CAST(N'1926-03-04T00:00:00.0000000' AS DateTime2), 1, 1, 1, N'sgermosen@praysoft.net', NULL, NULL, 1, 34, 1, NULL, NULL, N'00009', NULL, 9, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (1084, NULL, N'ddd', N'ttt', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 34, 1, NULL, N'', N'00010', NULL, 10, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (1136, NULL, N'Jose', N'Reyes', CAST(N'2018-04-09T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, NULL, NULL, 1, 16, 1, NULL, NULL, N'00011', NULL, 11, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(19800.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (1827, N'00123456678', N'MARIA  M', N'CASTRO', CAST(N'1998-09-01T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 34, 1, NULL, N'', N'00012', NULL, 12, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2154, N'33333333333', N'4444444444444', N'4444444444444', CAST(N'2018-06-03T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, N'1234543434', NULL, 1, 34, 1, NULL, N'', N'34', NULL, 13, NULL, NULL, CAST(100.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(100.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2220, NULL, N'Ggg', N'Ghh', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'~/Content/Patients/IMG-20180903-WA0043.jpg', N'00014', NULL, 14, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2254, NULL, N'juan pere', N'pere', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'00015', NULL, 15, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(3000.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2255, N'00123456789', N'RAMONA ', N'MEJIA', CAST(N'1984-10-04T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, N'8091254689', NULL, 1, 35, 1, NULL, N'', N'00016', NULL, 16, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(14000.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2256, N'00123456789', N'kamila', N'villa', CAST(N'1988-07-05T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, N'8095481166', NULL, 1, 35, 1, NULL, N'', N'00017', NULL, 17, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(7900.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2259, N'00123456898', N'Rolando', N'Felix', CAST(N'1990-09-23T00:00:00.0000000' AS DateTime2), 1, 1, 1, N'sgermosen@outlook.com', N'8092215544', N'4444444444', 1, 12, 1, N'44', N'~/Content/Patients/007.png', N'00018', NULL, 18, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2260, N'44444444444', N'ttt', N'tttt', CAST(N'2018-01-07T00:00:00.0000000' AS DateTime2), 1, 4, 2, N'sgrysoft@gmail.com', N'4444444444', N'4444444444', 3, 16, 11, N'44444444444', N'~/Content/Patients/starlingmicr.jpg', N'00019', NULL, 19, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(24141.60 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2261, NULL, N'22222', N'2222', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, NULL, N'00020', NULL, 20, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(40000.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2263, N'00111245828', N'LAURA', N'MARTINEZ', CAST(N'1990-05-11T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'00021', NULL, 21, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2265, N'00148975426', N'JUAN', N'PEREZ', CAST(N'1990-05-05T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'00022', NULL, 22, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(27000.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2278, N'04412215854', N'MIGUEL A', N'FRANGUL P', CAST(N'1999-05-12T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'00023', NULL, 23, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2364, NULL, N'44', N'99', CAST(N'2018-05-28T00:00:00.0000000' AS DateTime2), 2, 1, 2, NULL, NULL, NULL, 4, 35, 5, NULL, N'~/Content/Patients/007.png', N'00024', NULL, 24, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(9007.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2589, NULL, N'Juan Alberto', N'Paniagua Echavarria', CAST(N'2015-01-01T00:00:00.0000000' AS DateTime2), 1, 1, 1, N'sgermosen@praysoft.net', N'8492077714', NULL, 1, 35, 1, N'La calle de mi casa en el barrio que vivo', N'', N'00025', NULL, 25, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(41163.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2694, N'01110000122', N'RAMON', N'VENTURA FELIZ', CAST(N'1990-12-05T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, N'8095245521', 1, 35, 1, NULL, NULL, N'00026', NULL, 26, NULL, NULL, CAST(750.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(750.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (2699, NULL, N'Juan ', N'Almonte', CAST(N'1988-02-23T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'Exp00027', NULL, 27, NULL, NULL, CAST(1420.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(3500.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (3204, NULL, N'rrrrrrrrrrrrrrr', N'ffffffffffffffffff', CAST(N'2019-02-24T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'Exp00028', NULL, 28, NULL, NULL, CAST(1500.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(7500.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (3319, N'22300825229', N'Juan Alfredo', N'Almonte', NULL, 1, 1, 1, N'sgs@praysoft.com', N'8492077718', NULL, 2, 12, 1, N'Calle las amalias 25', N'', N'Exp00029', NULL, 29, NULL, NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (4241, NULL, N'xxxxxxxxxxxx', N'vvvvvvvvvvvvv', CAST(N'2019-09-17T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'Exp00030', NULL, 30, CAST(N'2019-09-29T20:37:55.8400000' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (4589, NULL, N'Cliente ', N'Generico', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'Exp00031', NULL, 31, CAST(N'2019-12-14T11:35:28.7200000' AS DateTime2), NULL, CAST(-11111113475.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(-7360.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (6297, N'00123456979', N'Maria de los Angeles', N'Rivera', CAST(N'2021-01-03T00:00:00.0000000' AS DateTime2), 2, 1, 3, NULL, N'8095453036', NULL, 1, 35, 1, NULL, N'', N'Exp00032', NULL, 32, CAST(N'2021-01-12T17:03:46.2533333' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (7059, N'12345678977', N'MARIA ANGEICA', N'RODRIGUEZ', CAST(N'2021-04-01T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, N'8095453036', NULL, 1, 35, 1, N'CALLE EL RECUERDO NO. 24
EL BRISAL STO DGO.', N'', N'Exp00033', NULL, 33, CAST(N'2021-04-20T18:24:36.9400000' AS DateTime2), NULL, CAST(143000.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(143000.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (7061, N'00123544585', N'MARIA DE LOS ANGELES', N'DEL CIELO', CAST(N'2021-02-01T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, N'8293324575', NULL, 1, 35, 1, N'C/ EL RETORNO N.265 LOS ANGELES STO DGO.', N'', N'Exp00034', NULL, 34, CAST(N'2021-04-20T18:46:58.6733333' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (7064, N'00122458863', N'MARIA JUANA', N'JIMENEZ', CAST(N'2021-03-01T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, N'2492221122', NULL, 1, 35, 1, N'C/ EL BRAVO N, 234 LOS RIOS', N'', N'Exp00035', NULL, 35, CAST(N'2021-04-21T03:29:39.6266667' AS DateTime2), NULL, CAST(50.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(50.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (8333, N'89789127981', N'Juan Perez', N'Prueba', NULL, 1, 1, 1, NULL, N'7777777777', NULL, 1, 35, 1, NULL, N'', N'Exp00036', NULL, 36, CAST(N'2021-09-15T11:21:33.7933333' AS DateTime2), NULL, CAST(1000.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(2000.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (11342, N'27262678289', N'Starling', N'Prueba 2', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'', N'Exp00037', NULL, 37, CAST(N'2022-01-10T12:35:13.4766667' AS DateTime2), NULL, CAST(1706.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(3661.40 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (11914, N'10123456666', N'maria mercedez', N'ramirez', CAST(N'1988-05-14T00:00:00.0000000' AS DateTime2), 2, 1, 1, NULL, N'8095544355', NULL, 1, 35, 1, N'santo domingo calle liberttad 243 ', N'', N'Exp00038', NULL, 38, CAST(N'2022-03-05T22:29:02.6633333' AS DateTime2), NULL, CAST(200.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(300.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12096, N'97378383883', N'Paciente de Prueba 55', N'Para Probar', NULL, 1, 1, 1, NULL, NULL, N'3423423423', 1, 35, 1, NULL, N'', N'Exp00039', NULL, 39, CAST(N'2022-03-22T21:40:09.9066667' AS DateTime2), NULL, CAST(1990.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(62316.00 AS Decimal(16, 2)), NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12403, N'34534345345', N'ffefef', N'345345345345', NULL, 1, 1, 1, NULL, N'3453453453', N'3453453453', 1, 1, 1, NULL, N'', N'Exp00041', NULL, 41, CAST(N'2022-07-31T17:21:22.7033333' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12404, N'56756756767', N'fgdgdfg', N'tryrty', NULL, 1, 1, 1, NULL, N'3365689874', N'6786763456', 1, 1, 1, N'sdfsdfd', N'~/Content/Logos/logoPraySoft_blue.png', N'Exp00042', NULL, 42, CAST(N'2022-07-31T17:23:44.0000000' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12405, N'65734686675', N'asdfasdasdff', N'45454', NULL, 1, 1, 1, NULL, N'4565675785', N'4564565456', 1, 1, 1, NULL, N'~/Content/Logos/logoPraySoft_blue.png', N'Exp00043', NULL, 43, CAST(N'2022-07-31T18:08:56.0000000' AS DateTime2), NULL, CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), CAST(0.00 AS Decimal(16, 2)), NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12431, NULL, N'ffrr', N'fff', NULL, 1, 1, 1, NULL, NULL, NULL, 1, 35, 1, NULL, N'~/Content/Logos/logoPraySoft_blue.png', N'Exp00044', NULL, 44, CAST(N'2022-08-16T21:45:10.0000000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12440, N'22222222', N'nombre', N'apellido', CAST(N'2016-08-19T00:00:00.0000000' AS DateTime2), 1, NULL, 1, N'sfgeee@asdasdas.com', N'5545454545', N'yuyu', 1, 1, 1, N'yyyyyyy', N'https://mersycore.blob.core.windows.net/personimages/0052b2cf-4da2-4c58-9c1e-4306b4688a89.jpg', N'Exp00045', NULL, 45, CAST(N'2022-08-17T21:23:04.1166667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12441, N'222222226', N'nombre', N'apellido', CAST(N'2016-08-19T00:00:00.0000000' AS DateTime2), 1, NULL, 1, N'sfgeeer@asdasdas.com', N'55454654545', N'66666', 1, 1, 1, N'yyyyyyy', N'https://mersycore.blob.core.windows.net/personimages/ec4e69df-943a-42e2-86e9-a02a42e21668.jpg', N'Exp00046', NULL, 46, CAST(N'2022-08-17T21:25:08.8500000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12442, N'345666', N'456646', N'56756756', NULL, 1, NULL, 1, N'3434534@ggg.com', N'4888886', N'54546774', 1, 1, 1, N'6657666', N'https://mersycore.blob.core.windows.net/personimages/6b0f8eaf-4153-4fc5-b394-047f047699af.jpg', N'Exp00047', NULL, 47, CAST(N'2022-08-17T21:27:19.3300000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12443, N'3456667', N'4566467', N'567567567', NULL, 1, NULL, 1, N'34345374@ggg.com', N'48888867', N'545467747', 1, 1, 1, N'66576667', N'https://mersycore.blob.core.windows.net/personimages/946ad0ef-2b62-45ca-8434-c5185263ff7f.jpg', N'Exp00048', NULL, 48, CAST(N'2022-08-17T21:31:46.9200000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12444, N'66767776', N'gfhfghfg', N'fghfghfg', NULL, 1, NULL, 1, N'565656@hdhdfg.com', N'7856756', N'565656', 1, 1, 1, N'ertert', N'https://mersycore.blob.core.windows.net/personimages/83644507-18b7-4818-8970-18b56f883aa7.jpg', N'Exp00049', NULL, 49, CAST(N'2022-08-17T21:57:53.0666667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12452, N'323423', N'sdfsdf', N'sdfsdfsdf', NULL, 1, NULL, 1, N'sdfsdfsd@sdfsdfsd.com', N'', N'', 1, 1, 1, NULL, N'https://mersycore.blob.core.windows.net/personimages/6dc97134-c169-4350-a1ae-abc3778f9cb1.jpg', N'Exp00050', NULL, 50, CAST(N'2022-08-21T21:59:13.1666667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12453, N'wewrwer', N'werwer', N'werwer', NULL, 1, NULL, 1, N'werwer', N'werwe', N'', 1, 1, 1, N'werwer', N'https://mersycore.blob.core.windows.net/personimages/6af147e5-3d56-49eb-b187-7fa0d9280884.jpg', N'Exp00051', NULL, 51, CAST(N'2022-08-21T22:02:47.4300000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12454, N'dfgdfg', N'dfgdfg', N'dfgdf', NULL, 1, NULL, 1, N'sdfsd@sdfsdf.com', N'', N'', 1, 1, 1, NULL, N'https://mersycore.blob.core.windows.net/personimages/96af1659-5059-484e-9464-af49155b95d5.jpg', N'Exp00052', NULL, 52, CAST(N'2022-08-21T22:04:15.0366667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12466, N'sjajajs', N'ajuaja', N'jajJJ', NULL, 1, NULL, 1, N'sjjajaj@jdjdjsj.com', N'', N'', 1, 1, 1, N'jajaja', N'https://mersycore.blob.core.windows.net/personimages/67cb85cb-15dd-4d84-b3ca-302659f08e13.jpg', N'Exp00053', NULL, 53, CAST(N'2022-08-28T15:16:04.1400000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12586, N'7477744', N'sjsjsnnsns', N'ansnsnsnsns', CAST(N'1993-10-21T00:00:00.0000000' AS DateTime2), 1, NULL, 1, N'starling.reynoso@nomadhealth.com', N'1', N'', 1, 1, 1, N'NnAanaana', N'https://mersycore.blob.core.windows.net/personimages/63e3f0a4-a855-4000-ad31-a63245e28df4.jpg', N'Exp00054', NULL, 54, CAST(N'2022-10-30T06:03:50.5900000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12587, N'855', N'ddd', N'ddd', NULL, 1, NULL, 1, N'starling.reynoso@nomadhealth.co', N'555', N'', 1, 1, 1, N'Sdddd', N'https://mersycore.blob.core.windows.net/personimages/6b6a41c8-ceb5-46db-97ef-83830c761389.jpg', N'Exp00055', NULL, 55, CAST(N'2022-10-30T20:42:02.3200000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12588, N'885', N'xddd', N'xxd', CAST(N'2022-10-09T00:00:00.0000000' AS DateTime2), 1, NULL, 1, N'starling.rffeynoso@nomadhealth.com', N'888', N'', 1, 1, 1, N'Xfff', N'https://mersycore.blob.core.windows.net/personimages/62a27589-b9a1-432e-8b3f-add65e59c870.jpg', N'Exp00056', NULL, 56, CAST(N'2022-10-30T20:42:46.7400000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12589, N'88888', N'ggggff', N'fffff', NULL, 1, NULL, 1, N'fddggfc@gdgh.ccc', N'5555', N'', 1, 1, 1, N'Ffff', N'https://mersycore.blob.core.windows.net/personimages/b424b338-4a57-4f5a-8bb5-17eb34d3f110.jpg', N'Exp00057', NULL, 57, CAST(N'2022-10-30T17:13:03.9866667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12590, N'8888855', N'ggggfff', N'fffffggvggg', CAST(N'2022-10-25T00:00:00.0000000' AS DateTime2), 1, NULL, 1, N'fddggfc@gdggh.ccc', N'555555888', N'', 1, 1, 1, N'Ffffvvgh', N'https://mersycore.blob.core.windows.net/personimages/3d332bc4-3ec4-4798-984c-3219d57bc60e.jpg', N'Exp00058', NULL, 58, CAST(N'2022-10-30T17:16:44.9400000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12601, N'111111', N'222222', N'333333', NULL, 1, NULL, 1, N'6666666@666.com', N'555555', N'', 1, 1, 1, N'77777777', N'25ab2eca-da0e-4d50-adec-20d0b466206f.jpg', N'Exp00059', NULL, 59, CAST(N'2022-11-04T10:44:27.3133333' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12602, N'34535', N'345345', N'34535', NULL, 1, NULL, 1, N'3453453@dfgdfgf.com', N'3534535', N'', 1, 1, 1, N'Ertert', N'https://mersycore.blob.core.windows.net/personimages/73878190-8106-4b8e-8c4f-10b96a9357ce.jpg', N'Exp00060', NULL, 60, CAST(N'2022-11-04T16:26:00.6300000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12603, N'466767667', N'hzhzhzhhzz', N'hzhzhzhzhz', NULL, 1, NULL, 1, N'shzhhzjzj@djjdd.cim', N'6767676767', N'', 1, 1, 1, N'Jdjdjdjjz', N'https://mersycore.blob.core.windows.net/personimages/9195243b-1d23-4924-88e2-2be2c0c4bd31.jpg', N'Exp00061', NULL, 61, CAST(N'2022-11-04T16:33:54.1700000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12604, N'888899', N'ggggg', N'hhhhh', NULL, 1, NULL, 1, N'hcfhb@hhhh.hh', N'556958', N'', 1, 1, 1, N'Vhhh', N'https://mersycore.blob.core.windows.net/personimages/ad316c60-29de-4023-9b93-807079455bac.jpg', N'Exp00062', NULL, 62, CAST(N'2022-11-04T17:22:38.2266667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12605, N'466464', N'jzjzjd', N'hzhzhz', NULL, 1, NULL, 1, N'hzhzhhz@jshs.com', N'6767', N'', 1, 1, 1, N'Shshz', N'https://mersycore.blob.core.windows.net/personimages/57e20894-2a1f-405b-833a-caa9c07cb993.jpg', N'Exp00063', NULL, 63, CAST(N'2022-11-04T17:23:11.7866667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12608, N'00875543211', N'paciente ', N'de prueba 06', NULL, 1, NULL, 1, N'soportemersyrd@gmail.com', N'', N'', 1, 1, 1, N'Santi domingo ', NULL, N'Exp00064', NULL, 64, CAST(N'2022-11-04T21:13:06.4600000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12953, N'', N'ddfdf', N'dfdf', NULL, 1, 1, 1, NULL, N'', N'', 1, 35, 1, NULL, NULL, N'Exp00065', NULL, 65, CAST(N'2023-03-07T02:00:37.5195888' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (12954, N'55555555555', N'555', N'555', NULL, 1, 1, 1, NULL, N'', N'', 1, 35, 1, NULL, NULL, N'Exp00066', NULL, 66, CAST(N'2023-03-07T02:00:59.3961676' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13342, N'245468646494', N'bsbsjsbns', N'jsjsjsj', NULL, 1, NULL, 1, N'sjsjjs@jjdjdjd.com', N'94949794', N'', 1, 1, 1, N'Jsjs', N'https://res.cloudinary.com/dpcby3kyy/image/upload/v1687110901/e7gzyjqyiq9immu38ynl.jpg', N'Exp00067', NULL, 67, CAST(N'2023-06-18T17:55:03.0392301' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13434, N'', N'hdfgd', N'fgdfg', NULL, 1, NULL, 1, NULL, N'', N'', 1, 1, 1, NULL, NULL, N'Exp00068', NULL, 68, CAST(N'2023-07-17T12:51:41.3013854' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13441, N'', N'oiio', N'oio', NULL, 1, NULL, 1, NULL, N'', N'', 1, 1, 1, NULL, NULL, N'Exp00069', NULL, 69, CAST(N'2023-07-18T14:33:24.9611544' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13446, N'', N'werwer', N'werwer', NULL, 1, NULL, 1, NULL, N'', N'', 1, 1, 1, NULL, NULL, N'Exp00070', NULL, 70, CAST(N'2023-07-18T18:49:06.0917278' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13447, N'', N'hfghf', N'ghfgh', NULL, 1, 1, 1, NULL, N'', N'', 1, 35, 1, N'f', NULL, N'Exp00071', NULL, 71, CAST(N'2023-07-18T19:13:24.3893497' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13477, N'22300540032', N'Melvin', N'De La Cruz', CAST(N'1991-05-01T00:00:00.0000000' AS DateTime2), 1, 1, 1, N'melvin01rd@gmail.com', N'8096172105', N'', 3, 35, 5, N'Calle Jacinto de los Santos
#94', NULL, N'Exp00072', NULL, 72, CAST(N'2023-07-26T09:51:43.2222056' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13615, N'', N'Nombre  Paciente', N'Escuadra', NULL, 1, 1, 1, NULL, N'', N'', 1, 35, 1, NULL, NULL, N'E-00073', NULL, 73, CAST(N'2023-09-11T18:50:46.6578947' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13813, N'45554455', N'122', N'12121', NULL, 1, NULL, 1, N'hjhjhjhjhjh@kkkk.com', N'', N'', 1, 1, 1, NULL, NULL, N'E-00074', NULL, 74, CAST(N'2023-11-19T17:38:38.4030929' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13819, N'633772282', N'Juan ', N'Prueba', NULL, 1, NULL, 1, N'Aaaaaaa@test.com', N'72828282', N'', 1, 1, 1, NULL, NULL, N'E-00075', NULL, 75, CAST(N'2023-11-20T16:34:27.6155407' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13820, N'37738383', N'Hahaja', N'Hshsjajs', NULL, 1, NULL, 1, N'Abbanajajjw@jsjsjjs.com', N'', N'', 1, 1, 1, NULL, NULL, N'E-00076', NULL, 76, CAST(N'2023-11-20T16:42:37.0450772' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13928, N'254555454', N'Paciente', N'De Prueba', NULL, 1, NULL, 1, N'pruebapaciente@solmedd.app', N'', N'', 1, 1, 1, NULL, NULL, N'E-00077', NULL, 77, CAST(N'2024-01-07T14:46:38.0985502' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13929, N'', N'Juan de Prueba', N'Probando', CAST(N'2001-01-02T00:00:00.0000000' AS DateTime2), 1, 1, 1, NULL, N'', N'', 1, 35, 1, NULL, NULL, N'E-00078', NULL, 78, CAST(N'2024-01-07T15:05:53.1853918' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (13942, NULL, N'Prueba Paciente', N'De Prueba Germosen', NULL, 1, 1, 1, N'sgermosen@outlook.com', N'8492077714', NULL, 1, 1, 1, NULL, NULL, N'E-00079', NULL, 79, CAST(N'2024-01-08T17:27:50.0000000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, CAST(N'2025-11-28T02:24:16.0000000' AS DateTime2))
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (15618, N'2132132132', N'Un paciente', N'Con Temas', NULL, 1, NULL, 1, N'stgermosen@outlook.com', N'', N'', 1, 1, 1, NULL, NULL, N'E-00080', NULL, 80, CAST(N'2024-08-24T18:12:14.6260433' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (15619, N'', N'PAciente de prueba', N'Test', NULL, 1, 1, 1, NULL, N'', N'', 1, 35, 1, NULL, NULL, N'E-00081', NULL, 81, CAST(N'2024-08-24T18:16:22.6931667' AS DateTime2), NULL, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL, NULL, 0, 0, NULL, 0, NULL)
GO
INSERT [dbo].[People] ([PersonId], [Rnc], [Name], [LastName], [BornDate], [GenderId], [SchoolLevelId], [CountryId], [Email], [Tel], [Cel], [MaritalSituationId], [OcupationId], [ReligionId], [Address], [Imagen], [Record2], [Record3], [Record], [CreationDate], [UserId], [DebAmount], [CreditAmount], [WastedAmount], [UserUpdateId], [StatusId], [AuthorId], [IsExternal], [Clinical], [Doctor], [EthnicityId], [Literated], [LiveAlone], [Location], [YearsInTheGreatestLevel], [LastUpdatedDate]) VALUES (15620, N'99999999999', N'nombre 1 y 2', N'apellido 1 y 2', CAST(N'2000-02-11T00:00:00.0000000' AS DateTime2), 2, 1, 1, N'stgermosen@gmail.com', N'+18455552247', N'+18585554585', 4, 1, 1, N'direccion donde vive', NULL, N'E-00082', NULL, 82, CAST(N'2024-08-25T12:03:10.7455598' AS DateTime2), N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', NULL, NULL, NULL, N'4e4da7bf-bd28-4ab1-93e1-9a8cc06bb4af', 1, 1, 0, NULL, NULL, 1, 0, 1, NULL, 15, NULL)
GO
SET IDENTITY_INSERT [dbo].[People] OFF
GO
SET IDENTITY_INSERT [dbo].[PerinatalHistoryRecords] ON 
GO
INSERT [dbo].[PerinatalHistoryRecords] ([Id], [PatientId], [PrenatalControlPlace], [BirthPlace], [CreatedDate], [LastModifiedDate], [CreatedByUserId], [LastModifiedByUserId]) VALUES (9, 15570, N'3333', N'6666', CAST(N'2026-01-20T01:45:48.4850000' AS DateTime2), CAST(N'2026-01-20T01:45:48.4850000' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[PerinatalHistoryRecords] ([Id], [PatientId], [PrenatalControlPlace], [BirthPlace], [CreatedDate], [LastModifiedDate], [CreatedByUserId], [LastModifiedByUserId]) VALUES (10, 15570, N'4444', N'55555', CAST(N'2026-01-20T01:48:17.8030000' AS DateTime2), CAST(N'2026-01-20T01:48:17.8030000' AS DateTime2), NULL, NULL)
GO
INSERT [dbo].[PerinatalHistoryRecords] ([Id], [PatientId], [PrenatalControlPlace], [BirthPlace], [CreatedDate], [LastModifiedDate], [CreatedByUserId], [LastModifiedByUserId]) VALUES (11, 15570, N'', N'', CAST(N'2026-02-17T19:37:44.9060000' AS DateTime2), CAST(N'2026-02-17T19:37:44.9060000' AS DateTime2), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[PerinatalHistoryRecords] OFF
GO
SET IDENTITY_INSERT [dbo].[Periodicities] ON 
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (1, N'D', N'Diario')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (2, N'W', N'Semanal')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (3, N'Q', N'Quincenal')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (4, N'M', N'Mensual')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (5, N'B', N'Bimensual')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (6, N'T', N'Trimestral')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (7, N'C', N'Cuatrimestral')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (8, N'S', N'Semestral')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (9, N'A', N'Anual')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (10, N'I', N'Irregular')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (11, N'U', N'Unico')
GO
INSERT [dbo].[Periodicities] ([PeriodicityId], [Code], [Name]) VALUES (12, N'N', N'Ninguno')
GO
SET IDENTITY_INSERT [dbo].[Periodicities] OFF
GO
SET IDENTITY_INSERT [dbo].[PostpartumInformations] ON 
GO
INSERT [dbo].[PostpartumInformations] ([Id], [PerinatalHistoryRecordId], [AntiDGlobulin], [DischargeResponsible], [NewbornId], [NewbornName]) VALUES (9, 9, N'8', N'5', N'4', N'1')
GO
INSERT [dbo].[PostpartumInformations] ([Id], [PerinatalHistoryRecordId], [AntiDGlobulin], [DischargeResponsible], [NewbornId], [NewbornName]) VALUES (10, 10, N'0', N'Dr. García', N'RN-2026-001', N'Bebé Pérez')
GO
INSERT [dbo].[PostpartumInformations] ([Id], [PerinatalHistoryRecordId], [AntiDGlobulin], [DischargeResponsible], [NewbornId], [NewbornName]) VALUES (11, 11, N'no', N'66666', N'66666', N'6666')
GO
SET IDENTITY_INSERT [dbo].[PostpartumInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[PostpartumVisits] ON 
GO
INSERT [dbo].[PostpartumVisits] ([Id], [Day], [Temperature], [Pulse], [BloodPressure], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PostpartumInformationId], [Bleeding], [Time]) VALUES (4, 1, CAST(2.00 AS Decimal(18, 2)), 3, N'4', N'5', N'6', N'7', N'8', N'9', N'10', 9, N'12', N'12-12-2012')
GO
INSERT [dbo].[PostpartumVisits] ([Id], [Day], [Temperature], [Pulse], [BloodPressure], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PostpartumInformationId], [Bleeding], [Time]) VALUES (5, 1, CAST(5.00 AS Decimal(18, 2)), 5, N'5', N'normal', N'', N'', N'', N'', N'5', 11, N'5', N'5')
GO
INSERT [dbo].[PostpartumVisits] ([Id], [Day], [Temperature], [Pulse], [BloodPressure], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PostpartumInformationId], [Bleeding], [Time]) VALUES (6, 2, CAST(6.00 AS Decimal(18, 2)), 6, N'6', N'normal', N'', N'', N'', N'', N'6', 11, N'6', N'6')
GO
SET IDENTITY_INSERT [dbo].[PostpartumVisits] OFF
GO
SET IDENTITY_INSERT [dbo].[PrenatalConsultations] ON 
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (2, CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 1, CAST(1.00 AS Decimal(18, 2)), N'1', CAST(1.00 AS Decimal(10, 2)), N'1', 1, 1, N'1', 1, N'1', N'1', CAST(N'2012-12-12T00:00:00.0000000' AS DateTime2), 9)
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (101, CAST(N'2025-11-15T00:00:00.0000000' AS DateTime2), 8, CAST(66.50 AS Decimal(18, 2)), N'110/70', CAST(10.00 AS Decimal(10, 2)), N'Cefálica', 140, 1, N'Hospital Central', 0, N'Ninguno. Tratamiento: Ácido fólico, hierro', N'ABC', CAST(N'2025-12-15T00:00:00.0000000' AS DateTime2), 10)
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (102, CAST(N'2025-12-15T00:00:00.0000000' AS DateTime2), 12, CAST(68.00 AS Decimal(18, 2)), N'115/75', CAST(14.00 AS Decimal(10, 2)), N'Cefálica', 145, 1, N'Hospital Central', 0, N'Ninguno. Tratamiento: Vitaminas prenatales', N'ABC', CAST(N'2026-01-15T00:00:00.0000000' AS DateTime2), 10)
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (103, CAST(N'2026-01-15T00:00:00.0000000' AS DateTime2), 16, CAST(70.50 AS Decimal(18, 2)), N'120/80', CAST(18.00 AS Decimal(10, 2)), N'Cefálica', 150, 1, N'Hospital Central', 0, N'Ninguno. Tratamiento: Continuar vitaminas', N'ABC', CAST(N'2026-02-15T00:00:00.0000000' AS DateTime2), 10)
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (104, CAST(N'2026-02-18T00:00:00.0000000' AS DateTime2), 1, CAST(1.00 AS Decimal(18, 2)), N'1', CAST(1.00 AS Decimal(10, 2)), N'1', 1, 0, N'1', 0, N'1', N'1', CAST(N'2026-02-17T00:00:00.0000000' AS DateTime2), 11)
GO
INSERT [dbo].[PrenatalConsultations] ([Id], [ConsultationDate], [GestationalAgeWeeks], [Weight], [BloodPressure], [UterineHeight], [Presentation], [FetalHeartRate], [FetalMovements], [ControlLocation], [Proteinuria], [WarningSignsExamsAndTreatments], [TechnicianInitials], [NextAppointment], [PerinatalHistoryRecordId]) VALUES (105, CAST(N'2026-02-18T00:00:00.0000000' AS DateTime2), 2, CAST(2.00 AS Decimal(18, 2)), N'2', CAST(2.00 AS Decimal(10, 2)), N'2', 2, 1, N'2', 1, N'2', N'2', CAST(N'2026-02-18T00:00:00.0000000' AS DateTime2), 11)
GO
SET IDENTITY_INSERT [dbo].[PrenatalConsultations] OFF
GO
SET IDENTITY_INSERT [dbo].[PuerperiumDays] ON 
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (25, 1, N'1er', CAST(3.0 AS Decimal(4, 1)), N'1', 2, N'3', N'1', N'2', N'3', N'4', N'5', 9)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (26, 2, N'2º', CAST(4.0 AS Decimal(4, 1)), N'2', 3, N'4', N'2', N'3', N'4', N'5', N'6', 9)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (27, 3, N'3er', CAST(5.0 AS Decimal(4, 1)), N'3', 4, N'5', N'3', N'4', N'5', N'6', N'7', 9)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (28, 4, N'5º a 10º', CAST(6.0 AS Decimal(4, 1)), N'4', 5, N'6', N'4', N'5', N'6', N'7', N'8', 9)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (101, 1, N'1er', CAST(36.8 AS Decimal(4, 1)), N'120/80', 75, N'Normal', N'Rubra', N'Sano', N'Exclusiva', N'Sin complicaciones', N'Dra. López', 10)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (102, 2, N'2º', CAST(36.5 AS Decimal(4, 1)), N'118/78', 72, N'Normal', N'Rubra', N'Sano', N'Exclusiva', N'Evolución favorable', N'Dra. López', 10)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (103, 3, N'3er', CAST(36.7 AS Decimal(4, 1)), N'115/75', 70, N'Normal', N'Serosa', N'Sano', N'Exclusiva', N'Alta programada', N'Dra. López', 10)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (104, 4, N'5º a 10º', CAST(36.6 AS Decimal(4, 1)), N'120/75', 68, N'Normal', N'Serosa', N'Sano', N'Exclusiva', N'Control ambulatorio', N'Dra. López', 10)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (105, 1, N'1er', CAST(777.0 AS Decimal(4, 1)), N'77', 777, N'77', N'77', N'77', N'77', N'7777', N'7', 11)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (106, 2, N'2º', CAST(88.0 AS Decimal(4, 1)), N'88', 88, N'88', N'88', N'88', N'88', N'888', N'8888', 11)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (107, 3, N'3er', NULL, N'', NULL, N'', N'', N'', N'', N'', N'', 11)
GO
INSERT [dbo].[PuerperiumDays] ([Id], [DayNumber], [DayLabel], [Temperature], [BloodPressure], [Pulse], [UterineInvolution], [Lochia], [Perineum], [Breastfeeding], [Observations], [Responsible], [PuerperiumInformationId]) VALUES (108, 4, N'5º a 10º', NULL, N'', NULL, N'', N'', N'', N'', N'', N'', 11)
GO
SET IDENTITY_INSERT [dbo].[PuerperiumDays] OFF
GO
SET IDENTITY_INSERT [dbo].[PuerperiumInformations] ON 
GO
INSERT [dbo].[PuerperiumInformations] ([Id], [PerinatalHistoryRecordId]) VALUES (9, 9)
GO
INSERT [dbo].[PuerperiumInformations] ([Id], [PerinatalHistoryRecordId]) VALUES (10, 10)
GO
INSERT [dbo].[PuerperiumInformations] ([Id], [PerinatalHistoryRecordId]) VALUES (11, 11)
GO
SET IDENTITY_INSERT [dbo].[PuerperiumInformations] OFF
GO
SET IDENTITY_INSERT [dbo].[Religions] ON 
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (1, N'_N/A (Desconocida)')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (2, N'Catolic@')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (3, N'Evangelic@')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (4, N'Cristian@')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (5, N'Adventista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (6, N'Testigo de Jehova')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (7, N'Mormon')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (8, N'Judio')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (9, N'Musulman')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (10, N'Hinduista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (11, N'Budista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (12, N'Taoista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (13, N'Confusionista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (14, N'Shintoista')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (15, N'Ate@')
GO
INSERT [dbo].[Religions] ([ReligionId], [Name]) VALUES (16, N'Otr@')
GO
SET IDENTITY_INSERT [dbo].[Religions] OFF
GO
SET IDENTITY_INSERT [dbo].[SchoolLevels] ON 
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (1, N'N/A')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (2, N'Ninguno')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (3, N'Primaria')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (4, N'Secundaria')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (5, N'Tecnica')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (6, N'Universitaria')
GO
INSERT [dbo].[SchoolLevels] ([SchoolLevelId], [Name]) VALUES (7, N'N/A (Desconocida)')
GO
SET IDENTITY_INSERT [dbo].[SchoolLevels] OFF
GO
SET IDENTITY_INSERT [dbo].[ServiceTypes] ON 
GO
INSERT [dbo].[ServiceTypes] ([ServiceTypeId], [Name]) VALUES (1, N'Servicio')
GO
INSERT [dbo].[ServiceTypes] ([ServiceTypeId], [Name]) VALUES (2, N'Producto')
GO
INSERT [dbo].[ServiceTypes] ([ServiceTypeId], [Name]) VALUES (3, N'Prod/Serv de Monto Variable')
GO
SET IDENTITY_INSERT [dbo].[ServiceTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Status] ON 
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (1, N'Activo', N'ALL')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (2, N'Inactivo', N'ALL')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (3, N'Caja Abierta', N'Cashier')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (4, N'Caja Cerrada', N'Cashier')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (5, N'Pagado', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (6, N'Pendiente de Pago', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (7, N'Pendiente de Pago (CxC)', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (8, N'Exonerado', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (9, N'Iniciado', N'Analitical')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (10, N'Listo Para Entrega', N'Analitical')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (11, N'Entregado', N'Analitical')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (12, N'Pendiente de Autorizacion', N'Admision')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (13, N'Autorizado', N'Admision')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (14, N'Ingresado', N'Admision')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (15, N'Pendiente de Alta', N'Admision')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (16, N'Dado de Alta', N'Admision')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (17, N'Disponible', N'Place')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (18, N'No Disponible', N'Place')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (19, N'Ocupada', N'Place')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (20, N'Admitido', N'Emergency')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (21, N'Referido', N'Emergency')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (22, N'Fallecido', N'Emergency')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (23, N'Alta a Peticion', N'Emergency')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (24, N'Dado de Alta', N'Emergency')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (25, N'En Acuerdo de Pago', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (26, N'Solicitado/Pend. Autorizacion', N'PaymentDeal')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (27, N'Aprobado/En Curso', N'PaymentDeal')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (28, N'Rechazado/Inactivo', N'PaymentDeal')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (29, N'Saldado', N'PaymentDeal')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (30, N'Cancelado', N'PaymentDeal')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (31, N'Enviado a Liquidacion', N'Sales')
GO
INSERT [dbo].[Status] ([StatusId], [Name], [Table]) VALUES (32, N'Liquidacion Procesada', N'Sales')
GO
SET IDENTITY_INSERT [dbo].[Status] OFF
GO
SET IDENTITY_INSERT [dbo].[UserTypes] ON 
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (1, N'Local')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (2, N'External')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (3, N'Facebook')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (4, N'Twitter')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (5, N'Microsoft')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (6, N'Google')
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [Name]) VALUES (7, N'Root')
GO
SET IDENTITY_INSERT [dbo].[UserTypes] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetRoles_AuthorId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoles_AuthorId] ON [dbo].[AspNetRoles]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetRoles_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoles_StatusId] ON [dbo].[AspNetRoles]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUsers_AuthorId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUsers_AuthorId] ON [dbo].[AspNetUsers]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUsers_ShopId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUsers_ShopId] ON [dbo].[AspNetUsers]
(
	[ShopId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUsers_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUsers_StatusId] ON [dbo].[AspNetUsers]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUsers_UserTypeId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUsers_UserTypeId] ON [dbo].[AspNetUsers]
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPayments_AuthorId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPayments_AuthorId] ON [dbo].[AuthorPayments]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPayments_AuthorPlanId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPayments_AuthorPlanId] ON [dbo].[AuthorPayments]
(
	[AuthorPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPayments_CurrencyId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPayments_CurrencyId] ON [dbo].[AuthorPayments]
(
	[CurrencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPayments_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPayments_StatusId] ON [dbo].[AuthorPayments]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPlanOptions_AuthorPlanId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPlanOptions_AuthorPlanId] ON [dbo].[AuthorPlanOptions]
(
	[AuthorPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPlanOptions_OptionId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPlanOptions_OptionId] ON [dbo].[AuthorPlanOptions]
(
	[OptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPlans_CurrencyId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPlans_CurrencyId] ON [dbo].[AuthorPlans]
(
	[CurrencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPlans_PeriodicityId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPlans_PeriodicityId] ON [dbo].[AuthorPlans]
(
	[PeriodicityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AuthorPlans_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_AuthorPlans_StatusId] ON [dbo].[AuthorPlans]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Authors_AuthorPlanId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Authors_AuthorPlanId] ON [dbo].[Authors]
(
	[AuthorPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Authors_AuthorTypeId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Authors_AuthorTypeId] ON [dbo].[Authors]
(
	[AuthorTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Authors_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Authors_StatusId] ON [dbo].[Authors]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_BirthInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_BirthInformations_PerinatalHistoryRecordId] ON [dbo].[BirthInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ContraceptionInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_ContraceptionInformations_PerinatalHistoryRecordId] ON [dbo].[ContraceptionInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Countries_ContinentId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Countries_ContinentId] ON [dbo].[Countries]
(
	[ContinentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CurrentPregnancies_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CurrentPregnancies_PerinatalHistoryRecordId] ON [dbo].[CurrentPregnancies]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_LaborEntries_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_LaborEntries_PerinatalHistoryRecordId] ON [dbo].[LaborEntries]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MaternalDischargeInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MaternalDischargeInformations_PerinatalHistoryRecordId] ON [dbo].[MaternalDischargeInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MedicalBackgrounds_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MedicalBackgrounds_PerinatalHistoryRecordId] ON [dbo].[MedicalBackgrounds]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MorbidityInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MorbidityInformations_PerinatalHistoryRecordId] ON [dbo].[MorbidityInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_NearMissVariables_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_NearMissVariables_PerinatalHistoryRecordId] ON [dbo].[NearMissVariables]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_NewbornInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_NewbornInformations_PerinatalHistoryRecordId] ON [dbo].[NewbornInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ObstetricBackgrounds_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_ObstetricBackgrounds_PerinatalHistoryRecordId] ON [dbo].[ObstetricBackgrounds]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_OptionRols_OptionId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_OptionRols_OptionId] ON [dbo].[OptionRols]
(
	[OptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_OptionRols_RolId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_OptionRols_RolId] ON [dbo].[OptionRols]
(
	[RolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_OptionRols_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_OptionRols_StatusId] ON [dbo].[OptionRols]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Options_ParentOptionId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Options_ParentOptionId] ON [dbo].[Options]
(
	[ParentOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Options_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Options_StatusId] ON [dbo].[Options]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ParentOptions_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_ParentOptions_StatusId] ON [dbo].[ParentOptions]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Patients_BloodTypeId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Patients_BloodTypeId] ON [dbo].[Patients]
(
	[BloodTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Patients_InsuranceId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Patients_InsuranceId] ON [dbo].[Patients]
(
	[InsuranceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Patients_PersonId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_Patients_PersonId] ON [dbo].[Patients]
(
	[PersonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_AuthorId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_AuthorId] ON [dbo].[People]
(
	[AuthorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_CountryId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_CountryId] ON [dbo].[People]
(
	[CountryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_GenderId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_GenderId] ON [dbo].[People]
(
	[GenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_MaritalSituationId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_MaritalSituationId] ON [dbo].[People]
(
	[MaritalSituationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_OcupationId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_OcupationId] ON [dbo].[People]
(
	[OcupationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_ReligionId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_ReligionId] ON [dbo].[People]
(
	[ReligionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_SchoolLevelId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_SchoolLevelId] ON [dbo].[People]
(
	[SchoolLevelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_People_StatusId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_StatusId] ON [dbo].[People]
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_People_UserId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_UserId] ON [dbo].[People]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_People_UserUpdateId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_People_UserUpdateId] ON [dbo].[People]
(
	[UserUpdateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PerinatalHistoryRecords_PatientId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_PerinatalHistoryRecords_PatientId] ON [dbo].[PerinatalHistoryRecords]
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostpartumInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_PostpartumInformations_PerinatalHistoryRecordId] ON [dbo].[PostpartumInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PostpartumVisits_PostpartumInformationId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_PostpartumVisits_PostpartumInformationId] ON [dbo].[PostpartumVisits]
(
	[PostpartumInformationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PrenatalConsultations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_PrenatalConsultations_PerinatalHistoryRecordId] ON [dbo].[PrenatalConsultations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PuerperiumDays_PuerperiumInformationId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_PuerperiumDays_PuerperiumInformationId] ON [dbo].[PuerperiumDays]
(
	[PuerperiumInformationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PuerperiumInformations_PerinatalHistoryRecordId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_PuerperiumInformations_PerinatalHistoryRecordId] ON [dbo].[PuerperiumInformations]
(
	[PerinatalHistoryRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TenantProducts_CategoryId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_TenantProducts_CategoryId] ON [dbo].[TenantProducts]
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TenantProducts_ServiceTypeId]    Script Date: 2/17/2026 4:12:13 PM ******/
CREATE NONCLUSTERED INDEX [IX_TenantProducts_ServiceTypeId] ON [dbo].[TenantProducts]
(
	[ServiceTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetUsers] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsTenantRoot]
GO
ALTER TABLE [dbo].[AuthorPlans] ADD  DEFAULT (CONVERT([bit],(0))) FOR [ShowAsBuyable]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsBarber]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsGeneral]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsMedical]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [AvailableEmailMessages]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [AvailableSmsMessages]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [AvailableWsMessages]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [UpdateMessagesAvailability]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [SeqLiq]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [TotalEmailUsed]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [TotalSmsUsed]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [TotalWhatsAppUsed]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [HideBuyPriceInProducts]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [HideCategoryInProducts]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [HideCodeInProducts]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [HideMeasureInProducts]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT (CONVERT([bit],(0))) FOR [HideTaxInProducts]
GO
ALTER TABLE [dbo].[Authors] ADD  DEFAULT ((0)) FOR [SeqPurchase]
GO
ALTER TABLE [dbo].[Options] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsGeneralNoteOption]
GO
ALTER TABLE [dbo].[Options] ADD  DEFAULT (CONVERT([bit],(0))) FOR [ShowInMenu]
GO
ALTER TABLE [dbo].[People] ADD  DEFAULT (CONVERT([bit],(0))) FOR [Literated]
GO
ALTER TABLE [dbo].[People] ADD  DEFAULT (CONVERT([bit],(0))) FOR [LiveAlone]
GO
ALTER TABLE [dbo].[People] ADD  DEFAULT ((0)) FOR [YearsInTheGreatestLevel]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoles_Authors_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([AuthorId])
GO
ALTER TABLE [dbo].[AspNetRoles] CHECK CONSTRAINT [FK_AspNetRoles_Authors_AuthorId]
GO
ALTER TABLE [dbo].[AspNetRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoles_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[AspNetRoles] CHECK CONSTRAINT [FK_AspNetRoles_Status_StatusId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Authors_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([AuthorId])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Authors_AuthorId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_Status_StatusId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_UserTypes_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserTypes] ([UserTypeId])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_UserTypes_UserTypeId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AuthorPayments]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPayments_AuthorPlans_AuthorPlanId] FOREIGN KEY([AuthorPlanId])
REFERENCES [dbo].[AuthorPlans] ([AuthorPlanId])
GO
ALTER TABLE [dbo].[AuthorPayments] CHECK CONSTRAINT [FK_AuthorPayments_AuthorPlans_AuthorPlanId]
GO
ALTER TABLE [dbo].[AuthorPayments]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPayments_Authors_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([AuthorId])
GO
ALTER TABLE [dbo].[AuthorPayments] CHECK CONSTRAINT [FK_AuthorPayments_Authors_AuthorId]
GO
ALTER TABLE [dbo].[AuthorPayments]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPayments_Currencies_CurrencyId] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currencies] ([CurrencyId])
GO
ALTER TABLE [dbo].[AuthorPayments] CHECK CONSTRAINT [FK_AuthorPayments_Currencies_CurrencyId]
GO
ALTER TABLE [dbo].[AuthorPayments]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPayments_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[AuthorPayments] CHECK CONSTRAINT [FK_AuthorPayments_Status_StatusId]
GO
ALTER TABLE [dbo].[AuthorPlanOptions]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPlanOptions_AuthorPlans_AuthorPlanId] FOREIGN KEY([AuthorPlanId])
REFERENCES [dbo].[AuthorPlans] ([AuthorPlanId])
GO
ALTER TABLE [dbo].[AuthorPlanOptions] CHECK CONSTRAINT [FK_AuthorPlanOptions_AuthorPlans_AuthorPlanId]
GO
ALTER TABLE [dbo].[AuthorPlanOptions]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPlanOptions_Options_OptionId] FOREIGN KEY([OptionId])
REFERENCES [dbo].[Options] ([OptionId])
GO
ALTER TABLE [dbo].[AuthorPlanOptions] CHECK CONSTRAINT [FK_AuthorPlanOptions_Options_OptionId]
GO
ALTER TABLE [dbo].[AuthorPlans]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPlans_Currencies_CurrencyId] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currencies] ([CurrencyId])
GO
ALTER TABLE [dbo].[AuthorPlans] CHECK CONSTRAINT [FK_AuthorPlans_Currencies_CurrencyId]
GO
ALTER TABLE [dbo].[AuthorPlans]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPlans_Periodicities_PeriodicityId] FOREIGN KEY([PeriodicityId])
REFERENCES [dbo].[Periodicities] ([PeriodicityId])
GO
ALTER TABLE [dbo].[AuthorPlans] CHECK CONSTRAINT [FK_AuthorPlans_Periodicities_PeriodicityId]
GO
ALTER TABLE [dbo].[AuthorPlans]  WITH CHECK ADD  CONSTRAINT [FK_AuthorPlans_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[AuthorPlans] CHECK CONSTRAINT [FK_AuthorPlans_Status_StatusId]
GO
ALTER TABLE [dbo].[Authors]  WITH CHECK ADD  CONSTRAINT [FK_Authors_AuthorPlans_AuthorPlanId] FOREIGN KEY([AuthorPlanId])
REFERENCES [dbo].[AuthorPlans] ([AuthorPlanId])
GO
ALTER TABLE [dbo].[Authors] CHECK CONSTRAINT [FK_Authors_AuthorPlans_AuthorPlanId]
GO
ALTER TABLE [dbo].[Authors]  WITH CHECK ADD  CONSTRAINT [FK_Authors_AuthorTypes_AuthorTypeId] FOREIGN KEY([AuthorTypeId])
REFERENCES [dbo].[AuthorTypes] ([AuthorTypeId])
GO
ALTER TABLE [dbo].[Authors] CHECK CONSTRAINT [FK_Authors_AuthorTypes_AuthorTypeId]
GO
ALTER TABLE [dbo].[Authors]  WITH CHECK ADD  CONSTRAINT [FK_Authors_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[Authors] CHECK CONSTRAINT [FK_Authors_Status_StatusId]
GO
ALTER TABLE [dbo].[BirthInformations]  WITH CHECK ADD  CONSTRAINT [FK_BirthInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BirthInformations] CHECK CONSTRAINT [FK_BirthInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[ContraceptionInformations]  WITH CHECK ADD  CONSTRAINT [FK_ContraceptionInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ContraceptionInformations] CHECK CONSTRAINT [FK_ContraceptionInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[Countries]  WITH CHECK ADD  CONSTRAINT [FK_Countries_Continents_ContinentId] FOREIGN KEY([ContinentId])
REFERENCES [dbo].[Continents] ([ContinentId])
GO
ALTER TABLE [dbo].[Countries] CHECK CONSTRAINT [FK_Countries_Continents_ContinentId]
GO
ALTER TABLE [dbo].[CurrentPregnancies]  WITH CHECK ADD  CONSTRAINT [FK_CurrentPregnancies_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CurrentPregnancies] CHECK CONSTRAINT [FK_CurrentPregnancies_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[LaborEntries]  WITH CHECK ADD  CONSTRAINT [FK_LaborEntries_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
GO
ALTER TABLE [dbo].[LaborEntries] CHECK CONSTRAINT [FK_LaborEntries_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[MaternalDischargeInformations]  WITH CHECK ADD  CONSTRAINT [FK_MaternalDischargeInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MaternalDischargeInformations] CHECK CONSTRAINT [FK_MaternalDischargeInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[MedicalBackgrounds]  WITH CHECK ADD  CONSTRAINT [FK_MedicalBackgrounds_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MedicalBackgrounds] CHECK CONSTRAINT [FK_MedicalBackgrounds_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[MorbidityInformations]  WITH CHECK ADD  CONSTRAINT [FK_MorbidityInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MorbidityInformations] CHECK CONSTRAINT [FK_MorbidityInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[NearMissVariables]  WITH CHECK ADD  CONSTRAINT [FK_NearMissVariables_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[NearMissVariables] CHECK CONSTRAINT [FK_NearMissVariables_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[NewbornInformations]  WITH CHECK ADD  CONSTRAINT [FK_NewbornInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[NewbornInformations] CHECK CONSTRAINT [FK_NewbornInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[ObstetricBackgrounds]  WITH CHECK ADD  CONSTRAINT [FK_ObstetricBackgrounds_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ObstetricBackgrounds] CHECK CONSTRAINT [FK_ObstetricBackgrounds_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[OptionRols]  WITH CHECK ADD  CONSTRAINT [FK_OptionRols_AspNetRoles_RolId] FOREIGN KEY([RolId])
REFERENCES [dbo].[AspNetRoles] ([Id])
GO
ALTER TABLE [dbo].[OptionRols] CHECK CONSTRAINT [FK_OptionRols_AspNetRoles_RolId]
GO
ALTER TABLE [dbo].[OptionRols]  WITH CHECK ADD  CONSTRAINT [FK_OptionRols_Options_OptionId] FOREIGN KEY([OptionId])
REFERENCES [dbo].[Options] ([OptionId])
GO
ALTER TABLE [dbo].[OptionRols] CHECK CONSTRAINT [FK_OptionRols_Options_OptionId]
GO
ALTER TABLE [dbo].[OptionRols]  WITH CHECK ADD  CONSTRAINT [FK_OptionRols_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[OptionRols] CHECK CONSTRAINT [FK_OptionRols_Status_StatusId]
GO
ALTER TABLE [dbo].[Options]  WITH CHECK ADD  CONSTRAINT [FK_Options_ParentOptions_ParentOptionId] FOREIGN KEY([ParentOptionId])
REFERENCES [dbo].[ParentOptions] ([ParentOptionId])
GO
ALTER TABLE [dbo].[Options] CHECK CONSTRAINT [FK_Options_ParentOptions_ParentOptionId]
GO
ALTER TABLE [dbo].[Options]  WITH CHECK ADD  CONSTRAINT [FK_Options_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[Options] CHECK CONSTRAINT [FK_Options_Status_StatusId]
GO
ALTER TABLE [dbo].[ParentOptions]  WITH CHECK ADD  CONSTRAINT [FK_ParentOptions_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[ParentOptions] CHECK CONSTRAINT [FK_ParentOptions_Status_StatusId]
GO
ALTER TABLE [dbo].[Patients]  WITH CHECK ADD  CONSTRAINT [FK_Patients_BloodTypes_BloodTypeId] FOREIGN KEY([BloodTypeId])
REFERENCES [dbo].[BloodTypes] ([BloodTypeId])
GO
ALTER TABLE [dbo].[Patients] CHECK CONSTRAINT [FK_Patients_BloodTypes_BloodTypeId]
GO
ALTER TABLE [dbo].[Patients]  WITH CHECK ADD  CONSTRAINT [FK_Patients_Insurances_InsuranceId] FOREIGN KEY([InsuranceId])
REFERENCES [dbo].[Insurances] ([InsuranceId])
GO
ALTER TABLE [dbo].[Patients] CHECK CONSTRAINT [FK_Patients_Insurances_InsuranceId]
GO
ALTER TABLE [dbo].[Patients]  WITH CHECK ADD  CONSTRAINT [FK_Patients_People_PersonId] FOREIGN KEY([PersonId])
REFERENCES [dbo].[People] ([PersonId])
GO
ALTER TABLE [dbo].[Patients] CHECK CONSTRAINT [FK_Patients_People_PersonId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_AspNetUsers_UserUpdateId] FOREIGN KEY([UserUpdateId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_AspNetUsers_UserUpdateId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Authors_AuthorId] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([AuthorId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Authors_AuthorId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Countries_CountryId] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Countries] ([CountryId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Countries_CountryId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Genders_GenderId] FOREIGN KEY([GenderId])
REFERENCES [dbo].[Genders] ([GenderId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Genders_GenderId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_MaritalSituations_MaritalSituationId] FOREIGN KEY([MaritalSituationId])
REFERENCES [dbo].[MaritalSituations] ([MaritalSituationId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_MaritalSituations_MaritalSituationId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Ocupations_OcupationId] FOREIGN KEY([OcupationId])
REFERENCES [dbo].[Ocupations] ([OcupationId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Ocupations_OcupationId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Religions_ReligionId] FOREIGN KEY([ReligionId])
REFERENCES [dbo].[Religions] ([ReligionId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Religions_ReligionId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_SchoolLevels_SchoolLevelId] FOREIGN KEY([SchoolLevelId])
REFERENCES [dbo].[SchoolLevels] ([SchoolLevelId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_SchoolLevels_SchoolLevelId]
GO
ALTER TABLE [dbo].[People]  WITH CHECK ADD  CONSTRAINT [FK_People_Status_StatusId] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[People] CHECK CONSTRAINT [FK_People_Status_StatusId]
GO
ALTER TABLE [dbo].[PerinatalHistoryRecords]  WITH CHECK ADD  CONSTRAINT [FK_PerinatalHistoryRecords_Patients_PatientId] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patients] ([PatientId])
GO
ALTER TABLE [dbo].[PerinatalHistoryRecords] CHECK CONSTRAINT [FK_PerinatalHistoryRecords_Patients_PatientId]
GO
ALTER TABLE [dbo].[PostpartumInformations]  WITH CHECK ADD  CONSTRAINT [FK_PostpartumInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostpartumInformations] CHECK CONSTRAINT [FK_PostpartumInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[PostpartumVisits]  WITH CHECK ADD  CONSTRAINT [FK_PostpartumVisits_PostpartumInformations_PostpartumInformationId] FOREIGN KEY([PostpartumInformationId])
REFERENCES [dbo].[PostpartumInformations] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PostpartumVisits] CHECK CONSTRAINT [FK_PostpartumVisits_PostpartumInformations_PostpartumInformationId]
GO
ALTER TABLE [dbo].[PrenatalConsultations]  WITH CHECK ADD  CONSTRAINT [FK_PrenatalConsultations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PrenatalConsultations] CHECK CONSTRAINT [FK_PrenatalConsultations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[PuerperiumDays]  WITH CHECK ADD  CONSTRAINT [FK_PuerperiumDays_PuerperiumInformations_PuerperiumInformationId] FOREIGN KEY([PuerperiumInformationId])
REFERENCES [dbo].[PuerperiumInformations] ([Id])
GO
ALTER TABLE [dbo].[PuerperiumDays] CHECK CONSTRAINT [FK_PuerperiumDays_PuerperiumInformations_PuerperiumInformationId]
GO
ALTER TABLE [dbo].[PuerperiumInformations]  WITH CHECK ADD  CONSTRAINT [FK_PuerperiumInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId] FOREIGN KEY([PerinatalHistoryRecordId])
REFERENCES [dbo].[PerinatalHistoryRecords] ([Id])
GO
ALTER TABLE [dbo].[PuerperiumInformations] CHECK CONSTRAINT [FK_PuerperiumInformations_PerinatalHistoryRecords_PerinatalHistoryRecordId]
GO
ALTER TABLE [dbo].[TenantProducts]  WITH CHECK ADD  CONSTRAINT [FK_TenantProducts_ServiceTypes_ServiceTypeId] FOREIGN KEY([ServiceTypeId])
REFERENCES [dbo].[ServiceTypes] ([ServiceTypeId])
GO
ALTER TABLE [dbo].[TenantProducts] CHECK CONSTRAINT [FK_TenantProducts_ServiceTypes_ServiceTypeId]
GO
USE [master]
GO
ALTER DATABASE [solmeddboblyperinatal] SET  READ_WRITE 
GO
