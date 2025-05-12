using System.Security.Claims;
using System.Text.Json;
using FirebaseAdmin.Auth;
using WebAPI.Infrastructure.Providers;

namespace WebAPI.Infrastructure.Services.Auth.Firebase;

public class FirebaseAuthService(FirebaseProvider firebaseProvider) : IAuthService
{
    public async Task<ClaimsPrincipal> CreateClaimsPrincipalAsync(string jwtToken)
    {
        var principal = new ClaimsPrincipal(new ClaimsIdentity()); // Unauthenticated Identity
        try
        {
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(jwtToken);
            var jsonString = decodedToken.Claims["firebase"].ToString();
            var dictionary = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonString ?? string.Empty);
            var uid = decodedToken.Uid;
            var role = GetUserRoleClaim(decodedToken);
            var userId = GetUserIdRoleClaim(decodedToken);
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, uid),
                new(ClaimTypes.Email, decodedToken.Claims["email"].ToString()),
                new("provider", dictionary["sign_in_provider"].ToString())
            };
            if (role != null && userId != null)
                claims.AddRange(
                [
                    new Claim(ClaimTypes.Role, role),
                    new Claim("userId", userId)
                ]);
            var identity = new ClaimsIdentity(claims, "firebase"); // Authenticated Identity
            principal = new ClaimsPrincipal(identity);
        }
        catch (FirebaseAuthException e)
        {
            Console.WriteLine(e.Message);
        }

        return principal;
    }
    public async Task AddRoleClaimAsync(string uid, string role)
    {
        var claims = new Dictionary<string, object>
        {
            { "role", role }
        };
        await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(uid, claims);
    }
    public async Task AddUserIdClaimAsync(string uid, int userId)
    {
        var claims = new Dictionary<string, object>
        {
            { "userId", userId }
        };
        await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(uid, claims);
    }
    public async Task AddUserIdAndRoleClaimsAsync(string uid, int userId, string role)
    {
        var claims = new Dictionary<string, object>
        {
            { "userId", userId },
            { "role", role }
        };
        await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(uid, claims);
    }
    public async Task DeleteAccountAsync(string uid)
    {
        try
        {
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);
            Console.WriteLine($"Successfully deleted user with UID: {uid}");
        }
        catch (FirebaseAuthException ex)
        {
            Console.WriteLine($"Error deleting user with UID: {uid}. Details: {ex.Message}");
            throw; // Re-throw the exception to let the caller handle it if needed
        }
    }
    
    private string? GetUserRoleClaim(FirebaseToken firebaseToken)
    {
        firebaseToken.Claims.TryGetValue("role", out var role);
        return role?.ToString() ?? null;
    }

    private string? GetUserIdRoleClaim(FirebaseToken firebaseToken)
    {
        firebaseToken.Claims.TryGetValue("userId", out var userId);
        return userId?.ToString() ?? null;
    }
}