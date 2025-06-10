using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.SemanticKernel;
using WebAPI.Application.Services.ChatService;
using WebAPI.Application.Services.ClaimService;
using WebAPI.Application.Services.ElementCategoryService;
using WebAPI.Application.Services.ElementOverviewService;
using WebAPI.Application.Services.ElementService;
using WebAPI.Application.Services.MenuAnalyticsService;
using WebAPI.Application.Services.MenuService;
using WebAPI.Application.Services.MenuServices.MenuCategoryService;
using WebAPI.Application.Services.MenuServices.MenuDetailsService;
using WebAPI.Application.Services.MenuServices.MenuItemService;
using WebAPI.Application.Services.MenuServices.MenuStyleService;
using WebAPI.Application.Services.UserService;
using WebAPI.Application.Services.UtilityService;
using WebAPI.Automapper;
using WebAPI.Filters;
using WebAPI.Infrastructure.Embeddings;
using WebAPI.Infrastructure.LLM;
using WebAPI.Infrastructure.Providers;
using WebAPI.Infrastructure.Services.Auth;
using WebAPI.Infrastructure.Services.Auth.Firebase;
using WebAPI.Infrastructure.Services.Embedding.OpenAi;
using WebAPI.Infrastructure.Services.LLM.DeepSeek;
using WebAPI.Middlewares;
using WebAPI.Repository.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ModelStateFilter>();
    options.Filters.Add<ExceptionFilter>();
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = @"JWT Authorization header using the Bearer scheme. <br/> 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      <br/>Example: Bearer 12345abcdef",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                new List<string>()
            }
        });
    }
);
builder.Services.AddHttpClient();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("NeonConnection"));
});
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddSingleton<FirebaseProvider>();
builder.Services.AddSingleton<IAuthService, FirebaseAuthService>();
builder.Services.AddKernel().AddOpenAIChatCompletion(modelId: "deepseek-chat",
    endpoint: new Uri("https://api.deepseek.com"),
    apiKey: "sk-2b0f2b5997924f3cafdf82d0c97567a3");
// builder.Services.AddKernel().AddOpenAIChatCompletion(
//     modelId: "gpt-4.1-nano", // or "gpt-3.5-turbo"
//     apiKey: "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"
// );
builder.Services.AddSingleton<ILlmService, DeepSeekLlmService>();
builder.Services.AddSingleton<IEmbeddingService, OpenAiEmbeddingService>();
builder.Services.AddScoped<IClaimService, ClaimService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IElementService, ElementService>();
builder.Services.AddScoped<IElementCategoryService, ElementCategoryService>();
builder.Services.AddScoped<IElementOverviewService, ElementOverviewService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IMenuAnalyticsService, MenuAnalyticsService>();
builder.Services.AddScoped<IMenuDetailsService, MenuDetailsService>();
builder.Services.AddScoped<IMenuCategoryService, MenuCategoryService>();
builder.Services.AddScoped<IMenuItemService, MenuItemService>();
builder.Services.AddScoped<IUtilityService, UtilityService>();
builder.Services.AddScoped<IMenuStyleService, MenuStyleService>();

var app = builder.Build();

app.UseExceptionHandler();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();
app.UseCors(options =>
{
    options.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});
app.UseMiddleware<AuthenticationMiddleware>();
app.MapControllers();
app.Run();