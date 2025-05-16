using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuItem;
using WebAPI.Application.DTO.Other;

namespace WebAPI.Application.Services.MenuServices.MenuItemService;

public interface IMenuItemService
{
    Task ReplaceAllByMenuIdAsync(int menuId, int userId, List<CreateMenuItemDto > createMenuItemDtos);
    
    Task<MenuCategoryDto> CreateAsync(int userId, CreateMenuItemDto createMenuItemDto);

    Task DeleteByIdAsync(int id, int userId);

    Task UpdateByIdAsync(int id, int userId, UpdateMenuItemDto updateMenuItemDto);
    
    Task UpdatePositionsByCategoryIdAsync(int categoryId, int userId,  List<PositionDto> itemPositions);
    
    Task UpdateVisibilityByIdAsync(int id, int userId, UpdateMenuItemVisibilityDto updateVisibilityDto);
    
    Task UpdatePriceByIdAsync(int id, int userId, UpdateMenuItemPriceDto updatePriceDto);
    
    Task UpdateImageUrlByIdAsync(int id, int userId, UpdateMenuItemImageUrlDto updateImageUrlDto);
}