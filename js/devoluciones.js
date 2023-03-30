// Obtener la fecha y hora actual en la zona horaria local
const fechaActualLocal = new Date();

// Obtener la diferencia horaria en minutos entre la zona horaria local y UTC
const diferenciaHoraria = fechaActualLocal.getTimezoneOffset();

// Calcular la diferencia horaria en milisegundos
const diferenciaHorariaMs = diferenciaHoraria * 60 * 1000;

// Crear una nueva fecha con la diferencia horaria de México
const fechaActualMexico = new Date(Date.now() - diferenciaHorariaMs - (5 * 60 * 60 * 1000));

// Convertir la fecha a una cadena con el formato ISO 8601
const fechaActualMexicoISO = fechaActualMexico.toISOString().split("T")[0];

document.getElementById("dateDevolucion").setAttribute("max", fechaActualMexicoISO);
let limpiar = document.getElementById('btn-limpiar');

function limpiarDevolucion() {
    document.getElementById('nombreDevolucion').value = "";
    document.getElementById('apellidosDevolucion').value = "";
    document.getElementById('emailDevolucion').value = "";
    document.getElementById('dateDevolucion').value = "";
    document.getElementById('ciudadDevolucion').value = "";
    document.getElementById('estadoDevolucion').value = "";
    document.getElementById('textareaDevolucion').value = "";
}

limpiar.addEventListener('click', limpiarDevolucion);


