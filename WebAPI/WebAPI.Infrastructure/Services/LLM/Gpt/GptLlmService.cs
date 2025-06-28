using Microsoft.SemanticKernel;
using WebAPI.Infrastructure.LLM;

namespace WebAPI.Infrastructure.Services.LLM.DeepSeek;

public class GptLlmService : ILlmService
{
    private readonly Kernel _kernel;
    public GptLlmService(Kernel kernel)
    {
        _kernel = kernel;
    }

    public async Task<string> SendPromptAsync(string prompt)
    {
        var result = await _kernel.InvokePromptAsync(prompt);
        return result.ToString();
    }
}