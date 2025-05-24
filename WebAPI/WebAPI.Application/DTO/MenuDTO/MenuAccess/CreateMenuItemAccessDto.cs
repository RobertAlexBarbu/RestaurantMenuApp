namespace WebAPI.Application.DTO.MenuAccess;

public class CreateMenuItemAccessDto
{

    public string MenuItemAccessType { get; set; } // "favorite" or "details"
    public int MenuId { get; set; }
    public int MenuCategoryId { get; set; }
    public int MenuItemId { get; set; }
}