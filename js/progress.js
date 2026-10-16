// progress.js — v2.0: progreso, estados de sidebar y exportación
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('progreso-valor');
  if(el) el.textContent = getProgressPercent() + '%';
  const bar = document.getElementById('progreso-barra');
  if(bar) bar.value = getProgressPercent();
  // estados del sidebar
  const p = getProgress();
  document.querySelectorAll('.sidebar a').forEach(a => {
    const href = a.getAttribute('href') || '';
    let done = false;
    if(href.includes('diagnostico') && p.diagnostico) done = true;
    if(href.includes('modulo1') && p.modulo1) done = true;
    if(href.includes('modulo2') && p.modulo2) done = true;
    if(href.includes('modulo3') && p.modulo3) done = true;
    if(href.includes('leccion1') && p.lecciones?.leccion1) done = true;
    if(href.includes('leccion2') && p.lecciones?.leccion2) done = true;
    if(href.includes('leccion3') && p.lecciones?.leccion3) done = true;
    a.classList.add(done ? 'done' : 'pending');
  });
});
