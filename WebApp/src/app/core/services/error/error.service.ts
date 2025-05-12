import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class ErrorService {
    private readonly matSnackbar = inject(MatSnackBar)

    handleError(error: HttpErrorResponse) {
        let name = error.name
        let message = ''
        if (error.error) {
            message = error.error.message
        } else {
            message = error.message
        }

        if (message === 'Firebase: Error (auth/invalid-credential).') {
            name = 'Authentication Error'
            message = 'Invalid credentials'
        }
        if (message === 'Firebase: Error (auth/email-already-in-use).') {
            name = 'Authentication Error'
            message = 'Email already in use'
        }
        if (message == 'Firebase: Error (auth/credential-already-in-use).') {
            name = 'Account Linking Error'
            message = 'Credential already in use'
        }
        if (message == 'Firebase: Error (auth/user-not-found).') {
            name = 'Authentication Error'
            message = 'Invalid Credentials'
        }
        this.matSnackbar.open(name + '\n ' + message, 'Ok', {
            duration: 7000,
        })
    }
}
