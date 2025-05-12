namespace WebAPI.Application.DTO.Chat;

public class AskQuestionDto
{
    public List<MessageDto> ChatHistory { get; set; } = new List<MessageDto>();
    public string Question { get; set; } = string.Empty;

}