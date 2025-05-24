using WebAPI.Application.DTO.MenuDTO.MenuStyle;

namespace WebAPI.Application.Services.MenuServices.MenuStyleService;

public interface IMenuStyleService
{
    Task UpdateByIdAsync(int id, int userId, UpdateMenuStyleDto updateMenuStyleDto);

    Task<MenuStyleDto> GetByMenuIdAsync(int menuId);
    Task CreateAsync(int userId, CreateMenuStyleDto createMenuStyleDto);
}