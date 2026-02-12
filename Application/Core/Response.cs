namespace Application.Core
{
    public class Response
    {
        public bool IsSuccess { get; set; }
        public bool Success { get; set; }
        public int Code { get; set; }

        public string Message { get; set; }

        public object Result { get; set; }
    }
}
