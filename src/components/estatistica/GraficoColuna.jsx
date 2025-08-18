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

const GraficoColuna = ({ data, loading, onItemClick, onClearFilter }) => {
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
      const questao = data[element.index]['estatistica_saeb.questao'];
      
      if (questao) {
        console.log(`Clicou na questão: ${questao}`);
        onItemClick('questao', questao);
      }
    }
  };

  // Processar dados para o formato do Chart.js
  // Ordenar os dados por número da questão para eixo X em ordem crescente
  const sortedData = [...data].sort((a, b) => {
    const questaoA = parseInt(a['estatistica_saeb.questao']) || 0;
    const questaoB = parseInt(b['estatistica_saeb.questao']) || 0;
    return questaoA - questaoB;
  });

  const chartData = {
    labels: sortedData.map(item => item['estatistica_saeb.questao'] || 'Questão'),
    
    datasets: [
      {
        label: '% Acertos',
        data: sortedData.map(item => {
          const value = parseFloat(item['estatistica_saeb.porcentagem_acertos'] || 0) * 100;
          return value;
        }),
        backgroundColor: '#0891b2', // teal-600
        borderColor: '#0891b2',
        borderWidth: 1,
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
    <div className="w-full">
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* Legenda personalizada */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-cyan-600 rounded"></div>
          <span className="text-sm text-gray-600">% Acertos</span>
        </div>
      </div>
    </div>
  );
};

export default GraficoColuna;
