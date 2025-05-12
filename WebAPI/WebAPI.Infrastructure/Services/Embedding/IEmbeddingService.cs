namespace WebAPI.Infrastructure.Embeddings;

public interface IEmbeddingService
{
    Task<List<float>> CreateEmbeddingAsync(string input);
}