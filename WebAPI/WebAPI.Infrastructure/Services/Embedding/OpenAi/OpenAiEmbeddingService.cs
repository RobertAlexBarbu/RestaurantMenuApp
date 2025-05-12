using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using WebAPI.Infrastructure.Embeddings;

namespace WebAPI.Infrastructure.Services.Embedding.OpenAi;

public class OpenAiEmbeddingService: IEmbeddingService
{
    private readonly IHttpClientFactory _httpClientFactory;

    private const string OpenAiApiKey =
        "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";
    private const string OpenAiEmbeddingEndpoint = "https://api.openai.com/v1/embeddings";

    public OpenAiEmbeddingService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    public async Task<List<float>> CreateEmbeddingAsync(string input)
    {
        var client = _httpClientFactory.CreateClient();

        var payload = new
        {
            input = input,
            model = "text-embedding-3-small"
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", OpenAiApiKey);

        var response = await client.PostAsync(OpenAiEmbeddingEndpoint, content);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseBody);

        var embedding = doc.RootElement
            .GetProperty("data")[0]
            .GetProperty("embedding")
            .EnumerateArray()
            .Select(e => e.GetSingle())
            .ToList();

        return embedding;
    }
}