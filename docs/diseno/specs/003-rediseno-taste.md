# Spec 003 — Rediseño con `design-taste-frontend`

> 2026-10-16. Sustituye la parte visual de `002-rediseno.md` y de `sistema.md` v2.0 (tokens, componentes y layout). Contenido, claims y reglas de marca de `docs/marca/plataforma.md` siguen vigentes.
> Hecho directamente por la sesión principal con la skill (a petición del usuario), no por la cadena marca → UI/UX → desarrollador.

## Dirección dibujada (`node .claude/skills/design-taste-frontend/scripts/draw.mjs --show`)
- **Dirección**: "Type and nothing else" (seed 1169624464). Hero "Waterline", movimiento "Masked headline".
- **Idea**: *la escala* (del hogar a la industria, que es el diferenciador de la marca) se vuelve el recurso de la página: un plano que crece y una tabla que cambia de columna según el espacio que el visitante elige.
- **Cosa viva**: selector Hogar / Negocio / Industria (`js/pagina.js`) que cambia el plano, resalta la columna de la tabla, resume en una frase y precarga el tipo de espacio en el formulario. Sin JS la tabla se lee completa.

## Redibujos (con motivo)
| Pieza | Dealt | Usado | Motivo |
|---|---|---|---|
| Paleta | Graphite and orange | Paleta de marca: navy `#0B2545` de fondo, papel `#EEF4FB`, azul `#1D4E89`, ámbar `#F59E0B` solo en acciones | `plataforma.md` §7 fija navy + ámbar y desaconseja el naranja-rojo. Se conservan las proporciones dibujadas (oscuro ~2/3, campos claros, acento solo en acciones). |
| Tipografía | General Sans (Fontshare) | Plus Jakarta Sans variable, autoalojada en `assets/fonts/` | Fontshare no es alcanzable desde el entorno y el sitio no debe pedir recursos a terceros. Misma familia de rasgos (grotesca con curvas geométricas). |
| Contacto | Address in display rows | Clip-out coupon form + filas grandes de WhatsApp/llamada | No hay dirección ni horario confirmados; el formulario de cotización es la conversión principal. |
| Hero | Seam cruzando la 2.ª línea (dos copias) | Costura entre las dos líneas | El inspector marca texto cubierto cuando una copia tapa a la otra. |

## Tokens (en `css/styles.css`, `:root`)
Color: `--bg --surface --blue --ink --ink-2 --paper --paper-2 --paper-ink --paper-muted --accent --accent-strong --accent-ink --control`.
Tipografía (cinco pasos): `--step-small` 14 · `--step-body` 17–19 · `--step-lead` 20–26 · `--step-head` 36–68 · `--step-hero` 15.5vw móvil / 11vw escritorio (máx. 190 px). Una sola familia.
Reglas de la casa: esquinas rectas, sin líneas finas, degradados, sombras en reposo, eyebrows, numeración ni iconos sobre tarjetas.

## Secciones (orden = orden del argumento)
1. **Hero** — "Seguridad a su medida"; una acción (Solicitar cotización) arriba a la derecha.
2. **Intro** — "Del hogar a la industria" en escalera + enunciado.
3. **Sistemas** — los seis, con beneficio, descripción, "Ideal para" y "Cotizar este sistema" (conserva `id` y `data-producto`).
4. **Escala** — selector + plano + tabla Hogar/Negocio/Industria + CTA contextual.
5. **Así trabajamos** — itinerario en un talón.
6. **Nuestros trabajos** — galería (vacía hasta recibir fotos; enlace a Facebook).
7. **Preguntas** — oculta hasta confirmar respuestas (`CONFIG.faq`).
8. **Contacto** — canales reales + talón con el formulario (misma lógica de `main.js`).
9. **Pie** — columnas y el nombre a todo el ancho.

Se retiró la sección "Le ayudamos a elegir" (sus frases de necesidad ya son los beneficios de cada sistema y el selector de escala hace de orientación). `main.js` no cambió.

## Pendientes conocidos
- **Fotos reales**: la skill pide ≥ 4 imágenes reales. No hay fotos del cliente y el entorno no alcanzó los archivos abiertos (Openverse, Wikimedia). El inspector se ejecutó con `--allow few-pictures`. Al llegar fotos de instalaciones: `assets/instalaciones/` + `js/instalaciones.js` (la galería ya está lista) y, si se desea, una foto grande entre secciones.
- Sin video (aviso `no-footage`).
- El plano es un esquema ilustrativo, no un proyecto real; está rotulado como tal.
- Logo oficial, dominio e imagen OG siguen pendientes (comentarios `[[PENDIENTE]]` en `index.html`).
