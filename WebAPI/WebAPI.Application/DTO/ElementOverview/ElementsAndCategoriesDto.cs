using WebAPI.Application.DTO.ElementCategory;

namespace WebAPI.Application.DTO.Element;

public class ElementsAndCategoriesDto
{
    public List<ElementDto> Elements { get; set; } = new();
    public List<ElementCategoryDto> Categories { get; set; } = new();
}