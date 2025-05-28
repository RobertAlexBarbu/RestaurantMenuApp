using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.MenuDTO.Menu;

namespace WebAPI.Application.Services.MenuService;

public interface IMenuService
{
    Task<MenuDto> CreateAsync(int userId, CreateMenuDto createMenuDto);
    Task UpdateByIdAsync(int menuId, int userId, UpdateMenuDto updateMenuDto);
    Task<bool> CheckUrlAvailabilityAsync(string url);
    Task<MenuDetailDto> GetByIdAsync(int menuId);
    
    Task<MenuDetailDto> GetByUrlAsync(string menuUrl);

    Task<MenuDataDto> GetDataByIdAsync(int id);

    Task CreateReview(CreateMenuReviewDto createMenuReviewDto);

    Task<List<MenuReviewDto>> GetReviewsByMenuId(int menuId);

    Task<string> GenerateUniqueUrlAsync();

}