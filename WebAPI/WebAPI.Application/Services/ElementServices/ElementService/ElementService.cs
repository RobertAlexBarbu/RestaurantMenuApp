using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.Other;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Exceptions;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.ElementService;

public class ElementService(AppDbContext context, IMapper mapper) : IElementService
{
    public async Task<List<ElementDto>> ReplaceAllByUserIdAsync(int userId,
        List<CreateElementDto> createElementDtos)
    {
        var oldElements = await context.Elements.Where(e => e.UserId == userId).ToListAsync();
        oldElements.ForEach(e => { context.Remove(e); });
        await context.SaveChangesAsync();
        var elements = createElementDtos.Select(mapper.Map<Element>).ToList();
        elements.ForEach(e =>
        {
            e.UserId = userId;
            context.Add(e);
        });
        await context.SaveChangesAsync();
        return elements.Select(mapper.Map<ElementDto>).ToList();
    }

    public async Task<ElementDto> CreateAsync(int userId, CreateElementDto createElementDto)
    {
        var element = mapper.Map<Element>(createElementDto);
        element.UserId = userId;
        context.Elements.Add(element);
        await context.SaveChangesAsync();
        return mapper.Map<ElementDto>(element);
    }


    public async Task DeleteByIdAsync(int elementId, int userId)
    {
        await context.EnsureExistsByIdAndUserIdAsync<Element>(elementId, userId);
        var element = new Element
        {
            Id = elementId
        };
        context.Attach(element);
        context.Remove(element);
        await context.SaveChangesAsync();

        var elements = await context.Elements
            .Where(e => e.UserId == userId)
            .OrderBy(e => e.Position)
            .ToListAsync();
        for (var i = 0; i < elements.Count; i++)
            elements[i].Position = i + 1;
        await context.SaveChangesAsync();
    }


    public async Task<ElementDetailDto> UpdateByIdAsync(int elementId, int userId, UpdateElementDto updateElementDto)
    {
        await context.UpdateFromDtoAsync<Element, UpdateElementDto>(elementId, userId, updateElementDto, mapper);
        var element = await context.Elements.Include(e => e.Category).FirstOrDefaultAsync(e => e.Id == elementId);
        if (element == null) throw new NotFoundException("Element");

        return mapper.Map<ElementDetailDto>(element);
    }


    public async Task UpdateVisibilityByIdAsync(int elementId, int userId, UpdateVisibilityDto updateVisibilityDto)
    {
        await context.UpdateFromDtoAsync<Element, UpdateVisibilityDto>(elementId, userId, updateVisibilityDto, mapper);
    }

    public async Task UpdateWeightByIdAsync(int elementId, int userId, UpdateWeightDto updateWeightDto)
    {
        await context.UpdateFromDtoAsync<Element, UpdateWeightDto>(elementId, userId, updateWeightDto, mapper);
    }

    public async Task UpdateElementPositionsAsync(int userId, List<PositionDto> elementPositions)
    {
        var elements = await context.Elements.Where(e => e.UserId == userId).ToListAsync();
        if (elementPositions.Count != elements.Count)
            throw new Exception("More/Less elementPositions than elements");
        foreach (var elementPosition in elementPositions)
        {
            var element = elements.FirstOrDefault(e => e.Id == elementPosition.Id);
            if (element != null)
                element.Position = elementPosition.Position;
            else
                throw new Exception("Position with Id to an element that doesn't exist");
        }

        await context.SaveChangesAsync();

        // Create elements from positions
        // Attatch them
        // mark Position as update
        // save Changes
    }
}