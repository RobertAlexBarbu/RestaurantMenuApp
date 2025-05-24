import { inject, Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly matSnackbar = inject(MatSnackBar)

    notify(message: string, action = 'Ok') {
        this.matSnackbar.open(message, action, { duration: 3000 })
    }
}
