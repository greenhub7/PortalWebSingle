namespace Domain
{
    public static class AppConstants
    {
        public static string CurrentUrl => "";
        public const string JWTScheme = "Bearer";
        public const string CookieScheme = "Cookies";
        public const string AuthSchemes = $"{JWTScheme},{CookieScheme}";
    }
}