using WebAPI.Application.DTO.MenuDTO.MenuDetails;

namespace WebAPI.Application.Services.MenuServices.MenuDetailsService;

public interface IMenuDetailsService
{
    Task CreateMenuDetailsAsync(int userId, CreateMenuDetailsDto createMenuDetailsDto);
}