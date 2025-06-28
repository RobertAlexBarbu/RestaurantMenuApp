using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.MenuDTO.Menu;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Application.DTO.MenuDTO.MenuItem;
using WebAPI.Application.DTO.MenuDTO.MenuStyle;
using WebAPI.Application.Services.MenuServices.MenuDetailsService;
using WebAPI.Application.Services.MenuServices.MenuStyleService;
using WebAPI.Application.Services.UtilityService;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Domain.Enums;
using WebAPI.Domain.Exceptions;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuService;

public class MenuService(AppDbContext context, IMapper mapper, IUtilityService utilityService, IMenuDetailsService menuDetailsService, IMenuStyleService menuStyleService): IMenuService
{
    public async Task<MenuDto> CreateAsync(int userId, CreateMenuDto createMenuDto)
    {
        var menu = mapper.Map<Menu>(createMenuDto);
        menu.UserId = userId;
        context.Menus.Add(menu);
        await context.SaveChangesAsync();
        await menuDetailsService.CreateMenuDetailsAsync(userId, new CreateMenuDetailsDto
        {
            MenuId = menu.Id
        });
        await menuStyleService.CreateAsync(userId, new CreateMenuStyleDto
        {
            MenuId = menu.Id
        });
        return mapper.Map<MenuDto>(menu);
    }

    public async Task UpdateByIdAsync(int menuId, int userId, UpdateMenuDto updateMenuDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<Menu, UpdateMenuDto>(menuId, userId, updateMenuDto, mapper);
    }

    public async Task<bool> CheckUrlAvailabilityAsync(string url)
    {
        bool isAvailable = !await context.Menus
            .AnyAsync(m => m.Url.ToLower() == url.ToLower());
        return isAvailable;
    }

    public async Task<MenuDetailDto> GetByIdAsync(int menuId)
    {
        var menu = await context.Menus
            .Include(m => m.MenuStyle)
            .FirstOrDefaultAsync(m => m.Id == menuId);
        if (menu == null)
        {
            throw new NotFoundException("Menu");
        }
        return mapper.Map<MenuDetailDto>(menu);
    }

    public async Task<MenuDetailDto> GetByUrlAsync(string menuUrl)
    {
        var menu = await context.Menus
            .Include(m => m.MenuStyle)
            .FirstOrDefaultAsync(m => m.Url == menuUrl);
        if (menu == null)
        {
            throw new NotFoundException("Menu");
        }
        return mapper.Map<MenuDetailDto>(menu);
    }

    public async Task<MenuDataDto> GetDataByIdAsync(int id)
    {
        var menuItems = await context.MenuItems.Where(i => i.MenuId == id).ToListAsync();
        var menuCategories = await context.MenuCategories.Where(c => c.MenuId == id).ToListAsync();
        var menuDetails = await context.MenuDetails.FirstOrDefaultAsync(d => d.MenuId == id);
        var menuDetailsDto = mapper.Map<MenuDetailsDto>(menuDetails);
        return new MenuDataDto
        {
            DrinksMenuItems = menuItems.Select(mapper.Map<MenuItemDto>).Where(i => i.MenuType == MenuTypes.Drinks).ToList(),
            FoodMenuItems = menuItems.Select(mapper.Map<MenuItemDto>).Where(i => i.MenuType == MenuTypes.Food).ToList(),
            DrinksMenuCategories = menuCategories.Select(mapper.Map<MenuCategoryDto>).Where(i => i.MenuType == MenuTypes.Drinks).ToList(),
            FoodMenuCategories = menuCategories.Select(mapper.Map<MenuCategoryDto>).Where(i => i.MenuType == MenuTypes.Food).ToList(),
            MenuDetails = menuDetailsDto
        };
    }

    public async Task CreateReview(CreateMenuReviewDto createMenuReviewDto)
    {
        await context.CreateFromDtoAsync<MenuReview, CreateMenuReviewDto>(createMenuReviewDto, mapper);
    }

    public async Task<List<MenuReviewDto>> GetReviewsByMenuId(int menuId)
    {
        var reviews =await context.MenuReviews.Where(r => r.MenuId ==  menuId).OrderByDescending(r => r.CreatedAt).ToListAsync();
        return reviews.Select(mapper.Map<MenuReviewDto>).ToList();
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