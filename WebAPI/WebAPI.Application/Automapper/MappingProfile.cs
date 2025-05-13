using AutoMapper;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.Other;
using WebAPI.Application.DTO.User;
using WebAPI.Domain.Entities;
using WebAPI.Domain.Entities.Menu;

namespace WebAPI.Automapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User
        CreateMap<User, UserDto>();
        CreateMap<User, UserDetailDto>();
        CreateMap<UserClaimsDto, User>();
        CreateMap<FirebaseClaimsDto, User>();
        CreateMap<UpdateRoleDto, User>();
        CreateMap<UpdateEmailNotificationsDto, User>();
        CreateMap<UpdateEmailDto, User>();
        CreateMap<UpdateGoogleEmailDto, User>();
        CreateMap<UpdateProfileDto, User>();
        CreateMap<UpdateImageUrlDto, User>();
        CreateMap<UpdateSetupCompleteDto, User>();

        // Element
        CreateMap<Element, ElementDto>();
        CreateMap<Element, ElementDetailDto>();
        CreateMap<CreateElementDto, Element>();
        CreateMap<UpdateElementDto, Element>();
        CreateMap<UpdateVisibilityDto, Element>();
        CreateMap<UpdateWeightDto, Element>();
        
        CreateMap<ElementCategory, ElementCategoryDto>();
        CreateMap<UpdateElementCategoryDto, ElementCategory>();
        CreateMap<CreateElementCategoryDto, ElementCategory>();
        
        CreateMap<PositionDto, Element>();
        
        // Menu
        CreateMap<Menu, MenuDto>();
        CreateMap<CreateMenuDto, Menu>();
        CreateMap<UpdateMenuDto, Menu>();
    }
}