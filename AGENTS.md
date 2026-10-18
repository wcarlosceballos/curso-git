# AGENTS.md — Curso: Git desde Cero

**OVA publicada en:** https://wcarlosceballos.github.io/curso-git/
**Repo:** `wcarlosceballos/curso-git` — ramas `main` (fuente) y `gh-pages` (publicado)
**Estado:** completado y reescrito por completo el 16 oct 2026
**Licencia:** CC BY 4.0

> Este archivo contiene lo que **no se deduce leyendo el código**. El `README.md` ya
> explica la estructura y las competencias.

---

## Qué es

Curso de **3 lecciones** para manejar el repositorio propio, compartirlo en GitHub y
colaborar con Pull Requests. Misma metodología por competencias que el curso de
Desarrollo con IA.

⚠️ **El objetivo pedagógico es explícito y no es memorizar comandos:**

> *"No memorices comandos. Entiende las 3 áreas y todo lo demás se deduce."*

Cualquier contenido que enseñe una lista de comandos sin explicar el modelo mental rompe
el curso.

---

## Arquitectura: sin build step

```
*.md            ← LA FUENTE EDITABLE
ova/            ← el sitio: HTML, CSS y JS planos
├── index.html          ruta de aprendizaje y progreso
├── diagnostico.html    8 preguntas que fijan el nivel inicial
├── leccion1-3.html     teoría
├── modulo1-3/          práctica: cada uno con index.html y reto.html
├── evaluacion.html     10 preguntas finales (se aprueba con 60%)
├── portafolio.html     las 3 evidencias + descarga
├── resultados.html     insignias y resumen de desempeño
└── js/, css/           progress.js · storage.js · lesson-tracker.js
```

**No hay build, ni `npm install`, ni bundler.** Editar un `.md` **no** cambia el sitio:
hay que editar el HTML de `ova/` a mano.

**El progreso va en `localStorage`** — por eso funciona offline y sin registro.

**Ramas:** `main` es la fuente; `gh-pages` es lo publicado. **Un cambio en `main` no
aparece en el sitio hasta que se copie a `gh-pages` y se suba.**

### ⚠️ Ojo con la URL de `gh-pages`

A diferencia del curso de Desarrollo con IA, aquí `gh-pages` tiene los HTML **en la raíz**,
no bajo `ova/`:

```bash
✅ https://wcarlosceballos.github.io/curso-git/portafolio.html      → 200
❌ https://wcarlosceballos.github.io/curso-git/ova/portafolio.html → 404
```

Probar la ruta equivocada da 404 y parece que el archivo falta, cuando no es así.

---

## Lo que se arregló el 16 oct 2026

El curso estaba roto en tres puntos. **Ya no están rotos**, pero conviene saber qué pasó
para no reintroducirlos:

1. **Un `ReferenceError` rompía el guardado de evidencia** en los 3 retos. El estudiante
   completaba el reto y no se guardaba nada.
2. **La navegación estaba unificada** — antes las lecciones eran inalcanzables.
3. **`portafolio.html` y `resultados.html` no existían** y estaban enlazados.

⚠️ El punto 3 es el mismo modo de fallo que se repite: **un archivo enlazado que no
existe.** Antes de dar por terminado un módulo, comprobar que todo lo enlazado existe:

```bash
grep -ohE '(href|src)="[^"#:]*"' ova/*.html ova/modulo*/*.html \
  | sed 's/.*="//;s/"//' | sort -u
```

---

## Diferencias con el curso de Desarrollo con IA

No son clones. Los dos comparten la estructura de la OVA, pero:

| | Curso Git | Curso Desarrollo con IA |
|---|---|---|
| Rutas | `01_basicos` · `02_ramas` · `03_github` | `01_dia1_fundamentos` · `02_dia2_harness_sdd` · `03_dia3_multiagentes` |
| `CURSO_GIT_COMPLETO.md` | Sí, 24 KB — **documento largo aparte** | No existe equivalente |
| `.gitignore` | **No tiene ninguno** | Sí |
| `evaluacion/` | Solo `preguntas.md` — la rúbrica **no aplica**, la evaluación es automática | `preguntas.md` + `rubrica.md` |
| `gh-pages` | HTML en la **raíz** | HTML en la raíz **y** en `ova/` (duplicado) |
| Genera `.pdf`/`.docx` | No | No |

**`CURSO_GIT_COMPLETO.md` es un segundo documento** de 24 KB que no está en el `README`.
Antes de reescribir cualquier lección, mirarlo: puede contener material que no está en la
OVA.

---

## Verificación rápida

```bash
# el sitio responde en las rutas correctas
curl -s -o /dev/null -w "%{http_code}\n" https://wcarlosceballos.github.io/curso-git/
curl -s -o /dev/null -w "%{http_code}\n" https://wcarlosceballos.github.io/curso-git/portafolio.html
curl -s -o /dev/null -w "%{http_code}\n" https://wcarlosceballos.github.io/curso-git/leccion2.html
```

Los tres deben dar **200**. Y el control:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  https://wcarlosceballos.github.io/curso-git/no-existe.html   # debe dar 404
```

Sin ese control, un 200 que viene de un fallback se confunde con una página real.

---

## Lo que falta

- **No hay `.gitignore`.** Es el único de los dos cursos sin uno. Si alguna vez se agrega
  `.venv`, `__pycache__` o un `.env`, se versionan por error.
- Decidir si `evaluacion/rubrica.md` debe existir o si la ausencia es deliberada —el
  `README` dice que no aplica, pero conviene que quede escrito por qué_.