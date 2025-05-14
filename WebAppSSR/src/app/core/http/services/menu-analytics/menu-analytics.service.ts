import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {CreateMenuAccessDto} from "../../dto/menu-analytics/create-menu-access.dto";

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

    public createMenuAccess(createMenuAccessDto: CreateMenuAccessDto) {
        console.log("create-menu-access method called")
        return this.http.post(
            `${this.baseUrl}/CreateMenuAccess`,
            createMenuAccessDto,
        )
    }
}
