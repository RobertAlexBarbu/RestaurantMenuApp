using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Domain.Exceptions;

namespace WebAPI.Repository.Data;

public static class AppDbContextExtensions
{
    public static void MarkPropertiesModifiedFromDto<TEntity, TDto>(this AppDbContext context, TEntity entity, TDto dto)
        where TEntity : class
        where TDto : class
    {
        var entry = context.Entry(entity);
        var dtoProperties = typeof(TDto).GetProperties();
        foreach (var prop in dtoProperties) entry.Property(prop.Name).IsModified = true;
    }

    public static async Task EnsureExistsByIdAsync<TEntity>(this AppDbContext context, int id)
        where TEntity : class
    {
        var exists = await context.Set<TEntity>().AnyAsync(e => EF.Property<int>(e, "Id") == id);
        if (!exists)
            throw new NotFoundException(typeof(TEntity).Name);
    }

    public static async Task EnsureExistsByIdAsync<TEntity>(this AppDbContext context, int id, int userId)
        where TEntity : class
    {
        var exists = await context.Set<TEntity>()
            .Where(e => EF.Property<int>(e, "UserId") == userId)
            .AnyAsync(e => EF.Property<int>(e, "Id") == id);

        if (!exists)
            throw new NotFoundException(typeof(TEntity).Name);
    }

    public static TEntity AttachAndMap<TEntity, TDto>(this AppDbContext context, int id, TDto dto, IMapper mapper)
        where TEntity : class, new()
        where TDto : class
    {
        var entity = new TEntity();
        typeof(TEntity).GetProperty("Id")?.SetValue(entity, id);
        context.Attach(entity);
        mapper.Map(dto, entity);
        return entity;
    }

    public static async Task<TEntity> UpdateFromDtoAsync<TEntity, TDto>(
        this AppDbContext context,
        int id,
        TDto dto,
        IMapper mapper)
        where TEntity : class, new()
        where TDto : class
    {
        await context.EnsureExistsByIdAsync<TEntity>(id);
        var entity = context.AttachAndMap<TEntity, TDto>(id, dto, mapper);
        context.MarkPropertiesModifiedFromDto(entity, dto);

        await context.SaveChangesAsync();
        return entity;
    }

    public static async Task<TEntity> UpdateFromDtoAsync<TEntity, TDto>(
        this AppDbContext context,
        int id,
        int userId,
        TDto dto,
        IMapper mapper)
        where TEntity : class, new()
        where TDto : class
    {
        await context.EnsureExistsByIdAsync<TEntity>(id, userId);
        var entity = context.AttachAndMap<TEntity, TDto>(id, dto, mapper);
        context.MarkPropertiesModifiedFromDto(entity, dto);
        await context.SaveChangesAsync();
        return entity;
    }
}