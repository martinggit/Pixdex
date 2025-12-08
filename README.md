
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


# 🚀 Cómo Ejecutar el Proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/martinggit/Pixdex.git
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```
⚠️ Las claves NO están incluidas en el repositorio.

### 4️⃣ Iniciar el proyecto
```bash
npx expo start
```
Abrir con:
- Expo Go (Android)
- Emulador Android Studio

### 📄 Licencia

MIT — libre para usar, modificar y distribuir.
