using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Menu;
using WebAPI.Application.Services.UtilityService;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Domain.Exceptions;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuService;

public class MenuService(AppDbContext context, IMapper mapper, IUtilityService utilityService): IMenuService
{
    public async Task<MenuDto> CreateAsync(int userId, CreateMenuDto createMenuDto)
    {
        var menu = mapper.Map<Menu>(createMenuDto);
        menu.UserId = userId;
        context.Menus.Add(menu);
        await context.SaveChangesAsync();
        return mapper.Map<MenuDto>(menu);
    }

    public async Task UpdateByIdAsync(int menuId, int userId, UpdateMenuDto updateMenuDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<Menu, UpdateMenuDto>(menuId, userId, updateMenuDto, mapper);
    }

    public async Task<bool> CheckUrlAvailabilityAsync(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
        {
            return false;
        }

        var menu = await context.Menus.FirstOrDefaultAsync(m => m.Url == url);
        bool isAvailable = !await context.Menus
            .AnyAsync(m => m.Url.ToLower() == url.ToLower());
        return isAvailable;
    }

    public async Task<MenuDto> GetByIdAsync(int menuId)
    {
        var menu = await context.Menus.FirstOrDefaultAsync(m => m.Id == menuId);
        if (menu == null)
        {
            throw new NotFoundException("Menu");
        }
        return mapper.Map<MenuDto>(menu);
    }

    public async Task<MenuDto> GetByUrlAsync(string menuUrl)
    {
        var menu = await context.Menus.FirstOrDefaultAsync(m => m.Url == menuUrl);
        if (menu == null)
        {
            throw new NotFoundException("Menu");
        }
        return mapper.Map<MenuDto>(menu);
    }

    public async Task<string> GenerateUniqueUrlAsync()
    {
        string url;
        bool exists;
        do
        {
            url = "my-url-" +  utilityService.GenerateRandomString(8);
            exists = !await CheckUrlAvailabilityAsync(url);
        }
        while (exists);

        return url;
    }

}