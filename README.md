# 🍽️ Axioma Kapileio — Plantilla para Restaurantes, Menú Digital & Pedidos por WhatsApp en Astro

**Axioma Kapileio** es una plantilla moderna, rápida y personalizable diseñada para **restaurantes, cafeterías, taquerías y negocios de comida**. Cuenta con **carrito de pedidos con cálculo automático de promociones (2x1, 3x2 y descuentos)**, envío de órdenes vía **WhatsApp**, **Modo Menú Digital** (para consulta en mesa sin carrito), sección de **Avisos y Promociones** y panel de administración **Keystatic CMS**, construida con **Astro**, **Tailwind CSS v4** y **DaisyUI v5**.

Desarrollada por **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Kapileio)** bajo licencia **MIT**.

---

## ✨ Características Principales

- 🍔 **Menú / Catálogo Dinámico de Platillos:** Búsqueda en tiempo real, filtrado por categorías, subcategorías y promociones activas, precios de oferta con porcentaje de descuento automático, control de disponibilidad en cocina, galería interactiva de hasta 5 imágenes secundarias y platillos relacionados.
- 🛒 **Carrito de Pedidos Inteligente:** Persistencia en `localStorage`, cálculo automático de promociones por cantidad (**2x1** y **3x2**) mostrando el ahorro total y avisos dinámicos al cliente, además de formulario de entrega (nombre, dirección o recolección en sucursal y notas de cocina como *"sin cebolla"* o *"salsa aparte"*).
- 📱 **Modo Dual (Pedidos en Línea o Menú Digital en Mesa):** Interruptor global (`Menu` en `src/consts.ts`) que permite alternar entre una tienda con carrito y pedidos a domicilio, o un **menú digital de solo lectura** con vista rápida en modal ideal para códigos QR dentro del local.
- 💬 **Conversión Directa por WhatsApp:** Envío del pedido completo desde el carrito, botón de pedido directo por platillo y formulario de contacto que generan mensajes estructurados listos para enviar al WhatsApp del negocio.
- 📢 **Sección de Avisos y Promociones (Blog) con SEO y RSS:** Soporte para avisos destacados en portada, borradores (`draft`), tiempo de lectura, categorías, etiquetas, imágenes OpenGraph dinámicas, Sitemap y canal RSS (`/rss.xml`).
- 🖥️ **Panel Administrable (Keystatic CMS):** Creación y edición visual de platillos y avisos en formato `.mdx` desde `/keystatic` (en modo local durante el desarrollo o conectado a GitHub en producción).
- 🌗 **Modo Claro / Oscuro sin Parpadeos:** Sistema de temas gastronómicos con DaisyUI v5 (`caramellatte` y `coffee` por defecto) con persistencia en `localStorage` y detección del tema del sistema.

---

## 🚀 Comandos del Proyecto

> **Requisitos previos:** Node.js v22.23.4+

Ejecuta los siguientes comandos desde la raíz del proyecto:

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:4321` (con Keystatic activo en `/keystatic`) |
| `npm run build` | Compila el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza localmente la versión compilada |

---

## 🎨 Guía de Personalización

### 1. Datos Generales del Restaurante (`src/consts.ts`)
El primer paso para adaptar la plantilla es editar el archivo [`src/consts.ts`](./src/consts.ts):

```ts
export const SITE_TITLE = 'Axioma Kapileio';
export const SITE_DESCRIPTION = 'Descripción de tu restaurante para buscadores (SEO)';
export const SITE_PROPIETARIO = 'Proyectos Axioma'; // Autor por defecto en avisos/blog
export const SITE_CONTACTO = '525500000000'; // Número de WhatsApp para recibir pedidos
export const SITE_CORREO = 'hola@tuempresa.com';
export const GITHUB_REPO = 'Proyectos-axioma/Axioma-Kapileio'; // usuario/repositorio para Keystatic
export const SITE_URL = 'https://tusitio.com'; // Dominio final de producción
export const Facebook = 'https://facebook.com/tu-usuario';
export const X = 'https://x.com/tu-usuario';
export const Instagram = 'https://instagram.com/tu-usuario';
export const Menu = false; // false = Activa carrito y pedidos por WhatsApp | true = Modo menú de lectura en restaurante
```

### 2. Activar o Desactivar el Modo Menú (`Menu`)
En [`src/consts.ts`](./src/consts.ts) puedes definir cómo funcionará el sitio:
- **`Menu = false` (Por defecto):** Habilita el botón y modal del carrito en la barra superior, los botones de *"Agregar al carrito"* en las tarjetas y páginas de platillos, y el envío de pedidos por WhatsApp.
- **`Menu = true`:** Oculta el carrito y los botones de compra, y habilita el componente `VistaProducto` para que los comensales consulten los detalles e ingredientes de cada platillo en una ventana modal sin salir de la página.

### 3. Páginas Institucionales
Personaliza los textos legales y de presentación directamente en:
- **Sobre Nosotros:** [`src/pages/nosotros.astro`](./src/pages/nosotros.astro) *(reemplaza la historia del negocio y agrega la foto de tu cocina o sucursal).*
- **Contacto:** [`src/pages/contacto.astro`](./src/pages/contacto.astro) *(actualiza la dirección física del restaurante en la columna izquierda).*
- **Términos y Condiciones:** [`src/pages/terminos.astro`](./src/pages/terminos.astro) *(ajusta los tiempos estimados de preparación, zonas de reparto, políticas de cancelación y avisos de alérgenos).*

### 4. Gestión de Platillos y Avisos
Puedes administrar el contenido de dos formas:
1. **Desde el navegador (Recomendado):** Corre `npm run dev` y entra a `http://localhost:4321/keystatic` para crear, editar o borrar platillos y avisos visualmente.
2. **Directamente en archivos `.mdx`:** Edita o agrega archivos en `src/content/productos/` y `src/content/avisos/`.

---

## ⚠️ Puntos de Cuidado Importantes

Antes de modificar la estructura interna de la plantilla, ten mucho cuidado con los siguientes puntos para no romper funcionalidades:

### 1. Cambiar los Temas de DaisyUI (Claro / Oscuro)
Si deseas cambiar los temas `caramellatte` (claro) y `coffee` (oscuro) por otros temas de DaisyUI, **debes actualizarlos en 3 lugares al mismo tiempo**:
1. [`src/styles/global.css`](./src/styles/global.css) (en el bloque `@plugin "daisyui"`).
2. [`src/components/Header.astro`](./src/components/Header.astro) (constantes `TEMA_CLARO` y `TEMA_OSCURO` del script).
3. [`src/components/BaseHead.astro`](./src/components/BaseHead.astro) (constantes `TEMA_CLARO` y `TEMA_OSCURO` del script anti-parpadeo en el `<head>`).

> **Nota:** Si solo los cambias en `global.css` y olvidas actualizar los scripts, el botón de cambio de tema dejará de aplicar los colores correctamente.

### 2. Formato del Número de Teléfono (`SITE_CONTACTO`)
En [`src/consts.ts`](./src/consts.ts), la constante `SITE_CONTACTO` debe contener **únicamente números, incluyendo el código de país, sin el signo `+`, sin espacios ni guiones** (por ejemplo: `'525512345678'` para México).
- Este formato es indispensable para que la API de WhatsApp (`https://wa.me/...`) funcione sin errores tanto en el carrito como en el formulario de contacto.
- Si tu número no es de 12 dígitos (código de país de 2 dígitos + 10 dígitos locales), revisa la función `formatearTelefono()` en [`src/pages/contacto.astro`](./src/pages/contacto.astro) para ajustar la expresión regular visual.

### 3. Sincronización entre Keystatic y Astro Content Collections
Si agregas, renombras o eliminas algún campo de los productos (`productos`) o de los avisos (`blog` en `src/content/avisos`):
- Debes reflejar el cambio tanto en [`keystatic.config.ts`](./keystatic.config.ts) (para el panel de administración) como en [`src/content.config.ts`](./src/content.config.ts) (validación con Zod en Astro).
- **Si agregas un campo en Keystatic pero no lo declaras en `src/content.config.ts`**, Astro lo ignorará y devolverá `undefined` al renderizar tus páginas.
- Todos los archivos de contenido utilizan extensión **`.mdx`**. No cambies la extensión de salida a `.md` ni uses `fields.document` (`.mdoc`) en `keystatic.config.ts`, o Keystatic dejará de listar los platillos y avisos existentes.

### 4. Despliegue Estático vs. Despliegue con Keystatic en Producción (Netlify / Vercel)
Por defecto, en [`astro.config.mjs`](./astro.config.mjs), la integración `keystatic()` solo se carga en **modo desarrollo (`npm run dev`)**. Esto permite compilar el sitio como 100% estático (`npm run build`) para subirlo a **GitHub Pages** o cualquier hosting estático sin errores.

Si deseas que el panel `/keystatic` esté disponible en producción (por ejemplo, en **Netlify**) conectado a GitHub:
1. Instala el adaptador correspondiente: `npx astro add netlify` (o `@astrojs/vercel`).
2. En [`astro.config.mjs`](./astro.config.mjs), agrega `adapter: netlify()` y deja `keystatic()` fijo dentro del arreglo `integrations` (quitando la condición `isDev`).
3. Actualiza `GITHUB_REPO` y `SITE_URL` en [`src/consts.ts`](./src/consts.ts).
4. Entra a `/keystatic` en tu dominio desplegado para crear y conectar tu **GitHub App**, y configura en tu panel de Netlify las variables de entorno que te solicitará Keystatic:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

---

## 📄 Licencia y Atribución (MIT)

Este proyecto se distribuye bajo la **Licencia MIT**. Eres libre de usar, copiar, modificar y distribuir esta plantilla para proyectos personales o comerciales.

### 🔗 Sobre el icono de GitHub en el Footer
En [`src/components/Footer.astro`](./src/components/Footer.astro), el icono de GitHub apunta por defecto a `https://github.com/Proyectos-axioma/Axioma-Kapileio` como firma del autor original. 

Dependiendo de cómo gestiones el código de tu negocio, te recomendamos dos opciones:

**1. Si tu repositorio es público y quieres que el icono apunte a tu propio código:**
Puedes cambiar libremente ese enlace en [`src/components/Footer.astro`](./src/components/Footer.astro) importando `GITHUB_REPO` desde `../consts`:

```astro
---
import { Facebook, SITE_TITLE, X, Instagram, GITHUB_REPO } from '../consts';
---
<!-- ... -->
<a href={`https://github.com/${GITHUB_REPO}`}>
    <Icon class="w-6 h-6 stroke-2" name="tabler:brand-github"/>
</a>
```
*Sugerencia:* Agradeceríamos mucho mantener el crédito y enlace a **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Kapileio)** dentro del archivo `README.md` de tu repositorio, aunque bajo la licencia MIT es completamente opcional.

**2. Si decides cerrar el código (repositorio privado) y quitar el icono del Footer:**
Si por motivos comerciales tu repositorio es privado y prefieres remover el icono de GitHub de la barra de redes sociales del pie de página, puedes hacerlo sin problema.
*Sugerencia:* Si lo deseas, puedes reubicar el crédito y enlace al repositorio original (`https://github.com/Proyectos-axioma/Axioma-Kapileio`) en un lugar discreto del sitio (como un *"Desarrollado con Axioma Kapileio"* en el Footer, en *Sobre Nosotros* o en *Términos y Condiciones*). Como indica la licencia MIT, esto no es obligatorio.

---

## 🙌 Créditos, Transparencia y Agradecimientos

- Creado y mantenido por **[Proyectos Axioma](https://github.com/Proyectos-axioma/Axioma-Kapileio)**.
- Basado en la arquitectura de **[Axioma Ágora](https://github.com/Proyectos-axioma/Axioma-Agora)** y adaptado específicamente para el giro gastronómico (carrito con promociones 2x1/3x2, modo menú digital en mesa y avisos).
- Construido inicialmente a partir de la plantilla oficial **[Astro Starter Kit: Blog](https://github.com/withastro/astro/tree/main/examples/blog)** (bajo licencia MIT).
- El diseño original de la plantilla base de Astro estuvo inspirado en **[Bear Blog](https://github.com/HermanMartinus/bearblog/)** de [Herman Martinus](https://herman.bearblog.dev).
- 🤖 **Nota sobre el uso de IA:** Durante el desarrollo de esta plantilla se utilizó Inteligencia Artificial (Gemini Pro y Argon) para la creación de algunos componentes y revisar el código.