const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const { startTimer } = require('../timer');

describe('startTimer()', () => {
  let window;
  let document;
  let display;
  let btn;

  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <span id="timerDisplay">01:01</span>
          <button id="verificar-resposta">Verificar</button>
        </body>
      </html>
    `);

    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;

    display = document.getElementById('timerDisplay');
    btn = document.getElementById('verificar-resposta');

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    window.close();
  });

  it('deve atualizar o tempo corretamente', () => {
    startTimer(62, display); // Ajustado para 62s para evitar sobreposição com 61s

    jest.advanceTimersByTime(1000); // 1s
    expect(display.textContent).toBe('01:01');

    jest.advanceTimersByTime(1000); // 2s
    expect(display.textContent).toBe('01:00');

    console.log(`🕒 2s: ${display.textContent}`);
  });

  it('deve parar ao final do tempo', () => {
    startTimer(1, display);

    jest.advanceTimersByTime(1000); // 1s
    expect(display.textContent).toBe('00:00');

    console.log('🛑 Timer finalizado corretamente');
  });
});