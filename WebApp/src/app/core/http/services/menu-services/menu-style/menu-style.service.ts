import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "../../../../services/environment/environment.service";
import {UpdateMenuStyleDto} from "../../../dto/menu-dto/menu-style/update-menu-style.dto";
import {Observable} from "rxjs";
import {MenuStyleDto} from "../../../dto/menu-dto/menu-style/menu-style.dto";

@Injectable({
    providedIn: 'root',
})
export class MenuStyleService {
    private readonly http = inject(HttpClient);
    private readonly environment = inject(EnvironmentService);
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/MenuStyle';
    }

    public updateById(
        id: number,
        updateMenuStyleDto: Partial<UpdateMenuStyleDto>
    ): Observable<void> {
        return this.http.patch<void>(
            `${this.baseUrl}/UpdateById/${id}`,
            updateMenuStyleDto
        );
    }

    public getByMenuId(menuId: number): Observable<MenuStyleDto> {
        return this.http.get<MenuStyleDto>(
            `${this.baseUrl}/GetByMenuId/${menuId}`
        );
    }
}