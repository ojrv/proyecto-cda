// Inicialización de Supabase
const supabase = window.supabase.createClient(
  'https://fdlnptxefjzoxeiqsujx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbG5wdHhlZmp6b3hlaXFzdWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDE3ODIsImV4cCI6MjA3NDQxNzc4Mn0.BI9M80Fr-AevXnHBATTJZkRjFrCGn4x7cgDPkTinNms'
);

// Referencias a elementos
const form = document.getElementById('formUsuario');
const mensaje = document.getElementById('mensaje');
const tabla = document.querySelector('#tablaUsuarios tbody');

// Insertar nuevo usuario
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const alias = document.getElementById('alias').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const nivel = parseInt(document.getElementById('nivel').value);
  const activo = document.getElementById('activo').value === 'true';

  if (!alias || !clave) {
    mensaje.textContent = 'Alias y contraseña son obligatorios.';
    return;
  }

  const { error } = await supabase
    .from('usuario')
    .insert([{ alias, clave, nivelid: nivel, activo }]);

  if (error) {
    mensaje.textContent = 'Error al guardar: ' + error.message;
  } else {
    mensaje.textContent = 'Usuario guardado correctamente.';
    form.reset();
    cargarUsuarios();
  }
});

// Mostrar usuarios en tabla
async function cargarUsuarios() {
  const { data, error } = await supabase
    .from('usuario')
    .select('alias, nivelid, activo');

  if (error) {
    tabla.innerHTML = '<tr><td colspan="3">Error al cargar usuarios</td></tr>';
    return;
  }

  tabla.innerHTML = '';
  data.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.alias}</td>
      <td>${nivelTexto(usuario.nivelid)}</td>
      <td>${usuario.activo ? 'Sí' : 'No'}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Convertir nivel numérico a texto
function nivelTexto(n) {
  return n === 1 ? 'Administrador' : n === 2 ? 'Editor' : 'Lector';
}

// Cargar al iniciar
cargarUsuarios();
