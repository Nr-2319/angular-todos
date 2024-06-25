import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhSHFAtmf4vBJ1mCs4qQboAmX0I8EPopY",
  authDomain: "nr-angular-todos.firebaseapp.com",
  projectId: "nr-angular-todos",
  storageBucket: "nr-angular-todos.appspot.com",
  messagingSenderId: "598180679398",
  appId: "1:598180679398:web:120077c7612a647fa13527"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    [
      // firebase setup
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ],
  ],
};
