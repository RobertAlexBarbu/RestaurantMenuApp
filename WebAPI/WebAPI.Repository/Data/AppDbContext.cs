using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;
using WebAPI.Repository.Configurations;

namespace WebAPI.Repository.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Element> Elements { get; set; }
    public DbSet<ElementCategory> ElementCategories { get; set; }
    
    public DbSet<Menu> Menus { get; set; }
    
    public DbSet<MenuItem> MenuItems { get; set; }
    
    public DbSet<MenuCategory> MenuCategories { get; set; }
    
    public DbSet<MenuAccess> MenuAccesses { get; set; }
    public DbSet<MenuItemAccess> MenuItemAccesses { get; set; }
    
    public DbSet<MenuDetails> MenuDetails { get; set; }
    
    public DbSet<MenuStyle> MenuStyles { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        new ElementConfiguration().Configure(modelBuilder.Entity<Element>());
        new MenuConfiguration().Configure(modelBuilder.Entity<Menu>());
    }
}