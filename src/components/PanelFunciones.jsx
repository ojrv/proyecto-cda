import React from 'react';

function PanelFunciones({ bloque }) {
  const {
    titulo_bloque,
    icono,
    color_base,
    color_acento,
    estilo_card,
    funciones
  } = bloque;

  return (
    <div className={`panel-funciones ${estilo_card}`} style={{ backgroundColor: color_base, padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2 style={{ color: color_acento }}>
        <i className={`fa ${icono}`} style={{ marginRight: '8px' }} />
        {titulo_bloque}
      </h2>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {funciones.map(func => (
          <li key={func.idfuncion} style={{ marginBottom: '0.5rem' }}>
            <button
              onClick={() => ejecutarModulo(func.modulo)}
              style={{
                backgroundColor: color_acento,
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {func.descripcion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Esta función se puede ajustar luego para abrir el módulo correspondiente
function ejecutarModulo(modulo) {
  console.log('Ejecutar módulo:', modulo);
}

export default PanelFunciones;
