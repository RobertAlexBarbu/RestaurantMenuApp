import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UpdateElementDto } from '../../../dto/element-dto/element/update-element.dto'
import { CreateElementDto } from '../../../dto/element-dto/element/create-element.dto'
import { ElementDetailDto } from '../../../dto/element-dto/element/element-detail.dto'
import { PositionDto } from '../../../dto/other/position.dto'
import { UpdateVisibilityDto } from '../../../dto/element-dto/element/update-visibility.dto'
import { UpdateWeightDto } from '../../../dto/element-dto/element/update-weight.dto'
import { EnvironmentService } from '../../../../services/environment/environment.service'

@Injectable({
    providedIn: 'root',
})
export class ElementService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/Element'
    }

    public create(elementDataDto: CreateElementDto) {
        return this.http.post<ElementDetailDto>(
            `${this.baseUrl}/Create`,
            elementDataDto,
        )
    }

    public updateById(elementId: number, updateElementDto: UpdateElementDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateById/${elementId}`,
            updateElementDto,
        )
    }

    public updateVisibilityById(elementId: number, updateVisibilityDto: UpdateVisibilityDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateVisibilityById/${elementId}`,
            updateVisibilityDto,
        )
    }

    public updateWeightById(elementId: number, updateWeightDto: UpdateWeightDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateWeightById/${elementId}`,
            updateWeightDto,
        )
    }

    public updatePositions(positionDtos: PositionDto[]) {
        return this.http.patch(`${this.baseUrl}/UpdatePositions`, positionDtos)
    }

    public replaceAll(createElementDtos: CreateElementDto[]) {
        return this.http.put<ElementDetailDto[]>(`${this.baseUrl}/ReplaceAll`, createElementDtos)
    }

    public deleteById(elementId: number) {
        return this.http.delete(`${this.baseUrl}/DeleteById/${elementId}`)
    }


}
