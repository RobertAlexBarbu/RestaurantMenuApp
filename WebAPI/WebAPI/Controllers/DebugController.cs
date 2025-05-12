using Microsoft.AspNetCore.Mvc;
using WebAPI.Domain.Enums;
using WebAPI.Domain.Exceptions;
using WebAPI.Filters;
using WebAPI.Infrastructure.Embeddings;
using WebAPI.Infrastructure.LLM;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class DebugController(IEmbeddingService embeddingService) : ControllerBase
{
    [HttpGet]
    [AllowAuthenticated]
    public async Task<ActionResult> GetProtected()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult> GetUnprotected()
    {
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult> LongRequest()
    {
        await Task.Delay(40000); // 40,000 milliseconds = 40 seconds
        return Ok();
    }

    [HttpGet]
    [AllowRole(Roles.Admin)]
    public async Task<ActionResult> GetAdminProtected()
    {
        return Ok();
    }
    
    [HttpPost]
    public async Task<ActionResult<List<float>>> CreateEmbedding(string text)
    {
        var embedding = await embeddingService.CreateEmbeddingAsync(text);
        return Ok(embedding);
    }

    [HttpPost]
    public async Task<ActionResult> CheckExceptionFilters(TestModel dto)
    {
        // throw new InvalidUserException("Test, Invalid user");
        // throw new InvalidClaimsException("Test, Invalid claims");
        throw new NotFoundException("Test");
        return Ok();
    }
}

public class TestModel
{
    public string Name { get; set; }
    public bool Test { get; set; }
}