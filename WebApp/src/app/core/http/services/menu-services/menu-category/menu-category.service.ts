import {inject, Injectable} from '@angular/core';
import {CreateMenuCategoryDto} from "../../../dto/menu-dto/menu-category/create-menu-category.dto";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {MenuCategoryDto} from "../../../dto/menu-dto/menu-category/menu-category.dto";
import {UpdateMenuCategoryDto} from "../../../dto/menu-dto/menu-category/update-menu-category.dto";
import {UpdateMenuCategoryVisibilityDto} from "../../../dto/menu-dto/menu-category/update-menu-category-visibility.dto";
import {PositionDto} from "../../../dto/other/position.dto";

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private readonly http = inject(HttpClient)
  private readonly environment = inject(EnvironmentService)
  private readonly baseUrl

  constructor() {
    this.baseUrl = this.environment.getBaseUrl() + '/MenuCategory'
  }

  public create(createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.http.post<MenuCategoryDto>(
      `${this.baseUrl}/Create`,
      createMenuCategoryDto,
    )
  }

  public updateById(id: number, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateById/${id}`,
      updateMenuCategoryDto,
    )
  }

  public updateVisibilityById(id: number, updateVisibilityDto: UpdateMenuCategoryVisibilityDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateVisibilityById/${id}`,
      updateVisibilityDto,
    )
  }

  public updatePositionsByMenuId(menuId: number, menuType: string, categoryPositions: PositionDto[]) {
    return this.http.patch(
      `${this.baseUrl}/UpdatePositionsByMenuId/${menuId}/${menuType}`,
      categoryPositions
    )
  }

  public replaceAllByMenuId(menuId: number, createMenuCategoryDtos: CreateMenuCategoryDto[]) {
    return this.http.put(
      `${this.baseUrl}/ReplaceAllByMenuId/${menuId}`,
      createMenuCategoryDtos
    )
  }

  public deleteById(id: number, menuType: string) {
    return this.http.delete(`${this.baseUrl}/DeleteById/${menuType}/${id}`)
  }
}
