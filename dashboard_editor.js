const nombre = localStorage.getItem('nombre') || 'Usuario';
document.getElementById('nombreUsuario').textContent = nombre;

function actualizarFechaHora() {
  const ahora = new Date();
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  document.getElementById('fechaActual').textContent = ahora.toLocaleDateString('es-UY', opcionesFecha);
  document.getElementById('horaActual').textContent = ahora.toLocaleTimeString('es-UY', opcionesHora);
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);
