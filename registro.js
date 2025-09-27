window.addEventListener('load', () => {
  const client = window.supabase.createClient(
    'https://fdlnptxefjzoxeiqsujx.supabase.co', // ← Reemplazá con tu URL real
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbG5wdHhlZmp6b3hlaXFzdWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDE3ODIsImV4cCI6MjA3NDQxNzc4Mn0.BI9M80Fr-AevXnHBATTJZkRjFrCGn4x7cgDPkTinNms'                 // ← Reemplazá con tu clave anon
  );

  const form = document.getElementById('formUsuario');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
      nombreusuario: document.getElementById('nombreUsuario').value,
      clave: document.getElementById('clave').value,
      nivelacceso: document.getElementById('nivelAcceso').value,
      activo: document.getElementById('activo').value === 'true'
    };

    try {
      const { data, error } = await client
        .from('usuario') // ← Asegurate que el nombre coincida con tu tabla
        .insert([datos]);

      if (error) {
        alert("Error al registrar usuario: " + error.message);
      } else {
        alert("Usuario registrado correctamente");
        form.reset();
      }
    } catch (err) {
      alert("Error inesperado: " + err.message);
    }
  });

});
