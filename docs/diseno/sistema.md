# Sistema de diseño — Seproseg

> **Superado en lo visual por `specs/003-rediseno-taste.md` (2026-10-16): paleta de marca conservada, tipografía, layout y componentes cambiaron.** Se conserva como referencia de accesibilidad y contrastes.
> Versión 2.0 — 2026-10-16. Responsable: experto UI/UX.
> Fuente de marca: `docs/marca/plataforma.md` (§7 dirección visual). Si el cliente entrega logo/colores oficiales, **esos valores reemplazan la paleta de este documento** y se re-verifican los contrastes.
> El desarrollador **no inventa valores**: todo color, tamaño, espacio, radio o sombra sale de aquí.
> La v2.0 acompaña a la spec `002-rediseno.md`. Los cambios respecto a la v1.0 están en §9.

---

## 1. Principios

1. **Claro antes que completo.** Cada pantalla tiene una sola idea y una sola acción principal. Si un elemento no ayuda a contactar, elegir o confiar, sobra.
2. **Confianza antes que impacto.** Fondos claros y serenos en la parte alta de la página, azul noche como color de marca y de cierre, nada de rojo protagonista, neón ni cinta de peligro.
3. **Un solo acento de acción.** El ámbar se reserva para la acción principal (Cotizar / Solicitar / WhatsApp / Enviar). Máximo **un botón ámbar por bloque visual**.
4. **Preparado para fotos reales, digno sin ellas.** Ningún componente depende de una foto para verse terminado. Las fotos se suman (galería) sin rediseñar nada.
5. **Móvil primero.** Estilos base para 360 px; se amplían con `min-width`.
6. **Cero dependencias.** Fuentes del sistema, iconos SVG inline, `<dialog>` nativo, sin librerías.

---

## 2. Tokens

Variables CSS con estos nombres exactos, declaradas en `:root` de `css/styles.css`.

### 2.1 Color

| Token | Hex / valor | Uso |
|---|---|---|
| `--c-navy-900` | `#0B2545` | Color de marca. Titulares sobre claro, logotipo en texto, franja de escalabilidad, pie, fondo del visor de fotos. |
| `--c-navy-800` | `#13315C` | Fondo de la sección Contacto y de la barra de contacto móvil. |
| `--c-blue-700` | `#1D4E89` | Enlaces, iconos sobre claro, foco sobre claro, borde de tarjeta destacada (`:target`). |
| `--c-blue-50` | `#EEF4FB` | **Fondo del hero**, contenedores de icono, fondo de las teselas de foto mientras cargan, tarjeta de estado vacío de la galería. |
| `--c-ink` | `#1E293B` | Texto de cuerpo sobre claro. |
| `--c-muted` | `#475569` | Texto secundario (microtextos, "Ideal para", pies de foto secundarios, ayudas). |
| `--c-surface` | `#FFFFFF` | Fondo base, tarjetas. |
| `--c-surface-alt` | `#F1F5F9` | Fondo de secciones alternas (Sistemas, Así trabajamos). |
| `--c-border` | `#CBD5E1` | Bordes **decorativos** (tarjetas, separadores). No usar en controles. |
| `--c-border-strong` | `#64748B` | Borde de inputs, checkboxes, radios y botones de filtro (≥ 3:1). |
| `--c-amber-500` | `#F59E0B` | Fondo de botón primario; barra decorativa de encabezado de sección. |
| `--c-amber-400` | `#FBBF24` | Hover del primario; foco sobre fondos oscuros. |
| `--c-amber-600` | `#D97706` | Estado activo (pressed) del primario; borde de bloques pendientes en modo revisión. |
| `--c-amber-50` | `#FFFBEB` | Fondo de bloques pendientes en modo revisión (antes valor suelto; ahora token). |
| `--c-on-dark` | `#FFFFFF` | Texto sobre navy. |
| `--c-on-dark-muted` | `#CBD5E1` | Texto secundario sobre navy. |
| `--c-error` | `#B42318` | Solo errores de formulario. |
| `--c-error-bg` | `#FEF3F2` | Fondo del resumen/panel de error. |
| `--c-success` | `#067647` | Confirmación. |
| `--c-success-bg` | `#ECFDF3` | Fondo del panel de confirmación. |
| `--c-backdrop` | `rgba(11, 37, 69, 0.92)` | Fondo (`::backdrop`) del visor de fotos. |

**Reglas de uso**
- El ámbar **nunca** es color de texto sobre claro (2,15:1 sobre blanco). Sobre claro solo aparece como fondo de botón con texto navy-900, o como detalle decorativo.
- El texto del botón ámbar es **siempre** `--c-navy-900`.
- No se introduce el verde de WhatsApp: el botón de WhatsApp es primario ámbar con icono de mensaje.
- **Nunca texto encima de una foto.** Los pies de foto van debajo de la imagen, sobre fondo sólido. Así el contraste no depende de la foto que suba el cliente.

### 2.2 Contrastes verificados (WCAG 2.x, luminancia relativa)

| Primer plano | Fondo | Ratio | Uso permitido |
|---|---|---|---|
| `#0B2545` navy-900 | `#FFFFFF` | 15,4:1 | Todo texto |
| `#0B2545` navy-900 | `#EEF4FB` blue-50 | 13,9:1 | Todo texto (H1 del hero) |
| `#0B2545` navy-900 | `#F1F5F9` | 14,1:1 | Todo texto |
| `#1E293B` ink | `#FFFFFF` | 14,6:1 | Todo texto |
| `#1E293B` ink | `#F1F5F9` | 13,4:1 | Todo texto |
| `#1E293B` ink | `#EEF4FB` | 13,2:1 | Todo texto (subtítulo del hero) |
| `#475569` muted | `#FFFFFF` | 7,6:1 | Todo texto |
| `#475569` muted | `#F1F5F9` | 6,9:1 | Todo texto |
| `#475569` muted | `#EEF4FB` | 6,9:1 | Todo texto (microtexto del hero) |
| `#1D4E89` blue-700 | `#FFFFFF` | 8,4:1 | Enlaces, iconos, foco |
| `#1D4E89` blue-700 | `#F1F5F9` | 7,7:1 | Enlaces, iconos, foco |
| `#1D4E89` blue-700 | `#EEF4FB` | 7,6:1 | Enlaces, iconos, foco |
| `#FFFFFF` | `#0B2545` navy-900 | 15,4:1 | Todo texto |
| `#FFFFFF` | `#13315C` navy-800 | 13,0:1 | Todo texto |
| `#CBD5E1` on-dark-muted | `#0B2545` | 10,4:1 | Texto secundario |
| `#CBD5E1` on-dark-muted | `#13315C` | 8,8:1 | Texto secundario |
| `#0B2545` (texto) | `#F59E0B` amber-500 | 7,2:1 | Botón primario |
| `#0B2545` (texto) | `#FBBF24` amber-400 | 9,2:1 | Botón primario hover |
| `#0B2545` (texto) | `#D97706` amber-600 | 4,8:1 | Botón primario activo |
| `#F59E0B` amber-500 | `#0B2545` / `#13315C` | 7,2:1 / 6,0:1 | Iconos y acentos sobre navy |
| `#FBBF24` amber-400 (foco) | `#0B2545` / `#13315C` | 9,2:1 / 7,8:1 | Anillo de foco sobre oscuro |
| `#64748B` border-strong | `#FFFFFF` / `#F1F5F9` / `#EEF4FB` | 4,8:1 / 4,3:1 / 4,3:1 | Bordes de controles (≥ 3:1) |
| `#B42318` error | `#FFFFFF` / `#FEF3F2` | 6,6:1 / ≈ 6,1:1 | Errores |
| `#067647` success | `#FFFFFF` / `#ECFDF3` | 5,7:1 / ≈ 5,5:1 | Confirmación |
| `#0B2545` | `#FFFBEB` amber-50 | ≈ 15:1 | Etiquetas "Pendiente" (solo revisión) |
| `#0B2545` (texto) | `#DCE7F5` | ≈ 12,3:1 | Botón secundario activo |
| **Prohibido** `#F59E0B` | `#FFFFFF` / `#EEF4FB` | 2,15:1 / ≈ 1,9:1 | Nunca como texto ni único indicador |
| **Prohibido** `#FFFFFF` | `#F59E0B` | 2,15:1 | Nunca |
| **Decorativo** `#CBD5E1` | `#FFFFFF` | 1,5:1 | Solo bordes de tarjeta / separadores |

### 2.3 Tipografía

Sin fuentes web.

```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
```

| Token | Valor | Móvil (360) | Escritorio (≥1024) | Peso | Interlineado | Uso |
|---|---|---|---|---|---|---|
| `--fs-display` | `clamp(1.75rem, 1.2rem + 2.8vw, 3rem)` | ≈ 29 px | 48 px | 700, `letter-spacing: -0.015em` | 1.15 | H1 del hero (único H1) |
| `--fs-h2` | `clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)` | ≈ 24 px | 36 px | 700 | 1.2 | Títulos de sección |
| `--fs-h3` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 18 px | 22 px | 600 | 1.3 | Títulos de tarjeta |
| `--fs-lead` | `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)` | 17 px | 20 px | 400 | 1.5 | Subtítulo del hero, intros |
| `--fs-body` | `1rem` (≥1024: `1.0625rem`) | 16 px | 17 px | 400 | 1.6 | Cuerpo |
| `--fs-small` | `0.875rem` | 14 px | 14 px | 400/600 | 1.5 | Microtextos, pies de foto, pie de página |
| `--fs-logo` | `1.375rem` | 22 px | 22 px | 800, `letter-spacing: -0.01em` | 1 | "Seproseg" en texto (logo provisional) |

Reglas: párrafos `max-width: 65ch`, intros `60ch`; sin MAYÚSCULAS sostenidas; pesos 400/600/700/800 (800 solo logo); todo en `rem`; nunca deshabilitar el zoom.

### 2.4 Espaciado (base 4 px)

`--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 24 · `--sp-6` 32 · `--sp-7` 48 · `--sp-8` 64 · `--sp-9` 96.

- Padding vertical de sección (`--sec-pad`): 48 móvil · 64 tablet · 96 escritorio.
- Título de sección → contenido: `--sp-5` móvil, `--sp-6` ≥600.
- Gap de retículas (`--gap`): 16 móvil · 24 tablet · 32 escritorio.
- **Galería**: gap fijo `--sp-3` (12) móvil, `--sp-4` (16) ≥600 (las fotos piden menos aire que las tarjetas de texto).

### 2.5 Layout y breakpoints

| Token | Valor |
|---|---|
| `--container` | `70rem` (1120 px) |
| `--gutter` | 16 móvil · 24 ≥600 · 32 ≥1024 |
| Tablet | `@media (min-width: 37.5em)` → 600 px |
| Escritorio | `@media (min-width: 64em)` → 1024 px |
| `--header-h` | `56px` móvil/tablet · `72px` escritorio |
| `--bar-h` | `64px` (+ `env(safe-area-inset-bottom)`) |
| `--ratio-foto` | `4 / 3` — proporción **única** de las teselas de la galería |

Solo estos dos breakpoints, siempre `min-width`.

### 2.6 Radios

`--r-sm` 6px (inputs, chips; 4px cuadro de checkbox) · `--r-md` 10px (botones, teselas de foto) · `--r-lg` 16px (tarjetas, paneles, formulario, visor) · `--r-pill` 999px (filtros, números del proceso).

### 2.7 Sombras

| Token | Valor | Uso |
|---|---|---|
| `--sh-sm` | `0 1px 2px rgba(11, 37, 69, 0.08)` | Header al hacer scroll, tarjeta de pilares, tarjeta destacada |
| `--sh-md` | `0 4px 12px rgba(11, 37, 69, 0.10)` | Hover de tarjetas y teselas |
| `--sh-lg` | `0 12px 32px rgba(11, 37, 69, 0.14)` | Tarjeta del formulario; barra móvil invertida (`0 -4px 12px rgba(11,37,69,0.14)`) |

### 2.8 Movimiento

`--dur: 150ms` · `--ease: cubic-bezier(0.2, 0, 0, 1)`.
- Solo se animan `background-color`, `border-color`, `box-shadow`, `opacity` y `transform` (máx. `translateY(-2px)`).
- Imágenes de la galería: aparecen con `opacity 0 → 1` al cargar (`--dur` × 2). Sin zoom ni parallax.
- `scroll-behavior: smooth` solo con `prefers-reduced-motion: no-preference`. Con `reduce`: transiciones `0.01ms`, sin `transform`.

### 2.9 Capas (z-index)

`--z-bar: 90` · `--z-header: 100` · `--z-skip: 200`. El visor usa `<dialog>` modal (capa superior nativa; no necesita z-index). `--z-menu` **se elimina** (ya no hay menú desplegable).

### 2.10 Bloque de referencia

```css
:root {
  --c-navy-900:#0B2545; --c-navy-800:#13315C; --c-blue-700:#1D4E89; --c-blue-50:#EEF4FB;
  --c-ink:#1E293B; --c-muted:#475569; --c-surface:#FFFFFF; --c-surface-alt:#F1F5F9;
  --c-border:#CBD5E1; --c-border-strong:#64748B;
  --c-amber-500:#F59E0B; --c-amber-400:#FBBF24; --c-amber-600:#D97706; --c-amber-50:#FFFBEB;
  --c-on-dark:#FFFFFF; --c-on-dark-muted:#CBD5E1;
  --c-error:#B42318; --c-error-bg:#FEF3F2; --c-success:#067647; --c-success-bg:#ECFDF3;
  --c-backdrop: rgba(11, 37, 69, 0.92);
  --ratio-foto: 4 / 3;
  --focus: var(--c-blue-700);          /* se redefine a --c-amber-400 en .is-dark */
}
.is-dark { --focus: var(--c-amber-400); color: var(--c-on-dark); }
```

---

## 3. Iconografía

- Lineal, `stroke-width="2"`, `stroke-linecap/linejoin="round"`, `fill="none"`, `stroke="currentColor"`, `viewBox="0 0 24 24"`. SVG de [Lucide](https://lucide.dev) (ISC) **pegado inline** en un sprite `<symbol>`; nunca se enlaza la librería.
- Tamaños: 20 px en botones · 24 px en listas y tarjetas de necesidad · 28 px en contenedor de icono de tarjeta (40×40 móvil, 48×48 ≥600; `--r-md`, fondo blue-50, icono blue-700) · sobre navy: contenedor `rgba(255,255,255,0.08)`, icono amber-500.
- Decorativos: `aria-hidden="true" focusable="false"` y `width`/`height` siempre presentes. Ningún botón es solo icono.

| Concepto | Lucide | id |
|---|---|---|
| Cámaras CCTV | `cctv` | `i-cctv` |
| Alarma contra intrusión | `bell-ring` | `i-alarma` |
| Cercos electrificados | `fence` | `i-cerco` |
| Automatización de cocheras y accesos | `warehouse` | `i-cochera` |
| Control de acceso | `fingerprint` | `i-acceso` |
| GPS vehicular | `map-pin` | `i-gps` |
| Hogar / Negocio / Industria / Vehículos | `house` / `building-2` / `factory` / `car` | `i-hogar` / `i-negocio` / `i-industria` / `i-vehiculo` |
| Integral / A su medida / Escalable / Claridad | `layers` / `ruler` / `trending-up` / `message-square-text` | `i-integral` / `i-medida` / `i-escalable` / `i-claridad` |
| WhatsApp / Llamar | `message-circle` / `phone` | `i-whatsapp` / `i-telefono` |
| Cerrar | `x` | `i-cerrar` |
| Check / Flecha / Externo / Chevron | `check` / `arrow-right` / `external-link` / `chevron-down` | `i-check` / `i-flecha` / `i-externo` / `i-chevron` |
| **Nuevo** Anterior | `arrow-left` | `i-flecha-izq` |
| **Nuevo** Ampliar foto | `maximize-2` | `i-ampliar` |

**Se elimina** `i-menu` (no hay menú hamburguesa). Prohibido: sirenas, candados flotantes, calaveras, rayos, siluetas de ladrones, señales de peligro.

---

## 4. Componentes

Todo control interactivo: área táctil **≥ 44×44 px**, foco visible (§5.2), hover solo con `@media (hover: hover)`, operable con teclado.

### 4.1 Botones

Base: `display:inline-flex; align-items:center; justify-content:center; gap: var(--sp-2); min-height:48px; padding: 0 var(--sp-5); border-radius: var(--r-md); font-size:1rem; font-weight:600; line-height:1.2; text-decoration:none; border:2px solid transparent;`

| Variante | Clase | Reposo | Hover | Activo | Uso |
|---|---|---|---|---|---|
| Primario | `.btn--primary` | fondo amber-500, texto navy-900 | amber-400 | amber-600 | Cotizar, Solicitar cotización, Quiero que me asesoren, WhatsApp, Enviar solicitud, Cotizar algo similar |
| Secundario (claro) | `.btn--secondary` | transparente, borde 2px navy-900, texto navy-900 | fondo blue-50 (sobre fondo blue-50: fondo blanco), borde blue-700 | fondo `#DCE7F5` | No sé qué necesito, Cotizar este sistema, Vea nuestros trabajos en Facebook (estado vacío), Ver más trabajos, Llamar sobre claro |
| Secundario (oscuro) | `.btn--ghost` | transparente, borde 2px blanco, texto blanco | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.18)` | Llamar (contacto, barra), Anterior/Siguiente/Cerrar del visor |
| Compacto | `.btn--compact` (modificador) | `min-height:44px; padding: 0 var(--sp-4)` | — | — | "Cotizar" del header |
| Enlace con flecha | `.link-arrow` | texto blue-700 (blanco en oscuro), subrayado 1px, offset 3px, icono 20 px | subrayado 2px, flecha `translateX(2px)` | — | Vea nuestros trabajos en Facebook (con fotos), enlaces del pie |

- `width:100%` en móvil para CTAs de bloque; `width:auto` desde 600 px.
- `<a>` para navegar; `<button>` para acciones (enviar, filtros, visor, ver más).
- Sin estado deshabilitado (el envío valida al pulsar).

### 4.2 Encabezado (`.site-header`) — rediseñado

- `position: sticky; top:0;` fondo blanco, borde inferior 1px `--c-border`; `.is-scrolled` añade `--sh-sm`.
- **Móvil/tablet (< 1024)**: logo (izq.) · botón `Cotizar` (`.btn--primary.btn--compact`, der.). **No hay menú ni hamburguesa.**
- **Escritorio (≥ 1024)**: logo · `nav[aria-label="Principal"]` con 2–3 enlaces (ink 600; hover blue-700 + subrayado; área ≥ 44 px de alto) · enlace `WhatsApp` (icono + texto, solo si hay número) · `Cotizar`.
- Logo provisional: "Seproseg", `--fs-logo`, 800, navy-900, enlace a `#inicio`.

### 4.3 Barra de contacto móvil (`.contact-bar`) — regla cambiada

- Solo < 1024. Fija abajo, navy-800 (`.is-dark`), padding `var(--sp-2) var(--gutter) calc(var(--sp-2) + env(safe-area-inset-bottom))`, sombra invertida.
- Contiene `WhatsApp` (`.btn--primary`) y/o `Llamar` (`.btn--ghost`) a partes iguales (`grid-auto-flow: column; grid-auto-columns: 1fr; gap: var(--sp-2)`).
- **Si no hay ningún número configurado, la barra no existe** (`hidden`) y el `<body>` no reserva su espacio (clase `.has-bar` en `<html>` solo cuando la barra es visible; el `padding-bottom` y el `scroll-padding-bottom` dependen de esa clase). El "Cotizar" del header sticky cubre el contacto.
- Se oculta (`.is-hidden`, `translateY(100%)`) mientras un campo del formulario tiene el foco.

### 4.4 Encabezado de sección (`.section-head`)

H2 (`--fs-h2`, navy-900 / blanco en oscuro) + intro opcional (`--fs-lead`, muted / on-dark-muted). Barra decorativa 40×4 px amber-500 `--r-pill` encima del H2. Alineado a la izquierda en todos los breakpoints (consistencia y lectura fácil; v2 elimina los centrados).

### 4.5 Tarjetas

Base `.card`: fondo blanco, borde 1px `--c-border`, `--r-lg`, padding `--sp-5` / `--sp-6` (≥600), `flex-direction: column; gap: var(--sp-3)`.

| Variante | Contenido en orden | Notas |
|---|---|---|
| `.card--product` | Fila cabecera: icono (40/48) + H3 en línea (`display:flex; align-items:center; gap: var(--sp-3)`) · beneficio (600 navy-900) · descripción · "Ideal para:" (`--fs-small`) · botón `.btn--secondary` al pie (`margin-top:auto`) | Hover: `--sh-md` + `translateY(-2px)`. No clicable completa. **Estado `:target`** (se llega desde una tarjeta de necesidad): borde 2px blue-700 y `--sh-sm`; sin animación. |
| `.need` (tarjeta de necesidad, **nueva**) | `<a>` completo: icono 24 px blue-700 · título (`--fs-h3` 600 navy-900) · línea "Le recomendamos: …" (`--fs-small`, muted, con el sistema en 600 ink) · flecha `i-flecha` 20 px a la derecha | Es un único enlace, por eso la tarjeta entera es clicable. Fondo blanco, borde 1px `--c-border`, `--r-lg`, padding `--sp-4`/`--sp-5`, `min-height: 72px`, grid `24px 1fr 20px`, gap `--sp-3`. Hover: borde blue-700 + `--sh-md`. Foco: anillo en la tarjeta entera. |
| `.pillars` (pilares, **nueva**) | Una sola tarjeta blanca (`--r-lg`, `--sh-sm`, sin borde) con 4 ítems: icono 24 px blue-700 · título (`--fs-body` 700 navy-900) · línea (`--fs-small` muted) | Ítems separados por borde 1px `--c-border` (horizontal en móvil, vertical en escritorio). No interactivo. |
| `.space` (ítem de espacio dentro de la franja oscura) | icono 24 px amber-500 en contenedor oscuro 40×40 · H3 (`--fs-body` 700 blanco) · texto (`--fs-small` on-dark-muted) | No interactivo. |
| `.step` (proceso) | Círculo 40×40 navy-900 con número blanco 700 · H3 · párrafo | Igual que v1. |

**Chip** (`.chip`): igual que v1; en v2 solo se usa en los pies de foto (tipo de espacio).

### 4.6 Botones de filtro (`.filter`) — reemplaza a `.choice`

- `<button type="button" aria-pressed="true|false">` dentro de un grupo `role="group"` con `aria-label`.
- `min-height:44px; padding: var(--sp-2) var(--sp-4); border:2px solid var(--c-border-strong); border-radius: var(--r-pill); background:#FFF; color: var(--c-ink); font-weight:600; font-size: var(--fs-small)`.
- Hover: borde blue-700. Presionado: fondo navy-900, texto blanco, borde navy-900 + icono `i-check` 16 px visible a la izquierda (el estado no depende solo del color).
- Fila con `display:flex; flex-wrap:wrap; gap: var(--sp-2)`; en móvil puede desplazarse en horizontal (`overflow-x:auto`, sin barra visible) si no cabe.

### 4.7 Teselas de foto (`.work`) — **nuevo**

```
li
└─ a.work (href = archivo de la foto)          ← un solo objetivo táctil
   ├─ div.work-media  (aspect-ratio: var(--ratio-foto); fondo blue-50; --r-md; overflow:hidden)
   │   ├─ svg (icono del tipo de espacio, 32 px, blue-700, centrado; queda DEBAJO de la foto)
   │   └─ img (object-fit: cover; width/height 100%; loading="lazy"; decoding="async"; opacity 0→1 al cargar)
   └─ span.work-cap  (debajo de la imagen)
       ├─ span.work-title  (--fs-small 600 ink, máx. 2 líneas con line-clamp)
       └─ span.work-meta   (--fs-small muted: "Hogar · Lima")
```

- Mientras la foto carga se ve el fondo blue-50 con el icono: un marcador intencional, no un "hueco roto".
- Hover: `--sh-md` sobre `.work-media` + icono `i-ampliar` 20 px en esquina superior derecha sobre un círculo blanco 32 px (decorativo). Foco: anillo alrededor de toda la tesela (`outline-offset: 4px`).
- Proporción **siempre** 4:3 recortada (`object-fit: cover`): fotos de cualquier tamaño u orientación quedan alineadas en la retícula. La foto completa (sin recorte) se ve en el visor.

### 4.8 Estado vacío de galería (`.gallery-empty`) — **nuevo**

Tarjeta fondo blue-50, `--r-lg`, padding `--sp-5`/`--sp-6`. Contenido: mosaico decorativo (`aria-hidden`) de 3 cuadros 56×56 blancos `--r-md` con iconos `i-cctv`, `i-cerco`, `i-acceso` (28 px blue-700), en fila con gap `--sp-2` · texto (`--fs-body` ink) · botón `.btn--secondary` con `i-externo`. Escritorio: mosaico a la izquierda, texto + botón a la derecha. Nunca se muestran "fotos de ejemplo" ni stock.

### 4.9 Visor de fotos (`dialog.lightbox`) — **nuevo**

- `<dialog>` nativo abierto con `showModal()` (foco atrapado, `Esc` cierra, `inert` al resto de forma nativa). `::backdrop` = `--c-backdrop`.
- Contenedor `.is-dark`, fondo navy-900. Móvil: pantalla completa (`width:100%; height:100%; max-width:none; max-height:none; margin:0; padding: var(--sp-4)`). ≥ 1024: `width: min(64rem, 92vw)`, `--r-lg`, padding `--sp-5`.
- Estructura en orden de DOM: barra superior (contador `Foto 3 de 12` `--fs-small` on-dark-muted · botón `Cerrar` `.btn--ghost.btn--compact` con `i-cerrar`) → `figure` (img `object-fit: contain`, `max-height: 65vh` móvil / `70vh` escritorio, fondo navy-800 mientras carga) → `figcaption` (título `--fs-h3` 600 blanco con `id` para `aria-labelledby`; meta `--fs-small` on-dark-muted) → fila de acciones: `Anterior` y `Siguiente` (`.btn--ghost`, iconos `i-flecha-izq` / `i-flecha`) + `Cotizar algo similar` (`.btn--primary`).
- Móvil: acciones en grid de 2 columnas (Anterior | Siguiente) y debajo Cotizar a ancho completo. ≥600: una fila, Cotizar alineado a la derecha.
- Teclado: `←`/`→` navegan; `Esc` cierra; al cerrar, el foco vuelve a la tesela que lo abrió.
- `body` sin scroll mientras está abierto (`html:has(dialog[open]) { overflow:hidden }`).

### 4.10 Formulario (`.form`)

Sin cambios respecto a v1.0 (etiquetas encima, "(obligatorio)/(opcional)" en texto, inputs 48 px y 16 px de fuente, borde border-strong, error con borde 2px + texto + `aria-describedby`, grupos con `fieldset/legend` y filas de 44 px, confirmación `role="status"` con foco). La tarjeta del formulario es blanca dentro de la sección oscura y **no** hereda `.is-dark` (`--focus` blue-700 dentro).

### 4.11 Acordeón FAQ, enlace de salto, `.sr-only`

Sin cambios respecto a v1.0 (`<details>/<summary>` de 48 px con chevron; skip-link navy-900 visible al foco; `.sr-only` estándar).

### 4.12 Bloques pendientes (`[data-pendiente]`)

Igual que v1.0, usando ahora los tokens `--c-amber-600` (borde 2px discontinuo) y `--c-amber-50` (fondo). Solo en modo revisión (`?revision=1`).

### 4.13 Componentes retirados en v2.0

`.menu-toggle` y panel de menú móvil · `.route` / `.route--a` / `.route--b` · `.choice` (píldoras radio) · `.reco` / `.badge` · `.card--space` con chips · `.card--trust` · `.slot`. Su CSS y JS se eliminan (no dejar código muerto).

---

## 5. Accesibilidad (WCAG 2.2 AA)

### 5.1 Contraste
Solo combinaciones de §2.2. Nada de texto sobre fotos.

### 5.2 Foco
- `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }` — blue-700 en claro, amber-400 en `.is-dark` (franja de espacios, contacto, barra, pie, visor).
- Nunca `outline: none` sin reemplazo.
- Foco no oculto (2.4.11): `scroll-padding-top: calc(var(--header-h) + var(--sp-2))`; `scroll-padding-bottom: calc(var(--bar-h) + var(--sp-2))` solo cuando `html.has-bar` y < 1024.

### 5.3 Objetivos táctiles
≥ 44×44 px en todo control; separación ≥ `--sp-2`.

### 5.4 Semántica y orden
- Landmarks `header`, `nav` (solo escritorio en el header; siempre en el pie, con `aria-label` distintos), `main#contenido`, `footer`.
- Un `h1`; secciones `<section aria-labelledby>`; sin saltos de nivel.
- Orden del DOM = orden visual en todos los breakpoints.
- Externos: `target="_blank" rel="noopener noreferrer"` + `.sr-only` "(se abre en una pestaña nueva)" + `i-externo`.
- Textos repetidos desambiguados con `.sr-only`.
- **Imágenes**: toda foto de la galería tiene `alt` descriptivo en el visor; en la tesela la imagen es `alt=""` porque el nombre accesible lo da el enlace (ver spec 002 §4.4).

### 5.5 Movimiento y zoom
`prefers-reduced-motion` respetado; sin `maximum-scale`; reflow a 320 px y zoom 200 %.

---

## 6. Responsive

| Rango | Retícula | Notas |
|---|---|---|
| Base (< 600) | 1 columna, gutter 16; galería 2 columnas | Header sticky 56 px con logo + Cotizar. Barra inferior solo si hay números. |
| Tablet (≥ 600) | 2 columnas de tarjetas; galería 3 columnas; gutter 24 | Mismo header que móvil. |
| Escritorio (≥ 1024) | Hasta 4 columnas; galería 4 columnas; contenedor 1120; gutter 32 | Nav visible en header; sin barra inferior. |

---

## 7. Rendimiento

- 0 fuentes web, 0 librerías, 0 peticiones a terceros al cargar.
- Peso sin fotos (HTML + CSS + JS + datos de galería + favicon, sin comprimir): **≤ 120 KB**; gzip **≤ 35 KB**.
- **Fotos de instalaciones**: WebP (preferido) o JPG, **1200×900 px** (4:3) o lado mayor 1200 px, **≤ 200 KB** cada una, sin metadatos (EXIF/GPS eliminados). `loading="lazy"` + `decoding="async"` en todas (ninguna está en el primer pantallazo). Se cargan como máximo 8 en el primer bloque de la galería.

---

## 8. Imágenes reales: reglas visuales y de privacidad

1. Solo fotos de trabajos **reales** de Seproseg, con autorización del cliente del inmueble.
2. Encuadre: el equipo instalado con limpieza (cámara, panel, cerco, motor, lectora) o el espacio protegido ordenado. Nada de escenas de miedo (plataforma §7).
3. **Privacidad y seguridad del cliente final** (crítico para una empresa de seguridad): no mostrar rostros reconocibles, placas de vehículos, números de casa, nombres de comercio no autorizados, pantallas con imágenes de cámaras, ni planos/ubicación exacta de equipos que expongan vulnerabilidades. El campo "lugar" admite como máximo ciudad o distrito.
4. Eliminar metadatos de ubicación (EXIF GPS) al exportar (p. ej. exportando con Squoosh.app o "Guardar para web"; herramienta del editor, no dependencia del sitio).

---

### 8.1 Placas de producto y logo oficial (2026-10-19, spec 004)

- **Placa de producto** (`.card-media`, `.card-media--duo`): primer hijo de `.sys-body`; esquinas rectas, sin sombra, 4:3 (dos placas 2:3 con rótulo en Control de acceso). Fondo `--paper-2` (en filas impares `--paper`, y `--paper-2` en `:target`) con `mix-blend-mode: multiply` para fundir el blanco del catálogo. Imágenes en `assets/productos/`, tratadas al ras sobre lienzo blanco al 88 %. Si falla una, `main.js` oculta la placa.
- **Logo oficial** (`assets/marca/`): `seproseg-horizontal-claro.svg` en cabecera y pie (ambos sobre papel), `seproseg-simbolo-claro.svg` en cabecera < 360 px; `favicon.svg` es el icono de app. `horizontal-mono-blanco` queda disponible para fondo navy (no se usa hoy). Paleta del logo: grafito `#2A2F38`, papel `#F0F2F4`, azul hielo `#8FB1CE` / `#6A93B5`. **Pendiente de decidir** si la paleta del sitio (navy / papel / ámbar) se alinea con la del logo.

## 9. Registro de cambios

- **2.0 (2026-10-16)** — rediseño (spec 002):
  - Hero pasa de navy a **fondo claro blue-50** con H1 navy-900; el navy queda para franja de escalabilidad, contacto, pie y visor.
  - Header sin menú hamburguesa: móvil = logo + Cotizar; escritorio = 2–3 enlaces + WhatsApp + Cotizar.
  - Barra de contacto móvil solo existe si hay número configurado (`html.has-bar`).
  - Nuevos componentes: tarjeta de necesidad (`.need`), pilares (`.pillars`), ítem de espacio (`.space`), filtros (`.filter`), teselas de foto (`.work`), estado vacío de galería, visor `<dialog>`.
  - Nuevos tokens: `--c-amber-50`, `--c-backdrop`, `--ratio-foto`. Eliminado `--z-menu`. Nuevos iconos `i-flecha-izq`, `i-ampliar`; eliminado `i-menu`.
  - Encabezados de sección siempre alineados a la izquierda.
  - Retirados: menú móvil, rutas A/B, píldoras radio, recomendaciones resaltables, tarjetas de espacio con chips, bloques de confianza, huecos `.slot`.
- 1.0 (2026-10-15): versión inicial a partir del brief 001.
