import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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


// Validación de variables de entorno
if (!firebaseConfig.apiKey) {
  console.error('⚠️ ADVERTENCIA: Variables de entorno de Firebase no encontradas.');
  console.error('Asegúrate de tener un archivo .env con las credenciales correctas.');
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Auth
// getAuth() maneja automáticamente la persistencia en todas las plataformas:
// - Web: usa localStorage
// - React Native: usa memoria (pero Firebase maneja la persistencia internamente)
export const auth = getAuth(app);


// Initialize Firestore
export const db = getFirestore(app);


export { app };



