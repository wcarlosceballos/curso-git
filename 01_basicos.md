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
