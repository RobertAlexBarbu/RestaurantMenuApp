using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Domain.Exceptions;

namespace WebAPI.Filters;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var e = context.Exception;
        var inner = context.Exception.InnerException;
        Console.WriteLine(e.Message);
        Console.WriteLine(e.StackTrace);
        var message = "[Principal] " + e.Message;
        if (inner != null) message += "\n[Inner] " + inner.Message;
        if (e is NotFoundException)
        {
            context.Result = new NotFoundObjectResult(new { e.Message });
        }
        else if (e is InvalidUserException)
        {
            context.Result = new UnauthorizedObjectResult(new { e.Message });
        }
        else if (e is InvalidClaimsException)
        {
            context.Result = new UnauthorizedObjectResult(new { e.Message });
            ;
        }
        else
        {
            context.Result = new BadRequestObjectResult(new { Message = message });
        }
    }
}