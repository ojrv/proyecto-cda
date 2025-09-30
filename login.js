const supabase = supabase.createClient(
  'https://TU_PROYECTO.supabase.co',
  'TU_PUBLIC_API_KEY'
);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const alias = document.getElementById('alias').value.trim();
  const clave = document.getElementById('clave').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: alias,
    password: clave
  });

  if (error) {
    document.getElementById('mensaje').textContent = 'Alias o contraseña incorrectos';
    return;
  }

  const rol = data.user.user_metadata?.rol || 'musico';

  // ✅ Redirigir según rol
  switch (rol) {
    case 'admin':
      window.location.href = 'dashboard_admin.html';
      break;
    case 'editor':
      window.location.href = 'dashboard_editor.html';
      break;
    case 'musico':
      window.location.href = 'dashboard_musico.html';
      break;
    default:
      alert('Rol no reconocido');
  }
});
