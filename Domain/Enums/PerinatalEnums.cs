namespace Domain.Enums
{

    public enum SiNoEnum
    {
        No,
        Si
    }

    public enum SiNoSdEnum
    {
        No,
        Si,
        Sd  
    }

    public enum SiNoNcEnum
    {
        No,
        Si,
        Nc  
    }

    public enum SiNoSdNcEnum
    {
        No,
        Si,
        Sd, 
        Nc  
    }

    public enum PositivoNegativoEnum
    {
        Negativo,
        Positivo
    }

    public enum PositivoNegativoSdEnum
    {
        Negativo,
        Positivo,
        Sd
    }

    public enum PositivoNegativoNcEnum
    {
        Negativo,
        Positivo,
        Nc
    }

    public enum PositivoNegativoSdNcEnum
    {
        Negativo,
        Positivo,
        Sd,
        Nc
    }

    
    public enum EstadoNacimientoEnum
    {
        NacidoVivo,
        MuertoAnteparto,
        MuertoParto,
        MuertoIgnoraMomento
    }

    public enum ResultadoTamizajeEnum
    {
        Negativo,
        Positivo,
        NoSeHizo
    }

    public enum CorticoidesAntenatalesEnum
    {
        Completo,
        Incompleto,
        Ninguno,
        Nc
    }

    public enum PresentacionSituacionEnum
    {
        Cefalica,
        Pelviana,
        Transversa
    }

    public enum SexoEnum
    {
        Femenino,
        Masculino,
        NoDeterminado
    }

    public enum PesoEdadGestacionalEnum
    {
        Adecuado,
        Pequeno,
        Grande
    }

    public enum CondicionEgresoEnum
    {
        Sana,
        NA,
        ConPatologia,
        Muerte
    }

    public enum ResultadoExamenEnum
    {
        Normal,
        Anormal,
        NoSeHizo
    }

    public enum ResultadoExamenNcEnum
    {
        Normal,
        Anormal,
        NoSeHizo,
        Nc
    }

    public enum TipoInicioEnum
    {
        Espontaneo,
        Inducido,
        CesareaElectiva
    }

    public enum LigaduraCordonEnum
    {
        Menor1Min,
        Entre1y3Min
    }

    public enum PosicionPartoEnum
    {
        Sentada,
        Acostada,
        Cuclillas
    }

    public enum EdadGestacionalMetodoEnum
    {
        PorFUM,
        PorECO,
        Estimada
    }

    public enum TipoPersonalEnum
    {
        Medico,
        Obstetra,
        Enfermera,
        Auxiliar,
        Estudiante,
        Empirica,
        Otro
    }

    public enum DefectosCongenitosEnum
    {
        No,
        Menor,
        Mayor
    }

    public enum EgresoEstadoEnum
    {
        Vivo,
        Fallece
    }

    public enum AlimentacionTipoEnum
    {
        LactanciaExclusiva,
        Parcial,
        Artificial
    }

    public enum TipoEgresoEnum
    {
        Fallece,
        ContraConsejoMedico,
        Medico
    }

    public enum PreferenciaAnticonceptivoEnum
    {
        NoSeleccionado,
        Preferido,
        Aceptado
    }

    public enum Ethnicity
    {
        Blanca = 1,
        Indigena = 2,
        Mestiza = 3,
        Negra = 4,
        Otra = 5, 
        NoEspecificada = 6,
    }

}