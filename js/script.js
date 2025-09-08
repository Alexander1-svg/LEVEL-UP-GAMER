// =========================
// VALIDACIÓN FORMULARIO REGISTRO
// =========================
function validarRegistro(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  let errores = [];

  if (nombre.length === 0 || nombre.length > 50) errores.push("Nombre inválido.");
  if (apellido.length === 0 || apellido.length > 100) errores.push("Apellido inválido.");
  if (!/^([\w.\-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)) {
    errores.push("Correo inválido. Solo @duoc.cl, @profesor.duoc.cl y @gmail.com");
  }
  if (contrasena.length < 4 || contrasena.length > 10) {
    errores.push("Contraseña debe tener entre 4 y 10 caracteres.");
  }

  if (errores.length > 0) {
    alert(errores.join("\n"));
    return false;
  }

  // Guardar usuario en localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ nombre, apellido, correo, contrasena });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso!");
  document.getElementById("form-registro").reset();
}

// =========================
// VALIDACIÓN FORMULARIO LOGIN
// =========================
function validarLogin(event) {
  event.preventDefault();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

  if (usuarioValido) {
    alert("Inicio de sesión exitoso!");
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}

// =========================
// AGREGAR EVENT LISTENERS
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) formRegistro.addEventListener("submit", validarRegistro);

  const formLogin = document.getElementById("form-login");
  if (formLogin) formLogin.addEventListener("submit", validarLogin);
});
