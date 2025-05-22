using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.Other;

namespace WebAPI.Application.Services.MenuServices.MenuCategoryService;

public interface IMenuCategoryService
{
    Task<List<MenuCategoryDto>> ReplaceAllByMenuIdAsync(int menuId, int userId, List<CreateMenuCategoryDto> createMenuCategoryDtos);
    Task<MenuCategoryDto> CreateAsync(int userId, CreateMenuCategoryDto createMenuCategoryDto);

    Task DeleteByIdAsync(int id, string menuType, int userId);

    Task UpdateByIdAsync(int id, int userId, UpdateMenuCategoryDto updateMenuCategoryDto);
    
    Task UpdatePositionsByMenuIdAsync(int menuId, string menuType, int userId, List<PositionDto> categoryPositions);
    
    Task UpdateVisibilityByIdAsync(int id, int userId, UpdateMenuCategoryVisibilityDto updateVisibilityDto);
}