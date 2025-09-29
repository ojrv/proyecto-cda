const usuarioid = localStorage.getItem('usuarioid');
const nivel = localStorage.getItem('nivel');
const bienvenida = document.getElementById('bienvenida');
const modulos = document.getElementById('modulos');

if (!usuarioid || !nivel) {
  window.location.href = 'index.html';
}

const niveles = {
  1: 'Administrador',
  2: 'Editor',
  3: 'Lector'
};

bienvenida.textContent = `Bienvenido, nivel ${niveles[nivel] || 'Desconocido'}`;

const enlaces = [];

if (nivel == 1) {
  enlaces.push({ texto: 'Gestión de usuarios', url: 'usuarios.html' });
  enlaces.push({ texto: 'Configuración institucional', url: 'configuracion.html' });
}

if (nivel <= 2) {
  enlaces.push({ texto: 'Reuniones y ministros', url: 'reuniones.html' });
  enlaces.push({ texto: 'Canciones y archivos', url: 'canciones.html' });
}

enlaces.push({ texto: 'Ver repertorio', url: 'repertorio.html' });

enlaces.forEach(enlace => {
  const a = document.createElement('a');
  a.href = enlace.url;
  a.textContent = enlace.texto;
  modulos.appendChild(a);
});

function cerrarSesion() {
  localStorage.clear();
  window.location.href = 'index.html';
}
