import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const TotalChart = ({ data, loading, onItemClick, onClearFilter }) => {
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
      const distrito = data[element.index]['participacoes_saeb.distrito'];
      
      if (distrito) {
        console.log(`Clicou no distrito: ${distrito}`);
        onItemClick('distrito', distrito);
      }
    }
  };

  // Processar dados para o formato do Chart.js
  // Usando os nomes corretos dos campos da API
  const chartData = {
    labels: ['SEMED'],
    datasets: [
      {
        label: '% Presentes',
        data: [parseFloat(data[0]?.['participacoes_saeb.porcet_presentes'] || 0) * 100],
        backgroundColor: '#0891b2',
        borderColor: '#0891b2',
        borderWidth: 1,
      },
      {
        label: '% Ausentes',
        data: [parseFloat(data[0]?.['participacoes_saeb.porcet_ausentes'] || 0) * 100],
        backgroundColor: '#f97316', // orange-500
        borderColor: '#f97316',
        borderWidth: 1,
      },
    ],
  };

  console.log('TotalChart dados processados:', chartData);

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
        display: false,
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
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
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
    // Configuração para barras lado a lado
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-96">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* Legenda personalizada */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-600 rounded"></div>
          <span className="text-sm text-gray-600">% Presentes</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">% Ausentes</span>
        </div>
      </div>
    </div>
  );
};

export default TotalChart;
