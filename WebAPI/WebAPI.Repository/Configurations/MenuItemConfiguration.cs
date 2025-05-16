using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;

namespace WebAPI.Repository.Configurations;

public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
{
    public void Configure(EntityTypeBuilder<MenuItem> builder)
    {
        builder
            .HasOne<MenuCategory>(e => e.MenuCategory)
            .WithMany()
            .HasForeignKey(e => e.MenuCategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}