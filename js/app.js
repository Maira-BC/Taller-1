const obtenerTurnoBtn = document.getElementById('obtener-turno');
const estadoTurnosBtn = document.getElementById('estado-turnos');
const contenidoTurno = document.getElementById('contenido-obtener-turno');
const contenidoEstado = document.getElementById('contenido-estado-turnos');

obtenerTurnoBtn.addEventListener('click', () => {
    contenidoTurno.classList.remove('d-none');
    contenidoEstado.classList.add('d-none');
});

estadoTurnosBtn.addEventListener('click', () => {
    contenidoTurno.classList.add('d-none');
    contenidoEstado.classList.remove('d-none');
});