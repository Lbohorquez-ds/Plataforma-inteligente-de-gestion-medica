document.addEventListener("DOMContentLoaded", () => {
    // --- Datos simulados ---
    const proximos = []; // vacío para probar "0"
    const realizados = []; // vacío para probar "aún no hay turnos"
    const recordatorios = []; // vacío para probar "0"

    // --- Turnos próximos ---
    const listaProximos = document.getElementById("lista-proximos");
    const countProximos = document.getElementById("count-proximos");
    if (proximos.length > 0) {
        countProximos.textContent = proximos.length;
        proximos.forEach(t => {
            const li = document.createElement("li");
            li.textContent = `${t.especialidad} - ${t.doctor} | ${t.fecha} ${t.hora}`;
            listaProximos.appendChild(li);
        });
    } else {
        countProximos.textContent = "0";
    }

    document.getElementById("ver-proximos").addEventListener("click", () => {
        if (proximos.length === 0) {
            alert("No hay turnos agendados, agendar por WhatsApp");
        } else {
            alert("Mostrando todos los próximos turnos...");
        }
    });

    // --- Turnos realizados ---
const listaRealizados = document.getElementById("lista-realizados");
const countRealizados = document.getElementById("count-realizados");

if (realizados.length > 0) {
    countRealizados.textContent = realizados.length;
    realizados.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.especialidad} - ${t.doctor} | ${t.fecha} ${t.hora}`;
        listaRealizados.appendChild(li);
    });
} else {
    // 👇 No mostramos el número
    countRealizados.textContent = ""; 
    const msg = document.createElement("p");
    msg.textContent = "Aún no hay turnos realizados.";
    listaRealizados.appendChild(msg);
}


    // --- Recordatorio activo ---
    const countRecordatorios = document.getElementById("count-recordatorios");
    const recordatorioMsg = document.getElementById("recordatorio-msg");
    if (recordatorios.length > 0) {
        countRecordatorios.textContent = recordatorios.length;
        recordatorioMsg.textContent = "Tenés recordatorios activos.";
    } else {
        countRecordatorios.textContent = "0";
        recordatorioMsg.textContent = "";
    }

    // --- Campanita ---
    const notificaciones = document.querySelector(".notificaciones i");
    const popup = document.getElementById("popup-notificaciones");
    notificaciones.addEventListener("click", () => {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
    });

    // --- Iniciales dinámicas según nombre ---
    const nombreUsuario = "Candela Melgarejo"; // cambiar según usuario logueado
    const iniciales = nombreUsuario.split(" ").map(n => n[0]).join("").toUpperCase();
    document.getElementById("usuario-iniciales").textContent = iniciales;
    document.getElementById("usuario-nombre").textContent = nombreUsuario;

    // --- Menú desplegable con flechita ---
    const flechaMenu = document.getElementById("flecha-menu");
    const menuUsuario = document.getElementById("menu-usuario");
    flechaMenu.addEventListener("click", () => {
        menuUsuario.style.display = menuUsuario.style.display === "block" ? "none" : "block";
    });
});
