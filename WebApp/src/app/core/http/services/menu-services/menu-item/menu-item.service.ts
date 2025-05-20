import {inject, Injectable} from '@angular/core';
import {PositionDto} from "../../../dto/other/position.dto";
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {CreateMenuItemDto} from "../../../dto/menu-dto/menu-item/create-menu-item.dto";
import {MenuCategoryDto} from "../../../dto/menu-dto/menu-category/menu-category.dto";
import {UpdateMenuItemDto} from "../../../dto/menu-dto/menu-item/update-menu-item.dto";
import {UpdateMenuItemVisibilityDto} from "../../../dto/menu-dto/menu-item/update-menu-item-visiblity.dto";
import {UpdateMenuItemPriceDto} from "../../../dto/menu-dto/menu-item/update-menu-item-price.dto";
import {UpdateMenuItemImageUrlDto} from "../../../dto/menu-dto/menu-item/update-menu-item-image-url.dto";
import {UserDto} from "../../../dto/user/user.dto";
import {of, switchMap, tap} from "rxjs";
import {UtilityService} from "../../../../services/utility/utility.service";
import {StorageService} from "../../../../services/storage/storage.service";
import {MenuItemDto} from "../../../dto/menu-dto/menu-item/menu-item.dto";

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  private readonly http = inject(HttpClient)
  private readonly environment = inject(EnvironmentService)
  private readonly baseUrl
  private readonly utility = inject(UtilityService)
  private readonly storage = inject(StorageService)

  constructor() {
    this.baseUrl = this.environment.getBaseUrl() + '/MenuItem'
  }

  public create(createMenuItemDto: CreateMenuItemDto) {
    return this.http.post<MenuItemDto>(
      `${this.baseUrl}/Create`,
      createMenuItemDto,
    )
  }

  public updateById(id: number, updateMenuItemDto: UpdateMenuItemDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateById/${id}`,
      updateMenuItemDto,
    )
  }

  public updateVisibilityById(id: number, updateVisibilityDto: UpdateMenuItemVisibilityDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateVisibilityById/${id}`,
      updateVisibilityDto,
    )
  }

  public updatePriceById(id: number, updatePriceDto: UpdateMenuItemPriceDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdatePriceById/${id}`,
      updatePriceDto,
    )
  }

  public updateImageUrlById(id: number, updateImageUrlDto: UpdateMenuItemImageUrlDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateImageUrlById/${id}`,
      updateImageUrlDto,
    )
  }

  public updatePositionsByCategoryId(categoryId: number, itemPositions: PositionDto[]) {
    return this.http.patch(
      `${this.baseUrl}/UpdatePositionsByCategoryId/${categoryId}`,
      itemPositions
    )
  }

  public replaceAllByMenuId(menuId: number, createMenuItemDtos: CreateMenuItemDto[]) {
    return this.http.put(
      `${this.baseUrl}/ReplaceAllByMenuId/${menuId}`,
      createMenuItemDtos
    )
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteById/${id}`)
  }

  public addImage(id:number, file: File, user: UserDto) {
    // Path needs a random string to break existing caches
    const path = `item-images/${user.firebaseId}/${this.utility.generateRandomString(10)}`
    return this.storage.uploadAndCache(path, file).pipe(
      tap(() => {
        // Delete old picture from storage if it exists
        if (user.imageUrl) {
          this.storage.delete(user.imageUrl).subscribe()
        }
      }),
      switchMap(() => {
        return this.updateImageUrlById(id, {
          imageUrl: path,
        })
      }),
      switchMap(() => {
        return of(path)
      }),
    )
  }

  public deleteImage(id:number, path: string) {
    return this.storage.delete(path).pipe(
      switchMap(() => {
        return this.updateImageUrlById(id,{
          imageUrl: null,
        })
      }),
    )
  }
}
