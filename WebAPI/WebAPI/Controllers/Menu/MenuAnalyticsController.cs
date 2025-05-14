using Microsoft.AspNetCore.Mvc;
using WebAPI.Application.DTO.MenuAccess;
using WebAPI.Application.Services.MenuAnalyticsService;

namespace WebAPI.Controllers.Menu;

[ApiController]
[Route("api/[controller]/[action]")]
public class MenuAnalyticsController(IMenuAnalyticsService menuAnalyticsService) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateMenuAccessAsync(CreateMenuAccessDto createMenuAccessDto)
    {
        Console.WriteLine("Creating a Menu ACcess");
        await menuAnalyticsService.CreateMenuAccessAsync(createMenuAccessDto);
        return Ok();
    }

    [Route("{menuId}")]
    [HttpGet]
    public async Task<ActionResult<List<MenuAccessDto>>> GetMenuAccessesByMenuIdAsync(int menuId)
    {
        var menuAccesses = await menuAnalyticsService.GetMenuAccessesByMenuIdAsync(menuId);
        return menuAccesses;
    }
}