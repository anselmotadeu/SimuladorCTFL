var correctAnswers = 0;
var incorrectAnswers = 0;
var totalQuestions = 0;
var answeredQuestions = 0;

// Função para carregar as perguntas do arquivo JSON com base no exame selecionado
function loadQuestions() {
    var selectedExams = document.querySelectorAll('input[name="exam"]:checked');
    var selectedExamValues = Array.from(selectedExams).map(exam => exam.value);

    // Limpar perguntas existentes antes de carregar novas perguntas
    document.getElementById('question').innerHTML = '';

    // Se nenhum exame estiver selecionado, não carregar perguntas
    if (selectedExamValues.length === 0) {
        return;
    }

     // Iniciar o timer aqui
    var duration = 60 * 60; // 5 minutos, por exemplo
    var display = document.querySelector('#countdown'); // Substitua '#time' pelo ID do elemento HTML onde o tempo restante será exibido
    startTimer(duration, display);

    // Carregar perguntas correspondentes aos exames selecionados
    selectedExamValues.forEach(exam => {
        fetch(exam + '.json')
            .then(response => response.json())
            .then(data => {
                questions = data;
                totalQuestions = questions.length;
                var questionsDiv = document.getElementById('question');
                for (var i = 0; i < questions.length; i++) {
                    var questionDiv = document.createElement('div');
                    questionDiv.innerHTML = '<h2 style="font-size: 16px;">' + questions[i].question + '</h2>';
                    for (var j = 0; j < questions[i].options.length; j++) {
                        questionDiv.innerHTML += '<input type="radio" name="option' + i + '" value="' + j + '">' + questions[i].options[j] + '<br>';
                    }
                    questionsDiv.appendChild(questionDiv);
                }
                document.getElementById('counter').innerText = '0/' + totalQuestions;
            });
    });
}

// Função para verificar todas as respostas de uma só vez
function checkAllAnswers() {
    var options = document.querySelectorAll('input[type="radio"]:checked');
    correctAnswers = 0;
    incorrectAnswers = 0;
    for (var i = 0; i < options.length; i++) {
        var questionIndex = parseInt(options[i].name.replace('option', ''));
        var optionIndex = parseInt(options[i].value);
        if (optionIndex === questions[questionIndex].answer) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
    }
    answeredQuestions = correctAnswers + incorrectAnswers;
    document.getElementById('counter').innerText = answeredQuestions + '/' + totalQuestions;
    document.getElementById('score').innerHTML = '<b>Respostas corretas:</b> <span style="color: green;">' + correctAnswers + '</span><br><b>Respostas incorretas:</b> <span style="color: red;">' + incorrectAnswers + '</span>';
    if (answeredQuestions >= totalQuestions) {
        showResultModal();
    }
}

// Modificar a função checkAnswer para chamar checkAllAnswers
function checkAnswer() {
    checkAllAnswers();
}

// Função para carregar a próxima pergunta
function loadNextQuestion() {
    var questionDiv = document.getElementById('question');
    questionDiv.innerHTML = ''; // Limpar a div da pergunta anterior
    if (answeredQuestions < totalQuestions) {
        var question = questions[answeredQuestions];
        var questionHTML = '<h2>' + question.question + '</h2>';
        for (var j = 0; j < question.options.length; j++) {
            questionHTML += '<input type="radio" name="option' + answeredQuestions + '" value="' + j + '">' + question.options[j] + '<br>';
        }
        questionDiv.innerHTML = questionHTML;
    }
}

// Função para exibir o modal de resultado e marcar respostas corretas e incorretas
function showResultModal() {
    var modal = document.getElementById('resultModal');
    var resultMessage = document.getElementById('resultMessage');
    var percentage = (correctAnswers / totalQuestions) * 100;
    var resultText = 'Você acertou ' + correctAnswers + ' de ' + totalQuestions + ' perguntas.';
    resultText += ' Seu percentual de acerto é ' + percentage.toFixed(2) + '%.';

    var answersHTML = '<ul>';
    for (var i = 0; i < totalQuestions; i++) {
        var question = questions[i];
        var selectedOptionIndex = parseInt(document.querySelector('input[name="option' + i + '"]:checked').value);
        var correctOptionIndex = question.answer;

        answersHTML += '<li>';
        answersHTML += 'Questão ' + (i + 1) + ': ' + question.question + '<br>';
        
        for (var j = 0; j < question.options.length; j++) {
            var option = question.options[j];
            if (j === correctOptionIndex) {
                if (selectedOptionIndex === correctOptionIndex) {
                    answersHTML += '<span style="color: green; font-weight: bold;">' + option + ' (Resposta Correta)</span>';
                } else {
                    answersHTML += '<span style="color: green; font-weight: bold;">' + option + ' (Resposta Correta)</span>';
                }
            } else if (j === selectedOptionIndex) {
                answersHTML += '<span style="color: red; font-weight: bold;">' + option + ' (Opção Selecionada)</span>';
            } else {
                answersHTML += option;
            }
            answersHTML += '<br>';
        }

        answersHTML += '</li>';
    }
    answersHTML += '</ul>';

    resultMessage.innerHTML = resultText + '<br><br>' + answersHTML;
    modal.style.display = 'block'; // Garantir que o modal seja exibido

    // Temporizador para exibir a mensagem de aprovação ou reprovação após 3 segundos
    setTimeout(function () {
        var approvalMessage = document.createElement('p');
        if (percentage >= 60) {
            approvalMessage.style.color = 'green';
            approvalMessage.innerHTML = '<strong>Você está aprovado!</strong>';
        } else {
            approvalMessage.style.color = 'red';
            approvalMessage.innerHTML = '<strong>Você foi reprovado!</strong>';
        }
        resultMessage.appendChild(approvalMessage);

        // Animação para fazer a mensagem pulsar na tela
        setInterval(function () {
            approvalMessage.style.opacity = (approvalMessage.style.opacity === '0' ? '1' : '0');
        }, 500); // Troca a opacidade a cada 0.5 segundos (500 milissegundos)
    }, 3000);
}

// Função para fechar o modal
function closeModal() {
    var modal = document.getElementById('resultModal');
    modal.style.display = 'none';
}

var timerIntervalId = null; // Variável global para armazenar o ID do intervalo do timer

// Função para iniciar o timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    timerIntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            // Automatizar o clique no botão "Verificar Resposta"
            document.getElementById("verificar-resposta").click();
        }
    }, 1000);
    return timerIntervalId;
}

// Iniciar o timer ao carregar a página
/* window.onload = function () {
    var sixtyMinutes = 60 * 60,
        display = document.querySelector('#countdown');
    startTimer(sixtyMinutes, display);
}; */

// Seleciona todos os checkboxes
var examCheckboxes = document.querySelectorAll('input[name="exam"]');

// Seleciona todos os checkboxes
var examCheckboxes = document.querySelectorAll('input[name="exam"]');

// Adiciona um evento de mudança a cada checkbox
examCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Se o checkbox foi selecionado
        if (this.checked) {
            // Desmarcar todos os outros checkboxes
            examCheckboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });

            // Limpar o intervalo do timer anterior
            if (timerIntervalId !== null) {
                clearInterval(timerIntervalId);
            }

            // Carregar as perguntas para o exame selecionado
            loadQuestions();
        }
    });
});