const preguntasESaEN = {
    "ambos": "both",
    "breve": "brief",
    "pocos": "a few",
    "poco": "a little",
    "entre varios": "among",
    "entre dos": "between",
    "mascar": "chew",
    "goma de mascar": "chewing gum",
    "dos veces": "twice",
    "una vez": "once",
    "proposito": "purpose",
    "de hecho": "actually",
    "repentino": "sudden",
    "ser capaz de algo": "be able to",
    "varios": "several",
    "para": "in order to",
    "negar": "deny",
    "confiable": "reliable",
    "permitir": "allow",
    "atrapar": ["catch", "caught", "caught"],
    "decir": "say",
    "traer": ["bring", "brought", "brought"],
    "acordar": "agree",
    "acuerdo": "agreement",
    "firmar": "sign",
    "incrementar": "increase",
    "tripulación": "crew",
    "infancia": "childhood",
    "compartir": "share",
    "enlazar": "link",
    "sin embargo":"however",
    "helicoptero":"chopper",
    "ademas":"in addition",
    "suave":"soft",
    "confiado":"confident",
    "concurrido":"crowded",
    "aumentar":"raise",
    "cuota":"fee",
    "curriculum":"resume",
    "deber (deuda)":"owe",
    "beca":"scholarship",
    "carrera universitaria":"major",
    "carrera laboral":"carrer",
    "universidad":"college",
    "licenciatura":"bachelor's degree",
    "deuda":"debt",
    "disculparse":"apologize",
    "disculpa":"apology",
    "testigo":"witness",
    "huesped":"guest",
    "mirar fijamente": "stare",
    "pesadilla": "nightmare",
    "desnudo": "naked",
    "deshacerse": "get rid of",
    "conocimiento": "knowledge",
    "vomitar": ["throw up","threw up","thrown up"],
    "receta medica": "prescription",
    "escalera portatil": "ladder",
    "escalera fija": "stair",
    "culpar": "blame",
};

const preguntasENaES = {
    "both": "ambos",
    "brief": "breve",
    "a few": "pocos",
    "a little": "poco",
    "among": "entre varios",
    "between": "entre dos",
    "chew": "mascar",
    "chewing gum": "goma de mascar",
    "twice": "dos veces",
    "once": "una vez",
    "purpose": "proposito",
    "actually": "de hecho",
    "sudden": "repentino",
    "be able to": "ser capaz de algo",
    "several": "varios",
    "in order to": "para",
    "deny": "negar",
    "reliable": "confiable",
    "allow": "permitir",
    "catch, caught, caught": "atrapar",
    "say": "decir",
    "bring, brought, brought": "traer",
    "agree": "acordar",
    "agreement": "acuerdo",
    "sign": "firmar",
    "increase": "incrementar",
    "crew": "tripulación",
    "childhood": "infancia",
    "share": "compartir",
    "link": "enlazar",
    "however": "sin embargo",
    "chopper": "helicóptero",
    "in addition": "ademas",
    "soft": "suave",
    "confident": "confiado",
    "crowded": "concurrido",
    "raise": "aumentar",
    "fee": "cuota",
    "resume": "curriculum",
    "owe": "deber",
    "scholarship": "beca",
    "major": "carrera universitaria",
    "career": "carrera laboral",
    "college": "universidad",
    "bachelor's degree": "licenciatura",
    "debt": "deuda",
    "apologize": "disculparse",
    "apology": "disculpa",
    "witness": "testigo",
    "guest": "huésped",
    "stare": "mirar fijamente",
    "nightmare": "pesadilla",
    "naked": "desnudo",
    "get rid of": "deshacerse",
    "knowledge": "conocimiento",
    "throw up": "vomitar",
    "threw up": "vomitar",
    "thrown up": "vomitar",
    "prescription": "receta medica",
    "ladder": "escalera portatil",
    "stair": "escalera fija",
    "blame": "culpar"    
};

let preguntas, modo = "ENaES";
let preguntasRandom, puntaje, totalPreguntas, number;
let respuestasCorrectas = [];

document.getElementById("cambiarModo").addEventListener("click", cambiarModo);
document.getElementById("enviar").addEventListener("click", enviarRespuesta);
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
document.getElementById("continuar").addEventListener("click", continuarJuego);
document.getElementById("verPalabras").addEventListener("click", togglePalabras);

document.getElementById("selectFuente").addEventListener("change", (event) => {
    const fuenteSeleccionada = event.target.value;
    switch (fuenteSeleccionada) {
        case "arial":
            document.body.style.fontFamily = "Arial, sans-serif";
            break;
        case "caveat":
            document.body.style.fontFamily = "'Caveat', Arial, sans-serif";
            break;
        case "8-bitOperator":
            document.body.style.fontFamily = "'8-bitOperator', Times, serif";
            break;
        default:
            document.body.style.fontFamily = "Arial, sans-serif";
            break;
    }
});

iniciarJuego();

function iniciarJuego() {
    preguntas = modo === "ENaES" ? preguntasENaES : preguntasESaEN;
    preguntasRandom = Object.entries(preguntas);
    preguntasRandom.sort(() => Math.random() - 0.5);
    puntaje = 0;
    totalPreguntas = preguntasRandom.length;
    number = 1;
    respuestasCorrectas = [];
    document.getElementById("cambiarModo").innerText = modo === "ENaES" ? "Cambiar a Español → Inglés" : "Cambiar a Inglés → Español";
    mostrarPregunta();
}

function mostrarPregunta() {
    if (number <= totalPreguntas) {
        const [pregunta, respuesta] = preguntasRandom[number - 1];
        document.getElementById("pregunta").innerText = `${number}.- ${pregunta}`;
        document.getElementById("contador").innerText = `Pregunta ${number} de ${totalPreguntas}`; // Actualizar contador
        
        const respuestasContainer = document.getElementById("respuestasContainer");
        respuestasContainer.innerHTML = ""; // Limpiar contenedor
        
        if (modo === "ESaEN" && Array.isArray(respuesta)) {
            respuesta.forEach((_, index) => {
                const input = document.createElement("input");
                input.type = "text";
                input.id = `respuesta-${index}`;
                input.placeholder = `Traducción ${index + 1}`;
                input.autocomplete = "off";
                respuestasContainer.appendChild(input);
            });
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "respuesta";
            input.placeholder = "Escribe tu respuesta aquí";
            input.autocomplete = "off";
            respuestasContainer.appendChild(input);
        }

        document.getElementById("enviar").style.display = "block";
        document.getElementById("continuar").style.display = "none";
        document.getElementById("feedback").innerText = "";
    } else {
        mostrarResultado();
    }
}

function enviarRespuesta() {
    const [pregunta, respuesta] = preguntasRandom[number - 1];
    const respuestasContainer = document.getElementById("respuestasContainer");
    let respuestasUsuario = [];
    
    if (modo === "ESaEN" && Array.isArray(respuesta)) {
        // Recolectar todas las respuestas del usuario
        respuesta.forEach((_, index) => {
            const input = document.getElementById(`respuesta-${index}`);
            respuestasUsuario.push(input.value.trim().toLowerCase());
        });
        
        // Verificar que TODAS las respuestas del usuario coincidan con las correctas
        const todasCorrectas = respuestasUsuario.length === respuesta.length && 
        respuestasUsuario.every((userRespuesta, index) => 
        respuesta[index].toLowerCase() === userRespuesta
            );

        
        if (todasCorrectas) {
            document.getElementById("feedback").innerText = "¡Correcto!";
            puntaje++;
            respuestasCorrectas.push({ pregunta, respuesta: respuesta.join(", "), correcto: true });
        } else {
            document.getElementById("feedback").innerText = `Incorrecto. Las respuestas correctas son: ${respuesta.join(", ")}`;
            respuestasCorrectas.push({ pregunta, respuesta: respuesta.join(", "), correcto: false });
        }
    } else {
        // Caso normal: una sola respuesta
        const respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();
        const respuestaCorrecta = Array.isArray(respuesta) ? respuesta[0] : respuesta;
        
        if (respuestaUsuario === respuestaCorrecta.toLowerCase()) {
            document.getElementById("feedback").innerText = "¡Correcto!";
            puntaje++;
            respuestasCorrectas.push({ pregunta, respuesta: respuestaCorrecta, correcto: true });
        } else {
            document.getElementById("feedback").innerText = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta}`;
            respuestasCorrectas.push({ pregunta, respuesta: respuestaCorrecta, correcto: false });
        }
    }
    
    document.getElementById("enviar").style.display = "none";
    document.getElementById("continuar").style.display = "block";
}

function continuarJuego() {
    number++;
    mostrarPregunta();
}

function mostrarResultado() {
    document.getElementById("juego").style.display = "none";
    document.getElementById("reiniciar").style.display = "block";
    document.getElementById("resultado").innerText = `Tuviste ${puntaje} de ${totalPreguntas}.`;
    mostrarRetroalimentacion();
}

function mostrarRetroalimentacion() {
    const retroalimentacionDiv = document.getElementById("retroalimentacion");
    retroalimentacionDiv.innerHTML = "<h2>Retroalimentación:</h2>";
    respuestasCorrectas.forEach(({ pregunta, respuesta, correcto }) => {
        const colorClase = correcto ? 'correcto' : 'incorrecto';
        retroalimentacionDiv.innerHTML += `
            <div class="retroalimentacion-item ${colorClase}">
                ${pregunta} - ${respuesta}
            </div>`;
    });
}

function mostrarTodasLasPalabras() {
    const retroalimentacionDiv = document.getElementById("retroalimentacion");
    retroalimentacionDiv.innerHTML = "<h2>Palabras de Repaso:</h2>";
    Object.entries(preguntas).forEach(([pregunta, respuesta]) => {
        retroalimentacionDiv.innerHTML += `
            <div class="retroalimentacion-item">
                ${pregunta} - ${respuesta}
            </div>`;
    });
}

function togglePalabras() {
    const juegoDiv = document.getElementById("juego");
    const reiniciarBtn = document.getElementById("reiniciar");
    const verPalabrasBtn = document.getElementById("verPalabras");

    if (verPalabrasBtn.textContent === "Ver palabras de repaso") {
        mostrarTodasLasPalabras();
        juegoDiv.style.display = "none";
        reiniciarBtn.style.display = "none"; // Ocultar "Reiniciar" al entrar en repaso
        verPalabrasBtn.textContent = "Regresar al juego";
    } else {
        juegoDiv.style.display = "block";
        // Mostrar "Reiniciar" solo si el juego ha terminado
        reiniciarBtn.style.display = (number > totalPreguntas) ? "block" : "none";
        document.getElementById("retroalimentacion").innerHTML = "";
        verPalabrasBtn.textContent = "Ver palabras de repaso";
    }
}

function reiniciarJuego() {
    document.getElementById("juego").style.display = "block";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("resultado").innerText = "";
    document.getElementById("retroalimentacion").innerText = "";
    iniciarJuego();
}

function cambiarModo() {
    const verPalabrasBtn = document.getElementById("verPalabras");
    const estabaEnRepaso = verPalabrasBtn.textContent === "Regresar al juego";

    // Cambiar el modo
    modo = modo === "ENaES" ? "ESaEN" : "ENaES";
    preguntas = modo === "ENaES" ? preguntasENaES : preguntasESaEN;
    document.getElementById("cambiarModo").innerText = modo === "ENaES" ? "Cambiar a Español → Inglés" : "Cambiar a Inglés → Español";

    if (estabaEnRepaso) {
        // Si estaba en repaso, actualizar las palabras de repaso
        mostrarTodasLasPalabras();
    } else {
        // Si estaba en el juego, reiniciar el juego
        reiniciarJuego();
    }
}