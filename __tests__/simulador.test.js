const simulador = require('../simulador');

describe('simulador.js', () => {
  beforeEach(() => simulador.resetState());

  it('deve registrar acertos e erros corretamente', () => {
    simulador.updateStats(true);  // acerto
    simulador.updateStats(false); // erro
    const score = simulador.getScore();
    expect(score.correctAnswers).toBe(1);
    expect(score.incorrectAnswers).toBe(1);
    expect(score.answeredQuestions).toBe(2);
    console.log('📊 Estatísticas validadas');
  });

  it('deve definir e retornar uma pergunta', () => {
    const questions = [{ question: '1. O que é teste?', options: ['Op1', 'Op2'], answer: 0 }];
    simulador.setQuestions(questions);
    const q = simulador.getQuestion(0);
    expect(q.question).toContain('O que é teste?');
    console.log('✅ Pergunta retornada corretamente');
  });

  it('deve retornar undefined para índice inválido', () => {
    simulador.setQuestions([{ question: 'Pergunta 1', options: [], answer: 0 }]);
    const result = simulador.getQuestion(99);
    expect(result).toBeUndefined();
    console.log('⚠️ Índice inválido tratado com sucesso');
  });

  it('deve resetar todos os dados com resetState()', () => {
    simulador.updateStats(true);
    simulador.updateStats(false);
    simulador.setQuestions([{ question: 'Pergunta', options: [], answer: 0 }]);
    simulador.resetState();
    expect(simulador.getScore()).toEqual({ correctAnswers: 0, incorrectAnswers: 0, answeredQuestions: 0, totalQuestions: 0, });
    expect(simulador.getQuestion(0)).toBeUndefined();
    console.log('🔁 resetState() executado corretamente');
  });

  it('deve retornar undefined para índice inválido', () => {
    simulador.setQuestions([{ question: 'Q1', options: ['A', 'B'], answer: 0 }]);
    const result = simulador.getQuestion(5);
    expect(result).toBeUndefined();
    console.log('⚠️ Retornou undefined para índice inválido');
  });

  it('deve ignorar setQuestions com array vazio', () => {
    simulador.setQuestions([]);
    expect(simulador.getQuestion(0)).toBeUndefined();
    console.log('✅ setQuestions() ignorou array vazio corretamente');
  });  

  it('deve acumular acertos e erros corretamente', () => {
    simulador.updateStats(true);
    simulador.updateStats(false);
    simulador.updateStats(true);
    const score = simulador.getScore();
    expect(score.correctAnswers).toBe(2);
    expect(score.incorrectAnswers).toBe(1);
    expect(score.answeredQuestions).toBe(3);
    console.log('📈 Estatísticas acumuladas corretamente');
  });

  it('deve retornar undefined para índice negativo em getQuestion()', () => {
    simulador.setQuestions([{ question: 'Teste', options: [], answer: 0 }]);
    const q = simulador.getQuestion(-1);
    expect(q).toBeUndefined();
    console.log('⚠️ Índice negativo tratado com sucesso');
  });

  it('deve lançar erro ao passar valor não array para setQuestions()', () => {
    expect(() => simulador.setQuestions("texto")).toThrow();
    expect(() => simulador.setQuestions(123)).toThrow();
    console.log('❌ setQuestions() rejeitou valores não array');
  });

  it('deve ignorar updateStats com valor indefinido ou nulo', () => {
    simulador.resetState();
    simulador.updateStats(undefined);
    simulador.updateStats(null);
    const score = simulador.getScore();
    expect(score.answeredQuestions).toBe(0);
    expect(score.correctAnswers).toBe(0);
    expect(score.incorrectAnswers).toBe(0);
    console.log('⚠️ updateStats ignorou valores inválidos');
  });

});
