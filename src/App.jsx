import React from 'react';
import DashboardOperativo from './components/DashboardOperativo';

function App() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const uid = usuario?.nivelid || 0;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel Institucional</h1>
      <DashboardOperativo uid={uid} />
    </div>
  );
}

export default App;
