using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.MenuServices.MenuDetailsService;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuDetailsController(IMenuDetailsService menuDetailsService, IClaimService claimService) : ControllerBase
{
    [HttpPatch("{id}")]

    public async Task<IActionResult> UpdateByIdAsync(int id, UpdateMenuDetailsDto dto)
    {
        var userClaims = claimService.GetUserClaims(User);
        await menuDetailsService.UpdateMenuDetailsByIdAsync(id, userClaims.Id, dto);
        return Ok();
    }
}