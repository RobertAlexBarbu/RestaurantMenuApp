import { ElementCategoryDto } from '../element-category/element-category.dto'
import { ElementDto } from '../element/element.dto'


export interface ElementsAndCategoriesDto {
    elements: ElementDto[];
    categories: ElementCategoryDto[];
}