// storage.js — v2.0: registro completo de avance
const KEY = 'sdia_progress';
function getProgress(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {} }catch{ return {} } }
function saveProgress(d){ localStorage.setItem(KEY, JSON.stringify(d)); }
function logDiagnostico(score, falencias){ const p=getProgress(); p.diagnostico={score, falencias}; saveProgress(p); }
function markLessonRead(id){ const p=getProgress(); p.lecciones=p.lecciones||{}; p.lecciones[id]=true; saveProgress(p); }
function logLessonTime(id, seg){ const p=getProgress(); p.tiempos=p.tiempos||{}; p.tiempos[id]=(p.tiempos[id]||0)+seg; saveProgress(p); }
function setModuleDone(m){ const p=getProgress(); p['modulo'+m]=true; saveProgress(p); }
function setModuleScore(m, s){ const p=getProgress(); p['score'+m]=s; saveProgress(p); }
function savePortfolio(key, val){ const p=getProgress(); p.portafolio=p.portafolio||{}; p.portafolio[key]=val; saveProgress(p); }
function setFinalEval(s, p){ const d=getProgress(); d.final={score:s, percent:p}; saveProgress(d); }
function getProgressPercent(){
  const p=getProgress(); let d=0;
  if(p.diagnostico) d++;
  if(p.modulo1) d++; if(p.modulo2) d++; if(p.modulo3) d++;
  if(p.lecciones && Object.keys(p.lecciones).length>=3) d++;
  return Math.round(d/5*100);
}
function exportJSON(){ return JSON.stringify(getProgress(), null, 2); }
