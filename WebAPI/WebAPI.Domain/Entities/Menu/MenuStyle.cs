namespace WebAPI.Domain.Entities.Menu;

public class MenuStyle
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string? ImageUrl { get; set; } = null;

    public string ThemeColor { get; set; } = "#326b00";
    public string ThemeCss { get; set; } = string.Empty;
    public string Font { get; set; } = "Roboto";
    public string FontCss { get; set; } = string.Empty;
    public string Style { get; set; } = "basic";
}