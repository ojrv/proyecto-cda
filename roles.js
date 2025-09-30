// ✅ Inicializar Supabase
const supabase = supabase.createClient(
  'https://TU_PROYECTO.supabase.co',
  'TU_PUBLIC_API_KEY'
);

// ✅ Funciones disponibles en el sistema
const funcionesSistema = [
  'gestionar_usuarios',
  'gestionar_reuniones',
  'gestionar_canciones',
  'gestionar_tandas',
  'configuracion'
];

// ✅ Permisos por rol (puede venir del backend si lo preferís)
const permisosPorRol = {
  admin: funcionesSistema,
  editor: ['gestionar_reuniones', 'gestionar_canciones', 'gestionar_tandas'],
  musico: ['gestionar_tandas']
};

// ✅ Obtener rol del usuario desde Supabase
async function obtenerRolUsuario() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.warn('No se pudo obtener el usuario desde Supabase');
    return 'musico'; // Rol por defecto
  }
  return data.user.user_metadata?.rol || 'musico';
}

// ✅ Validar si el usuario tiene acceso a una función
function usuarioTieneAcceso(rol, funcion) {
  return permisosPorRol[rol]?.includes(funcion);
}

// ✅ Aplicar permisos al dashboard
async function aplicarPermisosDashboard() {
  const rolUsuario = await obtenerRolUsuario();

  document.querySelectorAll('.tarjeta-funcion').forEach(tarjeta => {
    const funcion = tarjeta.dataset.funcion;
    if (!usuarioTieneAcceso(rolUsuario, funcion)) {
      tarjeta.style.display = 'none';
    }
  });

  console.log(`Rol detectado: ${rolUsuario}`);
}

// ✅ Ejecutar al cargar
document.addEventListener('DOMContentLoaded', aplicarPermisosDashboard);
