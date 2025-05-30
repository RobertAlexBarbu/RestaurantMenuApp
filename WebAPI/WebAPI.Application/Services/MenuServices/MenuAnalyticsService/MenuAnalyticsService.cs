using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.MenuAccess;
using WebAPI.Application.Services.ChatService;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Infrastructure.LLM;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.MenuAnalyticsService;

public class MenuAnalyticsService(AppDbContext context, IMapper mapper, ILlmService llmService) : IMenuAnalyticsService
{
    public async Task CreateMenuAccessAsync(CreateMenuAccessDto createMenuAccessDto)
    {

        var menuAccess = mapper.Map<MenuAccess>(createMenuAccessDto);
        context.MenuAccesses.Add(menuAccess);
        await context.SaveChangesAsync();
    }

    public async Task CreateMenuItemAccessAsync(CreateMenuItemAccessDto createMenuItemAccessDto)
    {
        var menuAccess = mapper.Map<MenuItemAccess>(createMenuItemAccessDto);
        context.MenuItemAccesses.Add(menuAccess);
        await context.SaveChangesAsync();
    }

    public async Task<List<MenuAccessDto>> GetMenuAccessesByMenuIdAsync(int menuId)
    {
        var menuAccesses = await context.MenuAccesses.Where(ma => ma.MenuId == menuId).ToListAsync();
        return menuAccesses.Select(mapper.Map<MenuAccessDto>).ToList();
    }

    public async Task<List<MenuItemAccessDto>> GetMenuItemAccessesByMenuIdAsync(int menuId)
    {
        var menuAccesses = await context.MenuItemAccesses.Where(ma => ma.MenuId == menuId).ToListAsync();
        return menuAccesses.Select(mapper.Map<MenuItemAccessDto>).ToList();
    }

    public async Task<MenuAccessInsightDto> GetMenuAccessInsights(int qrAccesses, int urlAccesses, string timePeriod)
    {
        var context =
            "You will analyze data regarding the access types of a digital menu for a restaurant. Accesses can occur through **QR codes** or **URLs (web access)**. You will also receive the time period during which the data was collected.\n\nYour response **must** follow this exact structure:\n\n### **Data**  \n- **QR Accesses:** [value]  \n- **URL Accesses:** [value]  \n- **Time Period:** [value]  \n\n### **Insights** *(Logical interpretations of the data)*  \n1. **[First Insight]** – (e.g., \\\"QR code usage is higher, suggesting customers prefer scanning over manual URL entry.\\\")  \n2. **[Second Insight]** – (e.g., \\\"URL accesses peak during evenings, possibly due to at-home browsing.\\\")  \n3. **[Third Insight]** – (e.g., \\\"Low overall URL access may indicate poor link visibility.\\\")  \n\n**Rules:**  \n- Do **not** ask questions.  \n- Do **not** deviate from this structure.  \n- Keep insights **data-driven** and recommendations **practical** and short. Only  3 insight.";
        var prompt =
            $"Context: {context}. QR Accesses: {qrAccesses}. URL Acceses: {urlAccesses}. Time Peroid: {timePeriod}";
        var response = await llmService.SendPromptAsync(prompt);
        return new MenuAccessInsightDto
        {
            Text = response
        };

    }
}