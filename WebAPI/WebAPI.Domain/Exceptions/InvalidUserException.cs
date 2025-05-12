namespace WebAPI.Domain.Exceptions;

public class InvalidUserException(string message) : Exception(message)
{
}