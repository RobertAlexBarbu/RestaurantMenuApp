import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../services/environment/environment.service";
import {UpdateMenuDto} from "../../dto/menu/update-menu-dto";
import {CreateMenuDto} from "../../dto/menu/create-menu.dto";
import {MenuDto} from "../../dto/menu/menu.dto";


@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http = inject(HttpClient)
  private readonly environment = inject(EnvironmentService)
  private readonly baseUrl

  constructor() {
    this.baseUrl = this.environment.getBaseUrl() + '/Menu'
  }

  public create(menuDataDto: CreateMenuDto) {
    return this.http.post<MenuDto>(
      `${this.baseUrl}/Create`,
      menuDataDto,
    )
  }

  public updateById(menuId: number, updateMenuDto: UpdateMenuDto) {
    return this.http.patch(
      `${this.baseUrl}/UpdateById/${menuId}`,
      updateMenuDto,
    )
  }

  public getById(menuId: number) {
    return this.http.get<MenuDto>(
      `${this.baseUrl}/GetById/${menuId}`
    )
  }

  public checkUrlAvailability(url: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}/CheckUrlAvailability?url=${encodeURIComponent(url)}`
    )
  }
}
