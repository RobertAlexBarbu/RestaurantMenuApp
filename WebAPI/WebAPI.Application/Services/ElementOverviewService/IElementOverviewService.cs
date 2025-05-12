using WebAPI.Application.DTO.Element;

namespace WebAPI.Application.Services.ElementOverviewService;

public interface IElementOverviewService
{
    Task<ElementsAndCategoriesDto> GetElementsAndCategoriesByUserIdAsync(int userId);
    Task<ElementsAndCategoriesDto> ResetElementsAndCategoriesByUserIdAsync(int userId);
}