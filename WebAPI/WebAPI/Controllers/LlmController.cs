using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.Chat;
using WebAPI.Application.Services.ChatService;
using WebAPI.Application.Services.ClaimService;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class LlmController(IChatService chatService, IClaimService claimService) : ControllerBase
{

    [HttpPost]
    public async Task<ActionResult<MessageDto>> AskQuestionAsync(AskQuestionDto askQuestion)
    {
        var answer = await chatService.AskQuestionAsync(askQuestion);
        return Ok(answer);
    }
    
    // [HttpPost]
    // public async Task<ActionResult<MessageDto>> AskQuestionWithContextAsync(AskQuestionDto askQuestion)
    // {
    //     var userClaimsDto = claimService.GetUserClaims(User);
    //     var answer = await chatService.AskQuestionWithContextAsync(askQuestion, userClaimsDto.Id);
    //     return Ok(answer);
    // }
    

    
    
    
}