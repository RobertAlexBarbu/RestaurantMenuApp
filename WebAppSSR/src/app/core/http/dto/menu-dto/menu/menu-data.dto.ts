import {MenuDetailsDto} from "../menu-details/menu-details.dto";
import {MenuItemDto} from "../menu-item/menu-item.dto";
import {MenuCategoryDto} from "../menu-category/menu-category.dto";

export interface MenuDataDto {
  menuDetails: MenuDetailsDto;
  foodMenuItems: MenuItemDto[];
  foodMenuCategories: MenuCategoryDto[];
  drinksMenuItems: MenuItemDto[];
  drinksMenuCategories: MenuCategoryDto[];
}
