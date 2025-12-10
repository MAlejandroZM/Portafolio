// --- VARIABLES DE ESTADO ---
let questions = [];       // Array para guardar todas las preguntas
let currentQuestionIndex = 0; // En qué pregunta vamos
let score = 0;            // Puntaje total

// --- REFERENCIAS AL DOM ---
const creatorView = document.getElementById('creator-view');
const gameView = document.getElementById('game-view');
const resultView = document.getElementById('result-view');
const questionCountSpan = document.getElementById('question-count');

// --- LÓGICA DE CREACIÓN ---

function saveQuestion() {
    // 1. Obtener valores
    const qText = document.getElementById('input-question').value;
    const opts = [
        document.getElementById('opt-0').value,
        document.getElementById('opt-1').value,
        document.getElementById('opt-2').value,
        document.getElementById('opt-3').value
    ];
    
    // Obtener radio seleccionado
    let correctIdx = null;
    document.getElementsByName('correct-answer').forEach(radio => {
        if(radio.checked) correctIdx = parseInt(radio.value);
    });

    // Validar
    if(qText.trim() === "" || opts.some(o => o.trim() === "")) {
        alert("Por favor completa la pregunta y todas las opciones.");
        return;
    }

    // 2. Crear objeto pregunta y guardarlo en el array
    const newQuestion = {
        question: qText,
        options: opts,
        correct: correctIdx
    };
    
    questions.push(newQuestion);

    // 3. Actualizar interfaz
    questionCountSpan.innerText = questions.length;
    clearInputs();
    
    // Feedback visual pequeño
    alert("¡Pregunta guardada! Puedes añadir otra o empezar a jugar.");
}

function clearInputs() {
    document.getElementById('input-question').value = "";
    document.getElementById('opt-0').value = "";
    document.getElementById('opt-1').value = "";
    document.getElementById('opt-2').value = "";
    document.getElementById('opt-3').value = "";
    // Resetear radio al primero
    document.getElementsByName('correct-answer')[0].checked = true;
}

function startGame() {
    if (questions.length === 0) {
        alert("Añade al menos una pregunta antes de jugar.");
        return;
    }
    
    // Preparar el juego
    currentQuestionIndex = 0;
    score = 0;
    
    // Cambio de vista
    creatorView.classList.add('hidden');
    gameView.classList.remove('hidden');
    
    loadQuestion();
}

// --- LÓGICA DEL JUEGO ---

function loadQuestion() {
    // Restaurar color de fondo por si venimos de una respuesta anterior
    document.body.style.backgroundColor = "#f2f2f2"; 
    
    const currentQ = questions[currentQuestionIndex];
    
    // Actualizar textos
    document.getElementById('display-question').innerText = currentQ.question;
    document.getElementById('current-q-num').innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    document.getElementById('current-score').innerText = `Puntos: ${score}`;

    for(let i=0; i<4; i++) {
        document.getElementById(`btn-text-${i}`).innerText = currentQ.options[i];
    }
    
    // Habilitar botones nuevamente
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach(btn => btn.disabled = false);
}

function handleAnswer(selectedIndex) {
    const currentQ = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.game-btn');
    
    // Deshabilitar botones para evitar doble click
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQ.correct) {
        // CORRECTO
        document.body.style.backgroundColor = "#26890c"; // Verde
        score += 1000; // Sumar puntos
    } else {
        // INCORRECTO
        document.body.style.backgroundColor = "#e21b3c"; // Rojo
    }
    
    // Esperar 1.5 segundos y pasar a la siguiente pregunta
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalResults();
    }
}

// --- LÓGICA DE RESULTADOS ---

function showFinalResults() {
    gameView.classList.add('hidden');
    resultView.classList.remove('hidden');
    document.body.style.backgroundColor = "#46178f"; // Morado Kahoot final

    document.getElementById('final-score-display').innerText = score;
    
    const feedback = document.getElementById('feedback-text');
    const maxScore = questions.length * 1000;
    
    if (score === maxScore) {
        feedback.innerText = "¡PERFECTO! Eres una leyenda.";
    } else if (score > maxScore / 2) {
        feedback.innerText = "¡Muy bien! Casi perfecto.";
    } else {
        feedback.innerText = "Necesitas practicar más...";
    }
}

function resetGame() {
    questions = [];
    score = 0;
    currentQuestionIndex = 0;
    questionCountSpan.innerText = "0";
    clearInputs();
    
    document.body.style.backgroundColor = "#f2f2f2";
    resultView.classList.add('hidden');
    creatorView.classList.remove('hidden');
}