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