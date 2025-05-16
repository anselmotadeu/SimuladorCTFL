let intervalId;

function startTimer(tempo, display) {
  // Evita múltiplos timers
  if (intervalId) clearInterval(intervalId);

  if (!display || typeof display.textContent === 'undefined') return;

  // Tempo inválido ou negativo: mostra imediatamente 00:00 e clica no botão
  if (tempo <= 0) {
    display.textContent = '00:00';
    const btn = document.getElementById('verificar-resposta');
    if (btn) btn.click?.();
    return;
  }

  function updateDisplay(t) {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  let timer = tempo;
  updateDisplay(timer); // Renderiza imediatamente

  intervalId = setInterval(() => {
    timer--;
    updateDisplay(timer);

    if (timer <= 0) {
      clearInterval(intervalId);
      const btn = document.getElementById('verificar-resposta');
      if (btn) btn.click?.();
    }
  }, 1000);
}

module.exports = { startTimer };
