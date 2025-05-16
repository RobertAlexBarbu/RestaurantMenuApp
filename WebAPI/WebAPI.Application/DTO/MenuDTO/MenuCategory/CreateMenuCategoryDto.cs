namespace WebAPI.Application.DTO.MenuDTO.MenuCategory;

public class CreateMenuCategoryDto
{
    public string MenuType { get; set; } // "drinks" or "food"
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Position { get; set; }
    public int MenuId { get; set; }
}