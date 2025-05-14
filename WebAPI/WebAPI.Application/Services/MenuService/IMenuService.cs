using WebAPI.Application.DTO.Menu;

namespace WebAPI.Application.Services.MenuService;

public interface IMenuService
{
    Task<MenuDto> CreateAsync(int userId, CreateMenuDto createMenuDto);
    Task UpdateByIdAsync(int menuId, int userId, UpdateMenuDto updateMenuDto);
    Task<bool> CheckUrlAvailabilityAsync(string url);
    Task<MenuDto> GetByIdAsync(int menuId);
    
    Task<MenuDto> GetByUrlAsync(string menuUrl);

    Task<string> GenerateUniqueUrlAsync();

}