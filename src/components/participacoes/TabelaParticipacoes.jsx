import React, { useState } from 'react';

const TabelaParticipacoes = ({ data, loading, onItemClick, onClearFilter }) => {
  console.log('TabelaParticipacoes recebeu dados:', data, 'loading:', loading);

  // Estado para controlar a ordenação
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Função para ordenar os dados
  const sortData = (data, key, direction) => {
    if (!key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Tratar valores especiais
      if (aValue === '--' || aValue === 'null') aValue = '';
      if (bValue === '--' || bValue === 'null') bValue = '';

      // Converter para número se possível
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        // Ordenação numérica
        return direction === 'asc' ? aNum - bNum : bNum - aNum;
      } else {
        // Ordenação alfabética
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        if (direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
    });
  };

  // Função para lidar com o clique no cabeçalho
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Função para lidar com clique na linha da tabela
  const handleRowClick = (distrito) => {
    if (distrito) {
      console.log(`Clicou no distrito da tabela: ${distrito}`);
      onItemClick('distrito', distrito);
    }
  };

  // Dados ordenados
  const sortedData = sortData(data, sortConfig.key, sortConfig.direction);

  if (loading) {
    console.log('TabelaParticipacoes: mostrando loading');
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    console.log('TabelaParticipacoes: dados vazios ou indefinidos');
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">Nenhum dado disponível</p>
      </div>
    );
  }

  console.log('TabelaParticipacoes: renderizando tabela com', data.length, 'linhas');

  // Função para formatar números
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '--';
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  // Calcular totais usando os nomes corretos dos campos da API
  const totais = data.reduce((acc, item) => {
    acc.presentes += parseInt(item['participacoes_saeb.sum_presentes'] || 0) || 0;
    acc.ausentes += parseInt(item['participacoes_saeb.sum_ausentes'] || 0) || 0;
    acc.deficientes += parseInt(item['participacoes_saeb.sum_deficientes'] || 0) || 0;
    acc.transferidos += parseInt(item['participacoes_saeb.sum_transferidos'] || 0) || 0;
    return acc;
  }, { presentes: 0, ausentes: 0, deficientes: 0, transferidos: 0 });

  console.log('TabelaParticipacoes: totais calculados:', totais);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-cyan-600 px-6 py-3">
        <h3 className="text-lg font-semibold text-white">Dados Detalhados</h3>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('participacoes_saeb.distrito')}
              >
                <div className="flex items-center space-x-1">
                  <span>Distrito</span>
                  {sortConfig.key === 'participacoes_saeb.distrito' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {sortConfig.direction === 'asc' ? (
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('participacoes_saeb.sum_presentes')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Presentes</span>
                  {sortConfig.key === 'participacoes_saeb.sum_presentes' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {sortConfig.direction === 'asc' ? (
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('participacoes_saeb.sum_ausentes')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Ausentes</span>
                  {sortConfig.key === 'participacoes_saeb.sum_ausentes' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {sortConfig.direction === 'asc' ? (
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('participacoes_saeb.sum_deficientes')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Deficientes</span>
                  {sortConfig.key === 'participacoes_saeb.sum_deficientes' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {sortConfig.direction === 'asc' ? (
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
                onClick={() => handleSort('participacoes_saeb.sum_transferidos')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Transferidos</span>
                  {sortConfig.key === 'participacoes_saeb.sum_transferidos' && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {sortConfig.direction === 'asc' ? (
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      )}
                    </svg>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150" 
                onClick={() => handleRowClick(item['participacoes_saeb.distrito'])}
                title="Clique para filtrar por este distrito"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item['participacoes_saeb.distrito'] || 'Distrito'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatNumber(item['participacoes_saeb.sum_presentes'])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatNumber(item['participacoes_saeb.sum_ausentes'])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatNumber(item['participacoes_saeb.sum_deficientes'])}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {formatNumber(item['participacoes_saeb.sum_transferidos'])}
                </td>
              </tr>
            ))}
            
            {/* Linha de totais */}
            <tr className="bg-gray-50 font-bold">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                Total geral
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                {formatNumber(totais.presentes)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                {formatNumber(totais.ausentes)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                {formatNumber(totais.deficientes)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                {formatNumber(totais.transferidos)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaParticipacoes;
