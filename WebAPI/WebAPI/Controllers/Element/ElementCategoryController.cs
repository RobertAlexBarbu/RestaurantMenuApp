using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.ElementCategoryService;
using WebAPI.Domain.Entities;
using WebAPI.Filters;

namespace WebAPI.Controllers.Element;

[ApiController]
[Route("api/[controller]/[action]")]
public class ElementCategoryController(
    IMapper mapper,
    IElementCategoryService elementCategoryService,
    IClaimService claimService)
    : ControllerBase
{
    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<ElementCategoryDto>> CreateAsync(CreateElementCategoryDto createElementCategoryDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        var elementCategoryDto = await elementCategoryService.CreateAsync(userClaims.Id, createElementCategoryDto);
        return Ok(elementCategoryDto);
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{elementCategoryId}")]
    public async Task<ActionResult> UpdateByIdAsync(int elementCategoryId,
        UpdateElementCategoryDto updateElementCategoryDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await elementCategoryService.UpdateByIdAsync(elementCategoryId, userClaims.Id, updateElementCategoryDto);
        return Ok();
    }

    [HttpPut]
    [AllowAuthenticated]
    public async Task<ActionResult<List<ElementCategoryDto[]>>> ReplaceAllAsync(
        List<CreateElementCategoryDto> createElementCategoryDtos)
    {
        var userClaims = claimService.GetUserClaims(User);
        var categories = await elementCategoryService.ReplaceAllByUserIdAsync(userClaims.Id, createElementCategoryDtos);
        return Ok(categories);
    }

    [HttpDelete]
    [AllowAuthenticated]
    [Route("{elementCategoryId}")]
    public async Task<ActionResult> DeleteByIdAsync(int elementCategoryId)
    {
        var userClaims = claimService.GetUserClaims(User);
        await elementCategoryService.DeleteByIdAsync(elementCategoryId, userClaims.Id);
        return Ok();
    }
}