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
    turma: 'Todos',
    questao: 'Todos',
    fase: 'Todos',
    gabarito: 'Todos',
    eixo_cem: 'Todos',
    ch_cem: 'Todos',
    habilidade_cem: 'Todos',
    ch_saeb: 'Todos',
    habilidade_saeb: 'Todos',
    cc: 'Todos',
    porcentagem_acertos: 'Todos',
    porcentagem_A: 'Todos',
    porcentagem_B: 'Todos',
    porcentagem_C: 'Todos',
    porcentagem_D: 'Todos',
    porcentagem_embranco: 'Todos',
    porcentagem_rasura: 'Todos'
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
    console.log(`🔍 Aplicando filtro: ${filterType} = ${value}`);
    console.log('📊 Filtros atuais:', filters);
    
    let newFilters = { ...filters };
    
    // Aplicar o filtro específico
    switch (filterType) {
      case 'simulado':
        newFilters.simulado = value;
        break;
      case 'ddz':
        newFilters.ddz = value;
        break;
      case 'escola':
        newFilters.escola = value;
        break;
      case 'ano':
        newFilters.ano = value;
        break;
      case 'turma':
        newFilters.turma = value;
        break;
      case 'questao':
        newFilters.questao = value;
        break;
      case 'fase':
        newFilters.fase = value;
        break;
      case 'gabarito':
        newFilters.gabarito = value;
        break;
      case 'eixo_cem':
        newFilters.eixo_cem = value;
        break;
      case 'ch_cem':
        newFilters.ch_cem = value;
        break;
      case 'habilidade_cem':
        newFilters.habilidade_cem = value;
        break;
      case 'ch_saeb':
        newFilters.ch_saeb = value;
        break;
      case 'habilidade_saeb':
        newFilters.habilidade_saeb = value;
        break;
      case 'cc':
        newFilters.cc = value;
        break;
      case 'porcentagem_acertos':
        newFilters.porcentagem_acertos = value;
        break;
      case 'porcentagem_A':
        newFilters.porcentagem_A = value;
        break;
      case 'porcentagem_B':
        newFilters.porcentagem_B = value;
        break;
      case 'porcentagem_C':
        newFilters.porcentagem_C = value;
        break;
      case 'porcentagem_D':
        newFilters.porcentagem_D = value;
        break;
      case 'porcentagem_embranco':
        newFilters.porcentagem_embranco = value;
        break;
      case 'porcentagem_rasura':
        newFilters.porcentagem_rasura = value;
        break;
      default:
        console.log('❓ Tipo de filtro não reconhecido:', filterType);
        break;
    }
    
    console.log('🔄 Novos filtros após clique:', newFilters);
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

  const buildLookerFilters = (currentFilters) => {
    console.log('🔍 buildLookerFilters recebeu:', currentFilters);
    
    const lookerFilters = {};
    for (const key in currentFilters) {
      if (currentFilters[key] && currentFilters[key] !== 'Todos') {
        // Usar o prefixo correto para os looks de estatística
        lookerFilters[`estatistica_saeb.${key}`] = currentFilters[key];
        console.log(`✅ Adicionando filtro: estatistica_saeb.${key} = ${currentFilters[key]}`);
      } else {
        console.log(`⏭️ Pulando filtro ${key}: valor = ${currentFilters[key]}`);
      }
    }
    
    console.log('🔧 Filtros finais para Looker:', lookerFilters);
    return lookerFilters;
  };

  const fetchData = async (newFilters) => {
    try {
      console.log('🚀 Iniciando fetchData com filtros:', newFilters);
      setLoading(true);
      setError(null);

      const lookerFilters = buildLookerFilters(newFilters);
      console.log('🔧 Filtros convertidos para Looker:', lookerFilters);

      console.log('📡 Chamando getAllEstatisticaData...');
      const result = await getAllEstatisticaData(lookerFilters);
      console.log('📊 Resultado recebido da API:', result);
      
      setData(result);
      console.log('✅ Dados atualizados no estado:', result);
    } catch (err) {
      console.error('❌ Erro ao buscar dados:', err);
      setError('Erro ao carregar dados da estatística');
    } finally {
      setLoading(false);
      console.log('🏁 Loading finalizado');
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      simulado: 'Todos',
      ddz: 'Todos',
      escola: 'Todos',
      ano: 'Todos',
      turma: 'Todos',
      questao: 'Todos',
      fase: 'Todos',
      gabarito: 'Todos',
      eixo_cem: 'Todos',
      ch_cem: 'Todos',
      habilidade_cem: 'Todos',
      ch_saeb: 'Todos',
      habilidade_saeb: 'Todos',
      cc: 'Todos',
      porcentagem_acertos: 'Todos',
      porcentagem_A: 'Todos',
      porcentagem_B: 'Todos',
      porcentagem_C: 'Todos',
      porcentagem_D: 'Todos',
      porcentagem_embranco: 'Todos',
      porcentagem_rasura: 'Todos'
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
      <div className="mx-8 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            % Acertos por Questão
          </h2>
        </div>
        <GraficoColuna 
          data={data.graficoColuna} 
          loading={loading}
          onItemClick={handleItemClick}
          onClearFilter={handleClearSpecificFilter}
        />
      </div>

      {/* Tabela de dados */}
      <div className="mx-8 mb-8">
        <TabelaItem 
          data={data.tabelaItem} 
          loading={loading}
          onItemClick={handleItemClick}
          onClearFilter={handleClearSpecificFilter}
        />
      </div>
    </div>
  );
};

export default Estatistica;
