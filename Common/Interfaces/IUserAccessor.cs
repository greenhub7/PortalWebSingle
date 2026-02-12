using Application.Models;

namespace Application.Interfaces
{
    public interface IUserAccessor
    {
        string GetUsername();
        CurrentUser Get { get; }
    }
}