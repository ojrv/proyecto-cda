import { useFormularios } from './useFormularios'; // asegurate que este archivo existe
import { useEffect, useState } from 'react';

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

function agruparPorModulo(formularios) {
  const agrupado = {};
  formularios.forEach(f => {
    if (!agrupado[f.modulo]) agrupado[f.modulo] = [];
    agrupado[f.modulo].push(f);
  });
  return agrupado;
}

function CardFormulario({ f }) {
  return (
    <div className={`card ${f.estilo_card}`} style={{ borderColor: f.color_acento }}>
      <div className="icono" style={{ backgroundColor: f.color_base }}>
        <i className={f.icono}></i>
      </div>
      <h3>{f.nombre_formulario}</h3>
      <p>{f.titulo_bloque}</p>
      <span className={`estado ${f.estado_funcional.toLowerCase()}`}>
        {f.estado_funcional}
      </span>
      {f.restaurado && <span className="badge-restaurado">Restaurado</span>}
    </div>
  );
}

export default function DashboardAdmin({ usuario }) {
  const { data: formularios, loading } = useFormularios(usuario.id, 'producción');

  if (loading) return <p>Cargando formularios activos...</p>;

  const porModulo = agruparPorModulo(formularios);

  return (
    <div>
      <h2>Formularios activos por módulo</h2>
      {Object.entries(porModulo).map(([modulo, lista]) => (
        <section key={modulo}>
          <h3>{modulo}</h3>
          <div className="grid">
            {lista.map(f => (
              <CardFormulario key={f.nombre_formulario} f={f} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
