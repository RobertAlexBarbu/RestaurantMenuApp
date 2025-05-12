using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Entities;
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


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        new ElementConfiguration().Configure(modelBuilder.Entity<Element>());

    }
}