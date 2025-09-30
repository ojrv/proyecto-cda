function cargarFuncionesPorRol(rolId) {
  fetch(`/api/funciones_por_rol?rolid=${rolId}`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll(`[data-rol="${rolId}"] input[type="checkbox"]`).forEach(chk => {
        const funcion = chk.dataset.funcion;
        chk.checked = data.some(f => f.funcion === funcion && f.acceso);
      });
    });
}
