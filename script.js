const audio = document.getElementById("audio");
const btnAudio = document.getElementById("btnAudio");
const iconAudio = document.getElementById("iconAudio");
const volumeControl = document.getElementById("volumeControl");

// Reproduce o pausa la música al hacer clic en el botón
btnAudio.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        iconAudio.src = "Recursos/icons/pause.svg"; // Cambia al ícono de pausa
    } else {
        audio.pause();
        iconAudio.src = "Recursos/icons/play.svg"; // Cambia al ícono de play
    }
});

// Ajustar volumen según la barra de volumen
volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

let nombreUsuario = "";
let preguntas = [];
let nivelSeleccionado = "";
let puntaje = 0;
let preguntaActual = 0;
let timer;
let intentos = 0; // Número de intentos
let respuestasUsuario = []; // Guardar respuestas del usuario





// Preguntas por nivel
const preguntasPorNivel = {
    facil: [
        {
            pregunta: "¿Qué es el contraste en diseño gráfico?",
            opciones: ["La unión de colores similares", "La diferencia entre elementos visuales", "El uso de una sola paleta de colores", "La repetición de formas"],
            correcta: 1,
            audio: "Recursos/audio/"
        },
        {
            pregunta: "¿Cuál es un ejemplo de tipografía sans-serif?",
            opciones: ["Times New Roman", "Arial", "Georgia", "Garamond"],
            correcta: 1,
        },

        {
            pregunta: "¿Qué herramienta se usa comúnmente para diseño vectorial?",
            opciones: ["Adobe Photoshop", "Adobe Illustrator", "Autodesk Maya", "Blender"],
            correcta: 1,
        },

        {
            pregunta: "¿Qué es la jerarquía visual?",
            opciones: ["La organización de elementos por tamaño y peso visual", "El uso de colores complementarios", "La alineación perfecta de textos", "La repetición de patrones"],
            correcta: 0,
        },

        {
            pregunta: "¿Qué principio del diseño utiliza líneas, formas o colores para dirigir la atención del espectador?",
            opciones: ["Movimiento", "Proximidad", "Equilibrio", "Contraste"],
            correcta: 0,
        },
    ],

    medio: [
        {
            pregunta: "¿Qué combinación de colores es un ejemplo de esquema análogo?",
            opciones: ["Azul y naranja", "Verde y amarillo", "Azul y amarillo", "Rojo y verde"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta

        },
        {
            pregunta: "¿Qué es la proximidad en diseño gráfico?",
            opciones: ["Agrupar elementos relacionados cerca entre sí", "Usar colores cálidos en el diseño", "Utilizar formas geométricas", "Mantener una alineación central"],
            correcta: 0,
            audio: "audio1.mp3" // Audio específico para esta pregunta

        },
        {
            pregunta: "¿Qué es la \"proximidad\" en diseño gráfico?",
            opciones: ["Agrupar elementos relacionados cerca entre sí.", "Usar colores cálidos en el diseño.", "Utilizar formas geométricas.", "Mantener una alineación central."],
            correcta: 0,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Qué formato de imagen es mejor para gráficos con transparencias?",
            opciones: ["JPEG", "BMP", "PNG", "TIFF"],
            correcta: 2,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Cuál de estos programas es un software de modelado 3D?",
            opciones: ["Figma", "Blender", "InDesign", "Canva"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
    ],
    

    dificil: [
        {
            pregunta: "¿Qué es el espacio negativo en diseño gráfico?",
            opciones: ["El espacio entre márgenes y bordes", "El área en blanco que rodea a los elementos del diseño", "Un espacio lleno de detalles decorativos", "Un espacio usado exclusivamente para texto"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Qué es un diseño asimétrico?",
            opciones: ["Un diseño equilibrado pero no idéntico en ambos lados", "Un diseño caótico y sin orden", "Un diseño que utiliza simetría perfecta", "Un diseño con patrones repetitivos"],
            correcta: 0,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Qué es el enfoque gestalt en diseño?",
            opciones: ["Diseñar exclusivamente con tipografías sans-serif", "La percepción de un todo como más que la suma de sus partes", "La utilización de colores monocromáticos", "Un método de diseño para revistas impresas"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Qué es el kerning en tipografía?",
            opciones: ["El espacio entre palabras", "El ajuste del espacio entre dos caracteres específicos", "La alineación del texto en párrafos", "La altura de las líneas de texto"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
        {
            pregunta: "¿Qué principio asegura que un diseño se mantenga funcional a través de varias plataformas y contextos?",
            opciones: ["Unidad", "Escalabilidad", "Contraste", "Repetición"],
            correcta: 1,
            audio: "audio1.mp3" // Audio específico para esta pregunta
        },
    ]
};


// Función para mostrar la pregunta y reproducir el audio
function mostrarPregunta() {
    const pregunta = preguntasPorNivel.facil[preguntaActual]; // Obtén la pregunta actual
    const preguntaTexto = pregunta.pregunta;
    const opciones = pregunta.opciones;
    const audioRuta = pregunta.audio;

    // Imprimir la pregunta en la consola (puedes mostrarla en el HTML si lo deseas)
    console.log(preguntaTexto);
    opciones.forEach((opcion, index) => {
        console.log(`${index + 1}. ${opcion}`);
    });

    // Reproducir el audio correspondiente a la pregunta actual
    const audio = new Audio(audioRuta);
    audio.play().catch((error) => {
        console.log("Error al reproducir el audio:", error);
    });

    // Incrementar la pregunta actual para la próxima vez
    preguntaActual++;
    if (preguntaActual >= preguntasPorNivel.facil.length) {
        preguntaActual = 0; // Reinicia si se llega al final
    }
}

// Llamar a la función para mostrar la primera pregunta
mostrarPregunta();



// Muestra la siguiente sección
function mostrarSeccion(id) {
    document.querySelectorAll(".seccion").forEach((seccion) => {
        seccion.classList.add("oculto");
    });
    document.getElementById(id).classList.remove("oculto");
}

// Guardar el nombre del usuario
function guardarNombre() {
    const inputNombre = document.getElementById("nombreUsuario");
    nombreUsuario = inputNombre.value.trim();
    if (nombreUsuario) {
        intentos = 0; // Reiniciar intentos al guardar un nuevo nombre
        mostrarSeccion("seleccionNivel");
    } else {
        alert("Por favor, ingresa tu nombre.");
    }
}

// Seleccionar nivel y cargar preguntas
function seleccionarNivel(nivel) {
    nivelSeleccionado = nivel;
    preguntas = [...preguntasPorNivel[nivel]];
    respuestasUsuario = []; // Reiniciar respuestas del usuario
    puntaje = 0; // Reiniciar puntaje
    preguntaActual = 0; // Reiniciar índice de preguntas
    mostrarPregunta();
}

// Mostrar pregunta actual
function mostrarPregunta() {
    if (preguntaActual < preguntas.length) {
        const pregunta = preguntas[preguntaActual];
        document.getElementById("tituloPregunta").textContent = `Pregunta ${preguntaActual + 1}`;
        document.getElementById("textoPregunta").textContent = pregunta.pregunta;
        const opcionesHTML = pregunta.opciones.map((opcion, index) =>
            `<button class="boton-respuesta" onclick="verificarRespuesta(${index})">${opcion}</button>`
        ).join("");
        document.getElementById("opcionesRespuesta").innerHTML = opcionesHTML;

        iniciarContador();
        mostrarSeccion("preguntas");
    } else {
        mostrarResultado();
    }
}

// Verificar respuesta
function verificarRespuesta(indice) {
    clearInterval(timer);
    const correcta = preguntas[preguntaActual].correcta;
    respuestasUsuario.push({
        pregunta: preguntas[preguntaActual].pregunta,
        respuesta: preguntas[preguntaActual].opciones[indice],
        correcta: preguntas[preguntaActual].opciones[correcta],
        esCorrecta: indice === correcta,
    });
    if (indice === correcta) {
        puntaje += 2; // Cada respuesta correcta vale 2 puntos
    }
    preguntaActual++;
    mostrarPregunta();
}

// Mostrar resultado final
function mostrarResultado() {
    const puntuacionElement = document.getElementById("puntuacion");
    const mensajeFinalElement = document.getElementById("mensajeFinal");
    const resumenElement = document.getElementById("resumen");

    puntuacionElement.textContent = `Tu puntuación: ${puntaje}/10`;
    intentos++;

    // Mostrar mensaje personalizado según el puntaje
    if (puntaje <= 4) {
        mensajeFinalElement.textContent = `¡Inténtalo de nuevo, ${nombreUsuario}! Puedes mejorar.`;
    } else if (puntaje >= 5 && puntaje <= 7) {
        mensajeFinalElement.textContent = `¡No estuvo mal, ${nombreUsuario}! Sigue practicando.`;
    } else if (puntaje >= 8) {
        mensajeFinalElement.textContent = `¡Bien hecho, ${nombreUsuario}! Eres todo un experto.`;
    }

    // Mostrar resumen de respuestas
    resumenElement.innerHTML = respuestasUsuario.map((respuesta, index) => `
        <p>
            <strong>Pregunta ${index + 1}:</strong> ${respuesta.pregunta}<br>
            <strong>Tu respuesta:</strong> ${respuesta.respuesta}<br>
            <strong>Correcta:</strong> ${respuesta.correcta}<br>
            ${respuesta.esCorrecta ? '<span style="color: green;">Correcta</span>' : '<span style="color: red;">Incorrecta</span>'}
        </p>
    `).join("");

    // Mostrar el número de intentos debajo del mensaje final
    const intentosElement = document.createElement("p");
    intentosElement.textContent = `Número de intentos: ${intentos}`;
    mensajeFinalElement.appendChild(intentosElement);

    mostrarSeccion("resultado");
}




// Intentar de nuevo
function intentarDeNuevo() {
    puntaje = 0;
    preguntaActual = 0;
    respuestasUsuario = [];
    seleccionarNivel(nivelSeleccionado);
}

// Reiniciar juego completamente
function reiniciarJuego() {
    mostrarSeccion("registro");
}

// Contador de tiempo
function iniciarContador() {
    let tiempo = 30;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = tiempo;
    timer = setInterval(() => {
        tiempo--;
        timerElement.textContent = tiempo;
        if (tiempo <= 0) {
            clearInterval(timer);
            verificarRespuesta(-1); // Respuesta inválida si se acaba el tiempo
        }
    }, 1000);
}

// Automáticamente pasa a la sección de registro después de la bienvenida
setTimeout(() => {
    document.getElementById("bienvenida").classList.add("oculto");
    mostrarSeccion("instrucciones");
}, 3000);




function cambiarGif(rutaGif) {
    const gif = document.querySelector('#gifGlobal img');
    gif.src = rutaGif;
}

function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(seccion => seccion.classList.add('oculto'));
    document.getElementById(id).classList.remove('oculto');
    
    // Cambia el GIF según la sección
    if (id === 'instrucciones') {
        cambiarGif('Recursos/Personaje/saludando.gif'); // Ajusta según el nombre del GIF para instrucciones
    } else if (id === 'registro') {
        cambiarGif('Recursos/Personaje/correcto.gif'); // Ajusta según el nombre del GIF para registro
    } else if (id === 'preguntas') {
        cambiarGif('Recursos/Personaje/hablando.gif'); // Ajusta según el nombre del GIF para registro
    }   
} mostrarSeccion("bienvenida");
