using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.User;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.ElementOverviewService;
using WebAPI.Application.Services.UserService;
using WebAPI.Domain.Enums;
using WebAPI.Domain.Exceptions;
using WebAPI.Filters;

namespace WebAPI.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class UserController(
    IUserService userService,
    IClaimService claimService,
    IElementOverviewService elementOverviewService
) : ControllerBase
{
    [HttpGet]
    [AllowAuthenticated]
    public async Task<ActionResult> GetAsync()
    {
        var firebaseClaimsDto = claimService.GetFirebaseClaims(User);
        UserDto userDto;
        try
        {
            userDto = await userService.GetByFirebaseIdAsync(firebaseClaimsDto.FirebaseId);
        }
        catch (NotFoundException e)
        {
            userDto = await userService.CreateAsync(firebaseClaimsDto);
            await elementOverviewService.ResetElementsAndCategoriesByUserIdAsync(userDto.Id);
        }

        return Ok(userDto);
    }

    [HttpPost]
    [AllowAuthenticated]
    public async Task<ActionResult<UserDto>> CreateAsync()
    {
        var firebaseClaimsDto = claimService.GetFirebaseClaims(User);
        var userDto = await userService.CreateAsync(firebaseClaimsDto);
        await elementOverviewService.ResetElementsAndCategoriesByUserIdAsync(userDto.Id);
        return Ok(userDto);
    }


    [HttpPatch]
    [AllowRole(Roles.Admin)]
    [Route("{id}")]
    public async Task<ActionResult> UpdateRoleToAdminByIdAsync(int id)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateRoleByIdAsync(id, new UpdateRoleDto
        {
            Role = Roles.Admin
        });
        return Ok();
    }


    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateProfileAsync(UpdateProfileDto updateProfileDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateProfileByIdAsync(userClaimsDto.Id, updateProfileDto);
        return Ok();
    }


    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateEmailNotificationsAsync(
        UpdateEmailNotificationsDto updateEmailNotificationsDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateEmailNotificationsAsync(userClaimsDto.Id, updateEmailNotificationsDto);
        return Ok();
    }


    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateEmailAsync(UpdateEmailDto updateEmailDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateEmailByIdAsync(userClaimsDto.Id, updateEmailDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateGoogleEmailAsync(UpdateGoogleEmailDto updateGoogleEmailDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateGoogleEmailByIdAsync(userClaimsDto.Id, updateGoogleEmailDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateImageUrlAsync(UpdateImageUrlDto updateImageUrlDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateImageUrlByIdAsync(userClaimsDto.Id, updateImageUrlDto);
        return Ok();
    }

    [HttpPatch]
    [AllowAuthenticated]
    public async Task<ActionResult> UpdateSetupCompleteAsync(UpdateSetupCompleteDto updateSetupCompleteDto)
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.UpdateSetupCompleteAsync(userClaimsDto.Id, updateSetupCompleteDto);
        return Ok();
    }


    [HttpDelete]
    [AllowAuthenticated]
    public async Task<ActionResult> DeleteAsync()
    {
        var userClaimsDto = claimService.GetUserClaims(User);
        await userService.DeleteByIdAsync(userClaimsDto.Id);
        return Ok();
    }
}