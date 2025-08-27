import React, { useState, useEffect } from 'react';
import Filtros from '../components/participacoes/Filtros';
import DistritoChart from '../components/participacoes/DistritoChart';
import TotalChart from '../components/participacoes/TotalChart';
import TabelaParticipacoes from '../components/participacoes/TabelaParticipacoes';
import { getAllParticipacoesData } from '../services/api';

const buildLookerFilters = (currentFilters) => {
  const lookerFilters = {};
  for (const key in currentFilters) {
    if (currentFilters[key] && currentFilters[key] !== 'Todos') {
      // Usar o prefixo correto para os looks de notas
      lookerFilters[`participacoes_saeb.${key}`] = currentFilters[key];
    }
  }
  return lookerFilters;
};

const Participacoes = () => {
  const [filters, setFilters] = useState({
    simulado: 'Todos',
    distrito: 'Todos',
    escola: 'Todos',
    fase: 'Todos',
    turma: 'Todos'
  });

  const [data, setData] = useState({
    tabela: [],
    distrito: [],
    total: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados
  const fetchData = async (currentFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Buscando dados com filtros UI:', currentFilters);
      
      // Converter filtros da UI para filtros do Looker
      const lookerFilters = buildLookerFilters(currentFilters);
      console.log('Filtros convertidos para Looker:', lookerFilters);

      const result = await getAllParticipacoesData(lookerFilters);
      console.log('Dados recebidos da API:', result);
      setData(result);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    console.log('Componente montado, carregando dados iniciais');
    fetchData(filters);
  }, []);

  // Função para alterar filtros
  const handleFilterChange = (newFilters) => {
    console.log('Filtros alterados:', newFilters);
    setFilters(newFilters);
    fetchData(newFilters);
  };

  // Função para limpar filtros
  const handleClearFilters = () => {
    const clearedFilters = {
      simulado: 'Todos',
      distrito: 'Todos',
      escola: 'Todos',
      fase: 'Todos',
      turma: 'Todos'
    };
    setFilters(clearedFilters);
    fetchData(clearedFilters);
  };

  // Função para aplicar filtro ao clicar em um item
  const handleItemClick = (filterType, value) => {
    console.log(`Aplicando filtro: ${filterType} = ${value}`);
    
    let newFilters = { ...filters };
    
    // Aplicar o filtro específico
    switch (filterType) {
      case 'distrito':
        newFilters.distrito = value;
        break;
      case 'escola':
        newFilters.escola = value;
        break;
      case 'fase':
        newFilters.fase = value;
        break;
      case 'turma':
        newFilters.turma = value;
        break;
      default:
        break;
    }
    
    console.log('Novos filtros após clique:', newFilters);
    setFilters(newFilters);
    fetchData(newFilters);
  };

  // Função para limpar filtro específico
  const handleClearSpecificFilter = (filterType) => {
    console.log(`Limpando filtro: ${filterType}`);
    
    let newFilters = { ...filters };
    newFilters[filterType] = 'Todos';
    
    console.log('Novos filtros após limpeza:', newFilters);
    setFilters(newFilters);
    fetchData(newFilters);
  };

  // Debug: mostrar dados atuais
  useEffect(() => {
    console.log('Estado atual dos dados:', data);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [data, loading, error]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchData(filters)}
            className="btn-primary"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto"></div>
      {/* Header com filtros */}
      <Filtros
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Seção de gráficos por distrito */}
        <div className="mb-8">
          <div className="p-6 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Participação por Distrito
            </h2>
            <DistritoChart 
              data={data.distrito} 
              loading={loading}
              onItemClick={handleItemClick}
              onClearFilter={handleClearSpecificFilter}
            />
          </div>
        </div>

        {/* Seção de tabela e gráfico SEMED */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabela de dados - 2/3 da largura */}
          <div className="lg:col-span-2">
            <TabelaParticipacoes 
              data={data.tabela} 
              loading={loading}
              onItemClick={handleItemClick}
              onClearFilter={handleClearSpecificFilter}
            />
          </div>

          {/* Gráfico total (SEMED) - 1/3 da largura */}
          <div className="lg:col-span-1">
            <div className="p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                SEMED
              </h3>
              <div className="flex-1">
                <TotalChart 
                  data={data.total} 
                  loading={loading} 
                  onItemClick={handleItemClick}
                  onClearFilter={handleClearSpecificFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participacoes;
