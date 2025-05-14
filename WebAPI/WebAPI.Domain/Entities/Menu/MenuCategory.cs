namespace WebAPI.Domain.Entities.Menu;

public class MenuCategory
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Position { get; set; }
    public string MenuType { get; set; } // "drinks" or "food"
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int UserId { get; set; }
    public User User { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public List<MenuItem> MenuItems { get; set; } = [];
}