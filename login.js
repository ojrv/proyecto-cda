// Inicializar Supabase
const supabase = createClient('https://TU_PROYECTO.supabase.co', 'TU_PUBLIC_KEY');

document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const alias = document.getElementById('alias').value.trim();
  const clave = document.getElementById('clave').value.trim();
  const mensaje = document.getElementById('mensaje-login');

  // Consulta 1: buscar usuario por alias
  const { data: usuario, error } = await supabase
    .from('usuario')
    .select('nombreusuario, clave, activo, nivelid')
    .eq('alias', alias)
    .single();

  if (error || !usuario) {
    mensaje.textContent = 'Alias no encontrado';
    return;
  }

  if (!usuario.activo) {
    mensaje.textContent = 'Usuario inactivo';
    return;
  }

  if (usuario.clave !== clave) {
    mensaje.textContent = 'Contraseña incorrecta';
    return;
  }

  // Consulta 2: obtener nombre del rol
  const { data: rolData, error: rolError } = await supabase
    .from('nivelesusuario')
    .select('nombrenivel')
    .eq('id', usuario.nivelid)
    .single();

  if (rolError || !rolData) {
    mensaje.textContent = 'Rol no encontrado';
    return;
  }

  const rol = rolData.nombrenivel;
  mensaje.textContent = `Bienvenido, ${usuario.nombreusuario} – Rol: ${rol}`;
  mostrarDashboardPorRol(rol);
});

// Mostrar dashboard según rol
function mostrarDashboardPorRol(rol) {
  document.querySelectorAll('.dashboard').forEach(div => div.style.display = 'none');
  const id = `dashboard-${rol}`;
  const modulo = document.getElementById(id);
  if (modulo) modulo.style.display = 'block';
}
