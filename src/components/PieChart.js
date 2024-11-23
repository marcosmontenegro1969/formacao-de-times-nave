import React, { useEffect, useRef } from 'react';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const dataPie = {
      labels: ['Fizeram Autoavaliação', 'Não Fizeram Autoavaliação'],
      datasets: [
        {
          data: [475, 65],
          backgroundColor: ['#36A2EB', '#FF6384'],
        },
      ],
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: dataPie,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom', // Coloca as legendas abaixo do gráfico
            align: 'start',
            labels: {
              usePointStyle: true, // Troca quadrados por círculos
              padding: 10, // Espaçamento entre os itens da legenda
            },
          },
        },
      },
    });
    
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef}></canvas>
  );
};

export default PieChart;
