import React, { useState, useEffect } from 'react';
import Filtros from '../components/notas/Filtros';
import ScoreCardAcertos from '../components/notas/ScoreCardAcertos';
import ScoreCardErros from '../components/notas/ScoreCardErros';
import GraficoDistrito from '../components/notas/GraficoDistrito';
import { getAllNotasData } from '../services/api';

const Notas = () => {
  const [data, setData] = useState({
    acertos: null,
    erros: null,
    distrito: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    simulado: 'Todos',
    distrito: 'Todos',
    escola: 'Todos',
    fase: 'Todos',
    turma: 'Todos'
  });

  useEffect(() => {
    fetchData(filters);
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchData(newFilters);
  };

  // Função para aplicar filtro ao clicar em um item
  const handleItemClick = (filterType, value) => {
    
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
    
    setFilters(newFilters);
    fetchData(newFilters);
  };

  // Função para limpar filtro específico
  const handleClearSpecificFilter = (filterType) => {
    
    let newFilters = { ...filters };
    newFilters[filterType] = 'Todos';
    
    console.log('Novos filtros após limpeza:', newFilters);
    setFilters(newFilters);
    fetchData(newFilters);
  };

  const buildLookerFilters = (currentFilters) => {
    const lookerFilters = {};
    for (const key in currentFilters) {
      if (currentFilters[key] && currentFilters[key] !== 'Todos') {
        // Usar o prefixo correto para os looks de notas
        lookerFilters[`desempenho_notas.${key}`] = currentFilters[key];
      }
    }
    return lookerFilters;
  };

  const fetchData = async (newFilters) => {
    try {
      setLoading(true);
      setError(null);

      const lookerFilters = buildLookerFilters(newFilters);
      console.log('Filtros para Looker:', lookerFilters);

      const result = await getAllNotasData(lookerFilters);
      setData(result);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados das notas');
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Erro ao carregar dados</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com filtros */}
      <Filtros
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* KPIs Score Cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8 p-8">
        <ScoreCardAcertos 
          data={data.acertos} 
          loading={loading}
          onItemClick={handleItemClick}
          onClearFilter={handleClearSpecificFilter}
        />
        <ScoreCardErros 
          data={data.erros} 
          loading={loading}
          onItemClick={handleItemClick}
          onClearFilter={handleClearSpecificFilter}
        />
      </div>

      {/* Gráfico por distrito */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-8 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Desempenho dos Estudantes
        </h3>
        <GraficoDistrito 
          data={data.distrito} 
          loading={loading}
          onItemClick={handleItemClick}
          onClearFilter={handleClearSpecificFilter}
        />
      </div>
    </div>
  );
};

export default Notas;
