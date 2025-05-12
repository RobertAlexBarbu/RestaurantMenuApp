namespace WebAPI.Domain.Exceptions;

public class InvalidClaimsException(string message) : Exception(message)
{
}