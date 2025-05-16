function startTimer(initialTime, display) {
  let timer = initialTime;

  const intervalId = setInterval(() => {
    timer--; // Decrementa primeiro

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    if (display) {
      display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }

    if (timer < 0) {
      clearInterval(intervalId);
      const btn = document.getElementById('verificar-resposta');
      if (btn && typeof btn.click === 'function') {
        btn.click();
      }
    }
  }, 1000);
}

module.exports = { startTimer };