namespace WebAPI.Application.DTO.MenuDTO.MenuItem;

public class UpdateMenuItemDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public double Price { get; set; }

    
    public string NutritionalValues { get; set; } = string.Empty;
    public string Ingredients { get; set; } = string.Empty;
    public string Allergens { get; set; } = string.Empty;
    
    public int MenuCategoryId { get; set; }
}