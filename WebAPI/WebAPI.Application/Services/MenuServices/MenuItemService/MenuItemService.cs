using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuItem;
using WebAPI.Application.DTO.Other;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuServices.MenuItemService;

public class MenuItemService(AppDbContext context, IMapper mapper) : IMenuItemService
{
    public async Task ReplaceAllByMenuIdAsync(int menuId, int userId, List<CreateMenuItemDto> createMenuItemDtos)
    {
        var oldItems = await context.MenuItems.Where(e => e.UserId == userId && e.MenuId == menuId).ToListAsync();
        oldItems.ForEach(e => { context.Remove(e); });
        await context.SaveChangesAsync();
        var menuItems = createMenuItemDtos.Select(mapper.Map<MenuItem>).ToList();
        menuItems.ForEach(e =>
        {
            e.UserId = userId;
            context.Add((object)e);
        });
        await context.SaveChangesAsync();
    }

    public async Task<MenuItemDto> CreateAsync(int userId, CreateMenuItemDto createMenuItemDto)
    {
        var menuItem =
            await context.CreateFromDtoWithUserIdAsync<MenuItem, CreateMenuItemDto>(userId,
                createMenuItemDto, mapper);
        return mapper.Map<MenuItemDto>(menuItem);
    }

    public async Task DeleteByIdAsync(int id, int userId)
    {
        await context.DeleteByIdWithUserIdAsync<MenuItem>(id, userId);
    }

    public async Task UpdateByIdAsync(int id, int userId, UpdateMenuItemDto updateMenuItemDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuItem, UpdateMenuItemDto>(id, userId,
            updateMenuItemDto, mapper);
    }

    public async Task UpdatePositionsByCategoryIdAsync(int categoryId, int userId, List<PositionDto> itemPositions)
    {
        var items = await context.MenuItems.Where(e => e.UserId == userId && e.MenuCategoryId == categoryId).ToListAsync();
        if (itemPositions.Count != items.Count)
            throw new Exception("More/Less positions than elements");
        foreach (var itemPosition in itemPositions)
        {
            var item = items.FirstOrDefault(e => e.Id == itemPosition.Id);
            if (item != null)
                item.Position = itemPosition.Position;
            else
                throw new Exception("Position with Id to an element that doesn't exist");
        }

        await context.SaveChangesAsync();
    }

    public async Task UpdateVisibilityByIdAsync(int id, int userId, UpdateMenuItemVisibilityDto updateVisibilityDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuItem, UpdateMenuItemVisibilityDto>(id, userId,
            updateVisibilityDto, mapper);
    }

    public async Task UpdatePriceByIdAsync(int id, int userId, UpdateMenuItemPriceDto updatePriceDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuItem, UpdateMenuItemPriceDto>(id, userId,
            updatePriceDto, mapper);
    }

    public async Task UpdateImageUrlByIdAsync(int id, int userId, UpdateMenuItemImageUrlDto updateImageUrlDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuItem, UpdateMenuItemImageUrlDto>(id, userId,
            updateImageUrlDto, mapper);
    }
}