import { startTimer } from './simulador';

let correctAnswers = 0;
let incorrectAnswers = 0;
let totalQuestions = 0;
let answeredQuestions = 0;
let questions = [];
let timerIntervalId = null;

function loadQuestions() {
    const selectedExams = document.querySelectorAll('input[name="exam"]:checked');
    const selectedExamValues = Array.from(selectedExams).map(exam => exam.value);
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const verifyButton = document.getElementById('verificar-resposta');
    const messageDiv = document.getElementById('message');

    questionDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
    verifyButton.disabled = true;
    messageDiv.classList.add('hidden');

    if (selectedExamValues.length === 0) {
        questionDiv.innerHTML = '<p class="text-gray-600">Por favor, selecione um exame para começar.</p>';
        return;
    }

    if (timerIntervalId) clearInterval(timerIntervalId);

    const duration = 60 * 60;
    const display = document.querySelector('#countdown');
    timerIntervalId = startTimer(duration, display);

    questions = [];
    let loadedExams = 0;

    // biome-ignore lint/complexity/noForEach: <explanation>
    selectedExamValues.forEach(exam => {
        // Ajuste no caminho do fetch para lidar com arquivos locais
        fetch(`./${exam}.json`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar o exame');
                return response.json();
            })
            .then(data => {
                questions = questions.concat(data);
                loadedExams++;
                if (loadedExams === selectedExamValues.length) {
                    totalQuestions = questions.length;
                    answeredQuestions = 0;
                    correctAnswers = 0;
                    incorrectAnswers = 0;
                    document.getElementById('counter').innerText = `0/${totalQuestions}`;
                    document.getElementById('progressBar').style.width = '0%';
                    document.getElementById('score').classList.add('hidden');
                    loadNextQuestion();
                }
            })
            .catch(error => {
                questionDiv.innerHTML = '<p class="text-red-600">Erro ao carregar as perguntas. Certifique-se de que os arquivos JSON estão no mesmo diretório e que você está executando a aplicação em um servidor local (ex.: Live Server no VSCode ou um servidor HTTP simples).</p>';
                console.error(error);
            });
    });
}

function loadNextQuestion() {
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const verifyButton = document.getElementById('verificar-resposta');

    if (answeredQuestions >= totalQuestions) {
        showResultModal();
        return;
    }

    const question = questions[answeredQuestions];
    // Removendo o número da string da pergunta e usando apenas o índice
    const questionText = question.question.replace(/^\d+\.\s*/, '');
    questionDiv.innerHTML = `<h2 class="text-lg font-semibold mb-4">${answeredQuestions + 1}. ${questionText}</h2>`;

    optionsDiv.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionHtml = `
            <label class="option-label flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                <input type="radio" name="option${answeredQuestions}" value="${index}" class="h-4 w-4 text-blue-600" aria-label="Opção ${index + 1}">
                <span>${option}</span>
            </label>`;
        optionsDiv.innerHTML += optionHtml;
    });

    verifyButton.disabled = true;
    // biome-ignore lint/complexity/noForEach: <explanation>
    optionsDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', () => {
            verifyButton.disabled = false;
        });
    });

    document.getElementById('counter').innerText = `${answeredQuestions}/${totalQuestions}`;
    document.getElementById('progressBar').style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
}

function checkAnswer() {
    const selectedOption = document.querySelector(`input[name="option${answeredQuestions}"]:checked`);
    const messageDiv = document.getElementById('message');

    if (!selectedOption) {
        messageDiv.classList.remove('hidden');
        messageDiv.innerHTML = 'Por favor, selecione uma opção.';
        return;
    }

    const questionIndex = answeredQuestions;
    const optionIndex = Number.parseInt(selectedOption.value);
    const correctOptionIndex = questions[questionIndex].answer;

    if (optionIndex === correctOptionIndex) {
        correctAnswers++;
        messageDiv.classList.remove('hidden');
        messageDiv.classList.remove('bg-red-100', 'text-red-800');
        messageDiv.classList.add('bg-green-100', 'text-green-800');
        messageDiv.innerHTML = 'Resposta correta!';
    } else {
        incorrectAnswers++;
        messageDiv.classList.remove('hidden');
        messageDiv.classList.remove('bg-green-100', 'text-green-800');
        messageDiv.classList.add('bg-red-100', 'text-red-800');
        messageDiv.innerHTML = `Resposta incorreta! A correta é: ${questions[questionIndex].options[correctOptionIndex]}`;
    }

    answeredQuestions++;
    document.getElementById('counter').innerText = `${answeredQuestions}/${totalQuestions}`;
    document.getElementById('progressBar').style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
    document.getElementById('score').classList.remove('hidden');
    document.getElementById('correct').innerText = correctAnswers;
    document.getElementById('incorrect').innerText = incorrectAnswers;

    setTimeout(() => {
        messageDiv.classList.add('hidden');
        loadNextQuestion();
    }, 1000);
}

function showResultModal() {
    const modal = document.getElementById('resultModal');
    const resultMessage = document.getElementById('resultMessage');
    const percentage = (correctAnswers / totalQuestions) * 100;
    const resultText = `
        <p class="text-lg font-semibold">Resultado Final</p>
        <p>Você acertou ${correctAnswers} de ${totalQuestions} perguntas.</p>
        <p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;

    let answersHTML = '<h3 class="mt-4 font-semibold">Revisão das Respostas:</h3><ul class="mt-2">';
    questions.forEach((question, i) => {
        const selectedOption = document.querySelector(`input[name="option${i}"]:checked`);
        const selectedOptionIndex = selectedOption ? Number.parseInt(selectedOption.value) : -1;
        const correctOptionIndex = question.answer;
        const questionText = question.question.replace(/^\d+\.\s*/, '');

        answersHTML += `<li class="mb-4">
            <p class="font-medium">${i + 1}. ${questionText}</p>`;
        question.options.forEach((option, j) => {
            let style = '';
            let label = '';
            if (j === correctOptionIndex) {
                style = 'text-green-600 font-bold';
                label = selectedOptionIndex === correctOptionIndex ? ' (Correta)' : ' (Correta)';
            } else if (j === selectedOptionIndex && selectedOptionIndex !== correctOptionIndex) {
                style = 'text-red-600 font-bold';
                label = ' (Selecionada)';
            }
            answersHTML += `<p class="${style}">${option}${label}</p>`;
        });
        answersHTML += '</li>';
    });
    answersHTML += '</ul>';

    resultMessage.innerHTML = resultText + answersHTML;

    setTimeout(() => {
        const approvalMessage = document.createElement('p');
        approvalMessage.className = 'mt-4 text-lg font-bold pulse';
        if (percentage >= 60) {
            approvalMessage.className += ' text-green-600';
            approvalMessage.innerHTML = 'Você está aprovado!';
        } else {
            approvalMessage.className += ' text-red-600';
            approvalMessage.innerHTML = 'Você foi reprovado!';
        }
        resultMessage.appendChild(approvalMessage);
    }, 3000);

    modal.classList.remove('hidden');
    if (timerIntervalId) clearInterval(timerIntervalId);
}

function closeModal() {
    document.getElementById('resultModal').classList.add('hidden');
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
function startTimer(duration, display) {
    let timer = duration;
    const intervalId = setInterval(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (--timer < 0) {
            clearInterval(intervalId);
            document.getElementById('verificar-resposta').click();
        }
    }, 1000);
    return intervalId;
}

// biome-ignore lint/complexity/noForEach: <explanation>
document.querySelectorAll('input[name="exam"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            document.querySelectorAll('input[name="exam"]').forEach(otherCheckbox => {
                if (otherCheckbox !== this) otherCheckbox.checked = false;
            });
            loadQuestions();
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !document.getElementById('verificar-resposta').disabled) {
        checkAnswer();
    }
    if (event.key === 'Escape') {
        closeModal();
    }
});