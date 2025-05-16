using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Application.DTO.MenuDTO.MenuItem;

namespace WebAPI.Application.DTO.MenuDTO.Menu;

public class MenuDataDto
{
    public MenuDetailsDto MenuDetails { get; set; }
    public List<MenuItemDto> FoodMenuItems { get; set; }
    public List<MenuCategoryDto> FoodMenuCategories { get; set; }
    public List<MenuItemDto> DrinksMenuItems { get; set; }
    public List<MenuCategoryDto> DrinksMenuCategories { get; set; }
    
}