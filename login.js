// Inicialización de Supabase
const supabase = createClient('https://TU_PROYECTO.supabase.co', 'TU_PUBLIC_API_KEY');

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const alias = document.getElementById('alias').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const mensaje = document.getElementById('mensaje');

  if (!alias || !clave) {
    mensaje.textContent = 'Por favor, completá todos los campos.';
    return;
  }

  // Buscar usuario por alias
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

  // Redirección según nivel
  localStorage.setItem('usuarioid', usuario.id);
  localStorage.setItem('nivel', usuario.nivelid);

  window.location.href = 'dashboard.html';
});
