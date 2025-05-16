namespace WebAPI.Application.DTO.MenuDTO.MenuCategory;

public class MenuCategoryDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Position { get; set; }
    public string MenuType { get; set; } // "drinks" or "food"
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsVisible { get; set; } = true;
    public int UserId { get; set; }
    public int MenuId { get; set; }
}