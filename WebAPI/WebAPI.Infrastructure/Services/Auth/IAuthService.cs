using System.Security.Claims;

namespace WebAPI.Infrastructure.Services.Auth;

public interface IAuthService
{
    Task<ClaimsPrincipal> CreateClaimsPrincipalAsync(string jwtToken);

    Task AddRoleClaimAsync(string uid, string role);

    Task AddUserIdClaimAsync(string uid, int userId);

    Task AddUserIdAndRoleClaimsAsync(string uid, int userId, string role);

    Task DeleteAccountAsync(string uid);
}