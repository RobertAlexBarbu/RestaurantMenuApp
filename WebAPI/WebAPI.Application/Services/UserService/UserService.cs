using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Application.DTO.User;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Enums;
using WebAPI.Domain.Exceptions;
using WebAPI.Infrastructure.Services.Auth;
using WebAPI.Infrastructure.Services.Auth.Firebase;
using WebAPI.Repository.Data;

namespace WebAPI.Application.Services.UserService;

public class UserService(AppDbContext context, IMapper mapper, IAuthService authService) : IUserService
{
    public async Task<UserDto> CreateAsync(FirebaseClaimsDto firebaseClaimsDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.FirebaseId == firebaseClaimsDto.FirebaseId);
        if (user == null)
        {
            user = mapper.Map<User>(firebaseClaimsDto);
            if (user.Email != null) user.Username = user.Email.Split('@')[0];
            if (user.GoogleEmail != null) user.Username = user.GoogleEmail.Split('@')[0];
            user.Role = Roles.User;
            context.Users.Add(user);
            await context.SaveChangesAsync();
            await authService.AddUserIdAndRoleClaimsAsync(user.FirebaseId, user.Id, user.Role);
            return mapper.Map<UserDto>(user);
        }

        return mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetByFirebaseIdAsync(string id)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.FirebaseId == id);
        if (user == null) throw new NotFoundException("User");
        return mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetByIdAsync(int id)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) throw new NotFoundException("User");
        return mapper.Map<UserDto>(user);
    }

    public async Task DeleteByIdAsync(int id)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) throw new NotFoundException("User");
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        await authService.DeleteAccountAsync(user.FirebaseId);
    }

    public async Task UpdateRoleByIdAsync(int id, UpdateRoleDto updateRoleDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) throw new NotFoundException("User");
        context.MarkPropertiesModifiedFromDto(user, updateRoleDto);
        await context.SaveChangesAsync();
        await authService.AddRoleClaimAsync(user.FirebaseId, Roles.Admin);
    }

    public async Task UpdateProfileByIdAsync(int id, UpdateProfileDto updateProfileDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateProfileDto>(id, updateProfileDto, mapper);
    }

    public async Task UpdateEmailNotificationsAsync(int id, UpdateEmailNotificationsDto updateEmailNotificationsDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateEmailNotificationsDto>(id, updateEmailNotificationsDto, mapper);
    }

    public async Task UpdateSetupCompleteAsync(int id, UpdateSetupCompleteDto updateSetupCompleteDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateSetupCompleteDto>(id, updateSetupCompleteDto, mapper);
    }

    public async Task UpdateImageUrlByIdAsync(int id, UpdateImageUrlDto updateImageUrlDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateImageUrlDto>(id, updateImageUrlDto, mapper);
    }

    public async Task UpdateGoogleEmailByIdAsync(int id, UpdateGoogleEmailDto updateGoogleEmailDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateGoogleEmailDto>(id, updateGoogleEmailDto, mapper);
    }

    public async Task UpdateEmailByIdAsync(int id, UpdateEmailDto updateEmailDto)
    {
        await context.UpdateFromDtoAsync<User, UpdateEmailDto>(id, updateEmailDto, mapper);
    }
}