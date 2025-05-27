export interface FirebaseConfig {
    apiKey: string
    authDomain: string // Needs to also be added in https://console.cloud.google.com/apis/credentials at OAuth Client IDs
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}
