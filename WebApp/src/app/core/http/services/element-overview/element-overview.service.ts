import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ElementsAndCategoriesDto } from '../../dto/element-overview/elements-and-categories.dto'
import { HttpClient } from '@angular/common/http'
import { EnvironmentService } from '../../../services/environment/environment.service'


@Injectable({
    providedIn: 'root',
})
export class ElementOverviewService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/ElementOverview'
    }

    public getElementsAndCategoriesByUserId(userId: number): Observable<ElementsAndCategoriesDto> {
        return this.http.get<ElementsAndCategoriesDto>(
            `${this.baseUrl}/GetElementsAndCategoriesByUserId/${userId}`,
        )
    }

    public resetElementsAndCategories() {
        return this.http.put<ElementsAndCategoriesDto>(`${this.baseUrl}/ResetElementsAndCategories`, {}, {})
    }
}
