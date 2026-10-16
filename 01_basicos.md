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