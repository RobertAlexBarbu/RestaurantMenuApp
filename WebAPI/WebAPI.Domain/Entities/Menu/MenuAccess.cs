namespace WebAPI.Domain.Entities.Menu;

public class MenuAccess
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string MenuAccessType { get; set; } // "url" or "qr"
    public int MenuId { get; set; }
    public Menu Menu { get; set; }

}