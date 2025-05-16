using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Domain.Data;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.ElementOverviewService;

public class ElementOverviewService(AppDbContext context, IMapper mapper) : IElementOverviewService
{
    public async Task<ElementsAndCategoriesDto> GetElementsAndCategoriesByUserIdAsync(int userId)
    {
        var elements = await context.Elements
            .Where(e => e.UserId == userId)
            .Include(e => e.Category).OrderBy(e => e.Position)
            .ToListAsync();
        var categories = await context.ElementCategories.Where(c => c.UserId == userId).ToListAsync();
        return new ElementsAndCategoriesDto
        {
            Elements = elements.Select(mapper.Map<ElementDto>).ToList(),
            Categories = categories.Select(mapper.Map<ElementCategoryDto>).ToList()
        };
    }

    public async Task<ElementsAndCategoriesDto> ResetElementsAndCategoriesByUserIdAsync(int userId)
    {
        var elements = await context.Elements.Where(e => e.UserId == userId).ToListAsync();
        elements.ForEach(e => { context.Elements.Remove(e); });
        var categories = await context.ElementCategories.Where(e => e.UserId == userId).ToListAsync();
        categories.ForEach(e => { context.ElementCategories.Remove(e); });
        await context.SaveChangesAsync();

        categories = ElementData.GetCategories();
        categories.ForEach(c =>
        {
            c.UserId = userId;
            context.ElementCategories.Add(c);
        });
        await context.SaveChangesAsync();

        elements = ElementData.GetElements(categories);
        elements.ForEach(e =>
        {
            e.UserId = userId;
            context.Elements.Add(e);
        });
        await context.SaveChangesAsync();
        return new ElementsAndCategoriesDto
        {
            Elements = elements.Select(mapper.Map<ElementDto>).ToList(),
            Categories = categories.Select(mapper.Map<ElementCategoryDto>).ToList()
        };
    }
}