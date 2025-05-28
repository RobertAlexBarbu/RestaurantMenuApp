namespace WebAPI.Application.DTO.MenuDTO.Menu;

public class MenuReviewDto
{
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Rating { get; set; }
        public string Message { get; set; }
        public int MenuId { get; set; }
        
}