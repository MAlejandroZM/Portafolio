// === MÚSICA ===
let musicaIniciada = false;
const musica = document.getElementById("musicaFondo");

// reproducir música al primer clic
function iniciarMusica() {
  if (!musicaIniciada && musica) {
    musica.volume = 0.4; // volumen entre 0.0 y 1.0
    musica.play().catch(() => {
      console.log("El navegador bloqueó la reproducción automática hasta un clic del usuario.");
    });
    musicaIniciada = true;
  }
}



const nombres = ["img1", "img2", "img3", "img4", "img5", "img6"];
const cartas = [...nombres, ...nombres]; 
const tablero = document.getElementById("tablero");

cartas.sort(() => Math.random() - 0.5);

let primera = null;
let segunda = null;
let bloqueo = false;
let aciertos = 0;

let tiempoRestante = 60; // segundos
let temporizador;        // id del intervalo
let juegoTerminado = false;


cartas.forEach((nombre) => {
  const carta = document.createElement("div");
  carta.className = "carta";
  carta.dataset.nombre = nombre;

  const img = document.createElement("img");
  img.src = `img/${nombre}.jpg`;
  img.alt = nombre;

  carta.appendChild(img);
  carta.addEventListener("click", () => manejarClick(carta));
  tablero.appendChild(carta);
});

function manejarClick(carta) {
    iniciarMusica();  // empieza la música al primer clic

  if (bloqueo || carta.classList.contains("mostrar")) return;

  carta.classList.add("mostrar");

  if (!primera) {
    primera = carta;
    return;
  }

  segunda = carta;
  bloqueo = true;

  const esPar = primera.dataset.nombre === segunda.dataset.nombre;

  if (esPar) {
    aciertos++;
    limpiarSeleccion();
    if (aciertos === nombres.length) {
      setTimeout(() => alert("¡Ganaste!"), 300);
    }
  } else {
    setTimeout(() => {
      primera.classList.remove("mostrar");
      segunda.classList.remove("mostrar");
      limpiarSeleccion();
    }, 800);
  }
}

function limpiarSeleccion() {
  primera = null;
  segunda = null;
  bloqueo = false;
}

function iniciarTemporizador() {
  const tiempoEl = document.getElementById("tiempo");
  temporizador = setInterval(() => {
    tiempoRestante--;
    tiempoEl.textContent = "Tiempo restante: " + tiempoRestante + "s";

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      juegoTerminado = true;
      tiempoEl.textContent = "⏰ Se acabó el tiempo!";
      alert("¡Se acabó el tiempo! Intenta de nuevo.");
      desactivarCartas();
    }
  }, 1000);
}

function desactivarCartas() {
  const cartasEl = document.querySelectorAll(".carta");
  cartasEl.forEach(c => c.style.pointerEvents = "none");
}

// Llama al temporizador cuando inicia el juego
iniciarTemporizador();

