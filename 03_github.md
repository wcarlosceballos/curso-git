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