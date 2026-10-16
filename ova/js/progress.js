// progress.js — v2.1: progreso y estados del sidebar
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('progreso-valor');
  if(el) el.textContent = getProgressPercent() + '%';
  const bar = document.getElementById('progreso-barra');
  if(bar) bar.value = getProgressPercent();

  // Marca como completados SOLO los pasos evaluables.
  // Los enlaces de navegación (Inicio, Portafolio, Resultados…) no se atenúan.
  const p = getProgress();
  const pasos = {
    'diagnostico': () => !!p.diagnostico,
    'modulo1':     () => !!p.modulo1,
    'modulo2':     () => !!p.modulo2,
    'modulo3':     () => !!p.modulo3,
    'leccion1':    () => !!p.lecciones?.leccion1,
    'leccion2':    () => !!p.lecciones?.leccion2,
    'leccion3':    () => !!p.lecciones?.leccion3,
    'evaluacion':  () => !!p.final
  };
  document.querySelectorAll('.sidebar a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const clave = Object.keys(pasos).find(k => href.includes(k));
    if(!clave) return;                       // enlace de navegación: sin estado
    a.classList.add(pasos[clave]() ? 'done' : 'pending');
  });
});
