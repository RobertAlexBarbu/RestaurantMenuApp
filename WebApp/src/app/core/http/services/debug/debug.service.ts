import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { EnvironmentService } from '../../../services/environment/environment.service'

@Injectable({
    providedIn: 'root',
})
export class DebugService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly baseUrl

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/Test'
    }

    getUnprotected() {
        return this.http.get(`${this.baseUrl}/GetUnprotected`)
    }

    getProtected() {
        return this.http.get(`${this.baseUrl}/GetProtected`)
    }

    getAdminProtected() {
        return this.http.get(`${this.baseUrl}/GetAdminProtected`)
    }

    longRequest() {
        return this.http.get(`${this.baseUrl}/LongRequest`)
    }
}
