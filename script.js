//usuarios ya cargados
if (!localStorage.getItem("usuarios")) {
    const usuarios = [
        {
            rol: "admin",
            usuario: "administrador@axis.com.ar",
            password: "administrador",
            respuesta: "administrador"
        },
        {
            rol: "profesional",
            usuario: "profesional@axis.com.ar",
            password: "profesional",
            respuesta: "profesional"
        },
        {
            rol: "paciente",
            usuario: "daniela@axis.com.ar",
            password: "12345",
            respuesta: "perro"
        },
        {
            rol: "paciente",
            usuario: "cecilia@axis.com.ar",
            password: "123456",
            respuesta: "gato"
        },
        {
            rol: "paciente",
            usuario: "candela@axis.com.ar",
            password: "1234567",
            respuesta: "conejo"
        }
    ];
	
	//guarda los datos en el local
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

//Inicio de sesion

function login() {
    let rol = document.getElementById("rol").value;
    let usuario = document.getElementById("usuario").value.toLowerCase().trim();
    let password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = usuarios.find(u =>
        u.rol === rol &&
        u.usuario === usuario &&
        u.password === password
    );

    if (usuarioEncontrado) {
        if (rol === "admin") {
            alert("Bienvenido Administrador");
        } else if (rol === "profesional") {
            alert("Bienvenido Profesional");
        } else if (rol === "paciente") {
            alert("Bienvenido Paciente");
            window.location.href = "inicio.html"; 
        }
    } else {
        alert("Usuario o contraseña incorrectos")
    }
        document.getElementById("usuario").value = "";
        document.getElementById("password").value = "";
}

// registro de una persona
function funcionRegistrar() {
    let rol = document.getElementById("rol").value;
    let nombre = document.getElementById("nombre").value.trim();
    let usuario = document.getElementById("usuario").value.toLowerCase().trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmar = document.getElementById("confirmar").value;
    let pregunta = document.getElementById("pregunta").value.trim();
    let respuesta = document.getElementById("respuesta").value.toLowerCase().trim(); //cargo los datos

	//control de llenado
    if (
        rol === "" ||
        nombre === "" ||
        usuario === "" ||
        email === "" ||
        password === "" ||
        confirmar === "" ||
        pregunta === "" ||
        respuesta === ""
    ) {
        alert("Complete todos los campos");
        return;
    }

    if (password !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres");
        return;
    }
	
	//busca si el usuario existe
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.some(u => u.usuario === usuario);

    if (existe) {
        alert("El usuario ya existe");
        return;
    }
	//lo agrega
    usuarios.push({
        rol,
        nombre,
        usuario,
        email,
        password,
        pregunta,
        respuesta
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
    window.location.href = "index.html";
}

//recuperando contraseña
let usuarioVerificado = -1;

//agarra los datos
function verificarUsuario() {
    let rol = document.getElementById("rol").value;
    let usuario = document.getElementById("usuario").value.toLowerCase().trim();
    let respuesta = document.getElementById("respuesta").value.toLowerCase().trim();

    //lo busca
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarioVerificado = usuarios.findIndex(u =>
        u.rol === rol &&
        u.usuario === usuario &&
        u.respuesta &&
        u.respuesta.toLowerCase() === respuesta
    );

    let usuarioExiste = usuarios.find(u => u.usuario === usuario);

	if (usuarioExiste) {
		alert("La contraseña de " + usuario + " es: " + usuarioExiste.password);
		} else {
			alert("Datos incorrectos");
		}
	}

function volverLogin() {
    window.location.href = "index.html";
}
