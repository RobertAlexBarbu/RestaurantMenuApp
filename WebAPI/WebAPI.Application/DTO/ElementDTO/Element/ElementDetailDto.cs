using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Application.DTO.User;

namespace WebAPI.Application.DTO.Element;

public class ElementDetailDto : ElementDto
{
    public ElementCategoryDto Category { get; set; }

}