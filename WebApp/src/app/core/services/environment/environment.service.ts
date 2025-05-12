import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    getBaseUrl() {
        return environment.baseUrl
    }

    getRedirectAuth() {
        return environment.redirectAuth
    }

    isDevelopment() {
        return environment.development
    }
}
