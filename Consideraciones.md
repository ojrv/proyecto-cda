# Compatibilidad multiplataforma y operabilidad en Android

## 1. Objetivo

Garantizar que el sistema musical litúrgico sea accesible, funcional y fluido en dispositivos Android, sin perder interoperabilidad con otras plataformas.

---

## 2. Requisitos del frontend

- Diseño responsivo (HTML, CSS, JS adaptables a móviles)
- Botones grandes y formularios táctiles
- Navegación clara y accesible
- Evitar dependencias de teclado o mouse

---

## 3. Requisitos del backend

- Uso de Supabase, Firebase o APIs REST compatibles con Android
- Estructura de datos clara y normalizada
- Vistas SQL optimizadas para consumo móvil
- Seguridad en endpoints (autenticación, validación)

---

## 4. Opciones de integración en Android

- **Progressive Web App (PWA)**: se instala como app sin pasar por Play Store
- **WebView**: incrustar el sistema web en una app nativa
- **Apps no-code**: usar Glide, Thunkable o AppGyver para prototipos rápidos

---

## 5. Recomendaciones técnicas

- Convertir campos `TEXT` de fecha/hora a `DATE` y `TIME`
- Usar `BOOLEAN` en lugar de `INTEGER` para campos como `Seleccionado`
- Validar claves foráneas y relaciones antes de migrar
- Replicar vistas como `SQL Views` en Supabase

---

## 6. Funcionalidades clave en Android

- Visualizar canciones y archivos asociados
- Filtrar por tipo, ritmo, tonalidad, uso litúrgico
- Registrar reuniones y asignar repertorio
- Consultar configuraciones vocales y técnicas
- Acceder a vistas como `VistaCancionCompleta` y `VistaLetraSinAcordes`

---

## 7. Estrategia de despliegue

- Frontend en GitHub Pages o Vercel
- Backend en Supabase con autenticación
- PWA para Android con ícono personalizado
- Documentación accesible desde el sistema

---

## 8. Conclusión

El diseño actual está preparado para ser multiplataforma. Con ajustes mínimos, puede convertirse en una herramienta robusta, accesible y operativa en Android, sin perder modularidad ni escalabilidad.
