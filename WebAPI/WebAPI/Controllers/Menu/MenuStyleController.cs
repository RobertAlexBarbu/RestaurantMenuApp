using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.MenuDTO.MenuStyle;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.MenuServices.MenuStyleService;
using WebAPI.Filters;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuStyleController(IMenuStyleService menuStyleService, IClaimService claimService)
    : ControllerBase
{

    [HttpPatch]
    [AllowAuthenticated]
    [Route("{id}")]
    public async Task<ActionResult> UpdateByIdAsync(int id, UpdateMenuStyleDto updateMenuStyleDto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuStyleService.UpdateByIdAsync(id, userClaims.Id, updateMenuStyleDto);
        return Ok();
    }
    
    [HttpGet]
    [AllowAuthenticated]
    [Route("{menuId}")]
    public async Task<ActionResult<MenuStyleDto>> GetByMenuIdAsync(int menuId)
    {

        var style = await menuStyleService.GetByMenuIdAsync(menuId);
        return Ok(style);
    }
}