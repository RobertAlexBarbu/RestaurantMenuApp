using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.Other;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.MenuServices.MenuCategoryService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuCategoryController(IMenuCategoryService menuCategoryService, IClaimService claimService) 
    : ControllerBase
{
    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<MenuCategoryDto>> CreateAsync(CreateMenuCategoryDto createMenuCategoryDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        var menuCategoryDto = await menuCategoryService.CreateAsync(userClaims.Id, createMenuCategoryDto);
        return Ok(menuCategoryDto);
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateByIdAsync(int id, UpdateMenuCategoryDto updateMenuCategoryDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuCategoryService.UpdateByIdAsync(id, userClaims.Id, updateMenuCategoryDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateVisibilityByIdAsync(int id, UpdateMenuCategoryVisibilityDto updateVisibilityDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuCategoryService.UpdateVisibilityByIdAsync(id, userClaims.Id, updateVisibilityDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{menuId}/{menuType}")]
    public async Task<ActionResult> UpdatePositionsByMenuIdAsync(int menuId,  string menuType, List<PositionDto> categoryPositions)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuCategoryService.UpdatePositionsByMenuIdAsync(menuId, menuType, userClaims.Id, categoryPositions);
        return Ok();
    }

    [HttpPut]
    [AllowAuthenticated]
    [Route("{menuId}")]
    public async Task<ActionResult<List<MenuCategoryDto>>> ReplaceAllByMenuIdAsync(int menuId, List<CreateMenuCategoryDto> createMenuCategoryDtos)
    {
        var userClaims = claimService.GetUserClaims(User);
        var cats = await menuCategoryService.ReplaceAllByMenuIdAsync(menuId, userClaims.Id, createMenuCategoryDtos);
        return Ok(cats);
    }

    [HttpDelete]
    [AllowAuthenticated]
    [Route("{menuType}/{id}")]
    public async Task<ActionResult> DeleteByIdAsync(int id, string menuType)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuCategoryService.DeleteByIdAsync(id, menuType, userClaims.Id);
        return Ok();
    }
}