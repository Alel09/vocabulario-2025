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
    "atrapar": "catch",
    "decir": "say",
    "traer": "bring",
    "acordar": "agree",
    "acuerdo": "agreement",
    "firmar": "sign",
    "incrementar": "increase",
    "tripulación": "crew",
    "infancia": "childhood",
    "compartir": "share",
    "enlazar": "link"
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
    "catch": "atrapar",
    "say": "decir",
    "bring": "traer",
    "agree": "acordar",
    "agreement": "acuerdo",
    "sign": "firmar",
    "increase": "incrementar",
    "crew": "tripulación",
    "childhood": "infancia",
    "share": "compartir",
    "link": "enlazar"
};

let preguntas, modo = "ENaES";
let preguntasRandom, puntaje, totalPreguntas, number;
let respuestasCorrectas = [];

document.getElementById("cambiarModo").addEventListener("click", cambiarModo);
document.getElementById("enviar").addEventListener("click", enviarRespuesta);
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
document.getElementById("continuar").addEventListener("click", continuarJuego);

document.getElementById("selectFuente").addEventListener("change", (event) => {
    const fuenteSeleccionada = event.target.value;
    switch (fuenteSeleccionada) {
        case "arial":
            document.body.style.fontFamily = "Arial, sans-serif";
            break;
        case "caveat":
            document.body.style.fontFamily = "'caveat', Arial, sans-serif";
            break;
        case "8-bitOperator":
            document.body.style.fontFamily = "'8-bitOperator', Times, serif";
            break;
        default:
            document.body.style.fontFamily = "Arial, sans-serif"; // Fallback por defecto
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
    mostrarPregunta();
}

function mostrarPregunta() {
    if (number <= totalPreguntas) {
        const [pregunta, respuesta] = preguntasRandom[number - 1];
        document.getElementById("pregunta").innerText = `${number}.- ${pregunta}`;
        document.getElementById("respuesta").value = "";
        document.getElementById("respuesta").setAttribute("autocomplete", "on");
        document.getElementById("enviar").style.display = "block";
        document.getElementById("continuar").style.display = "none";
        document.getElementById("feedback").innerText = "";
    } else {
        mostrarResultado();
    }
}

function enviarRespuesta() {
    const [pregunta, respuesta] = preguntasRandom[number - 1];
    const respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase(); // Eliminar espacios y convertir a minúsculas
    if (respuestaUsuario === respuesta.toLowerCase()) { // Convertir a minúsculas
        document.getElementById("feedback").innerText = "¡Correcto!";
        puntaje++;
        respuestasCorrectas.push({ pregunta, respuesta, correcto: true });
    } else {
        document.getElementById("feedback").innerText = `Incorrecto. La respuesta correcta es: ${respuesta}`;
        respuestasCorrectas.push({ pregunta, respuesta, correcto: false });
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

function reiniciarJuego() {
    document.getElementById("juego").style.display = "block";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("resultado").innerText = "";
    document.getElementById("retroalimentacion").innerText = "";
    iniciarJuego();
}

function cambiarModo() {
    modo = modo === "ENaES" ? "ESaEN" : "ENaES";
    document.getElementById("cambiarModo").innerText = modo === "ENaES" ? "Cambiar a Español-Inglés" : "Cambiar a Inglés-Español";
    reiniciarJuego();
}
