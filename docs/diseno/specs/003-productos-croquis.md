# Spec 003 — Imágenes de producto, "Fotos de los trabajos" y croquis ilustrativo del hogar

> Origen: petición directa del usuario (dueño de Seproseg), 2026-10-19, con actualización del mismo día (foto de alarma, marcas aprobadas, croquis arriba y con logo). **No existe `docs/marca/briefs/003-*`**: el copy nuevo y los supuestos de §11 deben validarse con marca/usuario antes de publicar.
> Fuentes: `docs/marca/plataforma.md`, `docs/marca/briefs/001-landing.md`, spec `002-rediseno.md` (sigue vigente en todo lo que esta spec no cambie).
> Sistema: `docs/diseno/sistema.md` **v2.1** (§2.1, §2.5, §3.1, §4.2, §4.5, §4.14–§4.16, §7, §8).
> Versión 1.1 — 2026-10-19. Responsable: experto UI/UX. Destinatario: desarrollador.
> **Regla de oro** (igual que 002): el copy entre comillas invertidas es literal. Si falta algo, `<!-- TODO: ... -->` y reportarlo.

---

## 0. Qué pidió el usuario y cómo se resuelve

| Petición | Respuesta de diseño |
|---|---|
| 1. Imagen referencial por línea de producto | Cada tarjeta de `Nuestros sistemas` lleva arriba una **placa de producto** (`.card-media`) 4:3, fondo blue-50, foto de catálogo encajada con `object-fit: contain` y fusión `multiply` (el blanco del catálogo desaparece en la placa). Control de acceso muestra **dos** placas (barrera + checador). Alarma usa la foto del kit DSC entregada; GPS usa una **ilustración SVG propia**. Los logotipos de marca de las fotos **se conservan** (aprobado por el usuario); solo se recorta el banner "ADMS Ready / Wi-Fi" del checador y el espacio en blanco sobrante. |
| 2. "Fotos de los trabajos" siempre en el menú | El enlace existe **siempre**: en móvil/tablet aparece en el header como `Fotos` (entre el logo y `Cotizar`); en escritorio y pie como `Fotos de los trabajos`. La sección se renombra `Fotos de nuestros trabajos` y su estado vacío explica la ausencia de fotos. El mecanismo `assets/instalaciones/` + `js/instalaciones.js` no cambia. |
| 3. Croquis del hogar, arriba, ilustrativo, con el logo de Seproseg | El croquis es una **tarjeta flotante dentro del hero** (`.house-map`): logo de Seproseg + título + casa en corte dibujada en **SVG inline propio** con 6 marcadores numerados (uno por sistema, en su zona lógica; GPS en el vehículo) + leyenda de 6 enlaces a las tarjetas de sistema. **Reemplaza al panel "Nuestros sistemas" del hero** (misma función, ahora visual y también en móvil). Interactividad ligera: solo enlaces; cero JS. |

---

## 1. Decisiones y justificación

| # | Decisión | Por qué |
|---|---|---|
| D1 | **Croquis dentro del hero**: E columna derecha (7–12) en lugar del panel de sistemas; M/T debajo de los CTA. Tarjeta blanca con `--sh-lg` ("flota" sobre el blue-50). | El usuario lo quiere "flotando o presentado antes de lo demás". El panel de sistemas del hero ya cumplía la función "ver los 6 sistemas y saltar a uno": el croquis la cumple mejor (muestra **dónde** va cada uno en una casa) sin añadir una sección. En móvil se mantiene el requisito duro de 002 (H1 + CTAs sin scroll); el croquis es lo primero que se ve al desplazar. |
| D2 | **Un marcador por sistema (6), no por área.** La leyenda dice sistema + dónde va. | Es una imagen ilustrativa de "lo que puede agregar a su hogar", no una herramienta de planificación. 6 números se leen en un móvil; la leyenda es, a la vez, la lista legible para móvil y la vía de teclado. |
| D3 | **Interactividad solo con enlaces**: marcadores del SVG y leyenda llevan a `#cctv`, `#alarma`, etc. (las tarjetas ya resaltan con `:target`). Resaltado cruzado leyenda ↔ marcador por CSS `:has` como mejora opcional. Sin JS nuevo. | Pedido "opcional/ligera". Funciona sin JS, sin estados que mantener, cero peso de script. |
| D4 | **Logo de Seproseg en la cabecera de la tarjeta**, como `<img>` de un archivo propio provisional (`assets/marca/logo-seproseg.svg`: tesela del favicon + wordmark). | Ocupa el lugar que en la referencia tiene la marca del competidor. Como archivo único, se sustituye por el logo oficial **sobrescribiendo el archivo** (§4.1.3), sin tocar el diseño. |
| D5 | **Composición propia, distinta de la referencia ADT**: ilustración plana de líneas (no render fotorrealista), marcadores numerados + leyenda debajo (sin fotos de producto alrededor ni líneas punteadas), sin barra de beneficios, sin "24/7" ni "respuesta inmediata", título distinto. | No copiar diseño ni marca de un competidor; coherencia con la dirección visual (orden, calma, iconografía lineal) y con las promesas prohibidas (plataforma §8). |
| D6 | **Placa de producto 4:3, blue-50, `mix-blend-mode: multiply`**, fotos exportadas sobre lienzo blanco 4:3 con el contenido recortado al ras y encajado al 88 %. | Las fotos tienen proporciones y márgenes muy distintos (y dos traen logo con mucho aire). Recortar el blanco sobrante y normalizar a un lienzo de la misma proporción que la placa hace que los productos "se vean parejos", sin CLS. 4:3 (y no 3:2) porque 3 de los 6 contenidos son verticales. Sin soporte de `multiply` se ve un lienzo blanco que llena la placa: sigue ordenado. |
| D7 | **Imagen arriba, dentro del padding de la tarjeta**; icono + H3 se mantienen. | La tarjeta funciona igual si la imagen falla (plataforma: "digno sin fotos"). El icono es la clave visual compartida con la leyenda del croquis. |
| D8 | **Control de acceso: dos placas 2:3 lado a lado con rótulo** (`Barrera vehicular` / `Checador de huella y código`). | Dos placas 2:3 + separación ≈ una placa 4:3: la tarjeta no crece respecto a las demás. El rótulo explica por qué hay dos equipos. |
| D9 | **GPS con ilustración SVG propia** (`<img>`). | La imagen entregada es generada y tiene texto ilegible: resta confianza. |
| D10 | **Nota "Imágenes referenciales"** bajo la retícula de sistemas. | El equipo final se elige por proyecto (pilar "A la medida"); evita prometer un modelo concreto. |
| D11 | **`Fotos` en el header móvil** (texto) y `Fotos de los trabajos` en escritorio, en **un solo enlace** cuyo complemento ` de los trabajos` es `.sr-only` en < 1024. | "Siempre visible en el menú" sin reintroducir hamburguesa (002 R1). Cabe en 320 px. El nombre accesible empieza por el texto visible (WCAG 2.5.3). |
| D12 | **Orden y fondos de secciones: sin cambios respecto a 002.** | Al ir el croquis dentro del hero, no hace falta reordenar ni cambiar alternancias. |

---

## 2. Archivos

```
/index.html                          ← header (Fotos), hero con croquis (sin panel), tarjetas con imagen, galería renombrada
/css/styles.css                      ← tokens v2.1; componentes §4.14–§4.16 del sistema; se elimina .hero-panel
/js/main.js                          ← + error de imagen de producto; − lógica [data-si-galeria]
/assets/marca/logo-seproseg.svg      ← NUEVO, provisional (§4.1.3)
/assets/productos/                   ← NUEVA carpeta (§5)
    cctv-domo-480.webp               cctv-domo-720.webp
    alarma-kit-480.webp              alarma-kit-720.webp
    cerco-energizador-480.webp       cerco-energizador-720.webp
    cochera-kit-pistones-480.webp    cochera-kit-pistones-720.webp
    acceso-barrera-240.webp          acceso-barrera-360.webp
    acceso-checador-240.webp         acceso-checador-360.webp
    gps.svg                          ← ilustración propia (§5.4)
/assets/instalaciones/, /js/instalaciones.js   ← sin cambios
```

- Los originales del usuario (`1.webp`…`8.png`) **no se commitean**. `1.webp` (ADT) y `7.png` (GPS generado) **no se usan** de ninguna forma.
- Sin dependencias ni build. El procesado de imágenes se hace una vez con cualquier editor/exportador (p. ej. Squoosh.app); no forma parte del sitio.
- Esqueleto del `<body>`: igual que 002 §2.1. Único cambio estructural: `div.hero-panel` se sustituye por `div.house-map` (§4.1).

---

## 3. Navegación

### 3.1 Header

`nav[aria-label="Principal"]` pasa a ser visible en **todos** los tamaños, pero en < 1024 solo muestra el ítem de fotos:

| Orden | Ítem | `href` | < 1024 | ≥ 1024 |
|---|---|---|---|---|
| 1 | `Sistemas` | `#sistemas` | oculto (`display:none`) | visible |
| 2 | `Fotos` + `<span class="nav-extra"> de los trabajos</span>` | `#trabajos` | visible; `.nav-extra` como `.sr-only` | visible completo: `Fotos de los trabajos` |
| 3 | `Cómo trabajamos` | `#proceso` | oculto | visible |

- **Se elimina** `hidden` y `data-si-galeria` del `<li>` de fotos. `data-evento="nav-fotos"`.
- **M/T** fila de 56 px: logo (izq., `margin-right:auto`) · `Fotos` · `Cotizar`. Gap `--sp-2`. `Fotos`: `--fs-body`, 600, ink, `min-height:44px`, `padding-inline: var(--sp-2)`, subrayado 1px offset 3px. Hover: blue-700. Foco estándar.
- Presupuesto a 320 px: gutters 32 + logo ≈ 98 + `Fotos` ≈ 60 + gap 8 + `Cotizar` ≈ 92 ≈ 290 px → una sola línea. **Sin icono.**
- **E**: igual que 002 salvo el texto del ítem 2.

### 3.2 Pie

`nav[aria-label="Pie de página"]`: `Sistemas` · `Fotos de los trabajos` (sin `hidden` ni `data-si-galeria`) · `Cómo trabajamos` · `Contacto`.

### 3.3 Mapa de rutas (lo que añade esta spec)

| Perfil | Ruta nueva |
|---|---|
| P1 Explorador residencial | Ve el croquis al primer desplazamiento: entiende qué puede agregar y dónde; toca un sistema → tarjeta con foto → `Cotizar este sistema`. O sigue a `Le ayudamos a elegir`. |
| P2 Explorador industrial | Sin cambios (franja "Del hogar a la industria"); la barrera y el checador en Control de acceso muestran capacidad comercial/industrial. |
| P3 Comparador residencial | Tarjetas con imagen (ve el equipo y la marca) → `Cotizar este sistema`; `Fotos` en el header desde cualquier punto. |
| P4 Comparador industrial | Marcas de equipos visibles; `Fotos de los trabajos` en el nav. |

---

## 4. Secciones

**M** < 600 · **T** 600–1023 · **E** ≥ 1024.

### 4.1 Hero con croquis (`section#inicio`) — cambia 002 §4.1

Copy del hero (H1, subtítulo, CTAs, microtexto): **sin cambios**. Se **elimina** `div.hero-panel` (HTML y CSS) y en su lugar va `div.house-map`.

**Copy del croquis**
- Título (`p#cq-titulo.house-map-title`, `--fs-small` 600 muted): `Lo que puede agregar a su hogar`
- Leyenda (`ol.cq-legend[aria-labelledby="cq-titulo"]`), 6 enlaces en este orden:

| N.º | Texto del enlace (nombre del sistema) | Línea de ubicación (`span.cq-where`) | `href` | Icono |
|---|---|---|---|---|
| 1 | `Automatización de cocheras y accesos` | `Portón de la cochera` | `#accesos-vehiculares` | `i-cochera` |
| 2 | `GPS vehicular` | `Su vehículo` | `#gps` | `i-gps` |
| 3 | `Control de acceso` | `Puerta principal` | `#control-acceso` | `i-acceso` |
| 4 | `Alarma contra intrusión` | `Puertas, ventanas e interiores` | `#alarma` | `i-alarma` |
| 5 | `Cámaras CCTV` | `Fachada, patio e interiores` | `#cctv` | `i-cctv` |
| 6 | `Cercos electrificados` | `Bardas` | `#cercos` | `i-cerco` |

  Cada ítem: `a.cq-link` (`data-evento="croquis-sistema"`) con `span.cq-num[aria-hidden="true"]` (número), `span.cq-name` (nombre) y `span.cq-where` (ubicación). Nombre accesible = "Automatización de cocheras y accesos Portón de la cochera" (empieza por el texto visible principal).
- Pie (`p.small.muted.cq-note`): `Ilustración de referencia. Cada sistema se diseña según su casa.`

**Estructura (orden DOM = visual)**
```
section#inicio.hero
  .container.hero-grid
    .hero-text            (sin cambios)
    div.house-map                                   ← tarjeta flotante (sistema §4.15)
      div.house-map-head
        img.brand-logo  src="assets/marca/logo-seproseg.svg" alt="Seproseg" width="168" height="32"
        p#cq-titulo.house-map-title  "Lo que puede agregar a su hogar"
      svg.cq  (inline, §4.1.1)
      ol.cq-legend > li > a.cq-link
      p.cq-note
```

**Layout**
- **M**: `.house-map` a ancho completo, `mt --sp-6` tras el microtexto; padding `--sp-4`; cabecera: logo (altura 24 px) arriba y título debajo (`mt --sp-1`); SVG `mt --sp-3`; leyenda **1 columna** `mt --sp-4`; nota `mt --sp-3`. **Requisito de 002 intacto**: en 360×640 el H1, subtítulo, ambos CTA y microtexto siguen visibles sin scroll (el croquis queda por debajo).
- **T**: igual, padding `--sp-5`, logo 28 px, cabecera en fila (logo izq. · título der., `justify-content: space-between`, `flex-wrap`), leyenda **2 columnas** (`grid-auto-flow: column`, 3 filas: 1–3 | 4–6).
- **E**: hero en 12 columnas, texto **1–6**, croquis **7–12** (antes 1–7 / 8–12), centrados en vertical; padding superior del hero baja a `--sp-8` (el croquis es alto). Tarjeta padding `--sp-5`, logo 32 px, leyenda 2 columnas como T.
- Estilo de la tarjeta: fondo blanco, `--r-lg`, `--sh-lg`, sin borde. Es el único elemento con `--sh-lg` fuera del formulario: lo hace "flotar" sobre el blue-50. Sin animación de flotación (calma; `prefers-reduced-motion`).
- La tarjeta de pilares (002 §4.2) sigue montando el borde inferior del hero; separación mínima entre ambas tarjetas `--sp-7` (padding inferior del hero).

**Leyenda — estilo de `a.cq-link`** (sistema §4.16): fila `min-height:44px`, grid `28px 1fr`, gap `--sp-2`; número en círculo 28 px navy-900 con número blanco 700 `--fs-small`; nombre `--fs-small` 600 ink; ubicación `--fs-small` 400 muted en línea propia; sin subrayado; separadores 1px `--c-border` entre filas de la misma columna. Hover: nombre blue-700 subrayado; foco: anillo estándar en la fila.

#### 4.1.1 El dibujo (`svg.cq`, inline)

**Atributos**: `viewBox="0 0 800 500"`, `width="800" height="500"` (CSS `width:100%; height:auto; display:block`), `role="img"`, `aria-labelledby="cq-tit cq-desc"`, `focusable="false"`.
- `<title id="cq-tit">Ilustración de una casa en corte con 6 sistemas de seguridad numerados</title>`
- `<desc id="cq-desc">1 Automatización de cocheras y accesos, en el portón de la cochera. 2 GPS vehicular, en el auto. 3 Control de acceso, en la puerta principal. 4 Alarma contra intrusión, en puertas, ventanas e interiores. 5 Cámaras CCTV, en la fachada, el patio y el interior. 6 Cercos electrificados, sobre las bardas.</desc>`

**Estilo de ilustración** (sistema §3.1): plano, lineal, sin degradados ni sombras, sin texto salvo los números. Trazos con `vector-effect: non-scaling-stroke`: estructura 2 px navy-900; mobiliario 1.5 px navy-900; **equipos de seguridad 2 px blue-700 con un punto amber-500 (LED) r = 2**. Rellenos: muros blanco; techo navy-800; losas navy-900; mobiliario, árbol y barda `--c-border`; suelo blue-50.

**Geometría de referencia** (unidades del viewBox; ajuste ±10 permitido si mejora el dibujo; las posiciones de marcadores deben quedar sobre su equipo):

| Capa (orden) | Elemento | Geometría |
|---|---|---|
| 1 Suelo | franja | rect `0,460,800,30` blue-50; línea `0,460 → 800,460` |
| 2 Casa | muros | rect `300,150,320,310` blanco; losa `300,296,320,8` navy-900; divisorio planta alta línea `460,150 → 460,296`; divisorio planta baja línea `380,304 → 380,460` |
| | techo | polígono `288,150 460,62 632,150` navy-800 |
| 3 Cochera | volumen | rect `136,300,164,160` blanco; losa `130,292,176,8` navy-900 |
| | portón (equipo 1) | postes rect `14,310,12,150` y `124,310,12,150` navy-900; hojas rect `26,330,49,130` y `75,330,49,130` con barrotes cada 12; **pistones** líneas 4 px blue-700 `28,350 → 66,350` y `84,350 → 122,350`; caja de control rect `128,322,10,14` + LED |
| 4 Auto (equipo 2) | perfil mirando a la izquierda | carrocería `150–290 × 400–448`, cabina `175–260 × 378–405` (path redondeado, blanco); ruedas `(180,450)` y `(262,450)` r 14 navy-900; **GPS** rect `236,386,10,8` blue-700 + LED |
| 5 Entrada (equipo 3) | puerta | rect `318,370,40,90`, pomo `(350,415)` r 2 |
| | **lector de acceso** | rect `364,392,10,18` + LED |
| 6 Interiores (equipo 4 y 5) | sala | sofá: respaldo `392,410,98,20`, asiento `392,430,98,26` |
| | cocina | barra `530,418,84,42`; alacena `530,330,84,24` |
| | **alarma** | teclado rect `388,350,14,20` + LED; sensor de movimiento (pentágono pequeño) en `606–616 × 308–320`; sensor de puerta rect `312,374,4,10`; sensor de ventana rect `572,200,5,12` |
| | recámaras | A: cama `320,258,120,30`, cabecera `320,240,8,48` · B: ventana `500,190,70,60` con cruz, cama `520,266,80,22` |
| | **cámara interior** | domo semicírculo r 6 en techo `(500,304)` |
| 7 Patio | barda | rect `700,330,90,130` `--c-border` |
| | **cerco** (equipo 6) | postes líneas `704/746/786, 300 → 330`; hilos blue-700 1.5 px `y = 306, 314, 322` de x 704 a 786; energizador rect `712,350,16,20` + LED |
| | árbol | copa `(660,380)` r 28 `--c-border`; tronco rect `657,405,6,55` |
| | **cámara exterior** (equipo 5) | cámara tipo bala en el alero `(632–648 × 164–176)` apuntando a la derecha |
| 8 Marcadores | ver abajo | encima de todo |

**Marcadores** — uno por sistema:
```
a.cq-hot[href="#cctv"][tabindex="-1"][data-sis="cctv"][data-evento="croquis-marcador"]
  g.cq-badge   (transform-box: fill-box; transform-origin: center; transform: scale(var(--cq-badge-scale)))
    circle.cq-hit   r 32, fill transparent       ← área táctil
    circle.cq-ring  r 26, fill none, stroke navy-900 3px, opacity 0
    circle.cq-dot   r 20, fill navy-900
    text            "5", fill blanco, 20 u, 700, text-anchor middle, dominant-baseline central
```
| N.º | Sistema (`href`) | Centro |
|---|---|---|
| 1 | `#accesos-vehiculares` | `(75, 300)` |
| 2 | `#gps` | `(218, 360)` |
| 3 | `#control-acceso` | `(338, 338)` |
| 4 | `#alarma` | `(440, 350)` |
| 5 | `#cctv` | `(680, 175)` |
| 6 | `#cercos` | `(745, 270)` |

- `--cq-badge-scale`: M `1.6` · T `1.1` · E `1.4`. Resultado aproximado: M (SVG ≈ 300 px de ancho) ≈ 24 px de diámetro visible, ≈ 38 px de área táctil, número ≈ 12 px; T ≈ 36 / 58 px; E (SVG ≈ 480 px) ≈ 34 / 54 px.
- Los marcadores son enlaces para puntero (`tabindex="-1"`): el SVG es `role="img"`; la vía de teclado y lector de pantalla es la leyenda.

#### 4.1.2 Estados

| Estado | Comportamiento |
|---|---|
| Reposo | Marcadores navy-900 con número blanco; leyenda en reposo. |
| Hover sobre marcador | Marcador amber-500 con número navy-900 y anillo navy visible; cursor pointer. (Opcional) el ítem de leyenda del mismo número subraya su nombre: `.house-map:has(.cq-hot[data-sis="x"]:hover) .cq-link[data-sis="x"]`. |
| Hover / foco en ítem de leyenda | (Opcional) su marcador pasa al estado hover: `.house-map:has(.cq-link[data-sis="x"]:is(:hover,:focus-visible)) .cq-hot[data-sis="x"]`. Si no se implementa, la leyenda sigue siendo clara por el número. |
| Clic/toque | Navega a la tarjeta del sistema, que muestra su estado `:target` (002). |
| Sin JS | Idéntico (no hay JS). |
| Sin soporte de `:has` | Sin resaltado cruzado; todo lo demás igual. |
| `prefers-reduced-motion` | Cambios instantáneos; sin scroll suave. |
| `forced-colors: active` | `.cq-dot` fill `Canvas` + trazo `CanvasText`; número `CanvasText`; hover: `Highlight` / `HighlightText`. |
| Logo no carga | Se ve el `alt` "Seproseg" en la cabecera (aceptable). |

#### 4.1.3 Logo de Seproseg en el croquis

- **Hoy no hay logo oficial** (plataforma §10.1; el header usa el wordmark en texto). Se crea `assets/marca/logo-seproseg.svg` **provisional**, coherente con el favicon:
  - `viewBox="0 0 168 32"`, ≤ 2 KB, sin fondo.
  - Tesela `rect 0,0,32,32 rx 6` fill `#0B2545` con "S" `#F59E0B` (igual que `favicon.svg`: x 16, y 23, 800, 22 u, `text-anchor middle`).
  - Wordmark `Seproseg` en `x 42, y 23`, `font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`, 800, 22 u, `letter-spacing -0.2`, fill `#0B2545`.
- HTML: `<img class="brand-logo" src="assets/marca/logo-seproseg.svg" alt="Seproseg" width="168" height="32">` (sin `lazy`: en T/E está en el primer pantallazo). CSS: `height` 24/28/32 px (M/T/E), `width:auto`.
- Encima: `<!-- [[PENDIENTE: logo oficial]] Para sustituir: guardar el logo oficial como assets/marca/logo-seproseg.svg (mismo nombre) y ajustar width/height a su proporción. -->` y `data-pendiente="Logo oficial de Seproseg"` en el `img` (visible en `?revision=1`, no oculta el logo fuera de revisión).
- Cuando exista el logo oficial, el mismo archivo podrá usarse en el header y el pie (fuera de esta spec).
- Reglas: el logo no se deforma, no se coloca sobre fotos ni sobre el dibujo, mantiene un margen libre ≥ 8 px.

### 4.2 Nuestros sistemas (`section#sistemas`, surface-alt, sin cambio de fondo)

H2, intro, tarjetas y franja **sin cambios** (002 §4.4), salvo:
1. Cada `.card--product` recibe como **primer hijo** su placa de producto (sistema §4.14) según §5.2.
2. Tras la retícula y antes de la franja, `p.small.muted.products-note` (`mt --sp-4`): `Imágenes referenciales. Los equipos se eligen según su proyecto.`
3. **Propuesta de copy (S4)**: descripción de Automatización → `Motores para portones corredizos, abatibles y levadizos, con control remoto y opciones de acceso para residentes, personal o visitantes.` (la foto es de un kit para portón abatible). Conservar el comentario `[[PENDIENTE: confirmar tipos de portón que atienden]]`.

Orden dentro de la tarjeta: placa → cabecera (icono + H3) → beneficio → descripción → "Ideal para" → botón. Distancia placa → cabecera `--sp-4`. Layout 1 / 2 / 3 columnas como 002; las placas comparten proporción, así que alinean por fila.

### 4.3 Fotos de nuestros trabajos (`section#trabajos`, blanco, sin cambio de fondo)

Cambios respecto a 002 §4.5 (visor, filtros, paginación y datos sin cambios):
- H2: `Fotos de nuestros trabajos` (antes `Nuestros trabajos`).
- Texto del estado vacío: `Estamos reuniendo aquí las fotos de nuestras instalaciones. Mientras tanto, puede verlas en nuestra página de Facebook.` Tarjeta, mosaico y botón sin cambios.
- JS: **eliminar** el manejo de `[data-si-galeria]`. No dejar código muerto.

---

## 5. Imágenes de producto

### 5.1 Tratamiento unificado

| Regla | Valor |
|---|---|
| Recorte | Recortar al ras del **contenido** (producto + logotipo de marca si lo trae), eliminando todo el blanco sobrante. Si el logotipo está muy separado del producto (alarma DSC), **acercarlo** (retoque) a una distancia ≈ 4 % del alto del contenido. |
| Lienzo | Blanco puro `#FFFFFF` con la proporción de la placa: **4:3** (sencilla) o **2:3** (cada mitad de Control de acceso). |
| Encaje | Contenido centrado, ocupando **88 % de la dimensión limitante** (margen 6 % en ese eje). Así todos los productos se ven de tamaño parejo. |
| Fondo | Grises o blancos sucios del original llevados a `#FFFFFF` para que `multiply` los funda sin bordes. |
| Marcas | **Se conservan** los logotipos de Dahua, DSC, SEG, Wejoin y ZKTeco (aprobado por el usuario). Solo se elimina el banner "ADMS Ready / Wi-Fi" del checador. |
| Formato | WebP, calidad ≈ 80, **sin metadatos**. |
| Tamaños | 4:3 → `480×360` (≤ 22 KB) y `720×540` (≤ 40 KB). 2:3 → `240×360` (≤ 14 KB) y `360×540` (≤ 26 KB). |
| Nombres | minúsculas, sin tildes ni espacios: `{sistema}-{equipo}-{ancho}.webp`. |
| HTML | `img` con `src` (pequeño), `srcset` (ambos, descriptor `w`), `sizes`, `width`/`height` del pequeño, `alt` de §5.2, `loading="lazy"`, `decoding="async"`. |
| CSS | `width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;` dentro de la placa (`isolation:isolate`). |

`sizes`: sencilla `(min-width: 64em) 288px, (min-width: 37.5em) calc(50vw - 100px), calc(100vw - 80px)` · mitad `(min-width: 64em) 140px, (min-width: 37.5em) calc(25vw - 54px), calc(50vw - 44px)`.

Fragmento de referencia:
```html
<div class="card-media">
  <img src="assets/productos/cctv-domo-480.webp"
       srcset="assets/productos/cctv-domo-480.webp 480w, assets/productos/cctv-domo-720.webp 720w"
       sizes="(min-width: 64em) 288px, (min-width: 37.5em) calc(50vw - 100px), calc(100vw - 80px)"
       width="480" height="360" alt="Cámara de seguridad tipo domo, de color blanco." loading="lazy" decoding="async">
</div>
```

### 5.2 Por tarjeta

| Tarjeta (`id`) | Origen | Preparación | Archivo(s) | `alt` (literal) |
|---|---|---|---|---|
| `#cctv` | `2.png` (762×762) | Recortar el blanco alrededor de la cámara; lienzo 4:3. | `cctv-domo-{480,720}.webp` | `Cámara de seguridad tipo domo, de color blanco.` |
| `#alarma` | `8.png` (≈768×1024) | Conservar logo DSC; recortar el blanco superior e inferior y acercar el logo a los equipos; lienzo 4:3. | `alarma-kit-{480,720}.webp` | `Kit de alarma contra intrusión: teclado con pantalla, panel de control, sensores para puertas y ventanas, sensor de movimiento y módulo de comunicación.` |
| `#cercos` | `3.png` (500×477) | Ampliar lienzo a 4:3 en blanco (el producto llena el original). | `cerco-energizador-{480,720}.webp` | `Energizador para cerco electrificado con sirena, control remoto y batería de respaldo.` |
| `#accesos-vehiculares` | `4.png` (600×800) | Recortar blanco sobrante; lienzo 4:3. | `cochera-kit-pistones-{480,720}.webp` | `Kit para automatizar un portón abatible: dos brazos motorizados, tarjeta de control, dos controles remotos, herrajes y baterías.` |
| `#control-acceso` (1) | `5.png` (768×932) | **Conservar** el logotipo WEJOIN; recortar blanco sobrante; lienzo 2:3. | `acceso-barrera-{240,360}.webp` | `Barrera vehicular con brazo horizontal para controlar la entrada de autos.` |
| `#control-acceso` (2) | `6.png` (768×1024) | **Conservar** el logotipo ZKTeco; **eliminar el banner "ADMS Ready / Wi-Fi"** inferior izquierdo (pintarlo de blanco; si no es posible sin tocar el equipo, recortar en y ≈ 905 px); recortar blanco sobrante; lienzo 2:3. | `acceso-checador-{240,360}.webp` | `Checador con lector de huella digital, teclado numérico y pantalla.` |
| `#gps` | `7.png` **no se usa** | Ilustración propia §5.4. | `gps.svg` | `Ilustración de un auto y un celular que muestra su ubicación en un mapa.` |

Los `alt` describen el equipo; la marca es visible en la imagen y no hace falta repetirla.

### 5.3 Dos imágenes en Control de acceso (`.card-media--duo`, sistema §4.14)

```
div.card-media--duo                      (grid 2 columnas 1fr 1fr, gap --sp-2)
  figure.media-cell
    div.media-plate > img (barrera)      (aspect-ratio 2/3, blue-50, --r-md)
    figcaption  "Barrera vehicular"      (--fs-small 600 ink, mt --sp-2)
  figure.media-cell
    div.media-plate > img (checador)
    figcaption  "Checador de huella y código"
```
- Altura ≈ placa 4:3 + rótulo (≈ 29 px más): aceptable.
- Si una de las dos falla (§5.5), se oculta su `figure` y la otra ocupa el ancho con placa **4:3** (`.card-media--duo:has(> [hidden])`).

### 5.4 Ilustración GPS (`assets/productos/gps.svg`)

- `viewBox="0 0 480 360"` (4:3), sin fondo, ≤ 4 KB, `width="480" height="360"`.
- Composición, conjunto al 88 % del ancho: **auto de perfil** (izquierda, ~ 200×90, mismo dibujo simplificado que el croquis) · **celular** vertical (derecha, ~ 120×220, esquinas r 14) con **mapa esquemático**: 3–4 calles en líneas `--c-border` de 6 u, **ruta** blue-700 4 u, **pin** amber-500 con borde navy-900 al final. Sobre el techo del auto, 2 arcos de señal blue-700.
- Estilo §3.1 del sistema: trazo 3 u navy-900, rellenos blanco. **Sin texto, sin interfaz realista, sin logotipos.**

### 5.5 Estados de las imágenes

| Estado | Comportamiento |
|---|---|
| Cargando | La placa (blue-50, proporción fija) reserva su espacio: CLS 0. Sin spinner ni fundido. |
| Error (JS) | `error` en un `img` de `.card-media` → `console.warn("Imagen de producto no encontrada: " + src)` y se oculta la placa (`hidden`); la tarjeta queda como en 002. Comprobar también las que fallaron antes de correr el script (`img.complete && img.naturalWidth === 0`). |
| Error sin JS | Se ve el `alt` dentro de la placa (aceptable). |
| Sin JS | Las imágenes cargan normalmente. |
| Reemplazo futuro por fotos propias | Mismo nombre de archivo y tratamiento §5.1; actualizar `alt`. |

---

## 6. JavaScript — cambios en `js/main.js`

1. **Quitar** `$$("[data-si-galeria]")…` del render de la galería.
2. **Añadir** el manejo de error de imágenes de producto (§5.5).
3. **No** se añade JS para el croquis.
Presupuesto: `main.js` ≤ 12,5 KB sin minificar.

---

## 7. Accesibilidad (WCAG 2.2 AA)

- **Contraste** (sistema §2.2 v2.1): número blanco/navy-900 15,4:1; número navy-900/amber-500 7,2:1; anillo navy-900 sobre blanco 15,4:1 (el marcador ámbar sobre blanco es 2,15:1, por eso el **anillo es obligatorio** en hover); nombre ink y ubicación muted sobre blanco 14,6:1 / 7,6:1; título muted 7,6:1.
- **Teclado**: los marcadores del SVG tienen `tabindex="-1"`; toda su función está en la leyenda → 2.1.1 se cumple. Orden de tabulación del hero: `Solicitar cotización` → `No sé qué necesito` → leyenda 1 → 6.
- **Lectores de pantalla**: SVG con `title`/`desc` que enumeran sistemas y ubicaciones; leyenda `<ol>` etiquetada por `Lo que puede agregar a su hogar`; logo con `alt="Seproseg"`.
- **Foco visible**: filas de la leyenda (anillo blue-700 sobre blanco), enlace `Fotos` del header.
- **Objetivos táctiles**: filas de leyenda y `Fotos` ≥ 44 px; marcadores ≈ 38 px en M (≥ 24 px AA; además, la leyenda ofrece objetivos de 44 px para lo mismo).
- **Nombre accesible = etiqueta visible**: `Fotos de los trabajos` empieza por `Fotos`; cada enlace de leyenda empieza por el nombre visible del sistema.
- **Imágenes**: `alt` de §5.2; ninguna imagen nuestra contiene texto (los logotipos de marca en las fotos son incidentales).
- **Encabezados**: sin cambios respecto a 002 §7 (el croquis no añade encabezados; el título es un `p` que etiqueta la lista). H2 de galería: `Fotos de nuestros trabajos`.
- **Reflow** a 320 px y zoom 200 %: el SVG escala; la leyenda se lee sin desplazamiento horizontal. `forced-colors` según §4.1.2.

---

## 8. Rendimiento

| Métrica | Meta |
|---|---|
| Peso sin imágenes (HTML con SVG inline + CSS + JS + favicon) | ≤ **140 KB** sin comprimir / ≤ **40 KB** gzip |
| SVG del croquis inline | ≤ 12 KB sin comprimir (coordenadas enteras, sin metadatos de editor) |
| Logo provisional | ≤ 2 KB, sin `lazy` |
| Imágenes de producto | 6 WebP (sencillas y duo) + 1 SVG, todas `lazy`; en M (1x) ≤ 125 KB en total |
| Peticiones al cargar (sin desplazar) | ≤ 6 (se suma el logo); 0 a terceros |
| LCP / CLS | ≤ 2,0 s (el LCP sigue siendo el H1) / ≤ 0,05 |
| Lighthouse móvil | ≥ 95 / ≥ 95 / ≥ 95 / ≥ 90 |

---

## 9. Nota de escalabilidad (no implementar)

`.house-map` es independiente del dibujo: un futuro **croquis de negocio/industria** (acceso peatonal con checador, barrera vehicular, perímetro con cerco, almacén con cámaras, oficinas con control de acceso por área, patio de maniobras y flota con GPS) se haría con otro SVG y otra leyenda, con un selector `Casa · Negocio` (`<button aria-pressed>`, sistema §4.6) sobre la misma tarjeta. Requiere brief de marca e ilustración nueva.

---

## 10. Checklist de aceptación

"M360" = 360×640 · "M320" = 320×640 · "T768" = 768×1024 · "E1280" = 1280×800.

**A. Archivos e imágenes**
- [ ] A1. Existen `assets/productos/` (12 WebP + `gps.svg`, nombres de §2) y `assets/marca/logo-seproseg.svg`; no se commitean los originales ni `1.webp`/`7.png`.
- [ ] A2. Cada WebP: proporción exacta (4:3 o 2:3), tamaños de §5.1, peso ≤ límite, sin metadatos, fondo blanco puro, contenido al 88 % de la dimensión limitante.
- [ ] A3. Logotipos Dahua, DSC, SEG, Wejoin y ZKTeco visibles; **sin** banner "ADMS Ready / Wi-Fi"; sin franjas de blanco sobrante (los productos se ven de tamaño parejo en la retícula).
- [ ] A4. `gps.svg`: viewBox `0 0 480 360`, sin fondo, ≤ 4 KB, sin texto, paleta del sistema.
- [ ] A5. `:root` incluye los tokens v2.1 (`--c-blue-100`, `--ratio-producto`, `--ratio-producto-duo`, `--cq-badge-scale`) y el `#DCE7F5` suelto del botón secundario pasa a `--c-blue-100`.
- [ ] A6. HTML válido (W3C) con el SVG inline. No queda HTML/CSS de `.hero-panel`.

**B. Navegación**
- [ ] B1. M320/M360/T768: header = logo · `Fotos` · `Cotizar` en una línea, sin desbordes; `Fotos` subrayado, ≥ 44 px de alto.
- [ ] B2. E1280: nav `Sistemas · Fotos de los trabajos · Cómo trabajamos`.
- [ ] B3. Con `INSTALACIONES = []`, los enlaces de fotos del header y del pie son visibles y llevan a `#trabajos`.
- [ ] B4. Lector de pantalla en M anuncia "Fotos de los trabajos, enlace".
- [ ] B5. No queda referencia a `data-si-galeria` en HTML ni JS.

**C. Croquis en el hero**
- [ ] C1. M360: H1, subtítulo, ambos CTA y microtexto siguen visibles sin scroll (con y sin barra inferior); el croquis aparece justo debajo.
- [ ] C2. E1280: texto en columnas 1–6, croquis en 7–12, tarjeta blanca con `--sh-lg`.
- [ ] C3. Cabecera con el logo provisional (tesela "S" + "Seproseg") y el título literal; en `?revision=1` el logo aparece como pendiente.
- [ ] C4. Sobrescribir `logo-seproseg.svg` con otro SVG cambia el logo sin tocar HTML (salvo `width`/`height`).
- [ ] C5. El dibujo es una ilustración lineal propia según §4.1.1; no recuerda a la referencia (sin render, sin fotos alrededor, sin líneas punteadas, sin barra de beneficios, sin "24/7").
- [ ] C6. Los 6 marcadores están sobre su equipo (GPS en el auto, cerco en la barda, etc.); números legibles en M360; trazos de grosor constante en M y E.
- [ ] C7. Leyenda: 6 enlaces con número, nombre y ubicación literales; 1 columna en M, 2 columnas (1–3 | 4–6) en T/E; cada uno lleva a su tarjeta y ésta muestra `:target`.
- [ ] C8. Tocar un marcador lleva a la tarjeta del sistema (también sin JS). Tab no se detiene en los marcadores.
- [ ] C9. Hover sobre un marcador: ámbar con anillo navy. (Si se implementa el resaltado cruzado, funciona en ambos sentidos.)
- [ ] C10. Lector de pantalla: el SVG se anuncia como imagen con la lista de sistemas y ubicaciones; la leyenda como lista "Lo que puede agregar a su hogar" de 6 elementos.

**D. Tarjetas de sistema**
- [ ] D1. Las 6 tarjetas muestran su placa como primer elemento; misma altura de placa en cada fila (T/E).
- [ ] D2. Placas blue-50 sin rectángulo blanco visible alrededor del producto.
- [ ] D3. Control de acceso: dos placas 2:3 con rótulos `Barrera vehicular` y `Checador de huella y código`.
- [ ] D4. `alt` literales de §5.2.
- [ ] D5. Nota `Imágenes referenciales. Los equipos se eligen según su proyecto.` bajo la retícula.
- [ ] D6. Renombrar un archivo de producto: la placa desaparece sin hueco y hay `console.warn`; en la duo, la otra imagen ocupa el ancho en 4:3.
- [ ] D7. Imágenes `lazy`, con `width`/`height`, `srcset` y `sizes`; CLS ≤ 0,05 en red lenta.
- [ ] D8. Descripción de Automatización con "corredizos, abatibles y levadizos" (o la versión que valide marca).

**E. Galería**
- [ ] E1. H2 `Fotos de nuestros trabajos`; estado vacío con el texto nuevo y botón a Facebook.
- [ ] E2. Con 12 fotos de prueba (no commiteadas), el checklist E/F de la spec 002 se sigue cumpliendo.

**F. Accesibilidad, rendimiento y regresión**
- [ ] F1. axe sin errores críticos/serios.
- [ ] F2. Sin scroll horizontal a 320 px ni con zoom 200 %.
- [ ] F3. `forced-colors` (emulación): marcadores visibles y distinguibles en hover.
- [ ] F4. `prefers-reduced-motion`: sin desplazamiento suave ni transiciones.
- [ ] F5. Metas de §8 (reportar cifras).
- [ ] F6. El resto del checklist de la spec 002 sigue pasando (salvo C3 de 002, sustituido por C2/C7 de esta spec).

---

## 11. Supuestos y preguntas abiertas

**Supuestos que requieren validación (marca/usuario)**
- **S0. Sin brief 003.** Toca mensaje e imagen de marca; conviene que `experto-marca` revise el copy o redacte un brief que respalde la spec.
- **S1. Derechos de imagen y marcas de terceros.** El usuario aprobó mostrar Dahua, SEG, Wejoin, DSC y ZKTeco; se asume además que **instala esos productos y tiene derecho a usar las fotos de catálogo**. Esto actualiza la plataforma §8 ("marcas no confirmadas"): marca debería registrar estas marcas como confirmadas. A medio plazo, lo ideal son **fotos propias** con el mismo tratamiento.
- **S2. El croquis sustituye al panel "Nuestros sistemas" del hero** (T/E) y aparece también en móvil bajo los CTA.
- **S3. Logo provisional** (tesela del favicon + wordmark) usado como "logo" dentro del croquis hasta tener el oficial.
- **S4. Copy de Automatización** con "abatibles" para coincidir con la foto (pendiente existente sobre tipos de portón).
- **S5. Barrera vehicular en Control de acceso** (indicación del usuario) y no en Automatización.
- **S6. Vocabulario regional**: "cochera", "bardas", "recámaras", "checador" (términos del usuario; uso en México).
- **S7. Elementos de catálogo sensibles para la plataforma**: el kit del cerco incluye una **sirena** y la barrera tiene **franjas y LED rojos**. Son parte del producto, en placas pequeñas; se aceptan. Validar.
- **S8. Checador**: implica registro de entradas; la tarjeta mantiene el pendiente "¿registra entradas y salidas?".
- **S9. Ubicaciones de la leyenda** (p. ej. cámaras en "Fachada, patio e interiores"; alarma en "Puertas, ventanas e interiores").

**Copy nuevo a aprobar**
- Nav: `Fotos` (móvil) / `Fotos de los trabajos` (escritorio y pie).
- Galería: H2 `Fotos de nuestros trabajos`; vacío `Estamos reuniendo aquí las fotos de nuestras instalaciones. Mientras tanto, puede verlas en nuestra página de Facebook.`
- Croquis: `Lo que puede agregar a su hogar` · las 6 ubicaciones de la leyenda · `Ilustración de referencia. Cada sistema se diseña según su casa.` · `title`/`desc` del SVG.
- Sistemas: `Imágenes referenciales. Los equipos se eligen según su proyecto.` · `Barrera vehicular` / `Checador de huella y código` · descripción de Automatización (S4).
- Textos alternativos de §5.2.

**Preguntas para el cliente**
1. ¿Hay logo oficial (SVG o PNG grande)? Sustituye al provisional sin rediseño.
2. ¿Tiene fotos propias de los equipos? Reemplazarían las de catálogo.
3. ¿Qué tipos de portón automatiza (corredizo, abatible, levadizo/seccional)?
4. ¿El GPS tiene app propia o de terceros, con suscripción? (pendiente de 001).
5. ¿Le interesa a futuro el croquis de negocio/industria (§9)?
