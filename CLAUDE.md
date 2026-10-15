# Seproseg landing

Landing page de Seproseg (seguridad integral para hogar, negocio y vehículos). Contexto de negocio en `README.md`.

## Equipo de agentes (`.claude/agents/`)

| Agente | Modelo | Rol | Escribe en |
|---|---|---|---|
| `experto-marca` | opus | Analiza la marca, define identidad y mensajes, redacta briefs para UI/UX | `docs/marca/` |
| `experto-ui-ux` | opus | Toma decisiones de diseño a partir de los briefs | `docs/diseno/` |
| `desarrollador` | sonnet | Implementa las specs en código, de forma económica | código del sitio |

## Flujo

Los subagentes no se llaman entre sí; la sesión principal orquesta y pasa la ruta del documento de un paso al siguiente:

1. **Marca → brief**: `experto-marca` crea/actualiza `docs/marca/plataforma.md` y `docs/marca/briefs/NNN-*.md`.
2. **Brief → spec**: `experto-ui-ux` lee el brief y produce `docs/diseno/specs/NNN-*.md` (y mantiene `docs/diseno/sistema.md`).
3. **Spec → código**: `desarrollador` implementa la spec y reporta su checklist de aceptación.
4. Las preguntas abiertas y supuestos de cada paso se le muestran al usuario antes de continuar cuando afectan la marca o el diseño.

Cambios puramente técnicos (bugs, refactors) pueden ir directo a `desarrollador`.

## Convenciones
- Todo en español.
- Sitio estático, ligero, móvil primero; sin dependencias ni build step salvo que una spec lo justifique.
