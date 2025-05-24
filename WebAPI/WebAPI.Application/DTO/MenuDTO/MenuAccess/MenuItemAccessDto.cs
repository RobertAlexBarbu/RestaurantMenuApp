namespace WebAPI.Application.DTO.MenuAccess;

public class MenuItemAccessDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string MenuItemAccessType { get; set; } // "favorite" or "details"
    public int MenuId { get; set; }
    public int MenuCategoryId { get; set; }
    public int MenuItemId { get; set; }
}