using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;

namespace WebAPI.Repository.Configurations;

public class MenuConfiguration : IEntityTypeConfiguration<Menu>
{
    public void Configure(EntityTypeBuilder<Menu> builder)
    {
        builder
            .HasIndex(m => m.Url)
            .IsUnique();
    }
}