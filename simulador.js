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
  questions = newQuestions;
  totalQuestions = questions.length;
}

function getQuestion(index) {
  return questions[index];
}

module.exports = {
  resetState,
  updateStats,
  getScore,
  setQuestions,
  getQuestion,
};
