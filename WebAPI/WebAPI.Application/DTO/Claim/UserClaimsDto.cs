namespace WebAPI.Application.DTO.User;

public class UserClaimsDto : FirebaseClaimsDto
{
    public int Id { get; set; }
    public string Role { get; set; }
}