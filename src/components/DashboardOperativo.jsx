import React, { useEffect, useState } from 'react';
import PanelFunciones from './PanelFunciones';
import { supabase } from '../supabaseClient'; // ajustá el path si es distinto

function DashboardOperativo({ uid }) {
  const [bloques, setBloques] = useState([]);

  useEffect(() => {
    async function cargarFunciones() {
      const { data, error } = await supabase
        .rpc('funciones_visibles_por_usuario', { uid });

      if (error) {
        console.error('Error al obtener funciones:', error);
        return;
      }

      const agrupados = agruparPorBloque(data);
      setBloques(agrupados);
    }

    cargarFunciones();
  }, [uid]);

  return (
    <div>
      {bloques.map(bloque => (
        <PanelFunciones key={bloque.idbloque} bloque={bloque} />
      ))}
    </div>
  );
}

function agruparPorBloque(funcionesPlanas) {
  const bloques = {};

  funcionesPlanas.forEach(func => {
    const id = func.idbloque;

    if (!bloques[id]) {
      bloques[id] = {
        idbloque: id,
        titulo_bloque: func.titulo_bloque,
        icono: func.icono,
        color_base: func.color_base,
        color_acento: func.color_acento,
        estilo_card: func.estilo_card,
        funciones: []
      };
    }

    bloques[id].funciones.push(func);
  });

  return Object.values(bloques);
}

export default DashboardOperativo;
