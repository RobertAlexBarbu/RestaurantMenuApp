namespace WebAPI.Infrastructure.LLM;

public interface ILlmService
{
    Task<string> SendPromptAsync(string prompt);
}