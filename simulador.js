let correctAnswers = 0;
let incorrectAnswers = 0;
let totalQuestions = 0;
let answeredQuestions = 0;
let questions = [];

function resetState() {
  correctAnswers = 0;
  incorrectAnswers = 0;
  answeredQuestions = 0;
  totalQuestions = 0;
  questions = [];
}

function updateStats(isCorrect) {
  if (typeof isCorrect !== 'boolean') return;
  if (isCorrect) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  answeredQuestions++;
}

function getScore() {
  return {
    correctAnswers,
    incorrectAnswers,
    totalQuestions,
    answeredQuestions,
  };
}

function setQuestions(newQuestions) {
  if (!Array.isArray(newQuestions)) {
    throw new TypeError('As perguntas devem estar em um array.');
  }

  if (newQuestions.length === 0) {
    console.log('⚠️ Nenhuma pergunta fornecida.');
    return;
  }

  questions = newQuestions;
  totalQuestions = questions.length;
}

function getQuestion(index) {
  if (index < 0 || index >= questions.length) {
    return undefined;
  }
  return questions[index];
}

module.exports = {
  resetState,
  updateStats,
  getScore,
  setQuestions,
  getQuestion,
};
