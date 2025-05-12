using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Application.Services.ClaimService;

namespace WebAPI.Filters;

public class AllowRole(string role) : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context.HttpContext.User?.Identity?.IsAuthenticated != true)
        {
            var message = "[AllowRoleFilter] Principal Not Authenticated";
            context.Result = new UnauthorizedObjectResult(new { message });
        }
        else
        {
            var claimService = context.HttpContext.RequestServices.GetRequiredService<IClaimService>();
            Console.WriteLine(context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier));
            var user = claimService.GetUserClaims(context.HttpContext.User);
            if (user.Role != role)
            {
                var message = $"[AllowRoleFilter] Principal is not {role}";
                context.Result = new ObjectResult(new { message })
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
        }
    }
}