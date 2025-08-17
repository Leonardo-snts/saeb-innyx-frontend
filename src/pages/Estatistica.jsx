import React, { useState, useEffect } from 'react';
import Filtros from '../components/estatistica/Filtros';
import GraficoColuna from '../components/estatistica/GraficoColuna';
import TabelaItem from '../components/estatistica/TabelaItem';
import { getAllEstatisticaData } from '../services/api';

const Estatistica = () => {
  const [data, setData] = useState({
    graficoColuna: null,
    tabelaItem: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    simulado: 'Todos',
    ddz: 'Todos',
    escola: 'Todos',
    ano: 'Todos',
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

  const buildLookerFilters = (currentFilters) => {
    const lookerFilters = {};
    for (const key in currentFilters) {
      if (currentFilters[key] && currentFilters[key] !== 'Todos') {
        // Usar o prefixo correto para os looks de estatística
        lookerFilters[`estatistica_saeb.${key}`] = currentFilters[key];
      }
    }
    console.log('Filtros para Looker:', lookerFilters);
    return lookerFilters;
  };

  const fetchData = async (newFilters) => {
    try {
      setLoading(true);
      setError(null);

      const lookerFilters = buildLookerFilters(newFilters);
      console.log('Filtros para Looker:', lookerFilters);

      const result = await getAllEstatisticaData(lookerFilters);
      setData(result);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados da estatística');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      simulado: 'Todos',
      ddz: 'Todos',
      escola: 'Todos',
      ano: 'Todos',
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

      {/* Gráfico de questões */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-8 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            % Acertos por Questão
          </h2>
        </div>
        <GraficoColuna data={data.graficoColuna} loading={loading} />
      </div>

      {/* Tabela de dados */}
      <div className="mx-8 mb-8">
        <TabelaItem data={data.tabelaItem} loading={loading} />
      </div>
    </div>
  );
};

export default Estatistica;
