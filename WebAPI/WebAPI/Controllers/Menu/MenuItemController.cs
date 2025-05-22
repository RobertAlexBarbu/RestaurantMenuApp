using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuItem;
using WebAPI.Application.DTO.Other;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.MenuServices.MenuItemService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuItemController(IMapper mapper, IMenuItemService menuItemService, IClaimService claimService) 
    : ControllerBase
{
    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<MenuItemDto>> CreateAsync(CreateMenuItemDto createMenuItemDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        var menuItemDto = await menuItemService.CreateAsync(userClaims.Id, createMenuItemDto);
        return Ok(menuItemDto);
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateByIdAsync(int id, UpdateMenuItemDto updateMenuItemDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.UpdateByIdAsync(id, userClaims.Id, updateMenuItemDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateVisibilityByIdAsync(int id, UpdateMenuItemVisibilityDto updateVisibilityDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.UpdateVisibilityByIdAsync(id, userClaims.Id, updateVisibilityDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdatePriceByIdAsync(int id, UpdateMenuItemPriceDto updatePriceDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.UpdatePriceByIdAsync(id, userClaims.Id, updatePriceDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateImageUrlByIdAsync(int id, UpdateMenuItemImageUrlDto updateImageUrlDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.UpdateImageUrlByIdAsync(id, userClaims.Id, updateImageUrlDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{categoryId}")]
    public async Task<ActionResult> UpdatePositionsByCategoryIdAsync(int categoryId, List<PositionDto> itemPositions)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.UpdatePositionsByCategoryIdAsync(categoryId, userClaims.Id, itemPositions);
        return Ok();
    }

    [HttpPut]
    [AllowAuthenticated]
    [Route("{menuId}")]
    public async Task<ActionResult> ReplaceAllByMenuIdAsync(int menuId, List<CreateMenuItemDto> createMenuItemDtos)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.ReplaceAllByMenuIdAsync(menuId, userClaims.Id, createMenuItemDtos);
        return Ok();
    }

    [HttpDelete]
    [AllowAuthenticated]
    [Route("{categoryId}/{id}")]
    public async Task<ActionResult> DeleteByIdAsync(int id, int categoryId)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuItemService.DeleteByIdAsync(id, categoryId, userClaims.Id);
        return Ok();
    }
}