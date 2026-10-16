// lesson-tracker.js — registra lectura y tiempo de cada lección
(function(){
  const id = document.body.dataset.lesson;
  if(!id) return;
  markLessonRead(id);
  const inicio = Date.now();
  window.addEventListener('beforeunload', () => {
    logLessonTime(id, Math.round((Date.now()-inicio)/1000));
  });
})();
