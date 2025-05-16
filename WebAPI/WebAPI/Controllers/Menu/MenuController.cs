using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.MenuDTO.Menu;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.MenuService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuController(IMapper mapper, IMenuService menuService, IClaimService claimService) 
    : ControllerBase 
{
    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<MenuDto>> CreateAsync(CreateMenuDto createMenuDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        var menuDto = await menuService.CreateAsync(userClaims.Id, createMenuDto);
        return Ok(menuDto);
    }
    
    [HttpPatch]
    [AllowAuthenticated]
    [Route("{menuId}")]
    public async Task<ActionResult> UpdateByIdAsync(UpdateMenuDto updateMenuDto, int menuId)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuService.UpdateByIdAsync(menuId, userClaims.Id, updateMenuDto);
        return Ok();
    }
    
    [HttpGet]
    [Route("{menuId}")]
    public async Task<ActionResult<MenuDto>> GetByIdAsync(int menuId)
    {
        var menu = await menuService.GetByIdAsync(menuId);
        return Ok(menu);
    }
    
    [HttpGet]
    [Route("{menuUrl}")]
    public async Task<ActionResult<MenuDto>> GetByUrlAsync(string menuUrl)
    {
        var menu = await menuService.GetByUrlAsync(menuUrl);
        return Ok(menu);
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<MenuDataDto>> GetDataByIdAsync(int id)
    {
        var menuData = await menuService.GetDataByIdAsync(id);
        return Ok(menuData);
    }
    
    [HttpGet]
    public async Task<ActionResult<bool>> CheckUrlAvailability( string url)
    {
        var isAvailable = await menuService.CheckUrlAvailabilityAsync(url);
        return Ok(isAvailable);
    }
}