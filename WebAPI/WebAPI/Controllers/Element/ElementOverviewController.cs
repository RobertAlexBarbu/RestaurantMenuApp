using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.ElementOverviewService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Element;

[ApiController]
[Route("api/[controller]/[action]")]
public class ElementOverviewController(
    IMapper mapper,
    IElementOverviewService elementOverviewService,
    IClaimService claimService)
    : ControllerBase
{
    [HttpGet]
    [Route("{userId}")]
    public async Task<ActionResult<ElementsAndCategoriesDto>>
        GetElementsAndCategoriesByUserIdAsync(int userId)
    {
        var elementsAndCategoriesDto = await elementOverviewService.GetElementsAndCategoriesByUserIdAsync(userId);
        return Ok(elementsAndCategoriesDto);
    }

    [HttpPut]
    [AllowAuthenticated]
    public async Task<ActionResult<ElementsAndCategoriesDto>> ResetElementsAndCategoriesAsync()
    {
        var userClaims = claimService.GetUserClaims(User);
        var elementsAndCategoriesDto =
            await elementOverviewService.ResetElementsAndCategoriesByUserIdAsync(userClaims.Id);
        return Ok(elementsAndCategoriesDto);
    }
}