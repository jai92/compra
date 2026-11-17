# 🛒 Nuestra Compra (v9): lista + stock de casa: conectar dos móviles y compilar el APK

Para que los dos móviles vean la misma lista en directo (aunque estéis en sitios distintos y con datos 4G/5G) la app usa **Google Firebase**, que es gratis para este uso. Se configura **una sola vez** y tarda unos 5 minutos.

---

## Paso 1: Crear el proyecto en Firebase
1. Entra en [Firebase Console](https://console.firebase.google.com/) con tu cuenta de Google.
2. Pulsa **"Crear un proyecto"** y llámalo, por ejemplo, `nuestra-compra`. Puedes desactivar Google Analytics.

## Paso 2: Activar el acceso anónimo (¡importante!)
1. En el menú de la izquierda: **Compilación › Authentication** › **Comenzar**.
2. En la pestaña **Método de acceso**, elige **Anónimo**, actívalo y guarda.

   Sirve para que solo la app pueda entrar a tus datos. No hay que crear usuarios ni contraseñas.

## Paso 3: Crear la base de datos
1. Menú izquierdo: **Compilación › Firestore Database** › **Crear base de datos**.
2. Ubicación: `europe-west` (o la más cercana).
3. Modo: **producción** (las reglas las ponemos en el paso siguiente).

## Paso 4: Poner las reglas de seguridad
> ⚠️ Si ya pegaste las reglas de una versión anterior, **vuelve a pegarlas**: esta versión añade las del stock.
En **Firestore › Reglas**, borra lo que haya, pega el contenido del archivo **`firestore.rules`** que viene en este proyecto y pulsa **Publicar**.

Con estas reglas solo la app puede leer y escribir, y nadie puede ver el listado de listas: para entrar en una hay que conocer su código de 8 caracteres.

## Paso 5: Copiar las claves en la app
1. Pulsa la rueda ⚙️ › **Configuración del proyecto** y baja hasta **"Tus apps"**.
2. Pulsa el icono web **`</>`**, ponle un nombre y pulsa registrar (no hace falta Hosting).
3. Copia los valores de `firebaseConfig` y pégalos en el archivo **`firebase-config.js`**, sustituyendo cada `PEGA_AQUI`:
   ```javascript
   window.FIREBASE_CONFIG = {
     apiKey: "AIzaSy...",
     authDomain: "nuestra-compra.firebaseapp.com",
     projectId: "nuestra-compra",
     storageBucket: "nuestra-compra.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   };
   ```
   > ¿Ya tienes la APK instalada y no quieres recompilar? En la app: **Ajustes › Pegar claves de Firebase**. Hay que hacerlo en los dos móviles.

---

## Paso 6: Generar el APK con GitHub (sin instalar nada)
1. Sube **todo** el contenido de esta carpeta a tu repositorio de GitHub, incluidas las carpetas `.github` y `android-keystore`.
2. En la pestaña **Actions** verás el trabajo **"Compilar APK Android"**. Tarda unos 4 o 5 minutos.
3. Al terminar, abajo, en **Artifacts**, descarga **`NuestraCompra-APK-v1.X`** (la X es el número de compilación), descomprímelo y tendrás **`app-debug.apk`**.

La compilación mete todas las librerías (estilos, iconos y Firebase) **dentro** de la APK, así que la app se ve bien aunque no haya cobertura.

## Paso 7: Instalar en los dos móviles
1. Pasa `app-debug.apk` a los dos móviles (WhatsApp, Drive, Telegram…).
2. Ábrelo y, cuando Android pregunte *"¿Permitir instalar aplicaciones de esta fuente?"*, pulsa **Permitir**.
3. Las próximas versiones se instalan **encima** sin desinstalar, así no pierdes nada.

---

## 🔄 Actualizar la app (sin desinstalar)
Cada vez que cambies algo y GitHub compile, abre la APK nueva en el móvil y pulsa **Actualizar**. Se conservan todas las listas.

Funciona porque:
- **Siempre se firma con la misma clave** (carpeta `android-keystore`). ⚠️ **No borres ni cambies esa carpeta**: si se pierde la clave, Android obligaría a desinstalar.
- **El número de versión sube solo** en cada compilación. Puedes ver la versión instalada al final de **Ajustes** en la app.

## ⚠️ Solo una vez: pasar de la versión antigua a esta
La APK antigua se firmaba con una clave distinta en cada compilación, así que **esta única vez** Android no deja instalar encima. Para no perder nada:

1. En la app **antigua**, abre cada lista y pulsa **"Enviar lista"** para mandártela por WhatsApp (por ejemplo, a ti mismo).
2. Desinstala la app antigua e instala esta.
3. En la nueva: **Ajustes › Restaurar copia o importar una lista** y pega el mensaje. Se añaden los productos a la lista que tengas abierta.

A partir de aquí ya no habrá que desinstalar nunca más.

## 💾 Copia de seguridad
En **Ajustes › Copia de seguridad › Enviármela** se guardan todas tus listas, también las privadas, en un mensaje de WhatsApp. Si cambias de móvil o reinstalas, pégalo en **Restaurar copia** y lo recuperas todo. Restaurar dos veces no duplica nada.

Las listas **compartidas** además están en la nube: aunque perdieras el móvil, basta con volver a unirte con su código.

---

## 📱 Conectar el otro móvil
1. En **tu móvil**, pulsa el botón verde **👤+** de arriba (o el aviso verde "Conecta el otro móvil").
2. Pulsa **"Enviar código"** para mandarlo por WhatsApp, o díctalo (es algo como `K7QP-3XMA`).
3. En **el otro móvil**, pulsa **👤+** › **"Tengo un código"**, escríbelo y pulsa **Unirme**.
4. ¡Listo! En esa misma pantalla aparecen los móviles conectados, y bajo el nombre de la lista verás **"sincronizada · 2 móviles"**.

### Qué significa el puntito de Ajustes
- 🟢 Verde: sincronizada.
- 🟠 Naranja: sin conexión o enviando. Puedes seguir usando la app; los cambios se envían solos cuando vuelve internet.
- 🔴 Rojo: problema de configuración. Abre Ajustes para ver qué pasa (normalmente falta el paso 2 o el 4).
- ⚪ Gris: lista privada o nube sin configurar.

### Listas "Solo mía"
Se guardan solo en ese móvil. Si un día quieres compartir una, ábrela, pulsa **👤+** › **"Hacerla compartida"**.

---

## 🧭 Las tres pestañas

### 🛒 Lista
- La lista sale **agrupada por secciones del súper** (Verduras, Fruta, Carne, Pescado, Yogures y lácteos, Pan, Pasta y despensa, Congelados, Bebida, Higiene, Limpieza y Otros), así compras cada sección de una vez.
- Al escribir un producto, el grupo se elige solo ("tomates" va a Verduras, "lejía" a Limpieza…). Puedes cambiarlo en el desplegable.
- **Crear grupos nuevos:** en el desplegable, elige "➕ Crear grupo nuevo…", o ve a **Ajustes › Grupos de la lista**.
- **Sugerencias del stock:** al escribir 2 letras o más, debajo salen los productos de tu stock que coinciden (por ejemplo, "co" → Coca-Cola, Coca-Cola Zero). Un toque los añade con la cantidad que falta para el máximo.
- **Ordenar los grupos como recorres tu súper:** Ajustes › Grupos, con las flechas ↑ ↓. El orden y los grupos se comparten con el otro móvil.

### 📦 Stock
- Lo que tienes en casa de cada producto controlado, con un buscador rápido (no hace falta poner tildes).
- **Toca un producto cada vez que gastes uno** (te bebes una Coca-Cola → tocas → se descuenta). Si te equivocas, pulsa **Deshacer** en el aviso de abajo.
- El botón **+** suma uno (por ejemplo, si te regalan algo o lo compras sin pasar por la lista).
- Colores: 🟢 bien, 🟠 queda poco, 🔴 en el mínimo. El número rojo de la pestaña indica cuántos productos están en el mínimo.

### ⚖️ Mín/Máx
- Añade los productos que quieres tener siempre en casa: nombre, **mínimo**, **máximo** y cuántos tienes ahora.
- **Cuando algo llega al mínimo, aparece solo en la lista de la compra** (con la etiqueta "📦 stock") con la cantidad que falta para llegar al máximo.
- **Al meter en el carrito cualquier producto que controles en el stock, se suma lo comprado**, aunque lo hayas apuntado a mano o con un botón rápido (en la lista llevan la etiqueta "📦 suma al stock"). Se suma la cantidad apuntada (x5, "2 ud"…) o 1 si no pusiste cantidad.
- **¿Compraste otra cantidad?** En el aviso que sale abajo pulsa **Cambiar** y pon lo que compraste de verdad. Si desmarcas el producto, se resta lo que se sumó.
- Si subes el stock por encima del mínimo antes de comprarlo, se quita solo de la lista.
- Toca un producto para cambiar su mínimo, máximo o cantidad, o para dejar de controlarlo.

Todo (lista, stock, mínimos y grupos) se comparte en directo entre los móviles conectados a la misma lista. Si los dos tocáis a la vez, no se pierde ningún toque.

## 📦 Unidades y cajas (lo gastas en latas, lo compras en cajas)
En **Mín/Máx**, cada producto puede tener:
- **Se cuenta en:** cómo lo gastas en casa (lata, brick, rollo…).
- **Se compra en:** el formato y cuántas unidades trae (caja de 24, pack de 6, paquete de 12…). Si lo compras suelto, deja 1.

Ejemplo: Coca-Cola se cuenta en **lata** y se compra en **caja de 24**, con mínimo 6 y máximo 30.
- En **Stock**, cada toque resta **1 lata**.
- Al llegar a 6 latas, en la lista aparece **"1 caja (24 latas)"**. Se piden las cajas necesarias para acercarse al máximo **sin pasarse**, y como mínimo 1.
- Al meter la caja en el carrito se suman **24 latas** al stock.
- ¿Compraste 2 cajas, o una caja de 28 en oferta? Pulsa **Cambiar** en el aviso: te pregunta cuántas cajas y cuántas latas trae cada una.
- Si lo apuntas a mano: un número solo ("2") son **cajas**; si escribes la unidad ("6 latas"), son **latas**.
