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
