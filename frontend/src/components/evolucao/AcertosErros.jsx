import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const AcertosErros = ({ data, loading, onItemClick, onClearFilter }) => {
  if (loading) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Nenhum dado disponível</p>
      </div>
    );
  }

  // Função para lidar com clique no gráfico
  const handleChartClick = (event, elements) => {
    if (elements && elements.length > 0) {
      const element = elements[0];
      const distrito = data[element.index]['desempenho_notas.distrito'];
      
      if (distrito) {
        console.log(`Clicou no distrito: ${distrito}`);
        onItemClick('distrito', distrito);
      }
    }
  };

  // Processar dados para o formato do Chart.js
  const chartData = {
    labels: data.map(item => item['desempenho_notas.distrito'] || 'Distrito'),
    datasets: [
      {
        label: 'Acertos',
        data: data.map(item => {
          const value = parseFloat(item['desempenho_notas.porcet_total_acertos'] || 0) * 100;
          return value;
        }),
        borderColor: '#033f41',
        backgroundColor: '#033f41',
        borderWidth: 2,
        pointBackgroundColor: '#033f41',
        pointBorderColor: '#033f41',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Erros',
        data: data.map(item => {
          const value = parseFloat(item['desempenho_notas.porcet_total_erros'] || 0) * 100;
          return value;
        }),
        borderColor: '#f97316',
        backgroundColor: '#f97316',
        borderWidth: 2,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#f97316',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleChartClick,
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    plugins: {
      legend: {
        display: false, // Legenda será mostrada abaixo do gráfico
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
      datalabels: {
        color: '#374151',
        anchor: 'end',
        align: 'top',
        offset: 4,
        font: {
          weight: 'bold',
          size: 11,
        },
        formatter: function(value) {
          return value.toFixed(1) + '%';
        },
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        display: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Legenda personalizada */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#033f41] rounded-full"></div>
          <span className="text-sm text-gray-600">Acertos</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Erros</span>
        </div>
      </div>
    </div>
  );
};

export default AcertosErros;
