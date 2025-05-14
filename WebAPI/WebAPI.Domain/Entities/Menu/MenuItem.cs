namespace WebAPI.Domain.Entities.Menu;

public class MenuItem
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Position { get; set; }
    public string MenuType { get; set; } // "drinks" or "food"
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Weight { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = null;
    public bool IsVisible { get; set; } = true;
    public string NutritionalValues { get; set; } = string.Empty;
    public string Ingredients { get; set; } = string.Empty;
    public string Allergens { get; set; } = string.Empty;
    public int MenuCategoryId { get; set; }
    public MenuCategory MenuCategory { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}