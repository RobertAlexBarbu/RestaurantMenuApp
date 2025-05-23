import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {UpdateMenuDetailsDto} from "../../../dto/menu-dto/menu-details/update-menu-details.dto";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MenuDetailsService {
    private readonly http = inject(HttpClient);
    private readonly environment = inject(EnvironmentService);
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/MenuDetails';
    }

    public updateById(id: number, updateMenuDetailsDto: Partial<UpdateMenuDetailsDto>): Observable<void> {
        return this.http.patch<void>(
            `${this.baseUrl}/UpdateById/${id}`,
            updateMenuDetailsDto
        );
    }
}