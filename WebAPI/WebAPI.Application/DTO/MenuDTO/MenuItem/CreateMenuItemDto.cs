namespace WebAPI.Application.DTO.MenuDTO.MenuItem;

public class CreateMenuItemDto
{
    public string MenuType { get; set; } // "drinks" or "food"
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = null;
    public double Price { get; set; }
 
    
    public string NutritionalValues { get; set; } = string.Empty;
    public string Ingredients { get; set; } = string.Empty;
    public string Allergens { get; set; } = string.Empty;
    
    public int Position { get; set; }
    public int MenuCategoryId { get; set; }
    public int MenuId { get; set; }
}