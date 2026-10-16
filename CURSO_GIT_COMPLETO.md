<!-- ===== PÁGINA 1 ===== -->

# 📘 Curso: Git desde Cero

Aprende a usar Git tú mismo, con el mismo enfoque pedagógico por competencias del curso anterior.

## 🎯 Objetivo
Manejar tu propio repositorio local, compartirlo en GitHub y colaborar mediante Pull Requests.

## 📅 Ruta (3 lecciones)

| # | Lección | Contenido |
|---|---|---|
| 1 | `01_basicos.md` | Configuración, las 3 áreas, commits, `.gitignore` |
| 2 | `02_ramas.md` | Ramas, merge, **conflictos**, deshacer |
| 3 | `03_github.md` | Remotos, autenticación, fork + PR, GitHub Pages |

Cada lección tiene: idea central, contenido explicado, comandos comentados y un ejercicio con criterio de éxito.

## 🧠 Competencias

| # | Competencia | Evidencia |
|---|---|---|
| 1 | Crear y administrar un repositorio local | Reto del Módulo 1: `git log` + `.gitignore` |
| 2 | Trabajar en paralelo, integrar y resolver conflictos | Reto del Módulo 2: bloque de conflicto resuelto |
| 3 | Publicar con seguridad y colaborar | Reto del Módulo 3: repositorio publicado |

## ✅ Evaluación
- `evaluacion/preguntas.md` — banco de preguntas
- OVA: 10 preguntas de opción múltiple, se aprueba con 60%

## 🧪 Ejercicio final
- `ejercicios/crear_y_subir.md` — flujo completo: init → add → commit → rama → merge → push

## 📄 Licencia
Material educativo bajo licencia CC BY 4.0. Ver `LICENSE`.

---

<!-- ===== PÁGINA 2 ===== -->

# 📗 Lección 1 — Git Básico

## 🎯 Competencia
Crear y administrar un repositorio local, registrando cambios de forma controlada.

## 📌 Idea central
> Git no guarda "archivos": guarda **cambios**. Cada commit es una foto del proyecto con una nota que explica qué cambió y por qué. Tu valor no está en teclear comandos, está en escribir commits que tu yo del futuro pueda entender.

## Contenido

### 1. ¿Qué problema resuelve Git?

Git es un **sistema de control de versiones**. Sin él, guardar el estado de un proyecto significa copiar la carpeta entera a otra carpeta con un nombre como `proyecto_v2_final_definitivo`.

Con Git guardas **solo la diferencia** entre versiones, y puedes volver a cualquier punto anterior.

Conceptos que debes separar con claridad:

| Concepto | Qué es | Ejemplo |
|---|---|---|
| **Repositorio** | La carpeta con todo el historial | `mi-proyecto/` |
| **Commit** | Una foto del proyecto con mensaje | `Agregué el formulario de contacto` |
| **Historial** | La lista ordenada de commits | `git log` |
| **Autor** | Quién hizo el commit | tu nombre y correo |

### 2. Configuración inicial (antes del primer uso)

Tu nombre y correo viajan **dentro** de cada commit. Si no los configuras, Git usa valores inventados y tu trabajo queda firmado por un desconocido.

```bash
git config --global user.name "Carlos Ceballos"
git config --global user.email "tu@correo.com"
git config --global init.defaultBranch main
```

Verifica que quedó bien:

```bash
git config --list --global
```

### 3. Las 3 áreas — el corazón de Git

Este es **el concepto que más cuesta**. Si entiendes las 3 áreas, entiendes Git.

```
  📁 Tu carpeta              📦 Preparado            💾 Historial
 ┌──────────────┐          ┌──────────────┐        ┌──────────────┐
 │  Working     │  add     │  Staging     │ commit │  Repository  │
 │  Directory   │ ───────► │  (Index)     │ ─────► │              │
 │              │          │              │        │              │
 │  Editas aquí │          │  Decides     │        │  Confirmado  │
 │  Files sueltos│         │  qué entra   │        │  No se puede │
 │              │          │              │        │  borrar fácil│
 └──────────────┘          └──────────────┘        └──────────────┘
       ▲                         ▲                       │
       └───────── restore ───────┘◄────── restore ──────┘
              (deshacer aquí)                (deshacer aquí)
```

**La idea clave:** Git te obliga a pasar por una *decisión explícita*. Nada entra al historial sin que tú lo apruebes. Por eso `git add` no es "guardar" — es **elegir qué va en la próxima foto**.

**El staging area es lo que hace útil a Git.** Puedes tener 10 archivos modificados y preparar solo 2 para un commit:

```bash
git status              # ver qué hay en cada área
git addDock.md  app.js  # solo estos dos
git commit -m "Corregir dockeo en móvil"
# los otros 8 siguen sin preparar —upsert intactos
```

### 4. Comandos del ciclo básico

```bash
git init                # crea el repo — una sola vez por proyecto
git status              # SIEMPRE antes de commitear: qué está pasando
git add archivo.txt     # preparar un archivo
git add .               # preparar todo lo modificado
git diff                # ver qué cambiaste sin preparar
git diff --staged       # ver qué vas a commitear
git commit -m "mensaje" # confirmar
git log --oneline       # historial resumido
git log --graph --oneline --all   # historial visual
```

### 5. Escribir buenos mensajes de commit

Un commit mal escrito es una bomba de relojería para tu equipo (y para tu yo del futuro).

```bash
git commit -m "arreglado"           # ❌ inútil
git commit -m "arreglado error"     # ❌ inútil
git commit -m "Corrige validación de email en registro"  # ✅ útil
```

**Regla de oro: el mensaje dice QUÉ cambiaste y POR QUÉ, no CÓMO.**

Formato recomendado:

```
<tipo>: <descripción corta en imperativo>

<cuerpo opcional: por qué, no qué>
```

Tipos más usados: `feat` (funcionalidad nueva), `fix` (corrección), `docs` (documentación), `refactor`, `test`, `chore`.

```
feat: agregar recuperación de contraseña
fix: evitar doble envío en el formulario de contacto
docs: explicar la instalación en el README
```

### 6. `.gitignore` — hazlo ANTES del primer push

Por defecto Gitlify **sí** sube todo, incluidos tus archivos personales y secretos. Esta es la causa número uno de filtrar contraseñas.

Crea `.gitignore` en la raíz del proyecto:

```gitignore
# Dependencias
node_modules/
vendor/

# Secretos — NUNCA subir
.env
.env.local
*.key
id_rsa

# Sistema operativo
.DS_Store
Thumbs.db

# Herramientas
.vscode/
.idea/
```

**Regla del `.gitignore`:**

- Se crea **antes** del primer `push`, no después.
- Si ya subiste algo que debías ignorar, borrarlo del historial requiere `filter-repo` — por eso es mejor prevenir.

### 7. Ejemplo completo

```bash
mkdir mi-proyecto && cd mi-proyecto
git init

# Configurar antes de commitear (una vez)
printf 'node_modules/\n.env\n' > .gitignore

echo "# Mi proyecto" > README.md
echo "console.log('hola')" > app.js

git add .
git commit -m "chore: estructura inicial del proyecto"

echo "console.log('hola mundo')" > app.js
git diff                    # revisaste el cambio
git add app.js
git commit -m "feat: mensaje de saludo en español"

git log --oneline
```

```
* a1b2c3d feat: mensaje de saludo en español
* e4f5g6h chore: estructura inicial del proyecto
```

## 🧪 Ejercicio 1 — Primeros pasos

**Objetivo:** practicar las 3 áreas y un mensaje de commit correcto.

1. Crea `~/practica-git-1` e inicializa el repo
2. Crea un `.gitignore` con `node_modules/` y `.env`
3. Crea `README.md` con una línea de descripción
4. `git add .` y commit → revisa con `git log --oneline`
5. Edita el README, mira el cambio con `git diff`
6. Prepara **solo** el README y commitea
7. Comprueba con `git status` que el resto quedó intacto

**🎯 Criterio de éxito:** tienes 2 commits con mensajes descriptivos y entiendes por qué `git diff` va antes de `git add`.

**💡 Parayahacer más:** edita dos archivos y commitea solo uno. Es el escenario real del día a día.

---

**Siguiente:** `02_ramas.md` — ramas, merge y resolución de conflictos.

---

<!-- ===== PÁGINA 3 ===== -->

# 📗 Lección 2 — Ramas, Merge y Conflictos

## 🎯 Competencia
Trabajar con seguridad en paralelo, integrar cambios y resolver conflictos sin perder trabajo.

## 📌 Idea central
> Una rama es una línea de trabajo paralela. El merge es donde Git te obliga a tomar una decisión explícita: cuando dos personas (o tú en dos documentos) cambian lo mismo, Git **no elige por ti**. Entender cómo resolver conflictos es lo que separa a quien usa Git de quien pelea contra Git.

## Contenido

### 1. Por qué ramas

Sin ramas trabajas directo sobre `main`. Si algo sale mal, no hay forma de volver atrás sin romper nada.

Con ramas:

```
main         ──A──B──C──────────────►  (estable, siempre desplegable)
                    \
feature/login       D──E──F──►        (trabajo aislado, se integra después)
```

**Reglas de oro:**
- `main` siempre debe funcionar. Nunca trabajes directamente encima.
- Una rama = una tarea o una funcionalidad.
- La rama vive poco: nace, se integra, se borra.

### 2. Comandos de ramas

```bash
git branch                      # listar ramas
git branch -v                   # listar con último commit
git switch -c feature/login     # crear y cambiar  ← moderno (Git 2.23+)
git switch main                 # cambiar de rama
git merge feature/login         # integrar en la rama actual
git branch -d feature/login     # borrar ya integrada (segura)
git branch -D feature/login     # borrar forzando (peligrosa)
git log --graph --oneline --all # ver el historial como diagrama
```

> **Modernización:** `git switch` y `git restore` reemplazaron a `git checkout`, que hacía tres cosas distintas a la vez. Usa `switch` para cambiar de rama y `restore` para deshacer cambios. `checkout` aún funciona, pero es ambiguo.

### 3. El flujo de trabajo típico

```bash
git switch main
git pull                              # actualizar antes de crear la rama
git switch -c mejorar-readme

# ... trabajas en el contenido ...
git add README.md
git commit -m "docs: explicar la instalación paso a paso"

git switch main
git merge mejorar-readme              # integra
git push
git branch -d mejorar-readme          # limpia
```

**Fast-forward:** si `main` no se movió desde que creaste la rama, Git simplemente **mueve el puntero** — no hay commit de merge. Es el caso ideal.

```
main         ──A──B──M──────────►
                    \         /
feature/fix         C──D────/
```

### 4. Conflictos — la parte que nadie te explica

**¿Cuándo ocurre un conflicto?**

Cuando Git tiene que fusionar dos versiones del **mismo archivo** que **tocaron las mismas líneas** de forma incompatible.

```
main         ──A──B──C──►        línea 3: "   hola   "
                    \
feature/fix         D──E──►        línea 3: "   goodbye "
```

Git **no puede decidir** cuál de los dos textos es el correcto. Solo tú sabes. Por eso te lo pregunta.

Git **NO** da conflicto cuando:
- Cambias archivos distintos.
- Cambias líneas distintas del mismo archivo.

### 5. Cómo resolver un conflicto (paso a paso)

**Paso 1 — Git te avisa:**

```bash
git merge feature/login
```

```
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**Paso 2 — Git marca el archivo en conflicto:**

```markdown
<<<<<<< HEAD
Bienvenido a mi proyecto
=======
Hola, bienvenido a MI proyecto
>>>>>>> feature/login
```

**Qué significa cada marca:**

| Marca | Significado |
|---|---|
| `<<<<<<< HEAD` | Empieza el conflicto — **HEAD** es tu rama actual |
| `=======` | Separador |
| `>>>>>>> feature/login` | Fin del conflicto — la rama que se está integrando |

**Paso 3 — Editas el archivo y decides el resultado final:**

```markdown
# Mi proyecto

Bienvenido a MI proyecto
```

**Borra todas las marcas** (`<<<<<<<`, `=======`, `>>>>>>>`). Si queda alguna, Git sigue viendo el conflicto.

**Paso 4 — Marcas el archivo como resuelto y confirmas:**

```bash
git add README.md          # el add es lo que marca "resuelto"
git commit -m "merge: integrar cambios de feature/login"
```

Listo. Ese es **todo** el procedimiento.

> **⚠️ Error clásico:** borras las marcas pero olvidas el `git add`. Git cree que el conflicto sigue abierto y no te deja commitear. El `git add` es obligatorio.

### 6. Deshacer — tres comandos que se confunden

Estos tres **no son intercambiables**. Confundirlos puede borrar trabajo real:

| Comando | Qué deshace | ¿Salva al historial? |
|---|---|---|
| `git restore archivo` | Descarta cambios **no preparados** | Sí, no toca commits |
| `git restore --staged archivo` | Saca el archivo del staging | Sí |
| `git revert <hash>` | **Crea un commit nuevo** que deshace otro | Sí, es la opción segura |
| `git reset --hard <hash>` | **Borra commits** y vuelve atrás | ❌ **No, se pierde para siempre** |

**Regla de la vida real:** en repositorio compartido, usa `revert`. Nunca uses `reset --hard` sobre `main`.

```bash
# Deshacer un commit ya subido (seguro):
git log --oneline                  # busca el hash
git revert a1b2c3d                 # crea un commit que lo revierte

# Arreglar el mensaje del último commit (sin tocar nada más):
git commit --amend -m "nuevo mensaje"
```

### 7. Ejemplo completo

```bash
git switch -c feature/saludo
echo "Hola, bienvenido a MI proyecto" > README.md
git add README.md
git commit -m "docs: saludo más cercano"

git switch main
echo " Bienvenido a mi proyecto" > README.md   # ¡misma línea!
git add README.md
git commit -m "docs: agregar título al README"

git merge feature/saludo
# ⚠️ CONFLICT en README.md

# Editas README.md, eliges el texto final, borras las marcas
git add README.md
git commit -m "merge: integrar saludo del proyecto"

git log --graph --oneline
```

## 🧪 Ejercicio 2 — Ramas y conflicto real

**Objetivo:** provocar un conflicto, resolverlo y comprobar el resultado.

1. Crea la rama `feature/titulo` y cambia la primera línea del `README.md`
2. Vuelve a `main` y cambia **la misma línea** de forma diferente
3. `git merge feature/titulo` → observa el conflicto
4. **Lee el README.md** y localiza las marcas `<<<<<<<`, `=======`, `>>>>>>>`
5. Decide el texto final y **borra todas las marcas**
6. `git add README.md` y commitea el merge
7. Verifica con `git log --graph --oneline` que todo quedó integrado
8. Borra la rama con `git branch -d feature/titulo`

**🎯 Criterio de éxito:** el `README.md` final tiene el texto que elegiste, sin marcas, y el grafo muestra la rama integrada.

**💡 Para practicar más:** repite el ejercicio al revés (`git merge main` desde dentro de la rama). El procedimiento es idéntico.

---

**Siguiente:** `03_github.md` — remotos, GitHub, autenticación y Pull Requests.

---

<!-- ===== PÁGINA 4 ===== -->

# 📗 Lección 3 — GitHub, Remotos y Trabajo en Equipo

## 🎯 Competencia
Conectar tu repositorio local con GitHub, publicar con seguridad y colaborar mediante Pull Requests.

## 📌 Idea central
> Git es local. GitHub es el servidor donde tu repositorio **se comparte**. Publicar es un acto deliberado: primero decides qué entra, después decides a dónde va. Lo que no preparaste, lo acabas subiendo.

## Contenido

### 1. Remoto

Un **remoto** es un alias que apunta a la URL de tu repositorio en GitHub. Por defecto se llama `origin`.

```bash
git remote add origin https://github.com/TU_USUARIO/mi-proyecto.git
git remote -v                 # ver todos los remotos
```

Puedes tener varios remotos a la vez — útil para trabajar con un proyecto abierto:

```bash
git remote add upstream https://github.com/OTRO/USUARIO/proyecto-original.git
```

### 2. Los dos comandos que más importan

```bash
git push          # ENVÍA tus commits locales al remoto
git pull          # TRAE los commits del remoto a tu máquina
```

**La diferencia crítica:**

| Comando | Dirección | Se pierde trabajo local |
|---|---|---|
| `git push` | local → remoto | No |
| `git pull` | remoto → local | **Sí, si hay conflicto** |
| `git fetch` | remoto → local | No — solo descarga, no integra |

> **⚠️ Principio de seguridad:** `git pull` = `git fetch` + `git merge`. Si hay cambios incompatibles, el merge puede crear conflictos. Si solo quieres **ver** qué hay de nuevo sin arriesgarte, usa `git fetch` y luego `git log HEAD..origin/main`.

**Antes de empezar a trabajar cada día:**

```bash
git pull        # SIEMPRRE primero
```

Esto es lo que evita el error clásico de "trabajé tres horas y alguien más ya había subido cambios".

### 3. Publicar un proyecto por primera vez

```bash
# 1. Verifica que tu .gitignore está listo — ANTES de continuar
cat .gitignore

# 2. Conecta con GitHub
git remote add origin https://github.com/TU_USUARIO/mi-proyecto.git

# 3. Asegura que tu rama se llama main
git branch -M main

# 4. Sube y vincula (la -u remembers para siempre)
git push -u origin main
```

La `-u` es un atajo de `--set-upstream`: crea el vínculo para que después `git push` y `git pull` funcionen **sin argumentos**.

### 4. Autenticación — dos métodos

**Opción A — HTTPS con token (PAT).** La más simple. GitHub ya no acepta tu contraseña.

1. Ve a **Settings → Developer settings → Personal access tokens**
2. Genera un token con permiso `repo`
3. Al hacer `push`, GitHub pide usuario y contraseña: en **contraseña** pegas el token

```bash
git push
# Username: tu usuario
# Password: pega aquí el token (no se muestra al escribir)
```

> **🔒 Seguridad:** el PAT es una contraseña. Si lo compartes o se filtra, revócalo desde Settings. Nunca lo escribas en el código ni en un `.md`.

**Opción B — SSH (la recomendada).** Configuras la clave una vez y nunca más escribes credenciales.

```bash
# 1. Generar clave
ssh-keygen -t ed25519 -C "tu@correo.com"

# 2. Copiar la clave pública
cat ~/.ssh/id_ed25519.pub
```

3. Pégala en **GitHub → Settings → SSH and GPG keys → New SSH key**
4. Cambia el remoto a SSH:

```bash
git remote set-url origin git@github.com:TU_USUARIO/mi-proyecto.git
```

Comprobación:

```bash
ssh -T git@github.com     # debe responder "Hi TU_USUARIO!"
```

### 5. Fork y Pull Request — trabajar sin permisos

Si el repositorio es de otra persona, **no puedes hacer push**. El flujo correcto es:

```
1. Fork        → creas tu copia en tu cuenta
2. Clone       → trabajas en tu copia
3. Commit+Push → subes a tu fork
4. Pull Request → pides que integren tus cambios
```

Es el flujo estándar para contribuir a proyectos abiertos.

**Pull Request = proposing cambios, no imponerlos.** Tú proposes; quien mantiene el proyecto revisa, discute y acepta.

Al abrir un PR, escribe:

```markdown
## ¿Qué cambia?
Descripción breve de los cambios.

## ¿Por qué?
El problema que resuelve.

## ¿Cómo lo probé?
Pasos para verificar que funciona.
```

Esto no es cortesía: es lo que hace que tu trabajo sea revisado en minutos en vez de descartado.

### 6. GitHub Pages — publicar contenido sin servidor

GitHub Pages sirve HTML, CSS y JS directamente desde tu repositorio. Es lo que usan los cursos de este perfil para las demos en vivo.

```bash
# Crea una rama especial para el sitio
git switch -c gh-pages

# Copia tu contenido a la raíz de esa rama
cp -r contenido/* .

git add .
git commit -m "docs: publicar sitio estático"
git push -u origin gh-pages
```

Luego actívalo en **Settings → Pages → Source: rama `gh-pages`**. El sitio queda en `https://TU_USUARIO.github.io/REPO/`.

**El sitio se actualiza solo** en cada push. Tarda entre 1 y 10 minutos.

### 7. Otros comandos útiles

```bash
git clone https://github.com/USER/REPO.git   # descargar un proyecto
git stash                    # guardar cambios a un lado
git stash pop                # recuperarlos
git tag v1.0                 # marcar una versión
git show <hash>              # ver un commit completo
```

### 8. El ciclo completo del día a día

```bash
git pull                              # 1. Traer lo nuevo
# ... trabajas ...
git add .                             # 2. Preparar
git commit -m "feat: lo que hice"      # 3. Confirmar
git push                              # 4. Publicar
```

Cuatro pasos. Ese es el 90% de tu vida con Git.

## 🧪 Ejercicio 3 — Publicar en GitHub

**Objetivo:** publicar un repositorio completo y limpio.

1. Crea un repositorio vacío **en GitHub** (con README, para ver qué pasa)
2. Localmente:
   ```bash
   git clone https://github.com/TU_USUARIO/mi-primer-repo.git
   cd mi-primer-repo
   ```
3. Crea `.gitignore` con `node_modules/` y `.env`
4. Crea `README.md` con título, descripción e instrucciones de instalación
5. `git add .` → `git commit -m "docs: README inicial"` → `git push`
6. Verifica en el navegador que el README aparece en tu repo
7. Haz un segundo commit y confirma que el historial se ve en GitHub

**🎯 Criterio de éxito:** el repositorio existe en GitHub con README visible y al menos 2 commits, **sin** archivos que debieran estar ignorados.

**💡 Para practicar más:** crea una rama `gh-pages` con un `index.html` simple y actívala en Settings → Pages. En pocos minutos tendrás tu primer sitio publicado.

---

## 🎓 Cierre del curso

Ya tienes el flujo completo:

```
Lección 1:  crear repo, registrar cambios, ignorar lo que no va
Lección 2:  trabajar en paralelo, integrar, resolver conflictos, deshacer
Lección 3:  publicar, compartir, colaborar
```

### 🧭 Ruta siguiente sugerida

Ya que controlas Git, el siguiente paso natural es **escribir código de verdad**:

1. **Un lenguaje:** JavaScript o Python — el que se te Easier
2. **Un proyecto real:** aunque sea pequeño
3. **Publicarlo con GitHub Pages** — ya sabes hacerlo
4. **Aprender a escribir commits** — ya tienes el hábito

👉 Con ese proyecto, vuelve a la Lección 3 y haz un Pull Request a un proyecto abierto. Es la mejor forma de aprender a leer código ajeno.

---

**CC BY 4.0 · OVA educativo — Carlos Ceballos · 2026**

---

<!-- ===== PÁGINA 5 ===== -->

# 📝 Evaluación — Banco de Preguntas

1. ¿Para qué sirve `git init`?
2. Nombra las 3 áreas de Git y explica cada una.
3. ¿Cuál es el ciclo correcto para guardar un cambio?
   a) commit → add → push
   b) add → commit → push
   c) push → add → commit
4. ¿Qué hace `git status`?
5. ¿Qué es una rama y para qué sirve?
6. Diferencia `git add archivo` vs `git add .`
7. ¿Qué hace `git push` vs `git pull`?
8. ¿Cuándo usarías una rama nueva?
9. ¿Qué comando muestra el historial de commits?
10. Escribe los 4 comandos para subir un proyecto a GitHub por primera vez.

---

<!-- ===== PÁGINA 6 ===== -->

# 🧪 Ejercicio Final — Crear y subir tu primer proyecto

## Objetivo
Practicar todo el flujo: init → add → commit → rama → merge → push.

## Pasos

1. Crea una carpeta `mi-primer-repo`
```bash
mkdir mi-primer-repo && cd mi-primer-repo
git init
```

2. Agrega un archivo y haz commit
```bash
echo "# Mi primera experiencia con Git" > README.md
git add README.md
git commit -m "Primer commit"
```

3. Crea una rama y trabaja ahí
```bash
git checkout -b agregar-nota
echo "Aprendí Git" >> README.md
git add README.md
git commit -m "Agregar nota"
```

4. Une la rama a main
```bash
git checkout main
git merge agregar-nota
```

5. Súbelo a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/mi-primer-repo.git
git branch -M main
git push -u origin main
```

## Criterio de éxito
Tu repo existe en GitHub con el README actualizado.

