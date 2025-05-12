import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, switchMap, tap } from 'rxjs'
import { UserDto } from '../../dto/user/user.dto'
import { EnvironmentService } from '../../../services/environment/environment.service'
import { StorageService } from '../../../services/storage/storage.service'
import { UtilityService } from '../../../services/utility/utility.service'
import { UpdateEmailDto } from '../../dto/user/update-email.dto'
import { UpdateGoogleEmailDto } from '../../dto/user/update-google-email.dto'
import { UpdateEmailNotificationsDto } from '../../dto/user/update-email-notifications.dto'
import { UpdateProfileDto } from '../../dto/user/update-profile.dto'
import { UpdateImageUrlDto } from '../../dto/user/update-image-url.dto'
import { UpdateSetupCompleteDto } from '../../dto/user/update-setup-complete.dto'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly http = inject(HttpClient)
    private readonly environment = inject(EnvironmentService)
    private readonly storage = inject(StorageService)
    private readonly baseUrl
    private readonly utility = inject(UtilityService)

    constructor() {
        this.baseUrl = this.environment.getBaseUrl() + '/User'
    }

    public get(): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.baseUrl}/Get`)
    }

    public create(): Observable<UserDto> {
        return this.http.post<UserDto>(`${this.baseUrl}/Create`, {})
    }

    public configure() {
        return this.http.patch<UserDto>(`${this.baseUrl}/Configure`, {})
    }

    public delete(): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/Delete`)
    }

    public addImage(file: File, user: UserDto) {
        // Path needs a random string to break existing caches
        const path = `images/${user.firebaseId}/${this.utility.generateRandomString(10)}`
        return this.storage.uploadAndCache(path, file).pipe(
            tap(() => {
                // Delete old picture from storage if it exists
                if (user.imageUrl) {
                    this.storage.delete(user.imageUrl).subscribe()
                }
            }),
            switchMap(() => {
                return this.updateImageUrl({
                    imageUrl: path,
                })
            }),
            switchMap(() => {
                return of(path)
            }),
        )
    }

    public deleteImage(path: string) {
        return this.storage.delete(path).pipe(
            switchMap(() => {
                return this.updateImageUrl({
                    imageUrl: null,
                })
            }),
        )
    }

    public updateImageUrl(updateImageUrlDto: UpdateImageUrlDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateImageUrl`,
            updateImageUrlDto,
        )
    }

    public updateEmail(updateEmailDto: UpdateEmailDto): Observable<void> {
        return this.http.patch<void>(
            `${this.baseUrl}/UpdateEmail`,
            updateEmailDto,
        )
    }

    public updateGoogleEmail(updateGoogleEmailDto: UpdateGoogleEmailDto): Observable<void> {
        return this.http.patch<void>(
            `${this.baseUrl}/UpdateGoogleEmail`,
            updateGoogleEmailDto,
        )
    }

    public updateEmailNotifications(updateEmailNotificationsDto: UpdateEmailNotificationsDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateEmailNotifications`,
            updateEmailNotificationsDto,
        )
    }

    public updateProfile(updateProfileDto: UpdateProfileDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateProfile`,
            updateProfileDto,
        )
    }


    public updateSetupComplete(updateSetupCompleteDto: UpdateSetupCompleteDto) {
        return this.http.patch(
            `${this.baseUrl}/UpdateSetupComplete`,
            updateSetupCompleteDto,
        )
    }
}
