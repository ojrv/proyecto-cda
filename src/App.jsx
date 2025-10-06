import React from 'react';
import DashboardOperativo from './components/DashboardOperativo';

function App() {
  const uid = 7; // Reemplazá por el ID real del usuario logueado

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel Institucional</h1>
      <DashboardOperativo uid={uid} />
    </div>
  );
}

export default App;
