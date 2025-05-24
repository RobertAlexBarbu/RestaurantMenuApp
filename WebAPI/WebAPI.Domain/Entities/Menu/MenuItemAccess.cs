namespace WebAPI.Domain.Entities.Menu;

public class MenuItemAccess
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string MenuItemAccessType { get; set; } // "favorite" or "details"
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int MenuCategoryId { get; set; }
    public MenuCategory MenuCategory { get; set; }
    public int MenuItemId { get; set; }
    public MenuItem MenuItem { get; set; }
}