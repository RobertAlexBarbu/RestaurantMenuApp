namespace WebAPI.Application.DTO.User;

public class FirebaseClaimsDto
{
    public string FirebaseId { get; set; }

    public string? GoogleEmail { get; set; } = null;
    public string? Email { get; set; } = null;
}