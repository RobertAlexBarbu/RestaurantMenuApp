using WebAPI.Infrastructure.Services.Auth;
using WebAPI.Infrastructure.Services.Auth.Firebase;

namespace WebAPI.Middlewares;

public class AuthenticationMiddleware(RequestDelegate next, IAuthService firebaseAuthService)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            var token = authHeader.Substring("Bearer ".Length).Trim();
            context.User = await firebaseAuthService.CreateClaimsPrincipalAsync(token);
        }

        await next(context);
    }
}