using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Filters;

public class AllowAuthenticated : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context.HttpContext.User?.Identity?.IsAuthenticated != true)
        {
            var message = "[AllowAuthenticatedFilter] Principal Not Authenticated";
            context.Result = new UnauthorizedObjectResult(new { message });
        }
        else
        {
            Console.WriteLine(context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier));
        }
    }
}