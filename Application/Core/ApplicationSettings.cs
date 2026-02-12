using System.Diagnostics.CodeAnalysis;

namespace Application.Core
{
    [ExcludeFromCodeCoverage]
    public static class AppSettings
    {
        public const string AppSettingsKey = "ApplicationSettings";
        public static ApplicationSettings ApplicationSettings { get; set; } = new ApplicationSettings();
    }

    public class ApplicationSettings
    {
        public string IsRunningOn { get; set; }
        public string CloudStorageContainerReference { get; set; }
        public string MailSenderPassword { get; set; }
        public string SMTPName { get; set; }
        public string SMTPPort { get; set; }
        public string MailSender { get; set; }
        public string MailSenderName { get; set; }
        public string EncodeKey { get; set; }
        public string IsRunningLocal { get; set; }
        public string TwilioSid { get; set; }
        public string TwilioToken { get; set; }
        public string TwilioPhone { get; set; }
        public string TwilioWhatsAppPhone { get; set; }
        public string TwilioSmsSid { get; set; }
    }
}
