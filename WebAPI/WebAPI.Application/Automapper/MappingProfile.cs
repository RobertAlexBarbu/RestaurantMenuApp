using AutoMapper;
using WebAPI.Application.DTO.Element;
using WebAPI.Application.DTO.ElementCategory;
using WebAPI.Application.DTO.Menu;
using WebAPI.Application.DTO.MenuAccess;
using WebAPI.Application.DTO.MenuDTO.Menu;
using WebAPI.Application.DTO.MenuDTO.MenuCategory;
using WebAPI.Application.DTO.MenuDTO.MenuDetails;
using WebAPI.Application.DTO.MenuDTO.MenuItem;
using WebAPI.Application.DTO.MenuDTO.MenuStyle;
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
        CreateMap<MenuAccess, MenuAccessDto>();
        CreateMap<CreateMenuAccessDto, MenuAccess>();
        CreateMap<MenuItemAccess, MenuItemAccessDto>();
        CreateMap<CreateMenuStyleDto, MenuStyle>();
        CreateMap<CreateMenuItemAccessDto, MenuItemAccess>();
        CreateMap<CreateMenuDetailsDto, MenuDetails>();
        CreateMap<MenuDetails, MenuDetailsDto>();
        CreateMap<UpdateMenuDetailsDto, MenuDetails>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<UpdateMenuStyleDto, MenuStyle>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        CreateMap<MenuStyle, MenuStyleDto>();
        CreateMap<Menu, MenuDetailDto>();
        CreateMap<CreateMenuCategoryDto, MenuCategory>();
        CreateMap<UpdateMenuCategoryDto, MenuCategory>();
        CreateMap<UpdateMenuCategoryVisibilityDto, MenuCategory>();
        CreateMap<MenuCategory, MenuCategoryDto>();
        CreateMap<CreateMenuItemDto, MenuItem>();
        CreateMap<MenuItem, MenuItemDto>();
        CreateMap<UpdateMenuItemDto, MenuItem>();
        CreateMap<UpdateMenuItemPriceDto, MenuItem>();
        CreateMap<UpdateMenuItemVisibilityDto, MenuItem>();
        CreateMap<UpdateMenuItemImageUrlDto, MenuItem>();
        CreateMap<PositionDto, MenuItem>();
        CreateMap<PositionDto, MenuCategory>();
    }
}