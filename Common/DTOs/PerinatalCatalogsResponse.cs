using System.Collections.Generic;


namespace Common.DTOs
{
    public class PerinatalCatalogsResponse
    {
        public Dictionary<string, List<EnumValueDto>> Enums { get; set; }
        public List<BasicReferenceDto> MaritalSituations { get; set; }
        public List<BasicReferenceDto> SchoolLevels { get; set; }
        public List<BasicReferenceDto> Ethnicities { get; set; }
    }

    public class EnumValueDto
    {
        public int Value { get; set; }
        public string Name { get; set; }
    }

    public class BasicReferenceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

