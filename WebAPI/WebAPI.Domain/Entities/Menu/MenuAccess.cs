namespace WebAPI.Domain.Entities.Menu;

public class MenuAccess
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string MenuAccessType { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}