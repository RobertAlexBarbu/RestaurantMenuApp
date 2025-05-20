import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {MenuAccessDto} from "../../../dto/menu-dto/menu-analytics/menu-access.dto";
import {MenuAccessInsightDto} from "../../../dto/menu-dto/menu-analytics/menu-access-insight.dto";


@Injectable({
  providedIn: 'root'
})
export class MenuAnalyticsService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/MenuAnalytics'
    }

    public getMenuAccessesByMenuId(menuId: number) {
      return this.http.get<MenuAccessDto[]>(
        `${this.baseUrl}/GetMenuAccessesByMenuId/${menuId}`,
      )
    }

  public getMenuAccessInsights(qrAccesses: number, urlAccesses: number, timePeriod: string) {
    return this.http.get<MenuAccessInsightDto>(
      `${this.baseUrl}/GetMenuAccessInsights`,
      {
        params: {
          qrAccesses,
          urlAccesses,
          timePeriod,
        }
      }
    )
  }
}
