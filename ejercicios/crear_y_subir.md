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
