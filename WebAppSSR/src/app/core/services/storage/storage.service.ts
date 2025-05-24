import { inject, Injectable } from '@angular/core'
import { catchError, from, Observable, tap, throwError } from 'rxjs'
import {
    deleteObject,
    getBlob,
    getDownloadURL,
    getStorage,
    ref,
    updateMetadata,
    uploadBytes,
    UploadResult,
} from 'firebase/storage'
import { FirebaseService } from '../firebase/firebase.service'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private readonly firebaseStorage
    private readonly firebase = inject(FirebaseService)

    constructor() {
        this.firebaseStorage = getStorage(this.firebase.getApp())
        console.log('Initialized Firebase Storage')
    }

    upload(path: string, file: File): Observable<UploadResult> {
        const storageRef = ref(this.firebaseStorage, path)
        return from(uploadBytes(storageRef, file)).pipe(
            catchError((err) => throwError(() => err)),
        )
    }

    uploadAndCache(path: string, file: File): Observable<UploadResult> {
        return this.upload(path, file).pipe(
            tap(() => {
                this.setCacheMetadata(path).subscribe()
            }),
        )
    }

    setCacheMetadata(path: string) {
        const storageRef = ref(this.firebaseStorage, path)
        const metadata = {
            cacheControl: 'public, max-age=31536000', // 1 year in seconds
        }
        return from(updateMetadata(storageRef, metadata))
    }

    download(path: string): Observable<Blob> {
        const storageRef = ref(this.firebaseStorage, path)
        return from(getBlob(storageRef)).pipe(
            catchError((err) => {
                return throwError(() => err)
            }),
        )
    }

    delete(path: string) {
        const storageRef = ref(this.firebaseStorage, path)
        return from(deleteObject(storageRef)).pipe(
            catchError((err) => {
                return throwError(() => err)
            }),
        )
    }

    getDownloadUrl(path: string): Observable<string> {
        const storageRef = ref(this.firebaseStorage, path)
        return from(getDownloadURL(storageRef)).pipe(
            catchError((err) => {
                return throwError(() => err)
            }),
        )
    }


}
