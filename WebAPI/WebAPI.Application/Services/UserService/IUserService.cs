using WebAPI.Application.DTO.User;

namespace WebAPI.Application.Services.UserService;

public interface IUserService
{
    Task<UserDto> CreateAsync(FirebaseClaimsDto firebaseClaimsDto);
    Task<UserDto> GetByFirebaseIdAsync(string id);
    Task<UserDto> GetByIdAsync(int id);
    Task DeleteByIdAsync(int id);
    Task UpdateRoleByIdAsync(int id, UpdateRoleDto updateRoleDto);
    Task UpdateImageUrlByIdAsync(int id, UpdateImageUrlDto updateImageUrlDto);
    Task UpdateGoogleEmailByIdAsync(int id, UpdateGoogleEmailDto updateGoogleEmailDto);
    Task UpdateEmailByIdAsync(int id, UpdateEmailDto updateEmailDto);
    Task UpdateProfileByIdAsync(int id, UpdateProfileDto updateProfileDto);
    Task UpdateEmailNotificationsAsync(int id, UpdateEmailNotificationsDto updateEmailNotificationsDto);
    Task UpdateSetupCompleteAsync(int id, UpdateSetupCompleteDto updateSetupCompleteDto);
}