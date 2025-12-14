
# 🎮 Pixdex — Catálogo audiovisual + Juegos + Firebase

Pixdex es una aplicación móvil desarrollada en React Native con Expo, que combina un catálogo de películas/series/animes con un minijuego interactivo y un sistema de puntajes en tiempo real utilizando Firebase.

Incluye autenticación, listas filtradas, navegación completa y persistencia de usuario.

# ✨ Características Principales

### 📚 Catálogo de Contenidos

- Listado de Películas, Series y Animes
- Pantallas detalladas por item
- Estilo retro pixelado

### Filtrado por:
- Género
- Tipo de contenido

### 🔐 Autenticación con Firebase

- Registro de usuario
- Inicio de sesión
- Cierre de sesión
- Validación de email
- Persistencia automática de sesión

### 🎮 Minijuego Interactivo

- Juego del Ahorcado
- Sistema de puntaje máximo por usuario
- Alias personalizable
- Ranking Top 10 actualizado en tiempo real vía Firestore

### ☁️ Integración Firebase

- Firebase Auth
- Firestore Database
- Variables de entorno para proteger claves

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso Principal |
| :--- | :--- |
| **React Native** + **Expo** | Desarrollo móvil multiplataforma. |
| **TypeScript** | Tipado estático. |
| **Firebase Authentication** | Gestión de registro y login de usuarios. |
| **Firebase Firestore** | Almacenamiento y sincronización de puntajes y alias en tiempo real. |
| **React Navigation** | Control de rutas y navegación entre pantallas. |
| **Context API** | Gestión del estado global de la aplicación. |
| **Expo Router** | Sistema de navegación basado en la estructura de archivos. |

# 📁 Configuración Previa de Firebase (Auth + Firestore - Top10)
Para que tanto el tablero de los top 10 mejores puntajes de los jugadores y la autenticación / inicio de sesión por correo electrónico funcionen, es necesario seguir estos pasos: 

### 1. Crear proyecto en Firebase
1. Ir a https://console.firebase.google.com → Nuevo proyecto.
   
3. Nombre: pixdex (u otro).
   
4. Elegir/desactivar Google Analytics según prefieras.
   
5. Crear proyecto.

### 2. Habilitar Authentication (Email/Password)
1. En la consola de Firebase → Authentication → Comenzar.
   
3. En la pestaña Método de acceso → habilitar Correo electronico/contraseña.

### 3. Crear Cloud Firestore
1. En la consola de Firebase → Firestore Database → Crear base de datos.
   
3.  Elegir versión estándar
   
4.  Elegir región (ej. southamerica-west1).
   
6.  Iniciar en modo de producción.
   
8.  Crear.
   
### 4. Reglas recomendadas para Firestore Database
Ingresar estas reglas y publicar. 

```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Colección de usuarios (para guardar alias)
    match /usuarios/{userId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == resource.data.uid;
      allow delete: if false;
    }
    
    // Colección de puntajes (para el Top 10)
    match /puntajes/{puntajeId} {
      allow read: if true;
      allow create: if request.auth != null 
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.puntaje is number
                    && request.resource.data.puntaje >= 0;
      allow update, delete: if false; // No permitir modificar puntajes
    }
    
    match /records/{userId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == request.resource.id;
      allow update: if request.auth != null && request.auth.uid == request.resource.id;
      allow delete: if false;
      }

  }
}
```

### 5. Obtener credenciales
1. En la consola del proyecto → Configuración de proyecto → Tus apps → elegir Web (ícono </>).
   
3. Nombre: pixdex-web (o similar). Registrar.
   
4. Firebase mostrará la configuración (apiKey, authDomain, projectId, etc.).
   
6. Copiar.

# 🚀 Cómo Ejecutar el Proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/martinggit/Pixdex.git
```

### 2️⃣ Ubicarse en el proyecto
```bash
cd Pixdex
```

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Configurar variables de entorno
En el repo hay un archivo ```.env.example```. Creá ```.env ``` en la raíz y pegá las claves obtenidas en 📁 Configuración Previa de Firebase.     
Ejemplo:  

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=tu_apiKey
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_projectId
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_senderId
EXPO_PUBLIC_FIREBASE_APP_ID=tu_appId
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXX   
```
```firebaseConfig.ts``` en el repo ya lee estas variables automáticamente, por lo que no hace falta modificar el archivo.

### 5️⃣ Iniciar el proyecto
```bash
npx expo start
```

Abrir con:
- Expo Go (Android)
- Emulador Android Studio
- Desde la web
