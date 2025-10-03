import { useEffect, useState } from 'react';
import { supabase } from './supabase'; // Asegurate que este archivo exista y esté bien configurado

export function useFormularios(uid, entorno) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFormularios() {
      const { data, error } = await supabase.rpc('resumen_visual_por_nivel_y_entorno', {
        uid,
        entorno_actual: entorno
      });
      if (error) console.error('Error:', error);
      else setData(data);
      setLoading(false);
    }
    fetchFormularios();
  }, [uid, entorno]);

  return { data, loading };
}
