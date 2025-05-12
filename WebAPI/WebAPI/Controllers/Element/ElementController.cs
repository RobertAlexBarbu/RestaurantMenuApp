using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.Other;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.ElementService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Element;

[ApiController]
[Route("api/[controller]/[action]")]
public class ElementController(IMapper mapper, IElementService elementService, IClaimService claimService)
    : ControllerBase
{
    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<ElementDto>> CreateAsync(CreateElementDto createElementDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        var elementDto = await elementService.CreateAsync(userClaims.Id, createElementDto);
        return Ok(elementDto);
    }


    [HttpPatch]
    [AllowAuthenticated]
    [Route("{elementId}")]
    public async Task<ActionResult<ElementDetailDto>> UpdateByIdAsync(UpdateElementDto updateElementDto, int elementId)
    {
        var userClaims = claimService.GetUserClaims(User);
        var elementDetailDto = await elementService.UpdateByIdAsync(elementId, userClaims.Id, updateElementDto);
        return Ok(elementDetailDto);
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{elementId}")]
    public async Task<ActionResult> UpdateVisibilityByIdAsync(int elementId, UpdateVisibilityDto updateVisibilityDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await elementService.UpdateVisibilityByIdAsync(elementId, userClaims.Id, updateVisibilityDto);
        return Ok();
    }
    
    [HttpPatch]
    [AllowAuthenticated]
    [Route("{elementId}")]
    public async Task<ActionResult> UpdateWeightByIdAsync(int elementId, UpdateWeightDto updateWeightDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await elementService.UpdateWeightByIdAsync(elementId, userClaims.Id, updateWeightDto);
        return Ok();
    }


    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdatePositions(List<PositionDto> elementPositions)
    {
        var userClaims = claimService.GetUserClaims(User);
        Console.WriteLine("Update Positions Request");
        await elementService.UpdateElementPositionsAsync(userClaims.Id, elementPositions);
        return Ok();
    }


    [HttpPut]
    [AllowAuthenticated]
    public async Task<ActionResult<List<ElementDto[]>>> ReplaceAllAsync(
        List<CreateElementDto> createElementDtos)
    {
        var userClaims = claimService.GetUserClaims(User);
        var elements = await elementService.ReplaceAllByUserIdAsync(userClaims.Id, createElementDtos);
        return Ok(elements);
    }

    [HttpDelete]
    [AllowAuthenticated]
    [Route("{elementId}")]
    public async Task<ActionResult> DeleteByIdAsync(int elementId)
    {
        var userClaims = claimService.GetUserClaims(User);
        await elementService.DeleteByIdAsync(elementId, userClaims.Id);
        return Ok();
    }
}