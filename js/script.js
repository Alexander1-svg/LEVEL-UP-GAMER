// =========================
// VALIDACIÓN FORMULARIO REGISTRO : Se conecta con registro.html
// =========================
function validarRegistro(event) {
  event.preventDefault(); // Evitar envío por defecto

  const run = document.getElementById("run").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  let errores = [];

  // Validar RUN
  if (!/^\d{7,9}[kK]?$/.test(run)) {
    errores.push("RUN inválido. Debe tener 7-9 dígitos y opcionalmente K.");
  }

  // Validar nombre y apellido
  if (nombre.length === 0 || nombre.length > 50) errores.push("Nombre inválido.");
  if (apellido.length === 0 || apellido.length > 100) errores.push("Apellido inválido.");

  // Validar correo
  if (
    !/^([\w\.\-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo)
  ) {
    errores.push("Correo inválido. Solo @duoc.cl, @profesor.duoc.cl y @gmail.com");
  }

  // Validar contraseña
  if (contrasena.length < 4 || contrasena.length > 10) {
    errores.push("Contraseña debe tener entre 4 y 10 caracteres.");
  }

  if (errores.length > 0) {
    alert(errores.join("\n"));
    return false;
  }

  alert("Registro exitoso!");
  return true;
}

// =========================
// VALIDACIÓN FORMULARIO CONTACTO : se conecta con contacto.html
// =========================
function validarContacto(event) {
  event.preventDefault();

  const nombre = document.getElementById("contacto-nombre").value.trim();
  const correo = document.getElementById("contacto-correo").value.trim();
  const comentario = document.getElementById("contacto-comentario").value.trim();

  let errores = [];

  if (nombre.length === 0 || nombre.length > 100) errores.push("Nombre inválido.");
  if (!/^([\w\.\-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo))
    errores.push("Correo inválido.");
  if (comentario.length === 0 || comentario.length > 500) errores.push("Comentario inválido.");

  if (errores.length > 0) {
    alert(errores.join("\n"));
    return false;
  }

  alert("Mensaje enviado correctamente!");
  return true;
}

// =========================
// PRODUCTOS Y CARRITO : se conecta con detalle producto y carrito
// =========================
let productos = [
  { id: 1, nombre: "Teclado Gamer", precio: 45000, imagen: "img/teclado.jpg", stock: 10 },
  { id: 2, nombre: "Mouse Gamer", precio: 30000, imagen: "img/mouse.jpg", stock: 8 },
  { id: 3, nombre: "Auriculares", precio: 55000, imagen: "img/auriculares.jpg", stock: 5 },
];

// Mostrar productos en productos.html
function mostrarProductos() {
  const contenedor = document.getElementById("productos-contenedor");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("producto-card");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="w-32 h-32">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  if (producto.stock <= 0) {
    alert("Stock agotado!");
    return;
  }

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`${producto.nombre} agregado al carrito`);
}

// Mostrar carrito (opcional)
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-contenedor");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  carrito.forEach((p, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${p.nombre} - $${p.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// =========================
// EVENT LISTENERS
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // Si existen formularios, agregar eventos
  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) formRegistro.addEventListener("submit", validarRegistro);

  const formContacto = document.getElementById("form-contacto");
  if (formContacto) formContacto.addEventListener("submit", validarContacto);

  // Mostrar productos al cargar productos.html
  mostrarProductos();

  // Mostrar carrito si existe contenedor
  mostrarCarrito();
});
