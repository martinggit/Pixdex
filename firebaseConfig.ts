import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, browserLocalPersistence, inMemoryPersistence, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey) {
  console.error('⚠️ Variables de entorno no encontradas.');
}

const app = initializeApp(firebaseConfig);

// -----------------------------------------------------------------
//  Inicialización condicional según la plataforma
// -----------------------------------------------------------------
let auth: Auth;

if (Platform.OS === 'web') {
  // CASO WEB: Usamos la persistencia estándar del navegador
  auth = getAuth(app);
} else {
  // CASO CELULAR (Android/iOS): Usamos AsyncStorage
  // @ts-ignore 
  const { getReactNativePersistence } = require('firebase/auth');

  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}

export { auth };
export const db = getFirestore(app);
export { app };