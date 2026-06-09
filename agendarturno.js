
/* ============================================================
   Datos precargados (especialidades, profesionales y horarios)
   ============================================================ */

const ESPECIALIDADES = [
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Neurología',
    'Traumatología',
];

const PROFESIONALES = {
    'Cardiología': ['Dr. Martín Gómez', 'Dra. Laura Ríos'],
    'Dermatología': ['Dra. Sofía Benítez', 'Dr. Facundo Torres'],
    'Endocrinología': ['Dr. Juan Pérez', 'Dra. Claudia Vera'],
    'Gastroenterología': ['Dr. Rodrigo López', 'Dra. Paola Sosa'],
    'Neurología': ['Dra. Valeria Méndez', 'Dr. Esteban Ruiz'],
    'Traumatología': ['Dr. Nicolás Herrera', 'Dra. María Fuentes'],
};

const HORARIOS_DISPONIBLES = ['09:00', '10:30', '11:00', '14:30', '16:00'];

/* ============================================================
   Estado de la aplicación (guarda lo que el usuario va eligiendo)
   ============================================================ */
const state = {
    especialidad: null,
    profesional: null,
    fecha: null,
    horario: null,

    calYear: new Date().getFullYear(),
    calMonth: new Date().getMonth(),
};

/* ============================================================
   Referencias a los elementos del HTML
   ============================================================ */
const dom = {
    pasos: [1, 2, 3, 4].map(n => document.getElementById(`paso${n}`)),
    selectEsp: document.getElementById('select-especialidad'),
    selectProf: document.getElementById('select-profesional'),
    calGrid: document.getElementById('calendario-grid'),
    calTitle: document.getElementById('cal-month-title'),
    btnPrev: document.getElementById('btn-prev-month'),
    btnNext: document.getElementById('btn-next-month'),
    grillaHor: document.getElementById('grilla-horarios'),
    horariosLabel: document.getElementById('horarios-label'),
    btnAgendar: document.getElementById('btn-agendar'),
    toast: document.getElementById('toast'),
};

/* ============================================================
   Stepper (indicador de pasos)
   ============================================================ */
function actualizarStepper() {
    dom.pasos[0].classList.toggle('completado', !!state.especialidad);
    dom.pasos[1].classList.toggle('completado', !!state.profesional);
    dom.pasos[2].classList.toggle('completado', !!state.fecha && !!state.horario);
    dom.pasos[3].classList.toggle('completado', todosSeleccionados());
}

// Devuelve true cuando el usuario completó los 4 campos
function todosSeleccionados() {
    return !!(state.especialidad && state.profesional && state.fecha && state.horario);
}

/* ============================================================
   Select de especialidad
   ============================================================ */

// Agrega las opciones al select de especialidad
function poblarEspecialidades() {
    ESPECIALIDADES.forEach(esp => {
        const opt = document.createElement('option');
        opt.value = esp;
        opt.textContent = esp;
        dom.selectEsp.appendChild(opt);
    });
}

// Cuando el usuario cambia la especialidad
dom.selectEsp.addEventListener('change', () => {
    state.especialidad = dom.selectEsp.value || null;

    // Reseteamos los campos que dependen de la especialidad
    state.profesional = null;
    state.fecha = null;
    state.horario = null;

    // Actualizamos el select de profesional con los nuevos datos
    poblarProfesionales();
    dom.selectProf.disabled = !state.especialidad;
    dom.selectProf.value = '';

    renderHorarios();
    actualizarStepper();
    actualizarBotonAgendar();
});

/* ============================================================
   Select de profesional
   ============================================================ */

// Carga los profesionales según la especialidad elegida
function poblarProfesionales() {
    // Borramos las opciones anteriores (menos el placeholder)
    while (dom.selectProf.options.length > 1) {
        dom.selectProf.remove(1);
    }

    const lista = PROFESIONALES[state.especialidad] || [];
    lista.forEach(prof => {
        const opt = document.createElement('option');
        opt.value = prof;
        opt.textContent = prof;
        dom.selectProf.appendChild(opt);
    });
}

// Cuando el usuario elige un profesional
dom.selectProf.addEventListener('change', () => {
    state.profesional = dom.selectProf.value || null;
    actualizarStepper();
    actualizarBotonAgendar();
});

/* ============================================================
   CALENDARIO
   ============================================================ */

const MESES_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const DIAS_NOMBRE = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function renderCalendario() {
    const { calYear, calMonth } = state;

    dom.calTitle.textContent = `${MESES_ES[calMonth]} ${calYear}`;

    // Calculamos cuántos días tiene el mes y en qué día de la semana empieza
    const primero = new Date(calYear, calMonth, 1);
    const diaInicio = (primero.getDay() + 6) % 7;
    const diasEnMes = new Date(calYear, calMonth + 1, 0).getDate();
    const hoy = new Date();

    dom.calGrid.innerHTML = '';

    for (let i = 0; i < diaInicio; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day vacio';
        dom.calGrid.appendChild(empty);
    }


    for (let d = 1; d <= diasEnMes; d++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day';
        dayDiv.textContent = d;
        dayDiv.setAttribute('role', 'button');
        dayDiv.setAttribute('tabindex', '0');
        dayDiv.setAttribute('aria-label', `${d} de ${MESES_ES[calMonth]} de ${calYear}`);

        if (d === hoy.getDate() && calMonth === hoy.getMonth() && calYear === hoy.getFullYear()) {
            dayDiv.classList.add('hoy');
        }

        if (
            state.fecha &&
            d === state.fecha.getDate() &&
            calMonth === state.fecha.getMonth() &&
            calYear === state.fecha.getFullYear()
        ) {
            dayDiv.classList.add('seleccionado');
        }

        dayDiv.addEventListener('click', () => seleccionarDia(d));
        dayDiv.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seleccionarDia(d); }
        });
        dom.calGrid.appendChild(dayDiv);
    }
}

// Cuando el usuario hace click en un día
function seleccionarDia(d) {
    state.fecha = new Date(state.calYear, state.calMonth, d);
    state.horario = null; // se resetea el horario al cambiar la fecha
    renderCalendario();
    renderHorarios();
    actualizarStepper();
    actualizarBotonAgendar();
}

// Botón para ir al mes anterior
dom.btnPrev.addEventListener('click', () => {
    state.calMonth--;
    if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
    renderCalendario();
});

// Botón para ir al mes siguiente
dom.btnNext.addEventListener('click', () => {
    state.calMonth++;
    if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
    renderCalendario();
});

/* ============================================================
   Horarios disponibles
   ============================================================ */

function renderHorarios() {
    dom.grillaHor.innerHTML = '';

    dom.horariosLabel.textContent = state.fecha
        ? `Horarios disponibles — ${formatFechaLabel(state.fecha)}`
        : 'Horarios disponibles';

    HORARIOS_DISPONIBLES.forEach(h => {
        const btn = document.createElement('button');
        btn.className = 'horario-btn' + (state.horario === h ? ' activo' : '');
        btn.textContent = h;
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', state.horario === h ? 'true' : 'false');
        btn.addEventListener('click', () => {
            state.horario = h;
            renderHorarios();
            actualizarStepper();
            actualizarBotonAgendar();
        });
        dom.grillaHor.appendChild(btn);
    });
}

/* ============================================================
   Botón Agendar
   ============================================================ */

// Muestra u oculta el botón según si el usuario completó todo
function actualizarBotonAgendar() {
    dom.btnAgendar.classList.toggle('hidden', !todosSeleccionados());
}

// Cuando el usuario hace click en Agendar
dom.btnAgendar.addEventListener('click', () => {
    dom.pasos[3].classList.add('completado'); // marca el último paso como completo
    mostrarToast(); // muestra el cartelito de confirmación
    // Después de 2.8 segundos va a la pantalla de Mis Turnos
    setTimeout(() => { window.location.href = 'misturnos.html'; }, 2800);
});

/* ============================================================
   ALERTA 
   ============================================================ */
function mostrarToast() {
    dom.toast.classList.add('visible'); // lo hace aparecer
    setTimeout(() => dom.toast.classList.remove('visible'), 5000); // lo oculta a los 5 seg
}

/* ============================================================
   Funciones de formato de fecha
   ============================================================ */

// Devuelve la fecha como texto, ej: "Jueves 5 de junio"
function formatFechaLabel(date) {
    const dia = DIAS_NOMBRE[date.getDay()];
    const num = date.getDate();
    const mes = MESES_ES[date.getMonth()].toLowerCase();
    return `${capitalizar(dia)} ${num} de ${mes}`;
}

// Pone en mayúscula la primera letra de una palabra
function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ============================================================
   Init
   ============================================================ */
function init() {
    poblarEspecialidades();
    renderCalendario();
    renderHorarios();
    actualizarStepper();
    actualizarBotonAgendar();
}

document.addEventListener('DOMContentLoaded', init);
