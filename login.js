const supabase = window.supabase.createClient(
  'https://fdlnptxefjzoxeiqsujx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbG5wdHhlZmp6b3hlaXFzdWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDE3ODIsImV4cCI6MjA3NDQxNzc4Mn0.BI9M80Fr-AevXnHBATTJZkRjFrCGn4x7cgDPkTinNms'
);

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const alias = document.getElementById('alias').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const mensaje = document.getElementById('mensaje');

  if (!alias || !clave) {
    mensaje.textContent = 'Por favor, completá todos los campos.';
    return;
  }

  const { data: usuario, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('alias', alias)
    .single();

  if (error || !usuario) {
    mensaje.textContent = 'Alias no encontrado.';
    return;
  }

  if (usuario.clave !== clave) {
    mensaje.textContent = 'Contraseña incorrecta.';
    return;
  }

  if (!usuario.activo) {
    mensaje.textContent = 'Usuario inactivo.';
    return;
  }

  // Guardar datos en localStorage
  localStorage.setItem('usuarioid', usuario.id);
  localStorage.setItem('nivel', usuario.nivelid);
  localStorage.setItem('alias', usuario.alias);
  localStorage.setItem('nombre', usuario.nombre || usuario.alias);

  // Derivación automática
  let destino = '';
  switch (usuario.nivelid) {
    case 1:
      destino = 'dashboard_admin.html';
      break;
    case 2:
      destino = 'dashboard_editor.html';
      break;
    case 3:
      destino = 'dashboard_lector.html';
      break;
    default:
      destino = 'dashboard.html';
  }

  window.location.href = destino;
});
