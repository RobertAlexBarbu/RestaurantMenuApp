using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Application.DTO.MenuDTO.MenuStyle;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Domain.Exceptions;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuServices.MenuStyleService;

public class MenuStyleService(AppDbContext context, IMapper mapper): IMenuStyleService
{
    public async Task UpdateByIdAsync(int id, int userId, UpdateMenuStyleDto updateMenuStyleDto)
    {
        await context.UpdateFromDtoWithUserIdSkipNullsAsync<MenuStyle, UpdateMenuStyleDto>(id, userId,
            updateMenuStyleDto, mapper);
        return;
    }

    public async Task<MenuStyleDto> GetByMenuIdAsync(int menuId)
    {
        var style = await context.MenuStyles.FirstOrDefaultAsync(s => s.MenuId == menuId);
        if (style == null)
        {
            throw new NotFoundException("MenuStyle");
        }

        return mapper.Map<MenuStyleDto>(style);
    }

    public async Task CreateAsync(int userId, CreateMenuStyleDto createMenuStyleDto)
    {
        await context.CreateFromDtoWithUserIdAsync<MenuStyle, CreateMenuStyleDto>(userId, createMenuStyleDto,
            mapper);
    }
}