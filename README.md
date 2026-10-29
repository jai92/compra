# 🚀 Cómo conectar la App con Firebase (Gratis) y Compilar el APK

Para que tú y tu mujer tengáis la lista sincronizada en directo (aunque estéis en diferentes supermercados con datos móviles 4G/5G), utilizaremos **Google Firebase Firestore** (100% gratuito).

---

## Paso 1: Crear la base de datos en Firebase (Tarda 2 minutos)
1. Entra en [Firebase Console](https://console.firebase.google.com/) con tu cuenta de Google.
2. Haz clic en **"Crear un proyecto"** (nómbralo `nuestra-compra`). Desactiva Google Analytics para ir más rápido y dale a crear.
3. En el menú de la izquierda, ve a **Compilación > Firestore Database** y pulsa **Crear base de datos**.
4. Selecciona tu ubicación más cercana (ej: `europe-west`) y en el modo de seguridad elige **"Modo de prueba"** (para permitir lectura y escritura directa).
5. Ve a la pestaña **Reglas** de Firestore y asegúrate de que ponga:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
6. En la rueda de ajustes del menú izquierdo (Ajustes del proyecto), baja hasta **"Tus apps"**, pulsa el icono web (`</>`), ponle nombre y copia las claves de configuración `firebaseConfig`:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "nuestra-compra.firebaseapp.com",
     projectId: "nuestra-compra",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
7. Pega esas líneas en tu `index.html` donde pone `FIREBASE_CONFIG_AQUI`.

---

## Paso 2: Generar el APK automáticamente con GitHub Actions (Sin instalar nada)
No necesitas tener Android Studio ni un ordenador potente instalado: GitHub compilará el `.apk` en la nube de forma totalmente automática.

1. Sube este proyecto descomprimido a tu repositorio de GitHub.
2. GitHub detectará automáticamente la carpeta `.github/workflows/compilar-apk.yml`.
3. En la pestaña **Actions** de tu repositorio en GitHub, verás el trabajo ejecutándose ("Compilar APK Android").
4. En 3 o 4 minutos terminará y verás una sección llamada **Artifacts**.
5. Descarga **`NuestraCompra-Instalable-APK.zip`**, lo descomprimes y tendrás dentro directamente tu archivo **`app-debug.apk`**.

---

## Paso 3: Instalar en vuestros móviles Android
1. Pásate el archivo `.apk` a tu móvil y al de tu mujer (por WhatsApp, Drive o Telegram).
2. Al pulsar sobre el archivo, Android te preguntará: *"¿Permitir instalar aplicaciones de esta fuente?"*. Marca **Permitir**.
3. ¡Listo! Queda instalada en el cajón de apps como una app nativa, con su icono, sin barra de navegador y sincronizada para siempre.
