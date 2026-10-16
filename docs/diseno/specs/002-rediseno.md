# Spec 002 — Rediseño: navegación simple y galería de instalaciones

> Origen: petición directa del usuario (2026-10-16), **sin brief 002 de marca**. Se apoya en `docs/marca/briefs/001-landing.md` (copy aprobado y criterios de éxito) y `docs/marca/plataforma.md`. El copy **nuevo** de esta spec está listado en §10 para que marca lo valide.
> Sistema: `docs/diseno/sistema.md` **v2.0**. Reemplaza el layout de la spec 001; lo que no se mencione aquí (head/SEO, favicon, `CONFIG`, convención `data-*`, modo revisión, validación y envío del formulario) **sigue vigente tal como está en la spec 001**.
> Versión 1.0 — 2026-10-16. Responsable: experto UI/UX. Destinatario: desarrollador.
> **Regla de oro**: el copy entre comillas invertidas es literal. Si falta algo, `<!-- TODO: ... -->` y reportarlo.

---

## 0. Qué pidió el usuario y cómo se resuelve

| Prioridad del usuario | Respuesta de diseño |
|---|---|
| 1. Sencilla, navegación mínima y obvia | La página pasa de 8 a **6 bloques visibles**, sin menú hamburguesa. Móvil: logo + `Cotizar` arriba, WhatsApp/Llamar abajo. Las dos rutas (cotizar / no sé qué necesito) viven en el hero y no se repiten en una sección aparte. |
| 2. Galería futura de instalaciones | Sección `Nuestros trabajos` con **dos estados diseñados**: vacío (tarjeta digna con enlace a Facebook) y con fotos (retícula + visor). Añadir fotos = soltar archivos en `assets/instalaciones/` + una línea en `js/instalaciones.js`. Sin build. |
| 3. Explorador / comparador × residencial / industrial | Explorador: `No sé qué necesito` → 4 necesidades en lenguaje simple → sistema recomendado. Comparador: `Solicitar cotización` → contacto; o sistema concreto desde el panel del hero (T/E) → tarjeta del sistema → `Cotizar este sistema`. Residencial/industrial: franja "Del hogar a la industria" + filtros de la galería por tipo de espacio. |
| 4. Estático, ligero, móvil primero, sin dependencias | `<dialog>` nativo para el visor, datos de galería en un `.js` plano (funciona incluso abriendo el archivo sin servidor), fotos diferidas. |

---

## 1. Decisiones y justificación

| # | Decisión | Por qué |
|---|---|---|
| R1 | **Sin menú hamburguesa.** Móvil/tablet: header con logo + `Cotizar`. Escritorio: 2–3 enlaces (`Sistemas`, `Trabajos` si hay fotos, `Cómo trabajamos`) + WhatsApp + `Cotizar`. | Es una sola página: el scroll *es* la navegación. Un menú oculto añade un paso y una decisión. Los dos CTA del hero y la barra inferior cubren lo que se buscaba en el menú (criterios 2 y 3 del brief). "Contacto" sale del nav porque `Cotizar` ya lleva allí. |
| R2 | **Hero claro** (fondo blue-50, H1 navy). El navy queda para la franja de escalabilidad, contacto y pie. | Más calma y "tranquilidad" (plataforma §1, §7), mejor convivencia futura con fotos reales, y la página "cierra" en azul de marca. Ver supuesto S1. |
| R3 | **Se fusionan Soluciones por espacio + escalabilidad** en una franja oscura al final de `Nuestros sistemas`, sin chips ni enlaces. | Las tarjetas de espacio repetían los nombres de los productos (chips) y sus enlaces llevaban todos a la misma sección. Se conserva su texto aprobado; se elimina la duplicación (criterio 5 del brief). |
| R4 | **Se elimina la sección "¿Por dónde quiere empezar?"**. Ruta A se convierte en la sección `Le ayudamos a elegir` (4 tarjetas-enlace por necesidad, sin formulario de radios). Ruta B se reparte: su texto encabeza el formulario y su lista "Qué incluye" pasa a Contacto. | La bifurcación ya ocurre en el hero; repetirla obliga a decidir dos veces. Para quien no sabe qué necesita, un toque en "lo que le preocupa" es más simple que dos grupos de radios. Cero JS para el asistente. Ver S3. |
| R5 | **Pilares "Por qué elegir Seproseg" suben** justo debajo del hero, en una tarjeta compacta que "monta" el borde inferior del hero. | Confianza temprana sin una sección más. El H2 queda solo para lectores de pantalla (la tarjeta se entiende sola). |
| R6 | **Galería con datos en `js/instalaciones.js`** (`window.INSTALACIONES = [...]`), separado de `main.js`. | Un `.js` funciona sin servidor (un `fetch` de JSON falla al abrir el archivo localmente). Separarlo aísla los errores de edición: si alguien rompe una coma, el resto del sitio sigue funcionando y la galería muestra el estado vacío. |
| R7 | **Teselas 4:3 recortadas, pie de foto debajo (nunca encima), visor `<dialog>` con la foto completa.** | Retícula ordenada con fotos de cualquier tamaño/orientación; contraste garantizado sin depender de la foto; `<dialog>` aporta foco atrapado y `Esc` sin librerías. |
| R8 | **Filtros por tipo de espacio** en la galería, solo si hay ≥ 6 fotos y ≥ 2 tipos. | Que el cliente residencial vea casas y el industrial vea plantas (perfiles P1–P4), sin mostrar filtros inútiles cuando hay pocas fotos. |
| R9 | **`Cotizar algo similar`** en el visor: cierra, marca tipo de espacio y sistemas de esa foto en el formulario y lleva a `#cotizar`. | Convierte la prueba (foto) en acción para el comparador, sin escribir nada. |
| R10 | **La barra inferior móvil solo existe si hay WhatsApp o teléfono.** | Sin números, la barra solo repetía el `Cotizar` del header sticky. Menos ruido. |
| R11 | `:target` resalta la tarjeta de sistema a la que se llega desde una necesidad. | Feedback de "llegó al lugar correcto" sin JS. |

---

## 2. Archivos

```
/index.html                    ← se reestructura según §4
/css/styles.css                ← tokens v2.0; eliminar CSS de componentes retirados (sistema §4.13)
/js/instalaciones.js           ← NUEVO: lista de fotos (§5.1), lo edita el cliente
/js/main.js                    ← CONFIG igual; se quita menú y asistente; se añade galería y visor
/assets/instalaciones/.gitkeep ← NUEVO: carpeta de fotos (vacía al publicar)
/favicon.svg                   ← sin cambios
```

En `<head>`, en este orden (ambos con `defer`, que preserva el orden de ejecución):
```html
<script src="js/instalaciones.js" defer></script>
<script src="js/main.js" defer></script>
```
**No** se commitean fotos de prueba: `INSTALACIONES` se entrega vacío (`[]`).

### 2.1 Esqueleto del `<body>` (orden DOM = orden visual)

```
a.skip-link                       "Saltar al contenido" → #contenido
svg.sprite                        (+ i-flecha-izq, i-ampliar; − i-menu)
header.site-header
main#contenido
  section#inicio      Hero                         fondo blue-50
  section#por-que     Pilares (H2 sr-only)         transición blue-50 → blanco
  section#elegir      Le ayudamos a elegir         blanco
  section#sistemas    Nuestros sistemas + franja   surface-alt (franja navy-900)
  section#trabajos    Nuestros trabajos (galería)  blanco
  section#proceso     Así trabajamos               surface-alt
  section#preguntas   FAQ [hidden]                 blanco
  section#contacto    Contacto + formulario        navy-800 .is-dark
footer.site-footer                                 navy-900 .is-dark
div.contact-bar [hidden]                           navy-800 .is-dark
dialog#visor.lightbox                              navy-900 .is-dark
```

---

## 3. Navegación

### 3.1 Header (`header.site-header`, sistema §4.2)

- Logo `Seproseg` → `#inicio` (comentario `[[PENDIENTE: logo oficial]]` como en 001).
- `nav[aria-label="Principal"]` **solo ≥ 1024** (`display:none` debajo; no existe botón de menú):
  - `Sistemas` → `#sistemas`
  - `Trabajos` → `#trabajos` — `hidden` + `data-si-galeria` (JS lo muestra solo si hay ≥ 1 foto válida)
  - `Cómo trabajamos` → `#proceso`
- ≥ 1024: enlace `WhatsApp` (icono + texto, `data-wa="general"`, `hidden`).
- Todos los tamaños: `Cotizar` (`.btn--primary.btn--compact`) → `#contacto`, `data-evento="header-cotizar"`.
- **M/T**: fila 56 px: logo izq. · `Cotizar` der. **E**: 72 px: logo · nav (gap `--sp-6`) · WhatsApp · Cotizar.

### 3.2 Barra de contacto móvil (sistema §4.3)

- `<div class="contact-bar is-dark" role="region" aria-label="Contacto rápido" hidden>` con `WhatsApp` (`.btn--primary`, `data-wa="general"`, `hidden`, `data-evento="barra-whatsapp"`) y `Llamar` (`.btn--ghost`, `data-tel`, `hidden`, `data-evento="barra-llamar"`).
- JS: si hay `CONFIG.whatsapp` o `CONFIG.telefono` → quitar `hidden` a la barra y añadir `has-bar` a `<html>`. **Se elimina** el botón "Solicitar cotización" de la barra.
- `body { padding-bottom }` y `scroll-padding-bottom` solo bajo `html.has-bar` y < 1024.
- Se oculta con foco en el formulario (igual que 001).

### 3.3 Pie (`footer.site-footer`)

Igual que 001 §4.9 salvo los enlaces del `nav[aria-label="Pie de página"]`: `Sistemas` → `#sistemas` · `Trabajos` → `#trabajos` (`hidden data-si-galeria`) · `Cómo trabajamos` → `#proceso` · `Contacto` → `#contacto`.

### 3.4 Mapa de rutas (verificación de perfiles)

| Perfil | Desde el hero | Llega a |
|---|---|---|
| P1 Explorador residencial | `No sé qué necesito` (1 toque) | `#elegir` → toca una necesidad → tarjeta del sistema → `Cotizar este sistema` o `Quiero que me asesoren` |
| P2 Explorador industrial | `No sé qué necesito` (1 toque) | Igual; la franja "Para su negocio o industria" y la galería filtrable refuerzan la escala |
| P3 Comparador residencial | `Solicitar cotización` (1 toque) o sistema del panel (T/E) | `#contacto` (WhatsApp/Llamar + formulario) o tarjeta del sistema |
| P4 Comparador industrial | Igual que P3 | Ídem + `Qué incluye trabajar con Seproseg` junto al formulario; `Trabajos` en el nav (E) |

---

## 4. Secciones (copy literal + layout)

**M** < 600 · **T** 600–1023 · **E** ≥ 1024.

### 4.1 Hero (`section#inicio`, fondo `--c-blue-50`, **sin** `.is-dark`)

**Copy (igual que 001)**
- H1 (navy-900): `Seguridad integral para su hogar, negocio y vehículos`
- Subtítulo (`--fs-lead`, ink): `Cámaras, alarmas, cercos electrificados, control de acceso y GPS, diseñados a la medida de su espacio. De una vivienda a una industria.`
- CTA primario `.btn--primary`: `Solicitar cotización` → `#contacto` (`data-evento="hero-cotizar"`)
- CTA secundario `.btn--secondary` (borde navy; hover fondo **blanco**): `No sé qué necesito` + `i-flecha` a la derecha → `#elegir` (`data-evento="hero-no-se"`)
- Microtexto (`--fs-small`, muted): `Asesoría sin compromiso.`
- Panel de sistemas (solo T/E; `display:none` en M): rótulo `p` (`--fs-small` 600 muted) `Nuestros sistemas` y `<ul>` de 6 **enlaces**:
  `Cámaras CCTV` → `#cctv` · `Alarma contra intrusión` → `#alarma` · `Cercos electrificados` → `#cercos` · `Automatización de cocheras y accesos` → `#accesos-vehiculares` · `Control de acceso` → `#control-acceso` · `GPS vehicular` → `#gps`

**Estilo del panel**: tarjeta blanca, `--r-lg`, `--sh-sm`, padding `--sp-4`. Cada enlace: fila `min-height:48px`, contenedor de icono 40×40 blue-50 con icono 24 px blue-700, nombre `--fs-small` 600 ink, `i-flecha` 16 px muted a la derecha; separados por borde 1px `--c-border`; hover: fondo surface-alt, nombre blue-700.

**Layout**
- **M**: padding superior `--sp-5`, inferior `--sp-7`. H1 → subtítulo (`mt --sp-3`) → CTAs apilados a ancho completo (`mt --sp-5`, gap `--sp-3`) → microtexto (`mt --sp-3`). **Nada encima del H1.**
  - **Requisito duro (criterio 1 del brief)**: en 360×640, H1, subtítulo, ambos CTA y microtexto visibles sin scroll y por encima de la barra inferior si existe. Presupuesto: 56 + 24 + H1 ≈ 100 + 12 + subtítulo ≈ 128 + 24 + CTAs 108 + 12 + micro 21 ≈ 485 px ≤ 496 px útiles con barra.
- **T**: padding vertical `--sp-8`. CTAs en fila (`width:auto`). Panel debajo (`mt --sp-6`), enlaces en 2 columnas × 3 filas.
- **E**: 12 columnas: texto 1–7, panel 8–12 (1 columna × 6 filas), centrados en vertical. Padding vertical `--sp-9` arriba, `--sp-8` abajo.

### 4.2 Pilares (`section#por-que`, `aria-labelledby="h-por-que"`)

- `<h2 id="h-por-que" class="sr-only">Por qué elegir Seproseg</h2>`
- Fondo de la sección: `linear-gradient(to bottom, var(--c-blue-50) 50%, var(--c-surface) 50%)` (la tarjeta queda a caballo entre el hero y el blanco). Padding: 0 arriba, `--sp-2` abajo (la siguiente sección aporta su padding).
- Tarjeta `.pillars` (sistema §4.5) con `<ul>` de 4 ítems (icono · `<strong>` título · texto). Copy del brief:
  - `i-integral` · `Integral` — `Un solo proveedor para cámaras, alarmas, cercos, accesos y GPS.`
  - `i-medida` · `A su medida` — `Diseñamos según su espacio y su riesgo real, no con paquetes cerrados.`
  - `i-escalable` · `Escalable` — `Del hogar a la industria, y sistemas que crecen con usted.`
  - `i-claridad` · `Claridad` — `Le explicamos cada opción en lenguaje simple.`
- Debajo de la lista, dentro de la tarjeta, los pendientes de 001 §4.6 (`trayectoria` y `cobertura`, `hidden` con `data-mostrar-si`/`data-pendiente`), en una fila con borde superior `--c-border`, `--fs-small` 600 navy-900.
- **Layout**: **M** 1 columna, cada ítem en grid `24px 1fr` (icono a la izquierda; título y texto a la derecha), separadores horizontales, padding de tarjeta `--sp-4`. **T** 2×2. **E** 4 columnas con separadores verticales, padding `--sp-5`.

### 4.3 Le ayudamos a elegir (`section#elegir`, blanco)

**Copy**
- H2: `Le ayudamos a elegir`
- Intro (`--fs-lead`, muted): `Cuéntenos qué quiere proteger y le recomendamos el sistema adecuado. Sin tecnicismos y sin compromiso.`
- H3: `¿Qué le preocupa más?`
- `<ul class="needs">` con 4 tarjetas `.need` (cada una un `<a>`; sistema §4.5):

| Icono | Título (literal) | Línea (literal) | `href` | `data-evento` |
|---|---|---|---|---|
| `i-alarma` | `Que entren sin permiso` | `Le recomendamos: ` + `<strong>Alarma contra intrusión + cercos electrificados</strong>` | `#alarma` | `necesidad-entren` |
| `i-cctv` | `Ver lo que pasa` | `Le recomendamos: ` + `<strong>Cámaras CCTV</strong>` | `#cctv` | `necesidad-ver` |
| `i-acceso` | `Controlar quién entra` | `Le recomendamos: ` + `<strong>Control de acceso + automatización de accesos</strong>` | `#control-acceso` | `necesidad-controlar` |
| `i-gps` | `Saber dónde está mi vehículo` | `Le recomendamos: ` + `<strong>GPS vehicular</strong>` | `#gps` | `necesidad-vehiculo` |

- CTA `.btn--primary`: `Quiero que me asesoren` → `href="#cotizar"`, `data-wa="asesoria"` (sin `hidden`), `data-evento="asesoria"`.
- Microtexto (`--fs-small` muted): `La recomendación final la hace nuestro equipo según su espacio.`

**Layout**: **M** tarjetas en 1 columna (gap `--sp-3`), CTA a ancho completo (`mt --sp-5`). **T** 2×2. **E** 4 columnas en una fila; CTA + microtexto en fila debajo, alineados a la izquierda.

**Interacción**
- Sin JS el asistente funciona completo (son enlaces).
- `Quiero que me asesoren` con WhatsApp configurado: abre wa.me con `Hola Seproseg, no sé qué sistema necesito y quisiera asesoría.` (sin extensiones; ya no hay radios). Sin WhatsApp: marca `No estoy seguro` en el formulario y navega a `#cotizar`.
- Destino `:target` de la tarjeta de sistema: sistema §4.5.

### 4.4 Nuestros sistemas (`section#sistemas`, surface-alt)

**Copy**: H2 `Nuestros sistemas` · intro `Elija uno o combínelos. Le recomendamos la configuración ideal para su espacio.`

**Seis `.card--product`**: mismos `id`, iconos, H3, beneficio, descripción (versiones seguras), "Ideal para", comentarios `[[PENDIENTE]]` y botón `Cotizar este sistema` (+ `.sr-only` con el nombre, `href="#cotizar"`, `data-producto`) que la **tabla de 001 §4.3**. Único cambio visual: icono y H3 en la misma fila (sistema §4.5).

Layout: **M** 1 col (gap `--sp-4`), botón ancho completo · **T** 2 col · **E** 3 col, alturas iguales por fila.

**Franja "Del hogar a la industria"** (`div.scale-band.is-dark`, navy-900, `--r-lg`, `mt --sp-6`; padding `--sp-5` M / `--sp-6` T / `--sp-7` E):
- `p` con `<strong>` en línea propia (`--fs-h3` 700 blanco): `Del hogar a la industria, el mismo respaldo.` + resto (on-dark-muted): `Lo que protege una vivienda se amplía a un almacén o una planta, y los sistemas se integran entre sí: cámaras, alarmas, accesos y GPS trabajando juntos.`
- `<ul>` de 3 ítems `.space` (H3 + texto, copy del brief 001 §2):
  - `i-hogar` · H3 `Para su hogar` — `Vea lo que pasa en casa desde su celular, reciba un aviso si alguien intenta entrar y abra la cochera sin bajar del auto.`
  - `i-negocio` · H3 `Para su negocio o industria` — `Proteja su perímetro, controle quién entra a cada área y supervise varias sedes o puntos desde un solo lugar.`
  - `i-vehiculo` · H3 `Para sus vehículos` — `Sepa dónde está su vehículo o su flota en todo momento, desde su celular.`
- Layout: **M/T** texto arriba; ítems apilados (grid `40px 1fr`, gap `--sp-4`) con separadores `rgba(255,255,255,0.12)`. **E** texto en columnas 1–4, ítems en 5–12 en 3 columnas.

### 4.5 Nuestros trabajos (`section#trabajos`, blanco) — galería

**Estructura fija en el HTML**
```
section#trabajos [aria-labelledby="h-trabajos"]
  .section-head
    h2#h-trabajos               "Nuestros trabajos"
    p.lead [data-galeria="con-fotos"] [hidden]   "Instalaciones reales realizadas por nuestro equipo."
  div.gallery-empty [data-galeria="vacia"]       ← visible por defecto (también sin JS)
  div.filters [role="group"][aria-label="Filtrar trabajos por tipo de espacio"] [hidden]
  ul.gallery [data-galeria="con-fotos"] [hidden]
  div.sr-only#galeria-live [aria-live="polite"]
  button.btn.btn--secondary.gallery-more [hidden]  "Ver más trabajos"
  p.gallery-fb [data-galeria="con-fotos"] [hidden] → .link-arrow "Vea nuestros trabajos en Facebook"
  div[data-pendiente="Fotos de instalaciones: agregar archivos en assets/instalaciones/ y registrarlos en js/instalaciones.js"][hidden]
```

#### Estado A — vacío (0 fotos válidas, o `js/instalaciones.js` ausente o con error)

Tarjeta `.gallery-empty` (sistema §4.8):
- Mosaico decorativo `aria-hidden`: 3 cuadros con `i-cctv`, `i-cerco`, `i-acceso`.
- Texto: `Conozca instalaciones realizadas por nuestro equipo en nuestra página de Facebook.`
- Botón `.btn--secondary` con `i-externo`: `Vea nuestros trabajos en Facebook` + `.sr-only` `(se abre en una pestaña nueva)` → `https://www.facebook.com/SeprosegOficial/`, `target="_blank" rel="noopener noreferrer"`, `data-evento="facebook"`.
- Ocultos: intro, filtros, retícula, "Ver más", enlace de Facebook inferior, enlaces `Trabajos` del nav y del pie.
- Layout: **M** mosaico arriba, texto, botón a ancho completo. **E** mosaico izquierda (columnas 1–3), texto + botón derecha (4–12), centrado vertical.
- Modo revisión: además se muestra el bloque `data-pendiente` de fotos.

> La sección **siempre** existe: en estado vacío sigue cumpliendo el criterio 7 del brief (enlace a Facebook) y no deja huecos.

#### Estado B — con fotos (≥ 1)

- Se oculta `.gallery-empty`; se muestran intro, retícula, enlace inferior (`.link-arrow` `Vea nuestros trabajos en Facebook` con `i-externo` y `.sr-only`) y enlaces `Trabajos` (`[data-si-galeria]`).
- Cada foto = `li > a.work` (sistema §4.7), construida con `createElement`/`textContent` (**nunca** `innerHTML` con datos de la lista):
  - `a.href = "assets/instalaciones/" + encodeURIComponent(archivo)`; `data-evento="galeria-abrir"`; `aria-haspopup="dialog"`.
  - Dentro del enlace, en este orden: `div.work-media` (icono del tipo + `img`) · `span.work-cap` con `<span class="sr-only">Ampliar foto: </span>` · `span.work-title` (= `titulo`) · `span.work-meta` (= etiqueta del tipo + `" · " + lugar` si existe).
  - `img`: `src` = misma ruta, `alt=""` (el nombre accesible lo da el enlace), `width="1200" height="900"`, `loading="lazy"`, `decoding="async"`, `sizes="(min-width: 64em) 25vw, (min-width: 37.5em) 33vw, 50vw"`.
  - Etiquetas de tipo: `hogar` → `Hogar` · `negocio` → `Negocio` · `industria` → `Industria` · `vehiculo` → `Vehículo`. Icono: `i-hogar` / `i-negocio` / `i-industria` / `i-vehiculo`.
- **Retícula** (`ul.gallery`, gap `--sp-3` M / `--sp-4` ≥600). JS pone `data-count` = `1`, `2`, `3` o `n` (≥ 4) según el número de teselas visibles:

| `data-count` | M | T | E |
|---|---|---|---|
| `1` | 1 col, `max-width: 36rem` | ídem | ídem |
| `2` | 2 col | 2 col, `max-width: 48rem` | ídem T |
| `3` | 2 col | 3 col | 3 col |
| `n` | 2 col | 3 col | 4 col |

- **Paginación**: se muestran las primeras **8** (en orden de la lista). Si hay más, `Ver más trabajos` (`data-evento="galeria-mas"`) añade 8 más; el foco pasa a la primera tesela nueva y la región viva anuncia `Se agregaron {k} trabajos.` Cuando no quedan, el botón se oculta.
- **Filtros** (sistema §4.6), visibles solo si hay **≥ 6 fotos válidas y ≥ 2 grupos** con fotos. Botones en este orden, solo los grupos que tengan fotos:
  `Todos` (`aria-pressed="true"` inicial) · `Hogar` (`hogar`) · `Negocio e industria` (`negocio` + `industria`) · `Vehículos` (`vehiculo`). `data-evento="galeria-filtro"`.
  - Al pulsar: `aria-pressed` exclusivo; la retícula se rehace con las 8 primeras del filtro; la región viva anuncia `Mostrando {n} trabajos: {nombre del filtro}.` (para `Todos`: `Mostrando {n} trabajos.`). El foco permanece en el botón.
- **Carga**: el fondo blue-50 con el icono del tipo se ve hasta que la imagen carga; luego la imagen entra con `opacity` (sin animación con reduced-motion).
- **Error de imagen** (`error` en `img`): esa entrada se marca como rota, se emite `console.warn("Foto no encontrada: " + archivo)` y se re-renderiza la vista actual sin ella. Si no queda ninguna, se pasa al Estado A.
- **Validación de la lista** (al cargar): se descarta con `console.warn` toda entrada sin `archivo` (string no vacío), sin `titulo` o con `tipo` fuera de los 4 valores. `alt` vacío → se usa `titulo` en el visor. `sistemas` con nombres que no existan en el formulario se ignoran en silencio.

#### Visor (`dialog#visor.lightbox.is-dark`, sistema §4.9)

```
dialog#visor [aria-labelledby="visor-titulo"]
  div.lb-top
    p.lb-count                     "Foto {i} de {n}"
    button.btn.btn--ghost.btn--compact [data-lb="cerrar"]   i-cerrar + "Cerrar"
  figure
    img                            src = archivo, alt = alt || titulo
    figcaption
      p#visor-titulo               titulo
      p.lb-meta                    "Hogar · Lima"
  div.lb-actions
    button.btn.btn--ghost [data-lb="anterior"]    i-flecha-izq + "Anterior"
    button.btn.btn--ghost [data-lb="siguiente"]   "Siguiente" + i-flecha
    button.btn.btn--primary [data-lb="cotizar"] [data-evento="galeria-cotizar"]
          "Cotizar algo similar" + <span class="sr-only">: {titulo}</span>
```

- Al pulsar una tesela: `preventDefault`, cargar la foto de esa posición **dentro de la lista filtrada completa** (no solo las visibles), `showModal()`. El foco inicial va a `Cerrar`.
- Si el navegador no soporta `HTMLDialogElement.prototype.showModal`, no se intercepta el clic: el enlace abre la foto (degradación aceptable).
- `Anterior`/`Siguiente` y teclas `←`/`→`: navegación circular. Si la lista tiene 1 foto, ambos botones se ocultan.
- Cierre: `Cerrar`, `Esc`, clic en el fondo (clic cuyo `target` es el propio `dialog`). Al cerrar, foco a la tesela de origen (o a la de la última foto vista si está renderizada).
- `Cotizar algo similar`: cierra el visor; en el formulario marca el radio de `espacio` según el tipo (`hogar` → `Hogar`, `negocio` → `Negocio`, `industria` → `Industria`, `vehiculo` → `Vehículo/flota`) y los checkboxes cuyo `value` esté en `sistemas` (sin desmarcar otros); navega a `#cotizar` y pone el foco en el H3 `#cotizar` (lleva `tabindex="-1"`).
- Mientras carga la siguiente foto: el `img` conserva su caja (fondo navy-800) y el contador/título ya cambian; sin spinner.

### 4.6 Así trabajamos (`section#proceso`, surface-alt)

Igual que 001 §4.5 (copy, `<ol>`, pendientes, layout vertical M/T y 5 columnas E).

### 4.7 Preguntas frecuentes (`section#preguntas`, blanco, `hidden`)

Igual que 001 §4.7. Fondo ahora blanco (alterna con proceso).

### 4.8 Contacto (`section#contacto`, `.is-dark`, navy-800)

Igual que 001 §4.8 (H2, texto, WhatsApp/Llamar, datos de contacto, formulario, validación, envío, confirmación) con estos cambios:

1. **Nuevo bloque** en la columna de información, después de los datos de contacto: rótulo `p` (600 blanco) `Qué incluye trabajar con Seproseg` + la lista de 001 §4.4 Ruta B (mismos 5 ítems, mismos `hidden`/`data-mostrar-si`/`data-pendiente`), icono `i-check` amber-500, texto blanco. `mt --sp-6`.
2. En la tarjeta del formulario, bajo el H3 `Solicitar cotización` (`id="cotizar"`, ahora con `tabindex="-1"`), párrafo (`muted`): `Indíquenos el sistema que busca y las características de su espacio. Le enviamos una cotización clara, con lo que incluye.`
3. Los botones WhatsApp/Llamar se mantienen aquí aunque también estén en la barra (en escritorio no hay barra).

Layout: **M** H2 → texto → botones → datos → "Qué incluye" → formulario. **E** columnas 1–5 info, 6–12 formulario.

---

## 5. Mecanismo para añadir fotos

### 5.1 `js/instalaciones.js` (contenido literal a entregar)

```js
/* ===== FOTOS DE INSTALACIONES — Seproseg =====
   Cómo agregar una foto:
   1. Copie la foto en la carpeta assets/instalaciones/
      Formato .webp o .jpg, unos 1200 x 900 px, máximo 200 KB.
      Nombre en minúsculas, sin espacios ni tildes. Ej.: cctv-vivienda-01.webp
   2. Copie la línea de ejemplo de abajo, quítele las dos barras // del inicio y cambie los datos.
      Cada línea termina en una coma.
   3. Guarde y recargue la página. El orden de la lista es el orden en la página.

   Campos:
   - archivo  (obligatorio) nombre exacto del archivo dentro de assets/instalaciones/
   - titulo   (obligatorio) qué se instaló, corto. Ej.: "Cámaras CCTV en vivienda"
   - tipo     (obligatorio) uno de: "hogar", "negocio", "industria", "vehiculo"
   - alt      (recomendado) qué se ve en la foto, para personas que no pueden verla
   - lugar    (opcional) solo ciudad o distrito, y solo con permiso del cliente
   - sistemas (opcional) nombres exactos entre: "Cámaras CCTV", "Alarma contra intrusión",
              "Cercos electrificados", "Automatización de cocheras y accesos",
              "Control de acceso", "GPS vehicular"

   Antes de publicar una foto: que el cliente lo autorice; sin rostros, placas de vehículos,
   números de casa ni pantallas con imágenes de cámaras.
   Si la lista queda vacía, la página muestra en su lugar el enlace a Facebook. */
window.INSTALACIONES = [
  // { archivo: "cctv-vivienda-01.webp", titulo: "Cámaras CCTV en vivienda", tipo: "hogar", alt: "Cámara instalada bajo el alero de una vivienda, orientada hacia la cochera.", lugar: "", sistemas: ["Cámaras CCTV"] },
];
```

### 5.2 Reglas para quien prepare las fotos (resumen de sistema §7–§8)

- 4:3 horizontal ideal (se recorta a 4:3 en la retícula; la foto completa se ve en el visor). 1200 px de ancho, ≤ 200 KB, WebP preferido.
- Exportar **sin metadatos** (elimina la ubicación GPS de la cámara del teléfono).
- `titulo` sigue el tono de marca: describe lo instalado, sin promesas ("Cercos electrificados en condominio", no "Condominio 100% protegido").

---

## 6. JavaScript — cambios en `js/main.js`

Mantener: `CONFIG` (sin cambios), clase `js`, `data-mostrar-si`, `data-texto`, `data-wa`, `data-tel`, `data-correo`, `data-anio`, FAQ, modo revisión, formulario completo, `.is-scrolled`.
Eliminar: menú móvil (todo el bloque), asistente de radios/recomendaciones, botón "Solicitar cotización" de la barra.
Añadir, en este orden:
1. Barra: mostrar + `html.has-bar` si hay número (§3.2).
2. `Quiero que me asesoren` sin WhatsApp → marcar `No estoy seguro` (§4.3).
3. Galería: leer `window.INSTALACIONES` con `Array.isArray` (si no existe → Estado A), validar, renderizar, filtros, paginación, error de imagen, `[data-si-galeria]` (§4.5).
4. Visor (§4.5).
Presupuesto: `main.js` ≤ 12 KB sin minificar; `instalaciones.js` vacío ≤ 2 KB.

---

## 7. Accesibilidad (WCAG 2.2 AA) — específico de esta spec

- Contrastes solo de sistema §2.2; ningún texto sobre fotos.
- Foco visible en: tarjetas de necesidad (anillo en la tarjeta entera), enlaces del panel del hero, filtros, teselas (`outline-offset: 4px`), botones del visor (amber-400 sobre navy).
- `:target` no es el único indicador de llegada: el H3 de la tarjeta queda bajo el header gracias a `scroll-padding-top`.
- Filtros: `<button aria-pressed>` en `role="group"` con `aria-label`; estado con color **y** icono check.
- Galería: región viva para filtros y "Ver más"; foco gestionado en "Ver más".
- Visor: `<dialog>` modal con `aria-labelledby`, foco inicial en `Cerrar`, `Esc`, flechas, foco devuelto; `alt` real en la imagen grande.
- Teselas: nombre accesible "Ampliar foto: {título} {tipo · lugar}"; `img alt=""` dentro del enlace.
- Encabezados: H1 (hero) · H2 sr-only (pilares) · H2 Le ayudamos a elegir > H3 ¿Qué le preocupa más? · H2 Nuestros sistemas > H3 ×6 + H3 ×3 (franja) · H2 Nuestros trabajos · H2 Así trabajamos > H3 ×5 · H2 Contacto > H3 Solicitar cotización.
- Objetivos ≥ 44×44 (incluye `Cotizar` compacto, filtros, botones del visor, enlaces del pie).
- Reflow a 320 px; zoom 200 %; `prefers-reduced-motion` (sin fundido de fotos ni `translateY`).

---

## 8. Rendimiento

| Métrica | Meta |
|---|---|
| Peso sin fotos (HTML+CSS+2 JS+favicon) | ≤ 35 KB gzip / ≤ 120 KB sin comprimir |
| Peticiones al cargar (sin fotos) | ≤ 5; 0 a terceros |
| Fotos | Ninguna en el primer pantallazo; todas `lazy`; ≤ 8 en el primer bloque de galería; ≤ 200 KB cada una |
| Lighthouse móvil | Rendimiento ≥ 95 · Accesibilidad ≥ 95 · Buenas prácticas ≥ 95 · SEO ≥ 90 (con 0 y con 12 fotos de prueba) |
| LCP / CLS | ≤ 2,0 s / ≤ 0,05 (las teselas reservan caja por `aspect-ratio`) |

---

## 9. Checklist de aceptación

"M360" = 360×640 · "T768" = 768×1024 · "E1280" = 1280×800. Las pruebas con fotos se hacen con imágenes locales **no commiteadas** (y `INSTALACIONES` se restaura a `[]`).

**A. Archivos**
- [ ] A1. Existen `js/instalaciones.js` (contenido literal §5.1) y `assets/instalaciones/.gitkeep`; no hay fotos commiteadas.
- [ ] A2. `instalaciones.js` se carga antes que `main.js`, ambos `defer`. Sin librerías, CDNs ni fuentes web.
- [ ] A3. No queda CSS ni JS de componentes retirados (buscar `menu-toggle`, `route`, `choice`, `reco`, `badge`, `slot`, `i-menu`, `z-menu`).
- [ ] A4. `:root` contiene los tokens de sistema v2.0 §2.10 con esos valores exactos.
- [ ] A5. HTML válido en el validador W3C.

**B. Navegación**
- [ ] B1. M360/T768: header = logo + `Cotizar`; no hay botón de menú ni nav visible.
- [ ] B2. E1280: nav con `Sistemas` y `Cómo trabajamos` (+ `Trabajos` solo con fotos), WhatsApp solo con número, `Cotizar`.
- [ ] B3. Con `CONFIG` vacío no existe barra inferior y el body no reserva espacio abajo; con `whatsapp` y/o `telefono` aparece con los botones correspondientes a partes iguales y `html.has-bar`.
- [ ] B4. La barra se oculta con foco en el formulario y nunca tapa el pie.
- [ ] B5. Pie: enlaces `Sistemas · (Trabajos) · Cómo trabajamos · Contacto` funcionando.

**C. Hero y rutas**
- [ ] C1. M360 sin scroll: H1, subtítulo, `Solicitar cotización`, `No sé qué necesito`, `Asesoría sin compromiso.` visibles completos (probar con y sin barra).
- [ ] C2. Hero con fondo blue-50 y H1 navy; `No sé qué necesito` es `.btn--secondary`.
- [ ] C3. Panel de sistemas: oculto en M; T 2×3; E columna derecha 1×6; cada enlace lleva a su tarjeta y ésta muestra el estado `:target`.
- [ ] C4. Pilares: tarjeta a caballo entre hero y blanco; 1/2×2/4 columnas; H2 "Por qué elegir Seproseg" solo para lectores de pantalla.

**D. Le ayudamos a elegir y sistemas**
- [ ] D1. 4 tarjetas de necesidad con copy literal; cada una es un único enlace al sistema indicado; 1/2×2/4 columnas.
- [ ] D2. `Quiero que me asesoren`: con WhatsApp abre wa.me con el mensaje de asesoría; sin WhatsApp lleva a `#cotizar` con `No estoy seguro` marcado.
- [ ] D3. 6 tarjetas de sistema con contenido de 001 §4.3, icono y H3 en la misma fila; `Cotizar este sistema` marca el producto.
- [ ] D4. Franja oscura con el texto de escalabilidad y los 3 ítems de espacio; sin chips ni enlaces.

**E. Galería**
- [ ] E1. `INSTALACIONES = []`: se ve la tarjeta vacía con mosaico, texto y botón a Facebook (pestaña nueva); no se ven intro, filtros, retícula, "Ver más", ni enlaces `Trabajos`.
- [ ] E2. Borrar `js/instalaciones.js` o introducir un error de sintaxis: el resto del sitio funciona y la galería muestra el Estado A.
- [ ] E3. 1 foto: una tesela de máx. 36rem; aparecen intro, enlace inferior a Facebook y enlaces `Trabajos`. 2 fotos: 2 columnas. 3 fotos: 2/3/3 columnas.
- [ ] E4. 12 fotos: 2/3/4 columnas en M/T/E; se ven 8; `Ver más trabajos` añade 4, mueve el foco a la 9.ª y desaparece.
- [ ] E5. Teselas 4:3 alineadas con fotos verticales y horizontales mezcladas; pie de foto debajo con título y "Tipo · lugar"; sin texto sobre la imagen.
- [ ] E6. Antes de cargar, cada tesela muestra fondo blue-50 con icono; CLS ≤ 0,05.
- [ ] E7. Entrada con archivo inexistente: desaparece sin hueco y hay `console.warn`. Entradas sin `titulo` o con `tipo` inválido se descartan.
- [ ] E8. Filtros: ausentes con < 6 fotos o un solo grupo; con 6+ fotos de 2+ grupos aparecen solo los grupos con fotos; `aria-pressed` exclusivo; se anuncia "Mostrando {n} trabajos: …".
- [ ] E9. Ningún dato de la lista se inserta con `innerHTML` (probar un `titulo` con `<b>x</b>`: se ve como texto).

**F. Visor**
- [ ] F1. Clic/Enter en una tesela abre el `<dialog>` modal con la foto completa (sin recorte), contador, título, meta; foco en `Cerrar`.
- [ ] F2. `Anterior`/`Siguiente` y `←`/`→` recorren la lista filtrada completa (incluidas no visibles) de forma circular; con 1 foto no aparecen.
- [ ] F3. `Esc`, `Cerrar` y clic en el fondo cierran; el foco vuelve a la tesela.
- [ ] F4. `Cotizar algo similar` cierra, marca el tipo de espacio y los sistemas de la foto, y deja el foco en "Solicitar cotización" del formulario.
- [ ] F5. M360: visor a pantalla completa, botones ≥ 44 px, imagen ≤ 65vh; E1280: ventana ≤ 64rem.
- [ ] F6. La imagen grande tiene `alt` (= `alt` o `titulo`).

**G. Contacto**
- [ ] G1. "Qué incluye trabajar con Seproseg" en la columna de información; con `CONFIG` vacío solo muestra `Configuración y capacitación de uso`.
- [ ] G2. Párrafo bajo el H3 del formulario con el texto literal de §4.8.
- [ ] G3. Todo el checklist G de la spec 001 (validación, envío, confirmación) sigue cumpliéndose.

**H. Accesibilidad**
- [ ] H1. Recorrido con Tab completo: orden lógico, foco visible (azul en claro, ámbar en oscuro y en el visor), nunca tapado.
- [ ] H2. Jerarquía de encabezados exactamente como §7.
- [ ] H3. Objetivos ≥ 44×44 en todos los controles nuevos.
- [ ] H4. Sin scroll horizontal a 320 px ni con zoom 200 %.
- [ ] H5. `prefers-reduced-motion: reduce`: sin scroll suave, sin fundidos ni desplazamientos.
- [ ] H6. axe DevTools sin errores críticos/serios con 0 y con 12 fotos.

**I. Sin JS y revisión**
- [ ] I1. JS desactivado: todo el contenido legible, tarjetas de necesidad y enlaces funcionan, galería en Estado A, ningún pendiente visible.
- [ ] I2. `?revision=1`: se ven los pendientes de 001 y, con 0 fotos, el aviso de fotos pendientes.

**J. Responsive y rendimiento**
- [ ] J1. Capturas en M360, T768 y E1280, con 0 y con 12 fotos, coinciden con §4.
- [ ] J2. Metas de §8 (reportar cifras).
- [ ] J3. Copy: siguen valiendo C1–C4 de la spec 001; ningún texto nuevo fuera de los listados en esta spec.

---

## 10. Supuestos y preguntas abiertas

**Requieren validación de marca/usuario**
- **S0. Sin brief.** Esta spec nace de una petición directa del usuario; no hay `docs/marca/briefs/002-*`. Toca mensaje (copy nuevo, fusión de secciones), por lo que conviene que marca la revise o redacte un brief 002 que la respalde.
- **S1. Hero claro** en lugar de navy. La plataforma pide azul profundo como color dominante; aquí sigue siéndolo en titulares, franja, contacto y pie. Validar.
- **S2. Copy nuevo** (rótulos de interfaz y textos de galería): `Nuestros trabajos` · `Instalaciones reales realizadas por nuestro equipo.` · `Conozca instalaciones realizadas por nuestro equipo en nuestra página de Facebook.` · `Ver más trabajos` · `Todos` · `Hogar` · `Negocio e industria` · `Vehículos` · `Foto {i} de {n}` · `Cerrar` · `Anterior` · `Siguiente` · `Cotizar algo similar` · `Ampliar foto:` · `Mostrando {n} trabajos…` · `Se agregaron {k} trabajos.` · `Filtrar trabajos por tipo de espacio` · nav `Sistemas` / `Trabajos` · H3 `¿Qué le preocupa más?` (antes era `legend`) · `Le recomendamos:` como prefijo de cada tarjeta.
- **S3. Se elimina la pregunta "¿Qué quiere proteger? Casa · Negocio · Industria · Vehículo"** del asistente (el brief la incluía). El tipo de espacio se sigue pidiendo en el formulario y lo comunica la franja de escalabilidad. El mensaje de WhatsApp de asesoría pierde las extensiones "Quiero proteger / Me preocupa". Validar que la simplificación compensa.
- **S4. Títulos visibles retirados**: "Una solución para cada espacio", "¿Por dónde quiere empezar?", "Compare y cotice" y la intro "Los mismos sistemas se adaptan…" ya no aparecen; "Por qué elegir Seproseg" queda solo para lectores de pantalla. Todo el resto del copy aprobado se conserva.
- **S5. Enlaces del pie** cambian de `Soluciones · Productos · Contacto` a `Sistemas · Trabajos · Cómo trabajamos · Contacto`.
- **S6.** Se mantienen S1–S10 de la spec 001 (paleta provisional, formulario vía WhatsApp, texto de confirmación, incoherencia de pasos 2/5 vs. ítems con `*`, etc.).

**Preguntas para el cliente**
1. ¿Tienen ya fotos de instalaciones? ¿Cuentan con autorización de sus clientes para publicarlas? ¿Se puede indicar ciudad/distrito?
2. ¿Quién subirá las fotos en el futuro (ustedes o el desarrollador)? Si es el cliente, valorar en otra spec una guía visual o un panel; hoy basta con la carpeta y la lista.
3. ¿Hay fotos de proyectos industriales/comerciales? Sin ellas, la galería no podrá demostrar la escala (los filtros se activan solo con 2+ tipos).
4. Pendientes de 001 que bloquean publicación: número de WhatsApp/teléfono (sin ellos no hay barra inferior ni envío del formulario).

**Opciones futuras (no implementar ahora)**
- Con ≥ 4 fotos, sustituir en T/E el panel de sistemas del hero por un mosaico de 2×2 fotos que lleve a `#trabajos` (requiere revisar LCP).
- Imagen Open Graph a partir de una foto real (mejora mucho la vista previa en Facebook).
