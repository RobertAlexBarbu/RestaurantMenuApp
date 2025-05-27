import { FirebaseConfig } from './firebase-config.interface'

export const firebaseConfig: FirebaseConfig = {
    apiKey: 'AIzaSyDpBFXGk46uK45T5nQ8I-xnFfY7YW2Vwp4',
    authDomain: 'application-b607e.web.app', // Needs to also be added in https://console.cloud.google.com/apis/credentials at OAuth Client IDs
    projectId: 'application-b607e',
    storageBucket: 'application-b607e.firebasestorage.app', // It needs cors.json config file
    messagingSenderId: '850725934364',
    appId: '1:850725934364:web:1f961a9be703077ed556d9',
}

// to add cors.json to storage bucket use either of
// #1 gcloud --project=swappyskills storage buckets update gs://swappyskills.firebasestorage.app --cors-file=cors.json
// #2 gsutil cors set cors.json gs://swappyskills.firebasestorage.app
