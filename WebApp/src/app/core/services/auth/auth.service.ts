import { inject, Injectable } from '@angular/core'
import { catchError, from, map, Observable, of, switchMap, tap, throwError } from 'rxjs'
import { UserDto } from '../../http/dto/user/user.dto'
import { FirebaseService } from '../firebase/firebase.service'
import { UserService } from '../../http/services/user/user.service'
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    linkWithCredential,
    linkWithPopup,
    linkWithRedirect,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    unlink,
    updateEmail,
    updatePassword,
    User,
} from 'firebase/auth'
import { AppStore } from '../../stores/app.store'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly firebase = inject(FirebaseService)
    private readonly firebaseAuth
    private readonly userService = inject(UserService)
    private readonly appStore = inject(AppStore)

    constructor() {
        console.log('Initialized Firebase Auth')
        this.firebaseAuth = getAuth(this.firebase.getApp())
    }

    // Email Login
    signupWithEmail(email: string, password: string): Observable<UserDto> {
        return from(
            createUserWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            switchMap(() => {
                return this.userService.create()
            }),
        )
    }

    loginWithEmail(email: string, password: string): Observable<UserDto> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            switchMap(() => {
                return this.userService.get()
            }),
        )
    }

    // Popup Google Login - Used in Development
    signupWithGoogle(): Observable<UserDto> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap((result) => {
                return this.userService.get()
            }),
        )
    }

    loginWithGoogle(): Observable<UserDto> {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
            switchMap(() => {
                return this.userService.get()
            }),
        )
    }

    // Redirect Google Login - Used in Production
    loginWithGoogleRedirect() {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
            login_hint: 'user@example.com',
            theme: 'light',
        })
        signInWithRedirect(this.firebaseAuth, provider)
    }

    getRedirectResult(): Observable<UserDto> {
        return from(getRedirectResult(this.firebaseAuth)).pipe(
            switchMap((result) => {
                if (result) {
                    return this.userService.get()
                } else {
                    return throwError(
                        () =>
                            new Error('Couldn\'t get credentials from Redirect'),
                    )
                }
            }),
        )
    }

    // Link Google Account
    linkGoogleAccountWithPopup() {
        const googleProvider = new GoogleAuthProvider()
        const auth = getAuth()
        let googleEmail = ''
        return from(linkWithPopup(auth.currentUser!, googleProvider)).pipe(
            switchMap((usercred) => {
                const user = usercred.user
                if (user.email) {
                    googleEmail = user.providerData.filter(
                        (data) => data.providerId == 'google.com',
                    )[0].email!
                    return this.userService.updateGoogleEmail({ googleEmail })
                } else {
                    return throwError(() => new Error('Email is null'))
                }
            }),
            tap(() => {
                this.appStore.updateGoogleEmail({ googleEmail })
            }),
        )
    }

    linkGoogleAccountWithRedirect() {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({
            prompt: 'select_account',
        })
        const auth = getAuth()
        linkWithRedirect(auth.currentUser!, googleProvider)
    }

    unlinkGoogleAccount() {
        const auth = getAuth()
        return from(unlink(auth.currentUser!, 'google.com')).pipe(
            switchMap(() => {
                return this.userService
                    .updateGoogleEmail({ googleEmail: null })
                    .pipe(tap(() => this.appStore.updateGoogleEmail({ googleEmail: null })))
            }),
        )
    }

    getRedirectLinkResult() {
        return from(getRedirectResult(this.firebaseAuth)).pipe(
            switchMap((usercred) => {
                if (usercred) {
                    const user = usercred.user
                    const googleEmail = user.providerData.filter(
                        (data) => data.providerId == 'google.com',
                    )[0].email!
                    return this.userService.updateGoogleEmail({ googleEmail }).pipe(
                        tap(() => {
                            this.appStore.updateGoogleEmail({ googleEmail: googleEmail })
                        }),
                    )
                } else {
                    return throwError(() => new Error('UserCredential is null'))
                }
            }),
        )
    }

    // Password & Email
    sendPasswordResetEmail(email: string) {
        return from(sendPasswordResetEmail(this.firebaseAuth, email)).pipe(
            switchMap(() => {
                return this.userService.updateGoogleEmail({ googleEmail: null })
            }),
        )
    }

    configureEmailAndPassword(email: string, password: string) {
        const credential = EmailAuthProvider.credential(email, password)
        const auth = getAuth()
        return from(linkWithCredential(auth.currentUser!, credential)).pipe(
            switchMap((usercred) => {
                const user = usercred.user
                console.log('Account linking success', user)
                if (user.email) {
                    const email = user.providerData.filter(
                        (data) => data.providerId == 'password',
                    )[0].email!
                    return this.userService.updateEmail({
                        email: email,
                    })
                } else {
                    return throwError(() => new Error('Email is null'))
                }
            }),
            tap(() => {
                this.appStore.updateEmail({ email })
            }),
        )
    }

    changeEmail(email: string, password: string, newEmail: string) {
        const auth = getAuth()
        return this.reauthenticate(email, password).pipe(
            switchMap(() => {
                return from(updateEmail(auth.currentUser!, newEmail))
            }),
            switchMap(() => {
                return this.userService.updateEmail({
                    email: newEmail,
                })
            }),
            tap(() => {
                this.appStore.updateEmail({ email: newEmail })
            }),
        )
    }

    changePassword(email: string, password: string, newPassword: string) {
        const auth = getAuth()
        const user = auth.currentUser!
        return this.reauthenticate(email, password).pipe(
            switchMap(() => {
                return from(updatePassword(user, newPassword))
            }),
        )
    }

    // Log Out
    logOut() {
        this.appStore.logOut()
        this.firebaseAuth.signOut()
    }

    // Utilities
    getFirebaseUser() {
        return new Observable<User | null>((observer) => {
            const unsubscribe = this.firebaseAuth.onAuthStateChanged(
                (user) => {
                    observer.next(user)
                },
                (error) => {
                    observer.error(error)
                },
                () => {
                    observer.complete()
                },
            )
            return () => unsubscribe()
        })
    }

    isLoggedIn(): Observable<boolean> {
        return this.getFirebaseUser().pipe(map((result) => !!result))
    }

    getIdToken() {
        return this.getFirebaseUser().pipe(
            switchMap((firebaseUser) => {
                if (firebaseUser) {
                    return from(firebaseUser.getIdTokenResult()).pipe(
                        map((idTokenResult) => {
                            return idTokenResult.token
                        }),
                    )
                } else {
                    return of(null)
                }
            }),
            catchError((error) => {
                console.error('[Auth] Error retrieving Id Token', error)
                return of(null)
            }),
        )
    }

    getNewIdToken() {
        return this.getFirebaseUser().pipe(
            switchMap((firebaseUser) => {
                if (firebaseUser) {
                    return from(firebaseUser.getIdToken(true)).pipe()
                } else {
                    return of(null)
                }
            }),
            catchError((error) => {
                console.error('[Auth] Error retrieving Id Token', error)
                return of(null)
            }),
        )
    }

    reauthenticate(email: string, password: string) {
        const auth = getAuth()
        const user = auth.currentUser!
        const credential = EmailAuthProvider.credential(email, password)
        return from(reauthenticateWithCredential(user, credential))
    }

    deleteAccount() {
        return this.userService.delete()
    }
}
