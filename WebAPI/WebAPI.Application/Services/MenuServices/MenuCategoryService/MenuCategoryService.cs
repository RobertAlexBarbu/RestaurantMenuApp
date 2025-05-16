using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.Other;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuServices.MenuCategoryService;

public class MenuCategoryService(AppDbContext context, IMapper mapper) : IMenuCategoryService
{
    public async Task ReplaceAllByMenuIdAsync(int menuId, int userId, List<CreateMenuCategoryDto> createMenuCategoryDtos)
    {
        var oldCategories = await context.MenuCategories.Where(e => e.UserId == userId && e.MenuId == menuId).ToListAsync();
        oldCategories.ForEach(e => { context.Remove(e); });
        await context.SaveChangesAsync();
        var menuCategories = createMenuCategoryDtos.Select(mapper.Map<MenuCategory>).ToList();
        menuCategories.ForEach(e =>
        {
            e.UserId = userId;
            context.Add(e);
        });
        await context.SaveChangesAsync();
    }

    public async Task<MenuCategoryDto> CreateAsync(int userId, CreateMenuCategoryDto createMenuCategoryDto)
    {
        var menuCategory =
            await context.CreateFromDtoWithUserIdAsync<MenuCategory, CreateMenuCategoryDto>(userId,
                createMenuCategoryDto, mapper);
        return mapper.Map<MenuCategoryDto>(menuCategory);
    }

    public async Task DeleteByIdAsync(int id, int userId)
    {
        await context.DeleteByIdWithUserIdAsync<MenuCategory>(id, userId);
    }

    public async Task UpdateByIdAsync(int id, int userId, UpdateMenuCategoryDto updateMenuCategoryDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuCategory, UpdateMenuCategoryDto>(id, userId,
            updateMenuCategoryDto, mapper);
    }

    public async Task UpdatePositionsByMenuIdAsync(int menuId, int userId, List<PositionDto> categoryPositions)
    {
        var categories = await context.MenuCategories.Where(e => e.UserId == userId && e.MenuId == menuId).ToListAsync();
        if (categoryPositions.Count != categories.Count)
            throw new Exception("More/Less positions than elements");
        foreach (var categoryPosition in categoryPositions)
        {
            var category = categories.FirstOrDefault(e => e.Id == categoryPosition.Id);
            if (category != null)
                category.Position = categoryPosition.Position;
            else
                throw new Exception("Position with Id to an element that doesn't exist");
        }

        await context.SaveChangesAsync();
    }

    public async Task UpdateVisibilityByIdAsync(int id, int userId, UpdateMenuCategoryVisibilityDto updateVisibilityDto)
    {
        await context.UpdateFromDtoWithUserIdAsync<MenuCategory, UpdateMenuCategoryVisibilityDto>(id, userId,
            updateVisibilityDto, mapper);
    }
}