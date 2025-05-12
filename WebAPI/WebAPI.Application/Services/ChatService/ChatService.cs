using System.Text;
using WebAPI.Application.DTO.Chat;
using WebAPI.Infrastructure.LLM;

namespace WebAPI.Application.Services.ChatService;

public class ChatService(ILlmService llmService) : IChatService
{
    public async Task<MessageDto> AskQuestionAsync(AskQuestionDto askQuestionDto)
    {
        var prompt = BuildPrompt(askQuestionDto);
        var response = await llmService.SendPromptAsync(prompt);
        return new MessageDto()
        {
            Text = response
        };
    }

    public async Task<MessageDto> AskQuestionWithContextAsync(AskQuestionDto askQuestionDto, int userId)
    {
        // create embedding on question
        // get the first 7 closest results
        // var context = result.json.Join()
        throw new NotImplementedException();
    }

    private string BuildPrompt(AskQuestionDto askQuestionDto)
    {
        return BuildPromptInternal(askQuestionDto);
    }

    private string BuildPromptWithContext(AskQuestionDto askQuestionDto, string context)
    {
        return BuildPromptInternal(askQuestionDto, context);
    }

    private string BuildPromptInternal(AskQuestionDto askQuestionDto, string? context = null)
    {
        var promptBuilder = new StringBuilder();

        promptBuilder.AppendLine(context != null
            ? "PROMPT: You are a helpful AI assistant. Answer the user's question based on the provided context and conversation history."
            : "PROMPT: You are a helpful AI assistant. Answer the user's question based on the conversation history provided.");
        promptBuilder.AppendLine();

        if (context != null)
        {
            promptBuilder.AppendLine("CONTEXT:");
            promptBuilder.AppendLine(context);
            promptBuilder.AppendLine();
        }

        if (askQuestionDto.ChatHistory.Any())
        {
            promptBuilder.AppendLine("CONVERSATION HISTORY:");
            var orderedMessages = askQuestionDto.ChatHistory.OrderBy(m => m.CreatedAt)
                .TakeLast(5) 
                .ToList();
            foreach (var message in orderedMessages)
            {
                promptBuilder.AppendLine($"Time: {message.CreatedAt:yyyy-MM-dd HH:mm:ss}");
                if (message.IsAI)
                {
                    promptBuilder.AppendLine($"AI: {message.Text}");
                }
                else
                {
                    promptBuilder.AppendLine($"User: {message.Text}");
                }
                promptBuilder.AppendLine();
            }
        }

        promptBuilder.AppendLine("CURRENT QUESTION TO ANSWER:");
        promptBuilder.AppendLine(askQuestionDto.Question);
        promptBuilder.AppendLine();
        if (context != null)
            promptBuilder.AppendLine(
                "Answer the question based on the provided context and conversation history. If the context doesn't contain relevant information, say so instead of making up an answer.");
        return promptBuilder.ToString();
    }
}