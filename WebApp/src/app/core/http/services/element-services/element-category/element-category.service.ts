import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { UpdateElementCategoryDto } from '../../../dto/element-dto/element-category/update-element-category.dto'
import { ElementCategoryDto } from '../../../dto/element-dto/element-category/element-category.dto'
import { CreateElementCategoryDto } from '../../../dto/element-dto/element-category/create-element-category.dto'
import { EnvironmentService } from '../../../../services/environment/environment.service'

@Injectable({
    providedIn: 'root',
})
export class ElementCategoryService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/ElementCategory'
    }

    public deleteById(elementCategoryId: number) {
        return this.http.delete(
            `${this.baseUrl}/DeleteById/${elementCategoryId}`,
        )
    }

    public updateById(elementCategoryId: number, updateElmenetCategoryDto: UpdateElementCategoryDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateById/${elementCategoryId}`,
            updateElmenetCategoryDto
            ,
        )
    }

    public create(createElementCategoryDto: CreateElementCategoryDto) {
        return this.http.post<ElementCategoryDto>(
            `${this.baseUrl}/Create`,
            createElementCategoryDto,
        )
    }

    public replaceAll(createElementCategoryDtos: CreateElementCategoryDto[]) {
        return this.http.put<ElementCategoryDto[]>(`${this.baseUrl}/ReplaceAll`, createElementCategoryDtos)
    }
}
