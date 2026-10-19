# Logotipo — Seproseg

> Decisión del cliente, 2026-10-19. Reemplaza la dirección de color provisional de `plataforma.md` §7 y `docs/diseno/sistema.md` §2.1 (navy y ámbar) cuando se actualice el sitio.
> Estado: **elegido, pendiente de vectorizar** (ver §6).

## 1. Qué se eligió

**Símbolo "Arco"** + **logotipo en tipografía extendida**, sobre la paleta **Grafito y azul hielo**.

- **Símbolo**: un arco de puerta (o lente) con un ojo de cerradura dentro. Une acceso, hogar y vigilancia en una forma simple.
- **Tipografía**: Unbounded, peso 600, mayúsculas, espaciado ligeramente negativo (−0,01 em). Ancha y redondeada; da peso y combina con la curva del arco.
- **Bajada**: "Seguridad integral", mayúsculas, peso 500, espaciado 0,3 em, en un tamaño cerca de un tercio del nombre.

El nombre se escribe **SEPROSEG** en el logotipo. En texto corrido se mantiene "Seproseg".

## 2. Colores

| Rol | Hex | Uso |
|---|---|---|
| Grafito | `#2A2F38` | Símbolo y texto sobre claro; fondos oscuros |
| Papel | `#F0F2F4` | Fondo claro; símbolo y texto sobre grafito |
| Azul hielo | `#8FB1CE` | Ojo de cerradura sobre fondo oscuro; acentos |
| Azul hielo oscuro | `#6A93B5` | Ojo de cerradura sobre fondo claro (para que no se pierda) |

Monocromo: todo en `#1A1A1A` (o blanco sobre fondo oscuro), con el ojo de cerradura del mismo color.

## 3. Geometría del símbolo (lienzo de 48 × 48)

- Arco: `M8 43V23a16 16 0 0 1 32 0v20Z`, sin relleno, trazo 4,2, uniones redondeadas.
- Ojo de cerradura, parte superior: círculo en (24; 24,5), radio 4,8, color de acento.
- Ojo de cerradura, parte inferior: `M21.2 28.5h5.6l1.8 9h-9.2Z`, mismo color que el arco.

## 4. Versiones

| Versión | Contenido | Uso |
|---|---|---|
| Horizontal | Símbolo a la izquierda, nombre y bajada a la derecha | Cabecera, documentos |
| Vertical | Símbolo arriba, nombre y bajada centrados | Rótulos, portadas |
| Símbolo solo | Arco con cerradura | Favicon, ícono de app, perfil de redes |

El símbolo solo ya está en `favicon.svg`.

## 5. Uso

- Espacio libre alrededor: como mínimo la altura de la cerradura (la parte inferior del ojo).
- Tamaño mínimo del símbolo: 16 px. Debajo de 24 px se omite la bajada.
- No deformar, no girar, no añadir sombras ni degradados, no cambiar la tipografía.
- Sobre fotos: usar la versión sobre oscuro en una zona sin detalle, o un fondo grafito.

## 6. Pendientes

1. **Vectorizar el logotipo final** con el texto convertido a trazos. Mientras tanto el sitio usaría Unbounded como fuente web, lo que va contra "sin dependencias" de `CLAUDE.md`. Hay que decidir: convertir a SVG con trazos (recomendado) o justificar la fuente en una spec.
2. Pasar la paleta a `docs/diseno/sistema.md` y re-verificar contrastes (el ámbar ya no es el acento de acción).
3. Confirmar si el cliente ya usa un logo en su página de Facebook (pregunta abierta de `plataforma.md` §10).
