# Sistema de diseño — Seproseg

> Versión 1.0 — 2026-10-15. Responsable: experto UI/UX.
> Fuente de marca: `docs/marca/plataforma.md` (§7 dirección visual). Si el cliente entrega logo/colores oficiales, **esos valores reemplazan la paleta de este documento** y se re-verifican los contrastes.
> El desarrollador **no inventa valores**: todo color, tamaño, espacio, radio o sombra sale de aquí.

---

## 1. Principios

1. **Confianza antes que impacto.** Azul noche sereno, mucho aire, nada de rojo protagonista, neón ni cinta de peligro.
2. **Un solo acento de acción.** El ámbar se reserva para la acción principal (Cotizar / Solicitar / WhatsApp). Si todo es ámbar, nada lo es: máximo **un botón ámbar por bloque visual**.
3. **Ordenado como un sistema bien instalado.** Retícula consistente, mismas tarjetas, mismos espacios.
4. **Móvil primero.** Los estilos base son para 360 px; se amplían con `min-width`.
5. **Cero dependencias.** Fuentes del sistema, iconos SVG inline, sin librerías.

---

## 2. Tokens

Referencia en variables CSS (nombres obligatorios; el desarrollador los declara en `:root` de `css/styles.css`).

### 2.1 Color

| Token | Hex | Uso |
|---|---|---|
| `--c-navy-900` | `#0B2545` | Color de marca. Fondo del hero y del pie, titulares sobre claro, logotipo en texto. |
| `--c-navy-800` | `#13315C` | Fondo de la sección Contacto, barra de contacto móvil, degradado del hero. |
| `--c-blue-700` | `#1D4E89` | Enlaces, iconos sobre claro, foco sobre fondos claros, borde de botón secundario hover. |
| `--c-blue-50` | `#EEF4FB` | Fondo de iconos, panel "Le ayudamos a elegir", superficies suaves. |
| `--c-ink` | `#1E293B` | Texto de cuerpo sobre claro. |
| `--c-muted` | `#475569` | Texto secundario (microtextos, "Ideal para", ayudas de campo). |
| `--c-surface` | `#FFFFFF` | Fondo base. |
| `--c-surface-alt` | `#F1F5F9` | Fondo de secciones alternas, chips. |
| `--c-border` | `#CBD5E1` | Bordes **decorativos** (tarjetas, separadores). No usar en controles de formulario. |
| `--c-border-strong` | `#64748B` | Borde de inputs, checkboxes y radios (contraste no textual ≥ 3:1). |
| `--c-amber-500` | `#F59E0B` | Fondo de botón primario (acento de acción). |
| `--c-amber-400` | `#FBBF24` | Hover del primario; color de foco sobre fondos oscuros. |
| `--c-amber-600` | `#D97706` | Estado activo (pressed) del primario. |
| `--c-on-dark` | `#FFFFFF` | Texto sobre navy. |
| `--c-on-dark-muted` | `#CBD5E1` | Texto secundario sobre navy. |
| `--c-error` | `#B42318` | Texto y borde de error. **Solo** errores de formulario. |
| `--c-error-bg` | `#FEF3F2` | Fondo del resumen de error. |
| `--c-success` | `#067647` | Texto/icono de confirmación. |
| `--c-success-bg` | `#ECFDF3` | Fondo del panel de confirmación. |

**Reglas de uso**
- El ámbar **nunca** se usa como color de texto sobre blanco (2,15:1, falla). Sobre blanco, el ámbar solo aparece como fondo de botón con texto navy, o como detalle decorativo.
- El texto del botón ámbar es **siempre** `--c-navy-900`, nunca blanco (blanco sobre ámbar = 2,15:1, falla).
- No se introduce verde de WhatsApp: el botón de WhatsApp es un botón primario ámbar con icono de mensaje (decisión: mantener un único acento de acción; el icono y el texto "WhatsApp" bastan para el reconocimiento).

### 2.2 Contrastes verificados (WCAG 2.x, fórmula de luminancia relativa)

| Primer plano | Fondo | Ratio | Uso permitido |
|---|---|---|---|
| `#0B2545` navy-900 | `#FFFFFF` | 15,4:1 | Todo texto |
| `#1E293B` ink | `#FFFFFF` | 14,6:1 | Todo texto |
| `#1E293B` ink | `#F1F5F9` | 13,4:1 | Todo texto |
| `#1E293B` ink | `#EEF4FB` | 13,2:1 | Todo texto |
| `#475569` muted | `#FFFFFF` | 7,6:1 | Todo texto |
| `#475569` muted | `#F1F5F9` | 6,9:1 | Todo texto |
| `#475569` muted | `#EEF4FB` | 6,9:1 | Todo texto |
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
| `#F59E0B` amber-500 | `#0B2545` | 7,2:1 | Acentos/etiquetas sobre navy |
| `#F59E0B` amber-500 | `#13315C` | 6,0:1 | Acentos sobre navy-800 |
| `#FBBF24` amber-400 (foco) | `#0B2545` / `#13315C` | 9,2:1 / 7,8:1 | Anillo de foco sobre oscuro |
| `#64748B` border-strong | `#FFFFFF` | 4,8:1 | Bordes de controles (≥ 3:1) |
| `#64748B` border-strong | `#F1F5F9` | 4,3:1 | Bordes de controles (≥ 3:1) |
| `#B42318` error | `#FFFFFF` | 6,6:1 | Mensajes de error |
| `#B42318` error | `#FEF3F2` | ≈ 6,1:1 | Resumen de error |
| `#067647` success | `#FFFFFF` / `#ECFDF3` | 5,7:1 / ≈ 5,5:1 | Confirmación |
| **Prohibido** `#F59E0B` | `#FFFFFF` | 2,15:1 | Nunca como texto ni como único indicador |
| **Prohibido** `#FFFFFF` | `#F59E0B` | 2,15:1 | Nunca |
| **Decorativo** `#CBD5E1` | `#FFFFFF` | 1,5:1 | Solo bordes de tarjeta / separadores |

### 2.3 Tipografía

Sin fuentes web (cero peticiones externas, cero FOIT/CLS).

```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
```

En Android se verá Roboto, en iOS/macOS San Francisco, en Windows Segoe UI: las tres son sans serif humanistas/neo-grotescas, sobrias y muy legibles en móvil, coherentes con §7 de la plataforma.

**Escala** (fluida entre 360 px y ~1024 px; `rem` base 16 px):

| Token | Valor | Móvil (360) | Escritorio (≥1024) | Peso | Interlineado | Uso |
|---|---|---|---|---|---|---|
| `--fs-display` | `clamp(1.75rem, 1.2rem + 2.8vw, 3rem)` | ≈ 29 px | 48 px | 700 | 1.15 | H1 del hero (único H1) |
| `--fs-h2` | `clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)` | ≈ 24 px | 36 px | 700 | 1.2 | Títulos de sección |
| `--fs-h3` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 18 px | 22 px | 600 | 1.3 | Títulos de tarjeta |
| `--fs-lead` | `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)` | 17 px | 20 px | 400 | 1.5 | Subtítulo del hero, intros de sección |
| `--fs-body` | `1rem` (≥1024: `1.0625rem`) | 16 px | 17 px | 400 | 1.6 | Cuerpo |
| `--fs-small` | `0.875rem` | 14 px | 14 px | 400/600 | 1.5 | Microtextos, chips, ayudas, pie |
| `--fs-logo` | `1.375rem` | 22 px | 22 px | 800, `letter-spacing: -0.01em` | 1 | "Seproseg" en texto (logo provisional) |

Reglas:
- Ancho de lectura: párrafos `max-width: 65ch`; intros de sección `max-width: 60ch`.
- Sin MAYÚSCULAS sostenidas (ni con `text-transform`). Única excepción: ninguna.
- Pesos permitidos: 400, 600, 700, 800 (solo logo).
- Nunca deshabilitar el zoom; todo en `rem` para respetar el tamaño de fuente del usuario.

### 2.4 Espaciado (base 4 px)

| Token | px | | Token | px |
|---|---|---|---|---|
| `--sp-1` | 4 | | `--sp-6` | 32 |
| `--sp-2` | 8 | | `--sp-7` | 48 |
| `--sp-3` | 12 | | `--sp-8` | 64 |
| `--sp-4` | 16 | | `--sp-9` | 96 |
| `--sp-5` | 24 | | | |

Ritmo de sección (padding vertical): móvil `--sp-7` (48), tablet `--sp-8` (64), escritorio `--sp-9` (96).
Separación título de sección → contenido: `--sp-5` móvil, `--sp-6` ≥600.
Gap de retículas de tarjetas: `--sp-4` móvil, `--sp-5` tablet, `--sp-6` escritorio.

### 2.5 Layout y breakpoints

| Token | Valor |
|---|---|
| `--container` | `70rem` (1120 px) de ancho máximo de contenido |
| `--gutter` | `--sp-4` (16) móvil · `--sp-5` (24) ≥600 · `--sp-6` (32) ≥1024 |
| Breakpoint tablet | `@media (min-width: 37.5em)` → 600 px |
| Breakpoint escritorio | `@media (min-width: 64em)` → 1024 px |
| `--header-h` | `56px` móvil/tablet · `72px` escritorio |
| `--bar-h` | `64px` (barra de contacto móvil, + `env(safe-area-inset-bottom)`) |

Solo estos dos breakpoints. Nada de breakpoints en `max-width`.

### 2.6 Radios

| Token | Valor | Uso |
|---|---|---|
| `--r-sm` | `6px` | Inputs, chips, checkboxes (4px para el cuadro del checkbox) |
| `--r-md` | `10px` | Botones, tarjetas pequeñas |
| `--r-lg` | `16px` | Tarjetas de sección, paneles, formulario |
| `--r-pill` | `999px` | Opciones tipo píldora del asistente, números del proceso (círculo) |

### 2.7 Sombras

Sombras frías y suaves (tintadas con navy), nunca negras duras.

| Token | Valor | Uso |
|---|---|---|
| `--sh-sm` | `0 1px 2px rgba(11, 37, 69, 0.08)` | Header al hacer scroll, chips |
| `--sh-md` | `0 4px 12px rgba(11, 37, 69, 0.10)` | Tarjetas en hover, menú móvil |
| `--sh-lg` | `0 12px 32px rgba(11, 37, 69, 0.14)` | Tarjeta del formulario, barra de contacto móvil (`0 -4px 12px …` invertida) |

### 2.8 Movimiento

| Token | Valor |
|---|---|
| `--dur` | `150ms` |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` |

- Solo se animan `background-color`, `border-color`, `box-shadow`, `transform` (máx. `translateY(-2px)`) y `opacity`.
- `scroll-behavior: smooth` **solo** dentro de `@media (prefers-reduced-motion: no-preference)`.
- Con `prefers-reduced-motion: reduce`: transiciones a `0.01ms`, sin `transform` en hover.

### 2.9 Capas (z-index)

`--z-header: 100` · `--z-bar: 90` · `--z-menu: 110` · `--z-skip: 200`.

### 2.10 Bloque de referencia

```css
:root {
  --c-navy-900:#0B2545; --c-navy-800:#13315C; --c-blue-700:#1D4E89; --c-blue-50:#EEF4FB;
  --c-ink:#1E293B; --c-muted:#475569; --c-surface:#FFFFFF; --c-surface-alt:#F1F5F9;
  --c-border:#CBD5E1; --c-border-strong:#64748B;
  --c-amber-500:#F59E0B; --c-amber-400:#FBBF24; --c-amber-600:#D97706;
  --c-on-dark:#FFFFFF; --c-on-dark-muted:#CBD5E1;
  --c-error:#B42318; --c-error-bg:#FEF3F2; --c-success:#067647; --c-success-bg:#ECFDF3;
  --focus: var(--c-blue-700);          /* se redefine a --c-amber-400 en .is-dark */
}
.is-dark { --focus: var(--c-amber-400); color: var(--c-on-dark); }
```

---

## 3. Iconografía

- **Estilo**: lineal, trazo 2 px (`stroke-width="2"`), `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`, `stroke="currentColor"`, `viewBox="0 0 24 24"`.
- **Fuente**: copiar el SVG de [Lucide](https://lucide.dev) (licencia ISC) **pegándolo inline**; no se instala ni se enlaza la librería. Se agrupan como `<symbol>` en un sprite inline al inicio del `<body>` y se usan con `<svg><use href="#i-nombre"/></svg>`.
- **Tamaños**: 20 px dentro de botones; 24 px en listas; 28 px dentro del contenedor de icono de tarjeta (contenedor 48×48, `--r-md`, fondo `--c-blue-50`, icono `--c-blue-700`). Sobre navy: contenedor `rgba(255,255,255,0.08)`, icono `--c-amber-500`.
- **Accesibilidad**: todo icono decorativo lleva `aria-hidden="true" focusable="false"`. Ningún botón es solo icono, salvo el botón de menú (que tiene texto accesible).
- Atributos `width`/`height` siempre presentes para evitar saltos de maquetación.

| Concepto | Icono Lucide | id del símbolo |
|---|---|---|
| Cámaras CCTV | `cctv` | `i-cctv` |
| Alarma contra intrusión | `bell-ring` | `i-alarma` |
| Cercos electrificados | `fence` | `i-cerco` |
| Automatización de cocheras y accesos | `warehouse` | `i-cochera` |
| Control de acceso | `fingerprint` | `i-acceso` |
| GPS vehicular | `map-pin` | `i-gps` |
| Hogar | `house` | `i-hogar` |
| Negocio / industria | `building-2` | `i-negocio` |
| Industria (franja escalabilidad) | `factory` | `i-industria` |
| Vehículos | `car` | `i-vehiculo` |
| Integral | `layers` | `i-integral` |
| A su medida | `ruler` | `i-medida` |
| Escalable | `trending-up` | `i-escalable` |
| Claridad | `message-square-text` | `i-claridad` |
| WhatsApp | `message-circle` | `i-whatsapp` |
| Llamar | `phone` | `i-telefono` |
| Menú / cerrar | `menu` / `x` | `i-menu` / `i-cerrar` |
| Viñeta de lista "incluye" | `check` | `i-check` |
| Flecha de enlace | `arrow-right` | `i-flecha` |
| Enlace externo | `external-link` | `i-externo` |
| FAQ abrir | `chevron-down` | `i-chevron` |

Prohibido: sirenas, candados digitales flotantes, calaveras, rayos, siluetas de ladrones, señales de peligro.

---

## 4. Componentes

Todos los componentes interactivos cumplen: área táctil **≥ 44×44 px**, foco visible (§5.2), estados hover/activo, y funcionan con teclado.

### 4.1 Botones

Base común: `display:inline-flex; align-items:center; justify-content:center; gap: var(--sp-2); min-height:48px; padding: 0 var(--sp-5); border-radius: var(--r-md); font-size:1rem; font-weight:600; line-height:1.2; text-decoration:none; border:2px solid transparent;` Icono opcional de 20 px a la izquierda (o flecha a la derecha).

| Variante | Clase | Reposo | Hover | Activo | Uso |
|---|---|---|---|---|---|
| Primario | `.btn--primary` | fondo amber-500, texto navy-900 | fondo amber-400 | fondo amber-600 | Cotizar, Solicitar cotización, Enviar solicitud, WhatsApp, Quiero que me asesoren |
| Secundario (sobre claro) | `.btn--secondary` | fondo transparente, borde 2px navy-900, texto navy-900 | fondo blue-50, borde blue-700 | fondo `#DCE7F5`* | Cotizar este sistema, Llamar (sobre claro) |
| Secundario (sobre oscuro) | `.btn--ghost` | transparente, borde 2px `#FFFFFF`, texto blanco | fondo `rgba(255,255,255,0.10)` | fondo `rgba(255,255,255,0.18)` | No sé qué necesito, Llamar (sobre navy) |
| Enlace con flecha | `.link-arrow` | texto blue-700 (o blanco en oscuro), subrayado 1px, `text-underline-offset: 3px`, flecha 20px | subrayado 2px, flecha `translateX(2px)` | — | Ver soluciones…, Vea nuestros trabajos en Facebook |

\* `#DCE7F5` con texto navy-900: ≈ 12,3:1.

- Ancho: `width:100%` en móvil cuando el botón es CTA de bloque (hero, tarjeta, formulario, barra). A partir de 600 px, `width:auto`.
- Hover solo con `@media (hover: hover)` para no dejar estados "pegados" en táctil.
- No hay estado deshabilitado: el botón de enviar siempre está activo y valida al pulsar.
- Botones que son enlaces (`<a>`) para navegación; `<button>` solo para acciones (menú, enviar, FAQ es `<summary>`).

### 4.2 Encabezado / navegación (`.site-header`)

- `position: sticky; top: 0;` fondo `--c-surface`, borde inferior 1px `--c-border`; al hacer scroll > 8 px se añade `--sh-sm` (clase `.is-scrolled`, opcional).
- Alto `--header-h`. Contenido: logo en texto (izquierda) · [escritorio: navegación + WhatsApp + Cotizar] · [móvil/tablet: Cotizar compacto + botón Menú].
- **Logo provisional**: "Seproseg" en `--fs-logo`, peso 800, color navy-900; es un enlace a `#inicio`.
- **Móvil/tablet (<1024)**: botón "Cotizar" primario con `min-height:44px; padding: 0 var(--sp-4)`, y botón menú 44×44 con icono `i-menu`, texto accesible "Abrir menú" / "Cerrar menú" (`aria-expanded`, `aria-controls="menu"`). El panel de menú se despliega bajo el header, ancho completo, fondo blanco, `--sh-md`; enlaces apilados de 48 px de alto, `--fs-body` peso 600, separados por borde `--c-border`.
- **Escritorio (≥1024)**: navegación horizontal visible (gap `--sp-6`), enlaces color ink peso 600; hover: color blue-700 + subrayado; enlace de la sección actual opcional (no requerido). A la derecha: enlace "WhatsApp" (icono + texto, estilo `.link-arrow` sin flecha, solo si hay número) y botón primario "Cotizar".

### 4.3 Barra de contacto móvil (`.contact-bar`)

- Solo < 1024 px. `position: fixed; bottom: 0; left: 0; right: 0;` fondo navy-800 (clase `.is-dark`), padding `var(--sp-2) var(--gutter) calc(var(--sp-2) + env(safe-area-inset-bottom))`, sombra `0 -4px 12px rgba(11,37,69,0.14)`.
- Contiene hasta 2 botones a partes iguales (`display:grid; grid-auto-flow:column; grid-auto-columns:1fr; gap: var(--sp-2)`), `min-height:48px`:
  - "WhatsApp" → `.btn--primary` con `i-whatsapp`.
  - "Llamar" → `.btn--ghost` con `i-telefono`.
  - Si no hay ningún número configurado: un único botón `.btn--primary` "Solicitar cotización" → `#contacto`.
- El `<body>` lleva `padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom))` en < 1024 para que la barra nunca tape contenido.
- Se oculta (clase `.is-hidden`, `transform: translateY(100%)`) mientras un campo del formulario tiene el foco, para no cubrir el teclado ni el campo.

### 4.4 Encabezado de sección (`.section-head`)

- H2 (`--fs-h2`, navy-900 sobre claro / blanco sobre oscuro) + intro opcional (`--fs-lead`, muted / on-dark-muted), alineados a la izquierda en móvil; centrados en escritorio solo en las secciones indicadas por la spec.
- Detalle decorativo: barra de 40×4 px `--c-amber-500`, `--r-pill`, encima del H2 (`margin-bottom: var(--sp-3)`). Decorativa, sin contenido.

### 4.5 Tarjetas

Base `.card`: fondo `--c-surface`, borde 1px `--c-border`, `--r-lg`, padding `--sp-5` (móvil) / `--sp-6` (≥600), `display:flex; flex-direction:column; gap: var(--sp-3)`. Hover (solo si la tarjeta contiene un único CTA y `hover:hover`): `--sh-md` y `translateY(-2px)`; la tarjeta **no** es clicable completa (solo su CTA), para evitar ambigüedad.

| Variante | Contenido en orden |
|---|---|
| `.card--space` (tipo de espacio) | Icono (48 px) · H3 · párrafo · etiqueta "Incluye:" (`--fs-small` 600 muted) · lista de chips · `.link-arrow` al pie (`margin-top:auto`) |
| `.card--product` (producto) | Icono · H3 (nombre) · beneficio (`--fs-body` 600, navy-900) · descripción (ink) · "Ideal para:" (`--fs-small`, etiqueta 600 + texto muted) · botón `.btn--secondary` "Cotizar este sistema" al pie (`margin-top:auto`) |
| `.card--trust` (por qué elegir) | Icono · H3 · párrafo. Sin borde; fondo transparente; padding 0 (bloque de contenido, no tarjeta visual) |
| `.step` (proceso) | Número en círculo 40×40 (`--r-pill`, fondo navy-900, texto blanco 700) · H3 · párrafo |

**Chip** (`.chip`): `display:inline-flex; padding: var(--sp-1) var(--sp-3); background: var(--c-surface-alt); color: var(--c-ink); border-radius: var(--r-pill); font-size: var(--fs-small);` No interactivo. En lista `<ul>` con `display:flex; flex-wrap:wrap; gap: var(--sp-2)`.

### 4.6 Opciones tipo píldora (asistente "Le ayudamos a elegir") — `.choice`

- Son **radios nativos** visualmente ocultos (`.sr-only` aplicado al `<input>`, no `display:none`) con su `<label>` estilizado como píldora.
- Píldora: `min-height:44px; padding: var(--sp-2) var(--sp-4); border:2px solid var(--c-border-strong); border-radius: var(--r-pill); background: var(--c-surface); color: var(--c-ink); font-weight:600;`
- Hover: borde blue-700. Seleccionada (`input:checked + label`): fondo navy-900, texto blanco, borde navy-900, e icono `i-check` 16 px visible a la izquierda (el estado no depende solo del color).
- Foco: `input:focus-visible + label` recibe el anillo de foco.
- Agrupadas en `<fieldset>` con `<legend>` visible (`--fs-body` 600 navy-900).

### 4.7 Formulario (`.form`)

Contenedor: tarjeta blanca `--r-lg`, `--sh-lg`, padding `--sp-5` móvil / `--sp-6` ≥600. Una sola columna en móvil; ≥600: Nombre y Teléfono en dos columnas, Correo y Ciudad en dos columnas; el resto a ancho completo.

| Elemento | Especificación |
|---|---|
| Etiqueta | Encima del campo, `1rem` peso 600 color ink, `margin-bottom: var(--sp-1)`. Indicador textual: "(obligatorio)" en `--fs-small` 400 muted dentro del `<label>`. Nunca solo asterisco. |
| Input / textarea | `min-height:48px; padding: var(--sp-3); font-size:1rem` (≥16 px evita zoom automático en iOS); borde 1px `--c-border-strong`; `--r-sm`; fondo blanco; texto ink. Textarea `min-height: 7.5rem`, `resize: vertical`. |
| Placeholder | Color muted (#475569). Nunca sustituye a la etiqueta. |
| Hover | Borde blue-700. |
| Foco | Borde blue-700 + anillo de foco (§5.2). |
| Error | Borde 2px `--c-error`; `aria-invalid="true"`; mensaje debajo, `--fs-small` 600 `--c-error`, precedido del texto "Error:" visualmente oculto o de un icono + texto; enlazado con `aria-describedby`. |
| Ayuda | Texto debajo del campo, `--fs-small` muted, enlazado con `aria-describedby`. |
| Grupo de radios/checkbox | `<fieldset>` + `<legend>` (mismo estilo que etiqueta). Cada opción: fila de 44 px mínimo, control nativo de 20×20 con `accent-color: var(--c-navy-900)`, etiqueta clicable. Móvil: 1 columna; ≥600: 2 columnas. |
| Botón enviar | `.btn--primary`, ancho completo en móvil, auto ≥600. |
| Aviso de datos | Debajo del botón, `--fs-small` muted. |
| Confirmación | Panel `role="status"`, fondo `--c-success-bg`, borde-izquierdo 4px `--c-success`, `--r-md`, padding `--sp-4`, texto ink, título 600 `--c-success`. Aparece encima del botón de envío y recibe el foco (`tabindex="-1"`). |

### 4.8 Acordeón FAQ (`.faq`)

- `<details>`/`<summary>` nativos (sin JS). `summary`: `min-height:48px`, `--fs-body` 600 navy-900, icono `i-chevron` a la derecha que rota 180° cuando `[open]` (sin rotación con reduced-motion). Separadores `--c-border`. Contenido con padding `0 0 var(--sp-4)`.

### 4.9 Enlace de salto (`.skip-link`)

Primer elemento del body. Oculto hasta recibir foco; al enfocarse aparece arriba a la izquierda, fondo navy-900, texto blanco, padding `--sp-3 --sp-4`, `--r-md`, `z-index: var(--z-skip)`.

### 4.10 Bloques pendientes (`[data-pendiente]`)

Contenido que depende de un dato no confirmado. Oculto con `hidden` por defecto. En **modo revisión** (ver spec 001) se muestra con: borde 2px discontinuo `--c-amber-600`, fondo `#FFFBEB`, y una etiqueta superior "Pendiente: {valor de data-pendiente}" en `--fs-small` 600 navy-900 (`#0B2545` sobre `#FFFBEB` ≈ 15:1). Nunca visible en producción.

### 4.11 Utilidad `.sr-only`

Clase estándar de texto solo para lectores de pantalla (`position:absolute; width:1px; height:1px; overflow:hidden; clip: rect(0 0 0 0); white-space:nowrap; margin:-1px; padding:0; border:0;`).

---

## 5. Accesibilidad (WCAG 2.2 AA) — reglas del sistema

### 5.1 Contraste
- Texto normal ≥ 4,5:1; texto grande ≥ 3:1; componentes y estados no textuales ≥ 3:1. Solo se permiten las combinaciones de §2.2.

### 5.2 Foco
- Regla global: `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }`. `--focus` es blue-700 sobre fondos claros y amber-400 dentro de `.is-dark` (hero, contacto, barra móvil, pie).
- Nunca `outline: none` sin reemplazo.
- **Foco no oculto (2.4.11)**: `html { scroll-padding-top: calc(var(--header-h) + var(--sp-2)); scroll-padding-bottom: calc(var(--bar-h) + var(--sp-2)); }` (el padding inferior solo < 1024) para que ni el header sticky ni la barra fija tapen el elemento enfocado o el destino de un ancla.

### 5.3 Objetivos táctiles
- Mínimo 44×44 px para todo control (supera el 24×24 de 2.5.8). Separación mínima `--sp-2` entre controles adyacentes.

### 5.4 Semántica y orden
- Landmarks: `header`, `nav` (con `aria-label="Principal"` y `aria-label="Pie de página"` en el pie), `main#contenido`, `footer`.
- Un solo `h1`; cada sección es `<section aria-labelledby="id-del-h2">`; sin saltos de nivel.
- Orden del DOM = orden visual en todos los breakpoints (no usar `order` ni `grid` que reordene contenido).
- Enlaces que abren pestaña nueva: `target="_blank" rel="noopener noreferrer"` + texto `.sr-only` "(se abre en una pestaña nueva)" + icono `i-externo`.
- Textos de enlace/botón repetidos ("Cotizar este sistema") se desambiguan con `.sr-only` (": Cámaras CCTV").

### 5.5 Movimiento y zoom
- Respetar `prefers-reduced-motion` (§2.8).
- Sin `maximum-scale` ni `user-scalable=no`. El diseño funciona a 320 px de ancho y con zoom de texto al 200 % sin pérdida de contenido (reflow 1.4.10).

---

## 6. Responsive (móvil primero)

| Rango | Retícula | Notas |
|---|---|---|
| Base (< 600) | 1 columna, gutter 16 | Header sticky 56 px + barra de contacto fija 64 px. CTAs de bloque a ancho completo. Menú en panel desplegable. |
| Tablet (≥ 600) | 2 columnas para tarjetas, gutter 24 | Se mantiene menú desplegable y barra de contacto (dispositivos táctiles). CTAs `width:auto`. |
| Escritorio (≥ 1024) | Hasta 3–5 columnas según sección, contenedor 1120, gutter 32 | Navegación visible, sin barra de contacto (WhatsApp + Cotizar en header). |

---

## 7. Rendimiento (presupuesto del sistema)

- 0 fuentes web, 0 librerías, 0 peticiones a terceros al cargar.
- Peso total sin imágenes (HTML + CSS + JS + favicon, sin comprimir): **≤ 120 KB**; con gzip: **≤ 35 KB**.
- Imágenes futuras (fotos del cliente): WebP/AVIF, `width`/`height` declarados, `loading="lazy"` salvo la primera visible, máx. 120 KB cada una a 1200 px de ancho.

## 8. Registro de cambios

- 1.0 (2026-10-15): versión inicial a partir del brief 001.
