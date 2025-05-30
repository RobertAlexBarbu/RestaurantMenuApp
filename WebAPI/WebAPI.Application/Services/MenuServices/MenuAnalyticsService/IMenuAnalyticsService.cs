using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.MenuAccess;

namespace WebAPI.Application.Services.MenuAnalyticsService;

public interface IMenuAnalyticsService
{
    Task CreateMenuAccessAsync(CreateMenuAccessDto createMenuAccessDto);
    
    Task CreateMenuItemAccessAsync(CreateMenuItemAccessDto createMenuAccessDto);

    Task<List<MenuAccessDto>> GetMenuAccessesByMenuIdAsync(int menuId);
    
    Task<List<MenuItemAccessDto>> GetMenuItemAccessesByMenuIdAsync(int menuId);

    Task<MenuAccessInsightDto> GetMenuAccessInsights(int qrAccesses, int urlAccesses, string timePeriod);
}