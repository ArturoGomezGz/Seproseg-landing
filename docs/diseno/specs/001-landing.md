# Spec 001 — Landing page principal de Seproseg

> Brief: `docs/marca/briefs/001-landing.md` · Marca: `docs/marca/plataforma.md` · Sistema: `docs/diseno/sistema.md`
> Versión 1.0 — 2026-10-15. Responsable: experto UI/UX. Destinatario: desarrollador.
> **Regla de oro para el desarrollador**: el copy entre comillas o en bloques de esta spec es **literal**. No se agrega, quita ni "mejora" texto. Si algo falta, deje `<!-- TODO: ... -->` y repórtelo.

---

## 0. Antes de empezar: archivo `index.html` actual

El `index.html` actual contiene **una única línea de texto de prueba ofensiva, ajena a la marca**. **No se edita: se reemplaza el archivo completo** por la nueva página. Verificación: tras el cambio, ninguna línea del archivo antiguo puede existir en el nuevo (ver checklist A1).

> Nota para la sesión principal/usuario: esa línea seguirá existiendo en el historial de git. Si el repositorio es o será público, valorar si se desea reescribir el historial (decisión fuera del alcance de diseño).

---

## 1. Decisiones principales y justificación

| # | Decisión | Por qué (brief / plataforma) |
|---|---|---|
| D1 | Se mantiene el **orden de secciones del brief** (0→9). | El hero ya bifurca (criterio 3): P3/P4 saltan a cotizar con "Solicitar cotización"; P1/P2 saltan a "Le ayudamos a elegir" con "No sé qué necesito". El resto del orden lleva al explorador de "qué espacio" → "qué sistemas" → "por dónde empiezo" → "cómo trabajan" → "por qué confiar" → contacto. |
| D2 | **Hero sin imagen** en móvil; panel de iconos de los 6 sistemas a partir de 600 px. | Criterio 1 (todo lo esencial sin scroll en móvil) y rendimiento. No hay fotos reales aún y la marca prohíbe stock genérico. El panel comunica "integral" sin peso. |
| D3 | **Header sticky** + **barra de contacto fija inferior** en < 1024 px. | Criterio 2: contacto inmediato desde cualquier punto. El header mantiene "Cotizar" y el menú siempre a mano. |
| D4 | **El botón de WhatsApp es ámbar (primario)**, no verde. | Plataforma §7: un único acento cálido para acciones. Icono + texto "WhatsApp" bastan para reconocerlo. |
| D5 | **Formulario → WhatsApp**: el formulario construye un mensaje y abre `https://wa.me/<número>?text=<mensaje>`. Respaldo: `mailto:` si solo hay correo configurado. | Brief: sitio estático sin backend, WhatsApp canal preferente supuesto. Cero dependencias y cero servicios de terceros. |
| D6 | **"Cotizar este sistema" lleva al formulario con el producto ya marcado** (no directo a WhatsApp). | Brief permite ambas; así se capturan tipo de espacio y ciudad (útil para P3/P4 y para medir hogar vs. negocio). El formulario igualmente termina en WhatsApp. |
| D7 | **Asistente "Le ayudamos a elegir" = 2 grupos de radios + lista de recomendaciones siempre visible**, que se resalta según la elección. | Sin dependencias; funciona sin JS (la lista es contenido aprobado). Con JS, personaliza el mensaje de WhatsApp de "Quiero que me asesoren". |
| D8 | **Una única zona de configuración** (`CONFIG` al inicio de `js/main.js`). Todo dato `[[PENDIENTE]]` vive allí; el HTML lo marca con `hidden` + atributos `data-*`. | Pedido explícito; el cliente/desarrollador edita un solo lugar; nada inventado aparece por defecto. |
| D9 | **Modo revisión** con `?revision=1` en la URL: muestra todos los bloques pendientes marcados. | Brief criterio 6: "ocultos o claramente marcados en la versión de revisión". Permite al cliente ver qué falta sin tocar código. |
| D10 | Textos sujetos a confirmación de funcionalidad usan la **versión segura** (alarma sin "le notifican"; control de acceso sin "registro de entradas y salidas"). La versión ampliada queda en comentario HTML. | Brief §3 notas y plataforma §8 (no prometer lo no confirmado). |
| D11 | Testimonios, logos de clientes, marcas/certificaciones y galería **no se construyen** ahora: solo un hueco marcado (visible en modo revisión). | No hay datos; construir estructura vacía es coste sin valor. Se especificarán cuando lleguen. |
| D12 | Sin fuentes web, sin imágenes rasterizadas, iconos Lucide en sprite SVG inline. | CLAUDE.md y brief: estático, ligero, sin dependencias. |

---

## 2. Estructura de archivos

```
/index.html          ← reemplaza por completo el actual
/css/styles.css      ← un solo archivo, móvil primero, tokens de sistema.md en :root
/js/main.js          ← un solo archivo, sin módulos ni librerías; CONFIG al inicio
/favicon.svg         ← ver §2.2
```

- Sin build, sin npm, sin CDN, sin fuentes externas. Rutas relativas (`css/styles.css`, `js/main.js`, `favicon.svg`) para que funcione en cualquier hosting estático o abriendo el archivo.
- `<link rel="stylesheet" href="css/styles.css">` en `<head>`; `<script src="js/main.js" defer></script>` en `<head>`.
- Sin estilos ni scripts inline (salvo el sprite SVG y los atributos `data-*`).

### 2.1 `<head>` (SEO básico, meta y Open Graph)

Literal, en este orden:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Seproseg | Seguridad integral para su hogar, negocio y vehículos</title>
  <meta name="description" content="Cámaras CCTV, alarmas, cercos electrificados, control de acceso y GPS vehicular, a la medida de su hogar, negocio o industria. Asesoría sin compromiso.">
  <meta name="theme-color" content="#0B2545">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <!-- [[PENDIENTE: dominio]] <link rel="canonical" href="https://DOMINIO/"> -->

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Seproseg">
  <meta property="og:locale" content="es_LA">
  <meta property="og:title" content="Seproseg | Seguridad integral para su hogar, negocio y vehículos">
  <meta property="og:description" content="Cámaras CCTV, alarmas, cercos electrificados, control de acceso y GPS vehicular, a la medida de su hogar, negocio o industria. Asesoría sin compromiso.">
  <!-- [[PENDIENTE: dominio]] <meta property="og:url" content="https://DOMINIO/"> -->
  <!-- [[PENDIENTE: imagen 1200x630 JPG/PNG con logo o foto real]] <meta property="og:image" content="https://DOMINIO/img/og.jpg"> -->
  <meta name="twitter:card" content="summary">

  <link rel="stylesheet" href="css/styles.css">
  <script src="js/main.js" defer></script>
</head>
```

- No usar `maximum-scale` ni `user-scalable`.
- No se añade JSON-LD (`LocalBusiness`) hasta tener dirección/teléfono confirmados.

### 2.2 `favicon.svg`

Cuadrado 32×32 con radio 6, fondo `#0B2545`, y la letra "S" centrada en `#F59E0B`, `font-family: system-ui, sans-serif`, `font-weight: 800`, `font-size: 22`. Es provisional hasta tener logo `[[PENDIENTE: logo oficial]]`.

### 2.3 Esqueleto del `<body>` (orden del DOM = orden visual)

```
a.skip-link  "Saltar al contenido" → #contenido
svg (sprite de iconos, oculto: position:absolute; width:0; height:0; aria-hidden="true")
header.site-header
  a.logo "Seproseg" → #inicio
  nav[aria-label="Principal"] #menu
  [botones de header]
main#contenido
  section#inicio          (1. Hero)               .is-dark
  section#soluciones      (2. Soluciones por espacio)
  section#productos       (3. Productos)           fondo surface-alt
  section#empezar         (4. Doble ruta)
  section#proceso         (5. Cómo trabajamos)     fondo surface-alt
  section#confianza       (6. Por qué elegir)
  section#preguntas       (7. FAQ) [hidden]        fondo surface-alt
  section#contacto        (8. Contacto)            .is-dark (navy-800)
footer.site-footer        (9. Pie)                 .is-dark (navy-900)
div.contact-bar           (barra móvil)            .is-dark (navy-800)
```

Cada `<section>` lleva `aria-labelledby` apuntando al `id` de su H2 y contiene un `div.container` (ancho máx. `--container`, padding lateral `--gutter`).

---

## 3. Zona de configuración y datos pendientes

### 3.1 Objeto `CONFIG` (primeras líneas de `js/main.js`)

Literal (valores vacíos = no confirmado = oculto):

```js
/* ===== CONFIGURACIÓN SEPROSEG — único lugar para editar datos del negocio =====
   Deje "" o false lo que no esté confirmado por el cliente: el elemento no se mostrará.
   Vista de revisión (muestra lo pendiente marcado): agregar ?revision=1 a la URL. */
const CONFIG = {
  whatsapp: "",        // Solo dígitos con código de país, sin + ni espacios. Ej.: "5190000000" [[PENDIENTE]]
  telefono: "",        // Formato internacional para el enlace tel:. Ej.: "+5190000000" [[PENDIENTE]]
  telefonoVisible: "", // Como se muestra al público. Ej.: "900 000 000" [[PENDIENTE]]
  correo: "",          // [[PENDIENTE]]
  direccion: "",       // [[PENDIENTE]]
  horario: "",         // [[PENDIENTE]]
  cobertura: "",       // Ciudades/regiones. Se muestra como "Atendemos en {cobertura}." [[PENDIENTE]]
  trayectoria: "",     // Frase ya aprobada por marca, p. ej. años/proyectos. [[PENDIENTE]]
  garantia: "",        // Alcance y plazo, frase aprobada por marca. [[PENDIENTE]]
  confirmado: {        // Ítems de "Qué incluye trabajar con Seproseg" marcados con * en el brief
    evaluacion: false,  // Evaluación de su espacio antes de cotizar
    instalacion: false, // Instalación por técnicos especializados
    soporte: false      // Soporte después de la instalación
  },
  procesoVisita: "",   // Frase para el paso 2 (p. ej. sobre visita técnica). Aprobada por marca. [[PENDIENTE]]
  procesoSoporte: "",  // Frase para el paso 5 (alcance del soporte). Aprobada por marca. [[PENDIENTE]]
  faq: {               // Respuestas confirmadas. "" = pregunta oculta. Si todas vacías/false, se oculta la sección.
    visitas: "",
    garantia: "",
    ampliar: false,    // true = mostrar la respuesta ya redactada en el HTML (pendiente de confirmar)
    zona: "",
    pagos: ""
  },
  privacidadUrl: "",   // URL de política de privacidad [[PENDIENTE]]
  razonSocial: ""      // Razón social / identificador fiscal para el pie [[PENDIENTE]]
};
```

### 3.2 Convención en el HTML (dos atributos genéricos + uno de revisión)

| Atributo | Efecto (lo aplica `main.js` al cargar) |
|---|---|
| `data-mostrar-si="clave"` | Si `CONFIG[clave]` (admite ruta con punto: `confirmado.soporte`, `faq.zona`) es verdadero/no vacío, se quita `hidden`. Si no, sigue oculto. |
| `data-texto="clave"` | Se reemplaza `textContent` por el valor de `CONFIG[clave]` (solo si no está vacío). |
| `data-pendiente="Descripción"` | Marca el elemento como pendiente. Solo se usa en modo revisión (etiqueta "Pendiente: Descripción", estilo de sistema §4.10). |

- Todo elemento con `data-mostrar-si` **lleva `hidden` en el HTML** (si no hay JS, no aparece nada no confirmado).
- Dentro de los elementos con `data-texto` se escribe el marcador `[[PENDIENTE: ...]]` como contenido por defecto (solo se ve en modo revisión).
- **Modo revisión**: si la URL contiene `revision=1`, `main.js` quita `hidden` a todo `[data-pendiente]` y le añade la clase `.is-pendiente`. Por defecto está desactivado; no hay forma de activarlo desde la interfaz.

### 3.3 Enlaces de contacto generados

| Atributo | Comportamiento |
|---|---|
| `data-wa="general"` · `"asesoria"` · `"formulario"` | Si hay `CONFIG.whatsapp`: `href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(mensaje)`, `target="_blank"`, `rel="noopener noreferrer"`, y se quita `hidden`. Si no hay número, el elemento queda oculto (o, si no lleva `hidden`, conserva su `href="#contacto"`). |
| `data-tel` | Si hay `CONFIG.telefono`: `href = "tel:" + telefono` y se quita `hidden`. |
| `data-correo` | Si hay `CONFIG.correo`: `href = "mailto:" + correo`, texto = correo, se quita `hidden`. |

Mensajes literales (del brief):
- general: `Hola Seproseg, quisiera una cotización.`
- asesoria: `Hola Seproseg, no sé qué sistema necesito y quisiera asesoría.` + extensiones del §4.5.

---

## 4. Secciones (copy literal + layout)

Notación de layout: **M** = móvil (< 600), **T** = tablet (600–1023), **E** = escritorio (≥ 1024).

### 4.0 Encabezado / navegación (`header.site-header`)

**Contenido**
- Logo provisional: texto `Seproseg` (enlace a `#inicio`). `<!-- [[PENDIENTE: logo oficial]] reemplazar por <img> SVG con alt="Seproseg" -->`
- Navegación (`nav#menu`, `aria-label="Principal"`), enlaces en este orden:
  - `Soluciones` → `#soluciones`
  - `Productos` → `#productos`
  - `Cómo trabajamos` → `#proceso`
  - `Contacto` → `#contacto`
- Botón primario: `Cotizar` → `#contacto`
- Solo E: enlace `WhatsApp` (icono `i-whatsapp` + texto) con `data-wa="general"` y `hidden`.

**Layout**
- **M/T**: fila de 56 px: logo (izq.) · espacio · `Cotizar` (primario compacto, 44 px de alto) · botón menú 44×44 (icono `i-menu`, texto `.sr-only` "Abrir menú"). El `nav` está oculto hasta abrir el menú; se despliega bajo el header, ancho completo, enlaces apilados de 48 px. En el panel **no** se repite "Cotizar".
- **E**: fila de 72 px: logo · nav horizontal (centro-derecha) · `WhatsApp` (si existe) · `Cotizar`. Botón menú oculto (`display:none`), `nav` siempre visible.

**Interacción del menú (JS)**
- Botón: `<button type="button" aria-expanded="false" aria-controls="menu">`. Al pulsar alterna `aria-expanded`, el texto accesible ("Abrir menú" ↔ "Cerrar menú") y el icono (`i-menu` ↔ `i-cerrar`).
- Se cierra al: pulsar un enlace del menú, pulsar `Escape` (y el foco vuelve al botón), o pasar a E por redimensionado.
- Sin JS: en M/T el `nav` debe ser visible como lista bajo el header (el ocultamiento solo se aplica cuando JS añade la clase `js` al `<html>`).

### 4.1 Hero (`section#inicio`, `.is-dark`)

**Copy literal**
- H1: `Seguridad integral para su hogar, negocio y vehículos`
- Subtítulo (`p`, `--fs-lead`, on-dark-muted): `Cámaras, alarmas, cercos electrificados, control de acceso y GPS, diseñados a la medida de su espacio. De una vivienda a una industria.`
- CTA principal (`.btn--primary`): `Solicitar cotización` → `#contacto` (`data-evento="hero-cotizar"`)
- CTA secundario (`.btn--ghost`): `No sé qué necesito` + icono `i-flecha` (a la derecha, `aria-hidden`) → `#elegir` (`data-evento="hero-no-se"`)
- Microtexto (`--fs-small`, on-dark-muted): `Asesoría sin compromiso.`
- Panel de sistemas (solo T/E): lista `<ul>` de 6 ítems, cada uno icono + nombre:
  `Cámaras CCTV` · `Alarma contra intrusión` · `Cercos electrificados` · `Automatización de cocheras y accesos` · `Control de acceso` · `GPS vehicular`

**Estilo**: fondo `linear-gradient(160deg, var(--c-navy-900) 0%, var(--c-navy-800) 100%)`. H1 blanco. Sin imágenes, sin patrones.

**Layout**
- **M**: padding superior `--sp-6`, inferior `--sp-7`. Orden: H1 → subtítulo (`margin-top: --sp-3`) → CTAs apilados a ancho completo (`margin-top: --sp-5`, gap `--sp-3`) → microtexto (`margin-top: --sp-3`). Panel de sistemas `display:none`.
  - **Requisito duro**: en 360×640 (área útil ≈ 360×560 con la barra del navegador), H1, subtítulo, ambos CTA y microtexto quedan **por encima** de la barra de contacto fija sin hacer scroll. Presupuesto aproximado: header 56 + 24 + H1 ~97 (3 líneas) + 12 + subtítulo ~120 + 20 + CTAs 108 + 32 ≈ 470 px < 496 px disponibles. No añadir nada encima del H1.
- **T**: padding `--sp-8` vertical. CTAs en fila (`width:auto`, gap `--sp-3`). Panel de sistemas debajo (`margin-top: --sp-6`) en retícula de 3 columnas × 2 filas.
- **E**: retícula de 12 columnas: texto en columnas 1–7, panel en 8–12, alineados al centro vertical. Panel en retícula 2 × 3. Padding vertical `--sp-9`.
- Panel: fondo `rgba(255,255,255,0.06)`, borde 1px `rgba(255,255,255,0.12)`, `--r-lg`, padding `--sp-5`. Cada ítem: contenedor de icono 40×40 (`rgba(255,255,255,0.08)`, icono amber-500 24 px) + nombre `--fs-small` 600 blanco.

### 4.2 Soluciones por tipo de espacio (`section#soluciones`)

**Copy literal**
- H2: `Una solución para cada espacio`
- Intro: `Los mismos sistemas se adaptan a lo que usted necesita proteger, sin importar el tamaño.`

Tres `.card--space` (H3 cada una):

1. Icono `i-hogar` · H3 `Para su hogar`
   - Texto: `Vea lo que pasa en casa desde su celular, reciba un aviso si alguien intenta entrar y abra la cochera sin bajar del auto.`
   - Etiqueta `Incluye:` + chips: `Cámaras CCTV` · `Alarma contra intrusión` · `Cercos electrificados` · `Automatización de cochera` · `Control de acceso`
   - Enlace: `Ver soluciones para el hogar` → `#productos`
2. Icono `i-negocio` · H3 `Para su negocio o industria`
   - Texto: `Proteja su perímetro, controle quién entra a cada área y supervise varias sedes o puntos desde un solo lugar.`
   - `Incluye:` chips: `CCTV multi-cámara` · `Alarmas por zonas` · `Cercos perimetrales` · `Accesos vehiculares` · `Control de acceso de personal` · `GPS para flotas`
   - Enlace: `Ver soluciones para negocios` → `#productos`
3. Icono `i-vehiculo` · H3 `Para sus vehículos`
   - Texto: `Sepa dónde está su vehículo o su flota en todo momento, desde su celular.`
   - `Incluye:` chip: `GPS vehicular`
   - Enlace: `Ver GPS vehicular` → `#gps`

**Franja de escalabilidad** (debajo de las tarjetas, `div.scale-band.is-dark`, fondo navy-900, `--r-lg`, padding `--sp-5` M / `--sp-6` T / `--sp-7` E):
- Ilustración decorativa (`aria-hidden="true"`): iconos `i-hogar` → `i-negocio` → `i-industria`, 32 px, amber-500, unidos por una línea horizontal de 2 px `rgba(255,255,255,0.3)` con `i-flecha` entre ellos.
- Texto: `<p><strong>Del hogar a la industria, el mismo respaldo.</strong> Lo que protege una vivienda se amplía a un almacén o una planta, y los sistemas se integran entre sí: cámaras, alarmas, accesos y GPS trabajando juntos.</p>` (strong en blanco 700 `--fs-h3`, en línea propia con `display:block`; resto `--fs-body` on-dark-muted).

**Layout**
- **M**: tarjetas en 1 columna, gap `--sp-4`. Franja: ilustración centrada arriba, texto debajo; `margin-top: --sp-6`.
- **T**: tarjetas en 2 columnas; la tercera (Vehículos) ocupa las 2 columnas (`grid-column: 1 / -1`) con el mismo contenido. Franja igual que M, texto a la izquierda.
- **E**: 3 columnas iguales. Franja en 2 columnas: ilustración (columnas 1–4) + texto (5–12), centrado vertical.

**Supuesto S4**: los enlaces "Ver soluciones para el hogar/negocios" van ambos a `#productos` (no hay páginas por sector; fuera de alcance).

### 4.3 Productos destacados (`section#productos`, fondo surface-alt)

**Copy literal**
- H2: `Nuestros sistemas`
- Intro: `Elija uno o combínelos. Le recomendamos la configuración ideal para su espacio.`

Seis `.card--product`, cada una `<article id="...">` con: icono · H3 nombre · beneficio · descripción · `Ideal para:` · botón.
El botón es `<a class="btn btn--secondary" href="#cotizar" data-producto="{valor}">Cotizar este sistema<span class="sr-only">: {nombre corto}</span></a>`.

| id | Icono | H3 | Beneficio | Descripción | Ideal para | `data-producto` |
|---|---|---|---|---|---|---|
| `cctv` | `i-cctv` | `Cámaras CCTV` | `Vea lo que pasa, en vivo y en grabación, desde su celular.` | `Instalamos cámaras para interiores y exteriores con grabación y acceso remoto. Usted decide qué zonas vigilar.` | `viviendas, comercios, almacenes e industrias.` | `Cámaras CCTV` |
| `alarma` | `i-alarma` | `Alarma contra intrusión` | `Aviso inmediato si alguien entra sin permiso.` | `Sensores en puertas, ventanas y ambientes que activan la alarma ante una intrusión. Se configuran por zonas según su espacio.` | `casas, oficinas, locales y plantas.` | `Alarma contra intrusión` |
| `cercos` | `i-cerco` | `Cercos electrificados` | `Un perímetro que disuade antes de que intenten entrar.` | `Protección para muros y cercos perimetrales, instalada de forma profesional y conforme a la normativa vigente. Puede conectarse a su alarma.` | `viviendas, condominios, terrenos e industrias.` | `Cercos electrificados` |
| `accesos-vehiculares` | `i-cochera` | `Automatización de cocheras y accesos vehiculares` | `Abra y cierre sin bajar de su vehículo.` | `Motores para portones corredizos y levadizos, con control remoto y opciones de acceso para residentes, personal o visitantes.` | `cocheras, condominios, estacionamientos y patios de maniobra.` | `Automatización de cocheras y accesos` |
| `control-acceso` | `i-acceso` | `Control de acceso con tag, huella o código` | `Decida quién entra, por dónde y cuándo.` | `Acceso con tarjeta o llavero (tag), huella digital o código numérico.` | `edificios, oficinas, áreas restringidas y personal.` | `Control de acceso` |
| `gps` | `i-gps` | `GPS vehicular` | `Ubique su vehículo en tiempo real.` | `Rastreo desde su celular para autos particulares y flotas de trabajo.` | `vehículos particulares, flotas de reparto y transporte.` | `GPS vehicular` |

- "Ideal para:" se maqueta como `<p class="ideal"><strong>Ideal para:</strong> viviendas, comercios…</p>`.
- Comentarios HTML obligatorios (texto alternativo pendiente de confirmar, **no** visibles):
  - En `#alarma`: `<!-- [[PENDIENTE: ¿notifica al celular/central?]] Si se confirma, descripción: "Sensores en puertas, ventanas y ambientes que activan la alarma y le notifican. Se configuran por zonas según su espacio." -->`
  - En `#control-acceso`: `<!-- [[PENDIENTE: ¿registra entradas y salidas?]] Si se confirma, descripción: "Acceso con tarjeta o llavero (tag), huella digital o código numérico, con registro de entradas y salidas." -->`
  - En `#accesos-vehiculares`: `<!-- [[PENDIENTE: confirmar tipos de portón que atienden]] -->`
  - En `#gps`: `<!-- [[PENDIENTE: funciones extra (historial de rutas, alertas, apagado remoto) y suscripción]] -->`

**Layout**
- **M**: 1 columna, gap `--sp-4`; botón a ancho completo.
- **T**: 2 columnas (3 filas), gap `--sp-5`; botón `width:auto`, alineado a la izquierda.
- **E**: 3 columnas (2 filas), gap `--sp-6`. Las tarjetas de una fila tienen la misma altura (grid `align-items: stretch`; botón con `margin-top:auto`).

**Interacción "Cotizar este sistema" (JS)**: al hacer clic, marcar el checkbox del formulario cuyo `value` = `data-producto` (sin desmarcar otros) y dejar que el ancla navegue a `#cotizar` (H3 del formulario). Sin JS: solo navega.

### 4.4 Doble ruta (`section#empezar`)

**Copy literal**
- H2: `¿Por dónde quiere empezar?`

Dos paneles (`div.route`), cada uno con su H3:

**Ruta A** (`div.route.route--a#elegir`, fondo blue-50, `--r-lg`, padding `--sp-5`/`--sp-6`; `#elegir` es el destino del CTA secundario del hero)
- H3: `Le ayudamos a elegir`
- Texto: `Cuéntenos qué quiere proteger y le recomendamos el sistema adecuado. Sin tecnicismos y sin compromiso.`
- `fieldset` 1 — `legend`: `¿Qué quiere proteger?` — radios `name="proteger"` (píldoras `.choice`): `Casa` · `Negocio` · `Industria` · `Vehículo`
- `fieldset` 2 — `legend`: `¿Qué le preocupa más?` — radios `name="preocupa"`: `Que entren sin permiso` · `Ver lo que pasa` · `Controlar quién entra` · `Saber dónde está mi vehículo`
- Subtítulo (`p`, 600 navy-900): `Le recomendamos:` *(rótulo de interfaz, ver supuesto S6)*
- Lista `<ul class="reco">` siempre visible; cada `li` con `data-preocupa` igual al valor del radio:
  - `<strong>Que entren sin permiso</strong> → Alarma contra intrusión + cercos electrificados`
  - `<strong>Ver lo que pasa</strong> → Cámaras CCTV`
  - `<strong>Controlar quién entra</strong> → Control de acceso + automatización de accesos`
  - `<strong>Saber dónde está mi vehículo</strong> → GPS vehicular`
  (La flecha "→" va en `<span aria-hidden="true">→</span>` seguida de `<span class="sr-only">recomendación:</span>`.)
- Región viva `.sr-only` con `aria-live="polite"` (vacía al inicio).
- CTA (`.btn--primary`): `Quiero que me asesoren` → `href="#cotizar"` por defecto; `data-wa="asesoria"` (sin `hidden`: si no hay número, conserva el ancla). `data-evento="asesoria"`.
- Microtexto (`--fs-small` muted): `La recomendación final la hace nuestro equipo según su espacio.`

**Ruta B** (`div.route.route--b`, fondo blanco, borde 1px `--c-border`, `--r-lg`, mismo padding)
- H3: `Compare y cotice`
- Texto: `Indíquenos el sistema que busca y las características de su espacio. Le enviamos una cotización clara, con lo que incluye.`
- Rótulo (`p`, 600 navy-900): `Qué incluye trabajar con Seproseg`
- Lista con icono `i-check` (blue-700) por ítem:
  - `Evaluación de su espacio antes de cotizar` — `hidden data-mostrar-si="confirmado.evaluacion" data-pendiente="Confirmar evaluación antes de cotizar"`
  - `Instalación por técnicos especializados` — `hidden data-mostrar-si="confirmado.instalacion" data-pendiente="Confirmar instalación por técnicos especializados"`
  - `Configuración y capacitación de uso` — **visible siempre**
  - `Soporte después de la instalación` — `hidden data-mostrar-si="confirmado.soporte" data-pendiente="Confirmar soporte posterior"`
  - `Garantía: <span data-texto="garantia">[[PENDIENTE: alcance y plazo]]</span>` — `hidden data-mostrar-si="garantia" data-pendiente="Alcance y plazo de la garantía"`
- CTA (`.btn--primary`): `Solicitar cotización` → `#cotizar` (`data-evento="ruta-b-cotizar"`)

**Layout**
- **M**: Ruta A arriba, Ruta B debajo, gap `--sp-5`. Píldoras en `flex-wrap` con gap `--sp-2`. CTAs a ancho completo.
- **T**: igual que M (los paneles a ancho completo leen mejor con las píldoras); CTAs `width:auto`.
- **E**: 2 columnas: A en 1–7, B en 8–12 (A es más ancha por el asistente). Alturas iguales; CTA de cada panel al pie (`margin-top:auto`).

**Interacción (JS, sin dependencias)**
1. Al cambiar `preocupa`: el `li` coincidente recibe la clase `.is-activa` (fondo blanco, borde izquierdo 4px amber-500, `--r-sm`, padding `--sp-2 --sp-3`, y un `<span class="badge">` visible `Recomendado` — *rótulo de interfaz, ver S6*); los demás pierden la clase (no se atenúan: mantienen su contraste). La región viva anuncia: `Recomendación: {texto del li sin la flecha}` (p. ej. "Recomendación: Ver lo que pasa, Cámaras CCTV").
2. Mensaje de WhatsApp de "Quiero que me asesoren" (se recalcula en cada cambio):
   `Hola Seproseg, no sé qué sistema necesito y quisiera asesoría.` + (si hay `proteger`) ` Quiero proteger: {Casa|Negocio|Industria|Vehículo}.` + (si hay `preocupa`) ` Me preocupa: {opción}.`
3. Si **no** hay WhatsApp configurado, al pulsar "Quiero que me asesoren": se marca en el formulario el tipo de espacio equivalente (Casa→`Hogar`, Negocio→`Negocio`, Industria→`Industria`, Vehículo→`Vehículo/flota`) y el checkbox `No estoy seguro`, y se navega a `#cotizar`.
4. Sin JS: radios seleccionables, lista visible, CTA lleva al formulario.

### 4.5 Así trabajamos (`section#proceso`, fondo surface-alt)

**Copy literal**
- H2: `Así trabajamos`
- `<ol class="steps">` con 5 `.step` (el número lo genera la lista/CSS counter dentro del círculo; el `<ol>` conserva la semántica):
  1. H3 `Nos cuenta su necesidad` — `Por WhatsApp, llamada o formulario.`
  2. H3 `Evaluamos su espacio` — `Identificamos riesgos y puntos críticos.` + `<span data-mostrar-si="procesoVisita" data-texto="procesoVisita" data-pendiente="¿Visita técnica gratuita?" hidden>[[PENDIENTE: ¿visita técnica gratuita?]]</span>`
  3. H3 `Le proponemos una solución` — `Cotización clara, con lo que incluye.`
  4. H3 `Instalamos y configuramos` — `Le dejamos todo funcionando y le enseñamos a usarlo.`
  5. H3 `Le acompañamos` — `Soporte después de la instalación.` + `<span data-mostrar-si="procesoSoporte" data-texto="procesoSoporte" data-pendiente="Alcance del soporte" hidden>[[PENDIENTE: alcance]]</span>`

(Los `span` pendientes van precedidos de un espacio y se muestran en línea tras la frase.)

**Layout**
- **M/T**: lista vertical. Cada paso: círculo numerado (40 px) a la izquierda, texto a la derecha (grid `40px 1fr`, gap `--sp-4`). Línea vertical de 2px `--c-border` uniendo los círculos (pseudo-elemento, decorativa). Gap entre pasos `--sp-5`.
- **E**: 5 columnas iguales. Círculo arriba, texto debajo; línea horizontal de 2px `--c-border` uniendo los círculos a la altura de su centro.

### 4.6 Por qué elegir Seproseg (`section#confianza`)

**Copy literal**
- H2: `Por qué elegir Seproseg`
- Cuatro `.card--trust` (H3 + párrafo):
  - `i-integral` · `Integral` — `Un solo proveedor para cámaras, alarmas, cercos, accesos y GPS.`
  - `i-medida` · `A su medida` — `Diseñamos según su espacio y su riesgo real, no con paquetes cerrados.`
  - `i-escalable` · `Escalable` — `Del hogar a la industria, y sistemas que crecen con usted.`
  - `i-claridad` · `Claridad` — `Le explicamos cada opción en lenguaje simple.`
- Pendientes (todos `hidden`, en este orden, tras los 4 bloques):
  - `<p data-mostrar-si="trayectoria" data-texto="trayectoria" data-pendiente="Años de experiencia / proyectos realizados" hidden>[[PENDIENTE: años de experiencia / proyectos]]</p>` (estilo `--fs-lead` 600 navy-900)
  - `<p data-mostrar-si="cobertura" data-pendiente="Cobertura geográfica" hidden>Atendemos en <span data-texto="cobertura">[[PENDIENTE: ciudades/regiones]]</span>.</p>`
  - Cuatro huecos vacíos, cada uno `<div class="slot" data-pendiente="…" hidden></div>` con: `Testimonios reales con autorización`, `Logos de clientes autorizados`, `Marcas de equipos / certificaciones`, `Galería de instalaciones reales`. Más un comentario: `<!-- Ver spec 001 D11: se diseñarán cuando el cliente entregue el material. -->`
- Enlace social (`.link-arrow`): `Vea nuestros trabajos en Facebook` + icono `i-externo` + `<span class="sr-only">(se abre en una pestaña nueva)</span>` → `https://www.facebook.com/SeprosegOficial/`, `target="_blank" rel="noopener noreferrer"`, `data-evento="facebook"`.

**Layout**
- **M**: bloques en 1 columna, gap `--sp-5`; cada bloque: icono 48 px arriba, H3, párrafo.
- **T**: 2 × 2.
- **E**: 4 columnas.
- Pendientes y enlace a Facebook debajo, `margin-top: --sp-6`, alineados a la izquierda (E: centrados).

**Estado mínimo** (sin ningún dato): H2 + 4 bloques + enlace a Facebook. Debe verse completo y equilibrado; ningún hueco vacío visible.

### 4.7 Preguntas frecuentes (`section#preguntas`, fondo surface-alt) — **oculta por defecto**

- La sección entera lleva `hidden`. `main.js` la muestra solo si al menos una respuesta de `CONFIG.faq` es no vacía / `true`. En modo revisión se muestra completa.
- H2: `Preguntas frecuentes` *(el brief no fija el título; ver S6)*
- `<details class="faq">` × 5, cada uno `hidden` con `data-mostrar-si` y `data-pendiente`:

| `summary` (literal) | Respuesta | `data-mostrar-si` |
|---|---|---|
| `¿Hacen visitas de evaluación?` | `<p data-texto="faq.visitas">[[PENDIENTE]]</p>` | `faq.visitas` |
| `¿Qué garantía tienen los equipos y la instalación?` | `<p data-texto="faq.garantia">[[PENDIENTE]]</p>` | `faq.garantia` |
| `¿Puedo ampliar mi sistema después?` | `Sí. Nuestros sistemas están pensados para crecer: puede empezar con lo esencial y agregar cámaras, sensores o accesos cuando lo necesite.` | `faq.ampliar` |
| `¿Atienden en mi zona?` | `<p data-texto="faq.zona">[[PENDIENTE]]</p>` | `faq.zona` |
| `¿Ofrecen facilidades de pago?` | `<p data-texto="faq.pagos">[[PENDIENTE]]</p>` | `faq.pagos` |

**Layout**: una columna, `max-width: 48rem`, en todos los breakpoints (E: centrada).

### 4.8 Contacto y cotización (`section#contacto`, `.is-dark`, fondo navy-800)

**Copy literal**
- H2: `Hablemos de su seguridad`
- Texto: `Cuéntenos qué necesita proteger y le respondemos con una propuesta a su medida.`
- Botones (fila): `Escribir por WhatsApp` (`.btn--primary`, `i-whatsapp`, `data-wa="general"`, `hidden`, `data-evento="contacto-whatsapp"`) · `Llamar` (`.btn--ghost`, `i-telefono`, `data-tel`, `hidden`, `data-evento="contacto-llamar"`). Si ambos siguen ocultos, la fila no ocupa espacio.
- Datos de contacto (`<ul class="contact-data">`, texto blanco / on-dark-muted, cada `li` `hidden` + `data-mostrar-si` + `data-pendiente`):
  - `Teléfono: <span data-texto="telefonoVisible">[[PENDIENTE]]</span>` (`telefonoVisible`)
  - `Correo: <a data-correo href="#">[[PENDIENTE]]</a>` (`correo`)
  - `Dirección: <span data-texto="direccion">[[PENDIENTE]]</span>` (`direccion`)
  - `Horario: <span data-texto="horario">[[PENDIENTE]]</span>` (`horario`)

**Formulario** (tarjeta blanca; dentro de ella `--focus` vuelve a blue-700, es decir, la tarjeta no hereda `.is-dark`):
- H3 (`id="cotizar"`, destino de todos los CTA de cotizar): `Solicitar cotización` *(rótulo tomado del CTA principal; ver S6)*
- `<form id="form-cotizacion" novalidate>`; campos en este orden:

| # | Etiqueta (literal) | Control | Atributos | Obligatorio | Mensaje de error (literal, ver S6) |
|---|---|---|---|---|---|
| 1 | `Nombre` | `input type="text"` `id="f-nombre" name="nombre"` | `autocomplete="name"` `required` | Sí | `Escriba su nombre.` |
| 2 | `Teléfono / WhatsApp` | `input type="tel"` `id="f-telefono" name="telefono"` | `autocomplete="tel"` `inputmode="tel"` `required` | Sí (≥ 7 dígitos tras quitar espacios, guiones, paréntesis y +) | `Escriba un número de teléfono o WhatsApp válido.` |
| 3 | `Correo` | `input type="email"` `id="f-correo" name="correo"` | `autocomplete="email"` | No (si se llena, formato `algo@algo.algo`) | `Revise el correo: parece incompleto.` |
| 4 | `Ciudad / distrito` | `input type="text"` `id="f-ciudad" name="ciudad"` | `autocomplete="address-level2"` | No | — |
| 5 | `Tipo de espacio` (legend) | radios `name="espacio"`: `Hogar` · `Negocio` · `Industria` · `Vehículo/flota` | `required` en el primero | Sí | `Elija el tipo de espacio.` |
| 6 | `Sistema de interés` (legend) | checkboxes `name="sistema"`: `Cámaras CCTV` · `Alarma contra intrusión` · `Cercos electrificados` · `Automatización de cocheras y accesos` · `Control de acceso` · `GPS vehicular` · `No estoy seguro` | `value` = texto visible | No | — |
| 7 | `Mensaje` | `textarea` `id="f-mensaje" name="mensaje"` `rows="4"` | `maxlength="500"`, placeholder `Cuéntenos brevemente qué quiere proteger.` | No | — |

- Indicadores: los obligatorios llevan dentro del `<label>`/`<legend>` el texto `(obligatorio)`; los opcionales `(opcional)`. Estilo del sistema §4.7.
- Botón (`button type="submit"`, `.btn--primary`): `Enviar solicitud` (`data-evento="form-enviar"`).
- Aviso bajo el botón: `Usaremos sus datos solo para responder su solicitud.` + ` <a data-mostrar-si="privacidadUrl" data-pendiente="Enlace a política de privacidad" hidden>Política de privacidad</a>` (JS pone `href = CONFIG.privacidadUrl`).
- `<noscript><p>Para enviar este formulario necesita tener JavaScript activado.</p></noscript>` bajo el botón *(rótulo técnico, ver S6)*.

**Layout**
- **M**: columna única: H2 → texto → botones (apilados, ancho completo, gap `--sp-3`) → datos → formulario (`margin-top: --sp-6`).
- **T**: botones en fila (`width:auto`). Formulario: Nombre | Teléfono en 2 columnas; Correo | Ciudad en 2 columnas; opciones de radios y checkboxes en 2 columnas.
  - El orden del DOM es el de la tabla (1→7) en todos los breakpoints; en M simplemente se apilan.
  - (El brief lista Ciudad tras Sistema de interés; se adelanta junto a Correo para formar pares de 2 columnas sin romper el orden de lectura. No cambia campos ni copy.)
- **E**: 12 columnas: columna 1–5 (H2, texto, botones, datos), columna 6–12 (formulario). Alineación superior.

**Validación y envío (JS)**
1. Al enviar: validar todos los campos. Si hay errores:
   - Cada campo inválido: `aria-invalid="true"`, borde de error, mensaje en `<p class="field-error" id="{id}-error">` enlazado por `aria-describedby`. Para grupos (fieldset), el mensaje va bajo la `legend` y el `aria-describedby` se pone en el `fieldset`.
   - El foco se mueve al **primer** campo inválido (para el grupo, al primer radio).
   - No se abre nada.
2. Tras el primer intento, cada campo se revalida en `input`/`change`; el error desaparece en cuanto el campo es válido.
3. Si todo es válido, se construye el mensaje (omitir líneas de campos vacíos):
   ```
   Hola Seproseg, quisiera una cotización.
   Nombre: {nombre}
   Teléfono/WhatsApp: {telefono}
   Correo: {correo}
   Tipo de espacio: {espacio}
   Sistemas de interés: {sistema1}, {sistema2}
   Ciudad/distrito: {ciudad}
   Mensaje: {mensaje}
   ```
   - Si hay `CONFIG.whatsapp`: `window.open("https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener")`.
   - Si no, y hay `CONFIG.correo`: `location.href = "mailto:" + correo + "?subject=" + encodeURIComponent("Solicitud de cotización - " + nombre) + "&body=" + encodeURIComponent(msg)`.
   - Si no hay ninguno: no abrir nada y mostrar el panel de estado en variante error con `El envío aún no está configurado. Por favor, contáctenos por Facebook.` + enlace a Facebook *(solo debe ocurrir antes de publicar; ver checklist K3)*.
4. Panel de confirmación (`div.form-status` `role="status"` `tabindex="-1"`, encima del botón; recibe el foco):
   - Título: `Gracias.`
   - WhatsApp: `Abrimos WhatsApp con su solicitud lista: solo pulse Enviar para que la recibamos. Le contactaremos pronto.` + enlace `Abrir WhatsApp` (misma URL, por si el navegador bloqueó la ventana).
   - Correo: `Abrimos su aplicación de correo con su solicitud lista: solo pulse Enviar para que la recibamos. Le contactaremos pronto.`
   - (Ajuste del copy del brief, ver S3.)
5. El formulario **no se borra** tras enviar (por si el usuario vuelve sin haber enviado en WhatsApp).
6. Mientras cualquier campo del formulario tenga el foco, la barra de contacto móvil se oculta (`focusin`/`focusout` en el form).

**Estados del formulario**: vacío (placeholder solo en Mensaje) · foco · hover · error por campo · confirmación · no configurado (error). No hay estado de carga (el envío es instantáneo).

### 4.9 Pie de página (`footer.site-footer`, `.is-dark`, navy-900)

**Copy literal**
- `Seproseg` (`--fs-logo`, blanco) + `Seguridad integral para su hogar, negocio y vehículos.` (on-dark-muted)
- `nav[aria-label="Pie de página"]`: `Soluciones` → `#soluciones` · `Productos` → `#productos` · `Contacto` → `#contacto`
- `Facebook` → `https://www.facebook.com/SeprosegOficial/`, `target="_blank" rel="noopener noreferrer"`, icono `i-externo`, `.sr-only` "(se abre en una pestaña nueva)".
- `© <span data-anio>2026</span> Seproseg.` + ` <span data-mostrar-si="razonSocial" data-texto="razonSocial" data-pendiente="Razón social / identificador fiscal" hidden>[[PENDIENTE: razón social / RUC]]</span>` — JS escribe el año actual en `[data-anio]`.

**Layout**
- **M**: bloques apilados, gap `--sp-5`, padding vertical `--sp-7`. Enlaces en columna (cada uno 44 px de alto).
- **T/E**: fila con 3 zonas: marca (izq.) · enlaces en fila · Facebook (der.); copyright en línea propia debajo, separado por borde superior `rgba(255,255,255,0.12)`.
- En M/T el pie conserva el `padding-bottom` del body para no quedar bajo la barra fija.

### 4.10 Barra de contacto móvil (`div.contact-bar`, solo < 1024)

Fuera de `main`, al final del body. Sistema §4.3.
- `WhatsApp` (`.btn--primary`, `i-whatsapp`, `data-wa="general"`, `hidden`, `data-evento="barra-whatsapp"`)
- `Llamar` (`.btn--ghost`, `i-telefono`, `data-tel`, `hidden`, `data-evento="barra-llamar"`)
- `Solicitar cotización` (`.btn--primary`, `href="#cotizar"`, `data-evento="barra-cotizar"`) — **visible solo si los dos anteriores están ocultos**. Sin JS es el único visible.
- Contenedor: `<div class="contact-bar is-dark" role="region" aria-label="Contacto rápido">`.

---

## 5. Interacciones globales mínimas (`js/main.js`)

Orden sugerido del archivo (todo en un IIFE o con `"use strict"`, sin dependencias, objetivo ≤ 8 KB sin minificar):
1. `CONFIG` (§3.1).
2. `document.documentElement.classList.add("js")`.
3. Aplicar `data-mostrar-si`, `data-texto`, `data-wa`, `data-tel`, `data-correo`, `data-anio`, `privacidadUrl`; decidir visibilidad de la FAQ y de "Solicitar cotización" en la barra.
4. Modo revisión (`?revision=1`).
5. Menú móvil (§4.0).
6. Asistente Ruta A (§4.4).
7. "Cotizar este sistema" (§4.3).
8. Formulario (§4.8).
9. (Opcional) clase `.is-scrolled` en header con un único listener `scroll` pasivo.

**Scroll suave**: solo CSS (`scroll-behavior: smooth` dentro de `prefers-reduced-motion: no-preference`). No usar JS para desplazar.
**Anclas**: `scroll-padding-top`/`bottom` del sistema §5.2 para que el header y la barra no tapen los destinos.
**`data-evento`**: atributos inertes para medir en el futuro (brief: métricas de negocio). No se conecta ninguna analítica en esta spec.

---

## 6. Accesibilidad (WCAG 2.2 AA) — requisitos de esta página

- Solo combinaciones de color de `sistema.md` §2.2.
- Foco visible en todo elemento interactivo (incluidas píldoras, checkboxes, `summary`, enlaces del pie); amber-400 en zonas oscuras, blue-700 en claras y dentro de la tarjeta del formulario.
- Header sticky y barra fija no tapan el elemento enfocado (`scroll-padding`).
- Un `h1`; H2 por sección; H3 en tarjetas/pasos/rutas/formulario. Sin saltos.
- `lang="es"`; landmarks (`header`, `nav` ×2 con etiquetas distintas, `main`, `footer`); enlace de salto.
- Todos los campos con `<label for>` o `fieldset/legend`; obligatoriedad indicada en texto; errores en texto, asociados por `aria-describedby`, con `aria-invalid`.
- Confirmación anunciada (`role="status"`) y con foco programático.
- Recomendación del asistente anunciada vía `aria-live="polite"`; el estado activo se indica con borde + texto `Recomendado`, no solo color.
- Iconos `aria-hidden="true" focusable="false"`.
- Enlaces externos avisan "(se abre en una pestaña nueva)".
- Botones repetidos de producto desambiguados con `.sr-only`.
- Objetivos táctiles ≥ 44×44.
- Reflow sin scroll horizontal a 320 px y con zoom 200 %.
- `prefers-reduced-motion` respetado.

---

## 7. Rendimiento (meta del criterio 8 del brief)

| Métrica | Meta |
|---|---|
| Peso total transferido (HTML+CSS+JS+favicon) | ≤ 35 KB con gzip / ≤ 120 KB sin comprimir |
| Peticiones al cargar | ≤ 4 (html, css, js, favicon); 0 a terceros |
| Lighthouse móvil (modo navegación, throttling por defecto) | Rendimiento ≥ 95 · Accesibilidad ≥ 95 · Buenas prácticas ≥ 95 · SEO ≥ 90 |
| LCP (Lighthouse móvil) | ≤ 2,0 s |
| CLS | ≤ 0,05 |

---

## 8. Checklist de aceptación

Verificar cada punto; reportar cumplido / no cumplido. "M360" = viewport 360×640; "E1280" = 1280×800.

**A. Archivos y limpieza**
- [ ] A1. `index.html` reemplazado por completo; la línea de texto de prueba anterior no aparece en ningún archivo del sitio (buscar en el repo, excluido `.git`).
- [ ] A2. Existen solo `index.html`, `css/styles.css`, `js/main.js`, `favicon.svg` como archivos del sitio; sin `package.json`, CDNs, fuentes web ni librerías.
- [ ] A3. El HTML valida sin errores en el validador W3C (nu).
- [ ] A4. `css/styles.css` declara en `:root` los tokens de `sistema.md` §2.10 con esos hex exactos; no hay otros colores en el CSS salvo los `rgba` indicados en esta spec y `#DCE7F5`, `#FFFBEB`.

**B. Head / SEO**
- [ ] B1. `lang="es"`, `title` y `meta description` literales de §2.1; viewport sin `maximum-scale`/`user-scalable`.
- [ ] B2. `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `twitter:card` presentes; `canonical`, `og:url` y `og:image` como comentarios `[[PENDIENTE]]`.
- [ ] B3. Favicon SVG carga.

**C. Copy y marca**
- [ ] C1. Todos los textos visibles coinciden literalmente con esta spec (H1, subtítulos, tarjetas, productos, rutas, pasos, bloques, formulario, pie).
- [ ] C2. Ninguna aparición de: "100%", "seguridad total", "inviolable", "cero robos", "garantizad", "24/7", "24 horas", "respuesta inmediata", "los mejores", "más baratos", "número 1", "líder", ni mayúsculas sostenidas, ni "!!".
- [ ] C3. Con `CONFIG` vacío y sin `?revision=1`: buscar en la página (Ctrl+F) "PENDIENTE" no encuentra nada visible; no hay teléfono, dirección, correo, cifras, testimonios, logos ni garantías mostrados.
- [ ] C4. Alarma y control de acceso usan la descripción segura; las versiones ampliadas están solo en comentarios HTML.
- [ ] C5. Sin imágenes rasterizadas; todos los iconos son SVG del sprite con `aria-hidden="true"`.

**D. Hero y rutas (criterios 1 y 3 del brief)**
- [ ] D1. En M360, sin scroll: H1, subtítulo, "Solicitar cotización", "No sé qué necesito" y "Asesoría sin compromiso." visibles completos por encima de la barra de contacto.
- [ ] D2. "Solicitar cotización" del hero y "Cotizar" del header llevan a `#contacto` (primero se ven WhatsApp/Llamar si existen, luego el formulario); "Cotizar este sistema", "Solicitar cotización" de Ruta B y de la barra llevan al H3 `#cotizar`; "No sé qué necesito" lleva a `#elegir` (panel Ruta A), con el título no tapado por el header.
- [ ] D3. Panel de 6 sistemas oculto en M, visible en T (3×2) y E (columna derecha, 2×3).

**E. Contacto siempre a mano (criterio 2)**
- [ ] E1. En M y T, la barra de contacto está fija abajo en cualquier punto del scroll; en E no existe y el header muestra "Cotizar" (y "WhatsApp" si hay número).
- [ ] E2. Con `CONFIG` vacío la barra muestra solo "Solicitar cotización"; con `whatsapp` y `telefono` muestra "WhatsApp" y "Llamar" a partes iguales y no "Solicitar cotización".
- [ ] E3. La barra no tapa contenido al final de la página (pie visible completo) ni el campo enfocado del formulario (se oculta con foco en el form).
- [ ] E4. Header sticky visible en todo el scroll; "Cotizar" siempre accesible.

**F. Secciones**
- [ ] F1. Soluciones: 3 tarjetas con chips "Incluye" y enlaces correctos; 1/2(+1 ancha)/3 columnas en M/T/E; franja de escalabilidad con el texto literal (criterio 5).
- [ ] F2. Productos: 6 tarjetas, cada una con nombre, beneficio, descripción, "Ideal para" y botón "Cotizar este sistema" (criterio 4); 1/2/3 columnas en M/T/E; ids `cctv`, `alarma`, `cercos`, `accesos-vehiculares`, `control-acceso`, `gps`.
- [ ] F3. Pulsar "Cotizar este sistema" en GPS vehicular lleva al formulario con "GPS vehicular" marcado (probar con 2 productos: ambos quedan marcados).
- [ ] F4. Ruta A: elegir "Ver lo que pasa" resalta "Cámaras CCTV" con borde y texto "Recomendado", y un lector de pantalla anuncia la recomendación.
- [ ] F5. Con `whatsapp` configurado, "Quiero que me asesoren" abre wa.me con "Hola Seproseg, no sé qué sistema necesito y quisiera asesoría. Quiero proteger: Casa. Me preocupa: Ver lo que pasa." (según lo elegido). Sin número, lleva al formulario con "Hogar" y "No estoy seguro" marcados.
- [ ] F6. Ruta B muestra solo "Configuración y capacitación de uso" con `CONFIG` vacío; poner `confirmado.soporte: true` hace aparecer "Soporte después de la instalación"; poner `garantia: "…"` muestra "Garantía: …".
- [ ] F7. Proceso: 5 pasos en `<ol>`, vertical en M/T, 5 columnas en E; los `span` pendientes ocultos.
- [ ] F8. Confianza: 4 bloques (1/2×2/4 columnas); estado mínimo sin huecos; enlace "Vea nuestros trabajos en Facebook" abre https://www.facebook.com/SeprosegOficial/ en pestaña nueva con `rel="noopener noreferrer"` (criterio 7).
- [ ] F9. FAQ oculta con `CONFIG` vacío; `faq.ampliar: true` muestra la sección con solo "¿Puedo ampliar mi sistema después?"; funciona con teclado (Enter/Espacio en `summary`).
- [ ] F10. Pie: textos y enlaces literales; año actual por JS; Facebook en pestaña nueva.

**G. Formulario**
- [ ] G1. Etiquetas visibles y asociadas; "(obligatorio)"/"(opcional)" en texto; inputs ≥ 16 px de fuente (sin zoom en iOS).
- [ ] G2. Enviar vacío: aparecen los 3 errores literales (Nombre, Teléfono, Tipo de espacio), con `aria-invalid` y `aria-describedby`, y el foco va a "Nombre".
- [ ] G3. Teléfono "12345" da error; "987 654 321" es válido. Correo "ana@" da error; vacío no.
- [ ] G4. Corregir un campo elimina su error sin volver a enviar.
- [ ] G5. Con `whatsapp` configurado y datos válidos, se abre wa.me con el mensaje del §4.8 (líneas vacías omitidas, acentos y saltos de línea correctos) y aparece el panel de confirmación con foco y enlace "Abrir WhatsApp".
- [ ] G6. Con solo `correo` configurado, se abre `mailto:` con asunto y cuerpo correctos.
- [ ] G7. El formulario no se vacía tras enviar.
- [ ] G8. Enlace de política de privacidad oculto con `privacidadUrl` vacío.

**H. Navegación e interacciones**
- [ ] H1. Menú M/T: abre/cierra con el botón; `aria-expanded` y texto accesible cambian; se cierra con Escape (foco vuelve al botón) y al elegir un enlace.
- [ ] H2. Sin JS (desactivado): el contenido completo es legible, la navegación es visible, todos los CTA llevan a anclas válidas y no aparece ningún dato pendiente.
- [ ] H3. Con `prefers-reduced-motion: reduce` emulado: sin scroll suave ni transiciones/transformaciones.
- [ ] H4. `?revision=1` muestra todos los bloques pendientes con borde discontinuo y etiqueta "Pendiente: …"; sin el parámetro, no se ven.

**I. Accesibilidad**
- [ ] I1. Recorrido completo con Tab: orden lógico, foco siempre visible (amber en oscuro, azul en claro) y nunca tapado por header/barra.
- [ ] I2. Enlace "Saltar al contenido" aparece con el primer Tab y lleva a `main`.
- [ ] I3. Un solo H1; jerarquía H2/H3 sin saltos (comprobar con extensión HeadingsMap o similar).
- [ ] I4. Todos los objetivos táctiles ≥ 44×44 px (inspeccionar botones, píldoras, opciones del form, enlaces de menú y pie).
- [ ] I5. Sin scroll horizontal a 320 px de ancho ni con zoom de texto 200 %.
- [ ] I6. Lighthouse Accesibilidad ≥ 95 y axe DevTools sin errores críticos/serios.

**J. Responsive**
- [ ] J1. Capturas en 360, 768 y 1280 px de ancho coinciden con los layouts M/T/E de §4.
- [ ] J2. Orden del DOM = orden visual en los tres anchos.

**K. Rendimiento y publicación**
- [ ] K1. Metas de §7 cumplidas (reportar cifras de Lighthouse móvil y peso total).
- [ ] K2. 0 peticiones a dominios externos al cargar (pestaña Red).
- [ ] K3. **Bloqueante de publicación**: antes de publicar, `CONFIG.whatsapp` o `CONFIG.correo` tiene valor real del cliente (si no, el formulario no envía). Reportar el estado.

---

## 9. Supuestos (requieren validación de marca/usuario)

- **S1. Paleta provisional**: navy `#0B2545` + ámbar `#F59E0B`. Se reemplaza si el cliente entrega colores oficiales/logo (plataforma §10.1).
- **S2. Formulario vía WhatsApp** (respaldo `mailto:`), sin servicio externo. Pendiente que el cliente confirme a dónde deben llegar las solicitudes (brief, pregunta 8).
- **S3. Ajuste del texto de confirmación**: el brief dice "Gracias. Recibimos su solicitud y le contactaremos pronto.", pero con WhatsApp/correo la solicitud **no se recibe** hasta que el usuario pulsa Enviar en la otra aplicación; decirlo sería falso. Se usa: "Gracias. Abrimos WhatsApp con su solicitud lista: solo pulse Enviar para que la recibamos. Le contactaremos pronto." Validar con marca.
- **S4.** "Ver soluciones para el hogar" y "Ver soluciones para negocios" llevan ambos a `#productos` (no hay páginas por sector).
- **S5. Incoherencia del brief**: los pasos 2 ("Evaluamos su espacio") y 5 ("Le acompañamos — Soporte después de la instalación.") se muestran, mientras que en Ruta B los ítems equivalentes "Evaluación de su espacio antes de cotizar" y "Soporte después de la instalación" están marcados con `*` y se ocultan. Se siguió el brief literalmente en ambos sitios; marca debe decidir si el paso 2/5 también se oculta o si los ítems de Ruta B pueden mostrarse.
- **S6. Rótulos de interfaz nuevos** (no estaban en el brief, son funcionales y neutros): "Saltar al contenido", "Abrir menú"/"Cerrar menú", "Le recomendamos:", "Recomendado", "Recomendación: …", "Preguntas frecuentes", H3 del formulario "Solicitar cotización", "(obligatorio)"/"(opcional)", mensajes de error, "Política de privacidad", "Abrir WhatsApp", "El envío aún no está configurado…", aviso `noscript`, "Contacto rápido".
- **S7. Botón de WhatsApp ámbar** en vez del verde de WhatsApp (un único acento).
- **S8. `og:locale` = `es_LA`** y `lang="es"` genérico; ajustar al país cuando se confirme la cobertura (el uso de "RUC", "cochera" y "distrito" sugiere Perú, pero no se asume).
- **S9. Sin imagen OG**: al compartir en Facebook la vista previa saldrá sin imagen hasta que exista una imagen 1200×630 (logo o foto real). Muy recomendable resolverlo antes de difundir por Facebook.
- **S10.** "Aviso inmediato si alguien entra sin permiso" (beneficio de la alarma) se mantiene por estar aprobado en el brief; se entiende como el disparo de la alarma, no como "respuesta inmediata" de un servicio.
