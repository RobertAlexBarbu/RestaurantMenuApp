using WebAPI.Application.DTO.Chat;

namespace WebAPI.Application.Services.ChatService;

public interface IChatService
{
    Task<MessageDto> AskQuestionAsync(AskQuestionDto askQuestionDto);
    Task<MessageDto> AskQuestionWithContextAsync(AskQuestionDto askQuestionDto, int userId);
}