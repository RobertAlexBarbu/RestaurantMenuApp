using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.Other;

namespace WebAPI.Application.Services.ElementService;

public interface IElementService
{
    Task<List<ElementDto>> ReplaceAllByUserIdAsync(int userId, List<CreateElementDto> createElementDtos);
    Task<ElementDto> CreateAsync(int userId, CreateElementDto createElementDto);

    Task DeleteByIdAsync(int elementId, int userId);

    Task<ElementDetailDto> UpdateByIdAsync(int elementId, int userId, UpdateElementDto updateElementDto);


    Task UpdateVisibilityByIdAsync(int elementId, int userId, UpdateVisibilityDto updateVisibilityDto);
    Task UpdateWeightByIdAsync(int elementId, int userId, UpdateWeightDto updateWeightDto);
    Task UpdateElementPositionsAsync(int userId, List<PositionDto> elementPositions);
}