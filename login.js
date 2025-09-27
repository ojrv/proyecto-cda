const supabase = supabase.createClient('https://TU-PROYECTO.supabase.co', 'TU-CLAVE-PUBLICA');

document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;

  const { data, error } = await supabase
    .from('Usuario')
    .select('ID, NombreUsuario, NivelID, Activo')
    .eq('NombreUsuario', usuario)
    .eq('Clave', clave)
    .eq('Activo', true)
    .single();

  if (data) {
    localStorage.setItem('usuarioActivo', JSON.stringify(data));
    window.location.href = 'dashboard.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
