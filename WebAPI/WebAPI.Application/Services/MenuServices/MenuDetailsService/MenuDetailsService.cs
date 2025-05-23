using AutoMapper;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuServices.MenuDetailsService;

public class MenuDetailsService(AppDbContext context, IMapper mapper): IMenuDetailsService
{
    public async Task CreateMenuDetailsAsync(int userId, CreateMenuDetailsDto createMenuDetailsDto)
    {
        await context.CreateFromDtoWithUserIdAsync<MenuDetails, CreateMenuDetailsDto>(userId, createMenuDetailsDto,
                mapper);
    }

    public async Task UpdateMenuDetailsByIdAsync(int id, int userId, UpdateMenuDetailsDto updateMenuDetailsDto)
    {
        await context.UpdateFromDtoWithUserIdSkipNullsAsync<MenuDetails, UpdateMenuDetailsDto>(id, userId,
            updateMenuDetailsDto, mapper);
        return;
    }
}