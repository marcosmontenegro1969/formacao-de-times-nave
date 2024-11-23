import React from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registra os controladores e plugins do Chart.js
Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Componente que renderiza o gráfico de barras
const BarChart = ({ currentSeries, seriesData }) => {
  // Configurações do gráfico de barras
  const options = {
    responsive: true, // Torna o gráfico responsivo
    plugins: {
      legend: {
        position: "top", // Posição da legenda no topo
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Renderiza o gráfico de barras da série selecionada */}
      <Bar data={seriesData[currentSeries]} options={options} />
    </div>
  );
};

export default BarChart;
