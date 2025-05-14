namespace WebAPI.Application.DTO.MenuAccess;

public class MenuAccessDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string MenuAccessType { get; set; }
    public int MenuId { get; set; }
}