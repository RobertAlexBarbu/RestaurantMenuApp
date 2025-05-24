using WebAPI.Application.DTO.MenuDTO.MenuStyle;

namespace WebAPI.Application.DTO.MenuDTO.Menu;

public class MenuDetailDto
{
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = null;
        public int UserId { get; set; }
        public MenuStyleDto MenuStyle { get; set; }
}