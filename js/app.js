const obtenerTurnoBtn = document.getElementById('obtener-turno');
const estadoTurnosBtn = document.getElementById('estado-turnos');
const contenidoTurno = document.getElementById('contenido-obtener-turno');
const contenidoEstado = document.getElementById('contenido-estado-turnos');
const generarNumeroBtn = document.getElementById('generar-numero');
const tipoAtencionSelect = document.getElementById('tipo-atencion');
const numeroTurno = document.getElementById('numero-turno');
const estadoTurno = document.getElementById('estado-turno');
const listaEspera = document.getElementById('lista-espera');
const llamarSiguienteBtn = document.getElementById('llamar-siguiente');
const turnoActual = document.getElementById('turno-actual');
const moduloAtencion = document.getElementById('modulo-atencion');
const atencion = document.getElementById('atencion');
const turnosEnEspera = document.getElementById('turnos-en-espera');
const turnosAtendidos = document.getElementById('turnos-atendidos');
const mensajeSistema = document.getElementById('mensaje-sistema');

let contadorTurnos = 0;
let numeroFormateado;
let turnos = [];
let contadorAtendidos = 0;
let turnoEnAtencion = null;

obtenerTurnoBtn.addEventListener('click', () => {
    contenidoTurno.classList.remove('d-none');
    contenidoEstado.classList.add('d-none');
});

estadoTurnosBtn.addEventListener('click', () => {
    contenidoTurno.classList.add('d-none');
    contenidoEstado.classList.remove('d-none');
});

function mostrarTurnos() {
    listaEspera.innerHTML = "";
    turnos.forEach(turno => {
        const item = document.createElement("li")
        const numero = document.createElement("span");
        numero.textContent = turno.numero;
        const tipo = document.createElement("span");
        tipo.textContent = turno.tipo;
        const estado = document.createElement("span");
        estado.textContent = turno.estado;

        item.appendChild(numero);
        item.appendChild(tipo);
        item.appendChild(estado)
        listaEspera.appendChild(item);
    });
}

generarNumeroBtn.addEventListener('click', () => {
    if (tipoAtencionSelect.value === "") {
        alert("Seleccione un tipo de atención");
        return;
    }

    mensajeSistema.classList.add('d-none');

    contadorTurnos++;

    if (contadorTurnos < 10) {
        numeroFormateado = "00" + contadorTurnos;
    }
    else if (contadorTurnos < 100) {
        numeroFormateado = "0" + contadorTurnos;
    }
    else {
        numeroFormateado = contadorTurnos;
    }
    numeroTurno.textContent = "A-" + numeroFormateado;

    estadoTurno.textContent = "En espera";

    const nuevoTurno = {
        numero: "A-" + numeroFormateado,
        tipo: tipoAtencionSelect.value,
        estado: "En espera"
    };
    turnos.push(nuevoTurno);
    turnosEnEspera.textContent = turnos.length;
    mostrarTurnos();
});

llamarSiguienteBtn.addEventListener('click', () => {
    if (turnoEnAtencion !== null) {
        turnoEnAtencion.estado = "Atendido";
        contadorAtendidos++;
        turnosAtendidos.textContent = contadorAtendidos;
        turnoEnAtencion = null;
    }

     if (turnos.length === 0) {
        turnoActual.textContent = "- -";
        atencion.textContent = "- -";
        moduloAtencion.textContent = "- -";
        mensajeSistema.textContent = "No hay turnos en espera";
        mensajeSistema.classList.remove('d-none');
        return;
    }

    const siguienteTurno = turnos[0];
    mensajeSistema.classList.add('d-none');
    siguienteTurno.estado = "En atención";
    turnoEnAtencion = siguienteTurno;

    turnoActual.textContent = siguienteTurno.numero;
    atencion.textContent = siguienteTurno.tipo;
    moduloAtencion.textContent = "Módulo 1";

    turnos = turnos.filter((turno) => turno !== siguienteTurno);
    turnosEnEspera.textContent = turnos.length;

    mostrarTurnos();
});