using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.MenuAccess;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuAnalyticsService;

public class MenuAnalyticsService(AppDbContext context, IMapper mapper) : IMenuAnalyticsService
{
    public async Task CreateMenuAccessAsync(CreateMenuAccessDto createMenuAccessDto)
    {

        var menuAccess = mapper.Map<MenuAccess>(createMenuAccessDto);
        context.MenuAccesses.Add(menuAccess);
        await context.SaveChangesAsync();
    }

    public async Task<List<MenuAccessDto>> GetMenuAccessesByMenuIdAsync(int menuId)
    {
        var menuAccesses = await context.MenuAccesses.Where(ma => ma.MenuId == menuId).ToListAsync();
        return menuAccesses.Select(mapper.Map<MenuAccessDto>).ToList();
    }
}