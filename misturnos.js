//buscamos en el html
const listaTurnos = document.getElementById("listaTurnos");
const buscador = document.getElementById("buscarEspecialidad");

//trae los datos del local
function obtenerTurnos() {
    return JSON.parse(localStorage.getItem("turnos")) || [];
}

//los muestra en la pantalla
function mostrarTurnos(turnos) {
    listaTurnos.innerHTML = ""; //limpia la pantalla

    //si no hay turnos muestra->
    if (turnos.length === 0) {
        listaTurnos.innerHTML = "<p>No hay turnos para mostrar.</p>";
        return;
    }

    //recorre los turnos y los muestra en la tarjeta
    turnos.forEach(turno => {
        listaTurnos.innerHTML += `
            <div class="turno asignado contenedor">
                <div class="titulo">TURNO</div>

                <div class="contenido">
                    <div class="fila-info">
                        <div class="dato">
                            <label>Especialidad</label>
                            <p class="valor-destacado">${turno.especialidad}</p>
                        </div>
                        <div class="dato">
                            <label>Profesional</label>
                            <p class="valor">${turno.profesional}</p>
                        </div>
                    </div>

                    <div class="fila-info">
                        <div class="dato">
                            <label>Fecha y Horario</label>
                            <p class="valor">${turno.fecha} - ${turno.horario} hs</p>
                        </div>
                    </div>

                    <hr class="separador">

                    <div class="fila-info footer-tarjeta">
                        <div class="estado-badge estado-asignado">
                            ✅ ${turno.estado}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

//buscador de turnos por especialidad
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase(); //todo en minuscula
    const turnos = obtenerTurnos();

    //los filtra por especialidad
    const filtrados = turnos.filter(turno =>
        turno.especialidad.toLowerCase().includes(texto)
    );

    mostrarTurnos(filtrados);
});

//los muestra 1ro
document.addEventListener("DOMContentLoaded", () => {
    mostrarTurnos(obtenerTurnos());
});