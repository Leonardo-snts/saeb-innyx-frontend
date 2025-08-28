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
  console.log('🎨 GraficoColuna renderizando com:', { data, loading, onItemClick, onClearFilter });

  if (loading) {
    console.log('⏳ GraficoColuna: mostrando loading');
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Carregando dados...</p>
      </div>
    );
  }

  if (!data || !data.length) {
    console.log('❌ GraficoColuna: dados vazios ou indefinidos');
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Nenhum dado disponível</p>
      </div>
    );
  }

  console.log('✅ GraficoColuna: dados recebidos:', data);

  // Função para lidar com clique no gráfico
  const handleChartClick = (event, elements) => {
    if (elements && elements.length > 0) {
      const element = elements[0];
      const questao = data[element.index]['estatistica_saeb.questao'];
      
      if (questao) {
        console.log(`🎯 Clicou na questão: ${questao}`);
        console.log('📊 Dados da questão clicada:', data[element.index]);
        
        // Aplicar filtro por questão
        onItemClick('questao', questao);
        
        // Também podemos aplicar filtros adicionais baseados nos dados da questão
        const itemData = data[element.index];
        
        // Se houver fase, aplicar filtro de fase
        if (itemData['estatistica_saeb.fase']) {
          console.log(`📚 Aplicando filtro de fase: ${itemData['estatistica_saeb.fase']}`);
          // Aqui você pode implementar filtros múltiplos se necessário
        }
        
        // Se houver eixo CEM, aplicar filtro de eixo
        if (itemData['estatistica_saeb.eixo_cem']) {
          console.log(`📖 Aplicando filtro de eixo CEM: ${itemData['estatistica_saeb.eixo_cem']}`);
        }
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
        backgroundColor: '#00a5ae',
        borderColor: '#00a5ae',
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
    // Configuração para barras lado a lado
    barPercentage: 0.8,
    categoryPercentage: 0.9,
  };

  return (
    <div className="w-full">
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GraficoColuna;
