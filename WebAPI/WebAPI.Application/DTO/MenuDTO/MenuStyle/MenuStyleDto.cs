namespace WebAPI.Application.DTO.MenuDTO.MenuStyle;

public class MenuStyleDto
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public int UserId { get; set; }
    public string? ImageUrl { get; set; } = null;

    public string ThemeColor { get; set; }
    public string ThemeCss { get; set; }
    public string Font { get; set; }
    public string FontCss { get; set; }
    public string Style { get; set; } 
}