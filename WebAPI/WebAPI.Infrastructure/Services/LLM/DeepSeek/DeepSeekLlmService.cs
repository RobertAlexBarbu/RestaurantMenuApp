using Microsoft.SemanticKernel;
using WebAPI.Infrastructure.LLM;

namespace WebAPI.Infrastructure.Services.LLM.DeepSeek;

public class DeepSeekLlmService : ILlmService
{
    private readonly Kernel _kernel;
    public DeepSeekLlmService(Kernel kernel)
    {
        _kernel = kernel;
    }

    public async Task<string> SendPromptAsync(string prompt)
    {
        var result = await _kernel.InvokePromptAsync(prompt);
        return result.ToString();
    }
    



    
}