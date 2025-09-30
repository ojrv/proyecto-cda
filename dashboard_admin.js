// Mostrar nombre
const nombre = localStorage.getItem('nombre') || localStorage.getItem('alias');
document.getElementById('nombreUsuario').textContent = nombre;

// Mostrar rol textual
const nivel = parseInt(localStorage.getItem('nivel'));
let rol = '';
switch (nivel) {
  case 1: rol = 'Administrador'; break;
  case 2: rol = 'Editor'; break;
  case 3: rol = 'Lector'; break;
  default: rol = 'Desconocido';
}
document.getElementById('rolUsuario').textContent = rol;

// Mostrar fecha y hora
function actualizarFechaHora() {
  const ahora = new Date();
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  document.getElementById('fechaActual').textContent = ahora.toLocaleDateString('es-UY', opcionesFecha);
  document.getElementById('horaActual').textContent = ahora.toLocaleTimeString('es-UY', opcionesHora);
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);
