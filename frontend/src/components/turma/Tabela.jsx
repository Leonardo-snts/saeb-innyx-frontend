import React, { useState } from 'react';

const Tabela = ({ data, loading, onItemClick, onClearFilter, onSort, sortConfig, pagination, onPageChange, onPageSizeChange, pageSize }) => {
    console.log('🎨 Tabela Turma renderizando com:', { data, loading, onItemClick, onClearFilter, onSort, sortConfig, pagination, pageSize });

    // Função para truncar texto com mais de X caracteres
    const truncateText = (text, maxLength = 20) => {
        if (!text || text === '--' || text === 'null') return text;
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Função para lidar com o clique no cabeçalho
    const handleSort = (key) => {
        if (onSort) {
            onSort(key);
        }
    };



    // Função para lidar com clique na linha da tabela
    const handleRowClick = (item) => {
        if (item) {
            console.log('🎯 Clicou na linha da tabela:', item);
            
            // Aplicar filtros baseados nos dados da linha
            if (item['relatorio_turma_saeb.Distrito']) {
                console.log(`🏘️ Aplicando filtro de distrito: ${item['relatorio_turma_saeb.Distrito']}`);
                onItemClick('distrito', item['relatorio_turma_saeb.Distrito']);
            }
            
            if (item['relatorio_turma_saeb.Escola']) {
                console.log(`🏫 Aplicando filtro de escola: ${item['relatorio_turma_saeb.Escola']}`);
                onItemClick('escola', item['relatorio_turma_saeb.Escola']);
            }
            
            if (item['relatorio_turma_saeb.Ano']) {
                console.log(`📚 Aplicando filtro de ano: ${item['relatorio_turma_saeb.Ano']}`);
                onItemClick('ano', item['relatorio_turma_saeb.Ano']);
            }
            
            if (item['relatorio_turma_saeb.Turma']) {
                console.log(`👥 Aplicando filtro de turma: ${item['relatorio_turma_saeb.Turma']}`);
                onItemClick('turma', item['relatorio_turma_saeb.Turma']);
            }
        }
    };

    // Dados já vêm ordenados do backend

    if (loading) {
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
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500 text-center">Nenhum dado disponível</p>
            </div>
        );
    }

    return (
        <div className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-y-auto max-h-[600px]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#033f41]">
                                <tr>
                                    <th 
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[120px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Distrito')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Distrito</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Distrito' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[80px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Sigeam')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Sigeam</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Sigeam' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[180px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Escola')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Escola</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Escola' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[120px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Matricula')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Matrícula</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Matricula' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[200px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Nome')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Nome</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Nome' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[100px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Ano')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Ano</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Ano' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[80px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Turma')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Turma</span>
                                            {sortConfig.key === 'relatorio_turma_saeb.Turma' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[100px]"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <span className='text-[9px] leading-tight'>Cartão</span>
                                        </div>
                                    </th>
                                    <th 
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[120px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Media_LP')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <div className="text-[9px] leading-tight">
                                                <div>Média</div>
                                                <div>LP</div>
                                            </div>
                                            {sortConfig.key === 'relatorio_turma_saeb.Media_LP' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[120px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Media_MA')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <div className="text-[9px] leading-tight">
                                                <div>Média</div>
                                                <div>MA</div>
                                            </div>
                                            {sortConfig.key === 'relatorio_turma_saeb.Media_MA' && (
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
                                        className="bg-[#033f41] px-2 py-3 text-center font-extrabold text-white tracking-wider cursor-pointer hover:bg-gray-600 select-none min-w-[120px]"
                                        onClick={() => handleSort('relatorio_turma_saeb.Media_Final')}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <div className="text-[9px] leading-tight">
                                                <div>Média</div>
                                                <div>Final</div>
                                            </div>
                                            {sortConfig.key === 'relatorio_turma_saeb.Media_Final' && (
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
                                {data.map((item, index) => (
                                    <tr 
                                        key={index} 
                                        className={`hover:bg-gray-50 h-[50px] cursor-pointer transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`} 
                                        onClick={() => handleRowClick(item)}
                                        title="Clique para filtrar por este aluno"
                                    >
                                        <td className="px-2 py-2 text-xs font-medium text-gray-900 text-center min-w-[120px] truncate" title={item['relatorio_turma_saeb.Distrito'] || '--'}>
                                            {truncateText(item['relatorio_turma_saeb.Distrito'] || '--', 18)}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[80px]">
                                            {item['relatorio_turma_saeb.Sigeam'] || '--'}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[180px] truncate" title={item['relatorio_turma_saeb.Escola'] || '--'}>
                                            {truncateText(item['relatorio_turma_saeb.Escola'] || '--', 25)}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[120px]">
                                            {item['relatorio_turma_saeb.Matricula'] || '--'}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[200px] truncate" title={item['relatorio_turma_saeb.Nome'] || '--'}>
                                            {truncateText(item['relatorio_turma_saeb.Nome'] || '--', 30)}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[100px]">
                                            {item['relatorio_turma_saeb.Ano'] || '--'}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[80px]">
                                            {item['relatorio_turma_saeb.Turma'] || '--'}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[100px]">
                                            {item['relatorio_turma_saeb.cartao_resposta'] ? (
                                                <a 
                                                    href={item['relatorio_turma_saeb.cartao_resposta']} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    🔗
                                                </a>
                                            ) : (
                                                '--'
                                            )}
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[120px] font-semibold">
                                            {item['relatorio_turma_saeb.Media_LP'] ? 
                                                parseFloat(item['relatorio_turma_saeb.Media_LP']).toFixed(2).replace('.', ',') : 
                                                '--'
                                            }
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[120px] font-semibold">
                                            {item['relatorio_turma_saeb.Media_MA'] ? 
                                                parseFloat(item['relatorio_turma_saeb.Media_MA']).toFixed(2).replace('.', ',') : 
                                                '--'
                                            }
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900 text-center min-w-[120px] font-semibold">
                                            {item['relatorio_turma_saeb.Media_Final'] ? 
                                                parseFloat(item['relatorio_turma_saeb.Media_Final']).toFixed(2).replace('.', ',') : 
                                                '--'
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Botão de navegação rápida - abaixo da tabela */}
            {pagination && (
                <div className="mt-4 flex justify-end">
                    <div className="flex items-center space-x-3 bg-white px-4 py-2">
                        {/* Botão Anterior */}
                        <button
                            onClick={() => onPageChange && onPageChange(pagination.page - 1)}
                            disabled={!pagination.hasPrev}
                            className={`p-2 rounded-md transition-colors ${
                                pagination.hasPrev 
                                    ? 'text-gray-600 hover:bg-gray-100 cursor-pointer' 
                                    : 'text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        {/* Indicador de página */}
                        <div className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                            {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} / {pagination.total.toLocaleString()}
                        </div>
                        
                        {/* Botão Próximo */}
                        <button
                            onClick={() => onPageChange && onPageChange(pagination.page + 1)}
                            disabled={!pagination.hasNext}
                            className={`p-2 rounded-md transition-colors ${
                                pagination.hasNext 
                                    ? 'text-gray-600 hover:bg-gray-100 cursor-pointer' 
                                    : 'text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tabela;
