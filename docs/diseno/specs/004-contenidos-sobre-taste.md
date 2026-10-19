# Spec 004 — Contenidos nuevos sobre el rediseño taste

> 2026-10-19. Se agregan contenidos sobre `003-rediseno-taste.md` sin cambiar su estructura ni su lenguaje (esquinas rectas, sin sombras, sin iconos en tarjetas, navy/papel/ámbar, Plus Jakarta Sans). No se agrega el croquis del hero: el plano de la sección Escala cumple esa función.

## Agregado
1. **Logo oficial**: `assets/marca/seproseg-horizontal-claro.svg` en la cabecera (alto 40 px, sobre papel) y en el pie (sobre papel); símbolo solo (`seproseg-simbolo-claro.svg`) bajo 360 px vía `<picture>`. `favicon.svg` = icono de app. La palabra grande del pie se conserva (decorativa). Sin avisos de logo pendiente.
2. **Imágenes referenciales por sistema** (`assets/productos/`): CCTV, alarma, cerco, cochera, GPS (`gps.svg`, ilustración propia) y Control de acceso con dos placas (`Barrera vehicular` / `Checador de huella y código`). Lazy, `srcset`/`sizes`, `width`/`height`, `alt` descriptivo. Nota bajo los sistemas: "Imágenes referenciales. Los equipos se eligen según su proyecto." Si una imagen falla se oculta sin hueco (`main.js`).
3. **Fotos siempre en la navegación**: enlace `Fotos` (móvil) / `Fotos de los trabajos` (≥ 900 px) en la cabecera y `Fotos de los trabajos` en el pie, hacia `#trabajos`. H2 renombrado a `Fotos de nuestros trabajos`; estado vacío con nuevo texto y enlace a Facebook.
4. **Textos**: Automatización con "corredizos, abatibles, plegables y levadizos" (sin pendiente de tipos de portón). GPS: "El servicio se opera desde una app o plataforma de rastreo y lleva una anualidad por el servicio de plataforma." (sin precios ni marca; comentario pendiente: tercero, monto y funciones extra).

## Pendientes
- Imágenes de catálogo de terceros: confirmar derechos de uso y marcas (Dahua, DSC, SEG, Wejoin, ZKTeco); idealmente fotos propias.
- Alinear (o no) la paleta del sitio con la del logo.
- Sin brief de marca para el copy nuevo.
