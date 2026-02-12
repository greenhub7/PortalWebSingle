
using Microsoft.AspNetCore.Http;
using System;

namespace Web.Extensions
{
    public static class HttpRequestExtensions
    {
        public static bool IsFacturexDomain(this HttpRequest request)
        {
            var host = request.Host.Host.ToLower();
            return host.Contains("facturexrd.com") || host.Contains("facturex.com");
        }

        public static string GetDomainLogo(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "/content/facturex/facturex-logo.png";
            }

            
            return "/content/Icons/_SolmedSmall.png";
        }

        public static string GetDomainName(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "Facturex";
            }

            return "SolMed - Solución Médica Digital";
        }

        public static string GetDomainTitle(this HttpRequest request, string pageTitle = "")
        {
            if (request.IsFacturexDomain())
            {
                return string.IsNullOrEmpty(pageTitle)
                    ? "Facturex - Liquidez y Gestión para Profesionales de la Salud"
                    : $"{pageTitle} - Facturex";
            }

            return string.IsNullOrEmpty(pageTitle)
                ? "SolMed | Software médico para consultorios, clínicas y hospitales"
                : $"{pageTitle} - SolMed";
        }

        public static string GetDomainStylesheet(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "/css/facturex-styles.css";
            }

            return null;
        }

        public static string GetDomainBodyClass(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "facturex-theme";
            }

            return "";
        }

        public static string GetDomainScript(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "/js/facturex-scripts.js";
            }

            return "/js/solmed-scripts.js";
        }

        public static string GetDomainEmail(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "info@facturexrd.com";
            }

            return "info@solmedapp.com";
        }

        public static string GetDomainPhone(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "+1 (829) 846-7777";
            }

            return "+1 (829) 349-5083";
        }

        public static string GetDomainAddress(this HttpRequest request)
        {
            if (request.IsFacturexDomain())
            {
                return "Plaza Daviana, Suite 303, Ave. Rómulo Betancourt 1149, Distrito Nacional, República Dominicana";
            }

            return "Santo Domingo, República Dominicana";
        }
    }
}