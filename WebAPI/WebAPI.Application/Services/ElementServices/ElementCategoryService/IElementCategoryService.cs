using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;

namespace WebAPI.Application.Services.ElementCategoryService;

public interface IElementCategoryService
{
    Task<ElementCategoryDto> CreateAsync(int userId, CreateElementCategoryDto createElementCategoryDto);

    Task DeleteByIdAsync(int categoryId, int userId);

    Task UpdateByIdAsync(int categoryId, int userId,
        UpdateElementCategoryDto updateElementCategoryDto);

    Task<List<ElementCategoryDto>> ReplaceAllByUserIdAsync(int userId,
        List<CreateElementCategoryDto> createElementCategoryDtos);
}