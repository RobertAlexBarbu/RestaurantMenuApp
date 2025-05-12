namespace WebAPI.Application.DTO.Chat;

public class MessageDto
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Text { set; get; } = string.Empty;

    public bool IsAI { get; set; } = true;
}