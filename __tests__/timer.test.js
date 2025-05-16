global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

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
          <span id="timerDisplay"></span>
          <button id="verificar-resposta"></button>
        </body>
      </html>
    `);

    window = dom.window;
    document = dom.window.document;
    display = document.getElementById('timerDisplay');
    btn = document.getElementById('verificar-resposta');

    // Mock global window/document
    global.window = window;
    global.document = document;

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    delete global.window;
    delete global.document;
  });

//   it('deve atualizar o tempo corretamente', () => {
//     startTimer(61, display);
//     jest.advanceTimersByTime(1000);
//     expect(display.textContent).toBe('01:01');
//     jest.advanceTimersByTime(1000);
//     expect(display.textContent).toBe('01:00');
//     console.log(`🕒 2s: ${display.textContent}`);
//   });

  it('deve parar ao final do tempo', () => {
    startTimer(1, display);
    jest.advanceTimersByTime(1000);
    expect(display.textContent).toBe('00:00');
    console.log('🛑 Timer finalizado corretamente');
  });

  it('não deve lançar erro se display for null', () => {
    expect(() => startTimer(10, null)).not.toThrow();
    console.log('⚠️ startTimer() ignorou display null sem erro');
  });

  it('deve exibir 00:08 corretamente', () => {
    startTimer(9, display);
    jest.advanceTimersByTime(1000);
    expect(display.textContent).toBe('00:08');
    console.log('⏱️ Timer exibiu corretamente tempo com 1 dígito');
  });

  it('deve renderizar 00:00 imediatamente para tempo 0', () => {
    startTimer(0, display);
    jest.advanceTimersByTime(0);
    expect(display.textContent).toBe('00:00');
    console.log('⏱️ Timer iniciou direto em 00:00 com tempo 0');
  });

  it('deve renderizar 00:00 para tempo negativo', () => {
    startTimer(-5, display);
    jest.advanceTimersByTime(0);
    expect(display.textContent).toBe('00:00');
    console.log('⏱️ Timer tratou tempo negativo corretamente');
  });

  it('deve garantir que apenas um timer esteja rodando', () => {
    startTimer(5, display);
    startTimer(10, display); // segundo deve sobrescrever o primeiro
    jest.advanceTimersByTime(1000);
    expect(display.textContent).toBe('00:09');
    console.log('⛔ Timer duplicado evitado com sucesso');
  });

  it('deve clicar no botão de resposta ao finalizar o tempo', () => {
    const clickSpy = jest.fn();
    btn.addEventListener('click', clickSpy);
    startTimer(0, display);
    jest.advanceTimersByTime(1000);
    expect(clickSpy).toHaveBeenCalled();
    console.log('✅ Botão de verificação foi clicado automaticamente');
  });
});
