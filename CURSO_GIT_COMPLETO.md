<!-- ===== PÁGINA 1 ===== -->

# 📘 Curso: Git desde Cero

Aprende a usar Git tú mismo, con el mismo enfoque pedagógico que el curso anterior.

## 🎯 Objetivo
Manejar tu propio repositorio local y compartirlo en GitHub.

## 📅 Ruta (3 lecciones)
- `01_basicos.md` — qué es Git, áreas, primer commit
- `02_ramas.md` — ramas y merge
- `03_github.md` — remoto, push, pull, clonar

## ✅ Evaluación
- `evaluacion/preguntas.md`

## 🧪 Ejercicio final
- `ejercicios/crear_y_subir.md`


---

<!-- ===== PÁGINA 2 ===== -->

# 📗 Lección 1 — Git Básico

## ¿Qué es Git?
Sistema de **control de versiones**: registra cada cambio de tus archivos.

## Las 3 áreas
1. **Working directory** → donde editas
2. **Staging area** → donde preparas (`git add`)
3. **Repository** → commits guardados (`git commit`)

## Comandos clave
```bash
git init              # lo primero, una sola vez
git status            # ver estado
git add archivo.ext   # preparar ese archivo
git add .             # preparar todo
git commit -m "msg"   # guardar
git log --oneline     # historial
```

## Ejemplo
```bash
mkdir mi-proyecto && cd mi-proyecto
git init
echo "hola" > hola.txt
git add hola.txt
git commit -m "Primer commit"
git log --oneline
```


---

<!-- ===== PÁGINA 3 ===== -->

# 📗 Lección 2 — Ramas y Merge

## ¿Qué es una rama?
Una **línea de trabajo paralela** sin tocar `main`.

## Comandos
```bash
git branch                       # ver ramas
git checkout -b mi-rama          # crear y cambiar
git checkout main                # volver a main
git merge mi-rama                # unir cambios
git branch -d mi-rama            # borrar rama (opcional)
```

## Flujo típico
```bash
git checkout -b mejorar-readme
# editas README.md
git add README.md
git commit -m "Mejorar README"
git checkout main
git merge mejorar-readme
```


---

<!-- ===== PÁGINA 4 ===== -->

# 📗 Lección 3 — GitHub y Remotos

## Conectar tu carpeta local con GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/REPO.git
git branch -M main
git push -u origin main
```

## Comandos del día a día
| Comando | Qué hace |
|---|---|
| `git push` | Sube commits |
| `git pull` | Trae cambios del remoto |
| `git clone <url>` | Descargar un repo |
| `git remote -v` | Ver remotos |

## Ciclo completo
```bash
git add .
git commit -m "mensaje"
git push
```


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
