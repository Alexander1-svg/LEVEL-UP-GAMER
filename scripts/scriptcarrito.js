// La tabla que contiene todos los productos y sus precios segun el botton de compra en el index 
const productos = {
  "1": { nombre: "Logitech G733 Wireless", precio: 159990 },
  "2": { nombre: "Control DualSense PS5", precio: 52990 },
  "3": { nombre: "Estuche Nintendo Switch OLED", precio: 19990 },
  "4": { nombre: "Asus ROG Strix G18", precio: 2229990 },
  "5": { nombre: "Acer Nitro AN515", precio: 1099990 },
  "6": { nombre: "PC Gamer R5 RTX 4060", precio: 1199990 },
  "7": { nombre: "PlayStation 5 Slim", precio: 536990 },
  "8": { nombre: "Xbox Series S", precio: 419990 },
  "9": { nombre: "Nintendo Switch 2", precio: 589990 },
  "10": { nombre: "Trust GXT 707R Resto", precio: 139990 },
  "11": { nombre: "Kronos Hunter Pro", precio: 119990 },
  "12": { nombre: "Cougar Defensor", precio: 189990 },
  "13": { nombre: "Logitech G502", precio: 79990 },
  "14": { nombre: "Razer DeathAdder V2", precio: 89990 },
  "15": { nombre: "Logitech G413", precio: 99990 },
  "16": { nombre: "HyperX Fury S Pro XL", precio: 29990 },
  "17": { nombre: "Razer Gigantus V2", precio: 29990 },
  "18": { nombre: "Logitech G640", precio: 29990 },
  "19": { nombre: "Polera HALO", precio: 19990 },
  "20": { nombre: "Polera God Of War", precio: 19990 },
  "21": { nombre: "Poleron Legend of Zelda", precio: 39990 },
  "22": { nombre: "Warhammer 40M", precio: 89990 },
  "23": { nombre: "Ajedrez", precio: 24990 },
  "24": { nombre: "Shogi", precio: 59990 }
};
// implementa al carrito
function agregarAlCarrito(id) {
  const producto = productos[id];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


  const existente = carrito.find(item => item.nombre === producto.nombre);

  if (existente) {
    existente.cantidad += 1; 
  } else {
    carrito.push({ ...producto, cantidad: 1 }); 
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito`);
}

function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElem = document.getElementById("total-carrito");

  listaCarrito.innerHTML = ""; // Limpiar lista
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.className = "text-white";
    li.textContent = `${producto.nombre} x${producto.cantidad} - CLP ${(producto.precio * producto.cantidad).toLocaleString()}`;

    // Crea un boton que elimina el item del carrito
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "ml-4 bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded";
    btnEliminar.onclick = () => {
      if (producto.cantidad > 1) {
        producto.cantidad -= 1; 
      } else {
        carrito.splice(index, 1); 
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    total += producto.precio * producto.cantidad;
  });

  totalElem.textContent = `Total: CLP ${total.toLocaleString()}`;
}

// Evento que hace que ejecuta al abrir la pagina
document.addEventListener("DOMContentLoaded", mostrarCarrito);

// Botón de pagar, literalmente
const botonPagar = document.getElementById("pagar");
if (botonPagar) {
  botonPagar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
    alert("¡Gracias por su compra!");
  });
}
