import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {MenuDto} from "../../dto/menu/menu.dto";
import {EnvironmentService} from "../../../../services/environment/environment.service";


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


  

  public getById(menuId: number) {
    return this.http.get<MenuDto>(
      `${this.baseUrl}/GetById/${menuId}`
    )
  }

    public getByUrl(menuUrl: string) {
        return this.http.get<MenuDto>(
            `${this.baseUrl}/GetByUrl/${menuUrl}`
        )
    }

  public checkUrlAvailability(url: string) {
    return this.http.get<boolean>(
      `${this.baseUrl}/CheckUrlAvailability?url=${encodeURIComponent(url)}`
    )
  }
}
