using System.Security.Claims;
using WebAPI.Application.DTO.User;
using WebAPI.Domain.Exceptions;

namespace WebAPI.Application.Services.ClaimService;

public class ClaimService : IClaimService
{
    public FirebaseClaimsDto GetFirebaseClaims(ClaimsPrincipal claimIdentity)
    {
        var firebaseUidClaim = claimIdentity.FindFirst(ClaimTypes.NameIdentifier);
        var emailClaim = claimIdentity.FindFirst(ClaimTypes.Email);
        var providerClaim = claimIdentity.FindFirst("provider");
        string? email = null;
        string? googleEmail = null;
        if (providerClaim?.Value == "google.com") googleEmail = emailClaim?.Value;
        if (providerClaim?.Value == "password") email = emailClaim?.Value;

        if (firebaseUidClaim == null)
            throw new InvalidClaimsException("[ClaimService.GetFirebaseClaims] FirebaseId claim is null");

        return new FirebaseClaimsDto
        {
            FirebaseId = firebaseUidClaim.Value,
            Email = email,
            GoogleEmail = googleEmail
        };
    }

    public UserClaimsDto GetUserClaims(ClaimsPrincipal claimIdentity)
    {
        var roleClaim = claimIdentity.FindFirst(ClaimTypes.Role);
        var userIdClaim = claimIdentity.FindFirst("userId");
        var firebaseClaims = GetFirebaseClaims(claimIdentity);

        if (userIdClaim == null || roleClaim == null)
            throw new InvalidClaimsException("[ClaimService.GetUserClaims] UserId/Role claims are null");

        return new UserClaimsDto
        {
            Id = Convert.ToInt32(userIdClaim.Value),
            Role = roleClaim.Value,
            FirebaseId = firebaseClaims.FirebaseId,
            Email = firebaseClaims.Email,
            GoogleEmail = firebaseClaims.GoogleEmail
        };
    }
}