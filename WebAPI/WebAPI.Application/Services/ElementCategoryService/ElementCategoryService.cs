using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Domain.Entities;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.ElementCategoryService;

public class ElementCategoryService(AppDbContext context, IMapper mapper) : IElementCategoryService
{
    public async Task<List<ElementCategoryDto>> ReplaceAllByUserIdAsync(int userId,
        List<CreateElementCategoryDto> createElementCategoryDtos)
    {
        var oldElementCategories = await context.ElementCategories.Where(e => e.UserId == userId).ToListAsync();
        oldElementCategories.ForEach(e => { context.Remove(e); });
        await context.SaveChangesAsync();

        var elementsCategories = createElementCategoryDtos.Select(mapper.Map<ElementCategory>).ToList();
        elementsCategories.ForEach(e =>
        {
            Console.WriteLine(e.Name);
            e.UserId = userId;
            context.Add(e);
        });
        await context.SaveChangesAsync();
        var test = elementsCategories.Select(mapper.Map<ElementCategoryDto>).ToList();
        test.ForEach(e => { Console.WriteLine(e.Name); });
        return elementsCategories.Select(mapper.Map<ElementCategoryDto>).ToList();
    }

    public async Task<ElementCategoryDto> CreateAsync(int userId,
        CreateElementCategoryDto createElementCategoryDto)
    {
        var category = mapper.Map<ElementCategory>(createElementCategoryDto);
        category.UserId = userId;
        context.ElementCategories.Add(category);
        await context.SaveChangesAsync();
        return mapper.Map<ElementCategoryDto>(category);
    }

    public async Task DeleteByIdAsync(int categoryId, int userId)
    {
        await context.EnsureExistsByIdAsync<ElementCategory>(categoryId, userId);
        var category = new ElementCategory
        {
            Id = categoryId
        };
        context.Attach(category);
        context.Remove(category);
        await context.SaveChangesAsync();
    }

    public async Task UpdateByIdAsync(int categoryId, int userId,
        UpdateElementCategoryDto updateElementCategoryDto)
    {
        await context.UpdateFromDtoAsync<ElementCategory, UpdateElementCategoryDto>(categoryId, userId,
            updateElementCategoryDto, mapper);
    }
}