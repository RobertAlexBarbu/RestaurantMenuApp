using System.Security.Claims;
using WebAPI.Application.DTO.User;

namespace WebAPI.Application.Services.ClaimService;

public interface IClaimService
{
    UserClaimsDto GetUserClaims(ClaimsPrincipal claimIdentity);

    FirebaseClaimsDto GetFirebaseClaims(ClaimsPrincipal claimIdentity);
}