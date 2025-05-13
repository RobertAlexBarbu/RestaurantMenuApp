namespace WebAPI.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string FirebaseId { get; set; } 

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Role { get; set; }
    public string? Email { get; set; } = null;
    public string? GoogleEmail { get; set; } = null;
    public bool EmailNotifications { get; set; } = true;
    public string Username { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = null;
    public bool SetupComplete { get; set; } = false;
    public Menu.Menu Menu { get; set; }
}