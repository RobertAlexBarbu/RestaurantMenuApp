import { Injectable } from '@angular/core'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase/firebase-config'

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    private firebaseConfig = firebaseConfig
    private readonly app

    constructor() {
        this.app = initializeApp(this.firebaseConfig)
        console.log('Initialized Firebase')
    }

    public getApp() {
        return this.app
    }
}
