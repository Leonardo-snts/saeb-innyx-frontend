import React, { useState } from 'react';

const TabelaItem = ({ data, loading, onItemClick, onClearFilter }) => {
    console.log('🎨 TabelaItem renderizando com:', { data, loading, onItemClick, onClearFilter });

    // Estado para controlar a ordenação
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'asc'
    });

    // Função para truncar texto com mais de 30 caracteres
    const truncateText = (text, maxLength = 18) => {
        if (!text || text === '--' || text === 'null') return text;
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

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
    const handleRowClick = (item) => {
        if (item) {
            console.log('🎯 Clicou na linha da tabela:', item);
            
            // Aplicar filtros baseados nos dados da linha
            if (item['estatistica_saeb.questao']) {
                console.log(`📝 Aplicando filtro de questão: ${item['estatistica_saeb.questao']}`);
                onItemClick('questao', item['estatistica_saeb.questao']);
            }
            
            if (item['estatistica_saeb.fase']) {
                console.log(`📚 Aplicando filtro de fase: ${item['estatistica_saeb.fase']}`);
                onItemClick('fase', item['estatistica_saeb.fase']);
            }
            
            if (item['estatistica_saeb.gabarito']) {
                console.log(`✅ Aplicando filtro de gabarito: ${item['estatistica_saeb.gabarito']}`);
                onItemClick('gabarito', item['estatistica_saeb.gabarito']);
            }
            
            if (item['estatistica_saeb.eixo_cem']) {
                console.log(`📖 Aplicando filtro de eixo CEM: ${item['estatistica_saeb.eixo_cem']}`);
                onItemClick('eixo_cem', item['estatistica_saeb.eixo_cem']);
            }
            
            if (item['estatistica_saeb.ch_cem']) {
                console.log(`🔢 Aplicando filtro de CH CEM: ${item['estatistica_saeb.ch_cem']}`);
                onItemClick('ch_cem', item['estatistica_saeb.ch_cem']);
            }
            
            if (item['estatistica_saeb.habilidade_cem']) {
                console.log(`🧠 Aplicando filtro de habilidade CEM: ${item['estatistica_saeb.habilidade_cem']}`);
                onItemClick('habilidade_cem', item['estatistica_saeb.habilidade_cem']);
            }
            
            if (item['estatistica_saeb.ch_saeb']) {
                console.log(`📊 Aplicando filtro de CH SAEB: ${item['estatistica_saeb.ch_saeb']}`);
                onItemClick('ch_saeb', item['estatistica_saeb.ch_saeb']);
            }
            
            if (item['estatistica_saeb.habilidade_saeb']) {
                console.log(`🎓 Aplicando filtro de habilidade SAEB: ${item['estatistica_saeb.habilidade_saeb']}`);
                onItemClick('habilidade_saeb', item['estatistica_saeb.habilidade_saeb']);
            }
            
            if (item['estatistica_saeb.cc']) {
                console.log(`📋 Aplicando filtro de CC: ${item['estatistica_saeb.cc']}`);
                onItemClick('cc', item['estatistica_saeb.cc']);
            }
            
            if (item['estatistica_saeb.porcentagem_acertos']) {
                console.log(`🎯 Aplicando filtro de % acertos: ${item['estatistica_saeb.porcentagem_acertos']}`);
                onItemClick('porcentagem_acertos', item['estatistica_saeb.porcentagem_acertos']);
            }
            
            if (item['estatistica_saeb.porcentagem_A']) {
                console.log(`🅰️ Aplicando filtro de % A: ${item['estatistica_saeb.porcentagem_A']}`);
                onItemClick('porcentagem_A', item['estatistica_saeb.porcentagem_A']);
            }
            
            if (item['estatistica_saeb.porcentagem_B']) {
                console.log(`🅱️ Aplicando filtro de % B: ${item['estatistica_saeb.porcentagem_B']}`);
                onItemClick('porcentagem_B', item['estatistica_saeb.porcentagem_B']);
            }
            
            if (item['estatistica_saeb.porcentagem_C']) {
                console.log(`©️ Aplicando filtro de % C: ${item['estatistica_saeb.porcentagem_C']}`);
                onItemClick('porcentagem_C', item['estatistica_saeb.porcentagem_C']);
            }
            
            if (item['estatistica_saeb.porcentagem_D']) {
                console.log(`🇩 Aplicando filtro de % D: ${item['estatistica_saeb.porcentagem_D']}`);
                onItemClick('porcentagem_D', item['estatistica_saeb.porcentagem_D']);
            }
            
            if (item['estatistica_saeb.porcentagem_embranco']) {
                console.log(`⬜ Aplicando filtro de % em branco: ${item['estatistica_saeb.porcentagem_embranco']}`);
                onItemClick('porcentagem_embranco', item['estatistica_saeb.porcentagem_embranco']);
            }
            
            if (item['estatistica_saeb.porcentagem_rasura']) {
                console.log(`✏️ Aplicando filtro de % rasura: ${item['estatistica_saeb.porcentagem_rasura']}`);
                onItemClick('porcentagem_rasura', item['estatistica_saeb.porcentagem_rasura']);
            }
        }
    };

    // Dados ordenados
    const sortedData = sortData(data, sortConfig.key, sortConfig.direction);

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-cyan-600 px-6 py-3">
                <h3 className="text-lg font-semibold text-white">Dados Detalhados</h3>
                <p className="text-cyan-100 text-sm mt-1">💡 Clique em uma linha para aplicar filtros detalhados (questão, fase, gabarito, eixo, etc.)</p>
            </div>

            <div className="overflow-auto max-h-96">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th 
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.fase')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Fase</span>
                                    {sortConfig.key === 'estatistica_saeb.fase' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.questao')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>Questão</span>
                                    {sortConfig.key === 'estatistica_saeb.questao' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.gabarito')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>Gabarito</span>
                                    {sortConfig.key === 'estatistica_saeb.gabarito' && (
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
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.eixo_cem')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Eixo</span>
                                    {sortConfig.key === 'estatistica_saeb.eixo_cem' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.ch_cem')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>CH CEM</span>
                                    {sortConfig.key === 'estatistica_saeb.ch_cem' && (
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
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.habilidade_cem')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Descrição de Habilidade CEM</span>
                                    {sortConfig.key === 'estatistica_saeb.habilidade_cem' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.ch_saeb')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>CH SAEB</span>
                                    {sortConfig.key === 'estatistica_saeb.ch_saeb' && (
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
                                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.habilidade_saeb')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Descrição de Habilidade SAEB</span>
                                    {sortConfig.key === 'estatistica_saeb.habilidade_saeb' && (
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            {sortConfig.direction === 'asc' ? (
                                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                            ) : (
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            )}
                                        </svg>
                                    )}
                                </div>
                            </th>
                            <th 
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.cc')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>CC</span>
                                    {sortConfig.key === 'estatistica_saeb.cc' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_acertos')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% Acertos</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_acertos' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_A')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% A</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_A' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_B')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% B</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_B' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_C')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% C</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_C' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_D')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% D</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_D' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_embranco')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% Em Branco</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_embranco' && (
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
                                className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => handleSort('estatistica_saeb.porcentagem_rasura')}
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    <span>% Rasura</span>
                                    {sortConfig.key === 'estatistica_saeb.porcentagem_rasura' && (
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
                                className={`hover:bg-gray-50 h-10 cursor-pointer transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`} 
                                onClick={() => handleRowClick(item)}
                                title="Clique para filtrar por esta questão/fase"
                            >
                                <td className="px-3 py-2 text-xs font-medium text-gray-900 w-20">
                                    {item['estatistica_saeb.fase'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.questao'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.gabarito'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 w-32 truncate" title={item['estatistica_saeb.eixo_cem'] || '--'}>
                                    {truncateText(item['estatistica_saeb.eixo_cem'] || '--')}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-20">
                                    {item['estatistica_saeb.ch_cem'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 w-48 truncate" title={item['estatistica_saeb.habilidade_cem'] || '--'}>
                                    {truncateText(item['estatistica_saeb.habilidade_cem'] || '--')}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-20">
                                    {item['estatistica_saeb.ch_saeb'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 w-48 truncate" title={item['estatistica_saeb.habilidade_saeb'] || '--'}>
                                    {truncateText(item['estatistica_saeb.habilidade_saeb'] || '--')}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.cc'] || '--'}
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-20">
                                    {item['estatistica_saeb.porcentagem_acertos'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_acertos']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.porcentagem_A'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_A']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.porcentagem_B'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_B']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.porcentagem_C'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_C']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-16">
                                    {item['estatistica_saeb.porcentagem_D'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_D']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-24">
                                    {item['estatistica_saeb.porcentagem_embranco'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_embranco']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-900 text-center w-20">
                                    {item['estatistica_saeb.porcentagem_rasura'] ? 
                                        `${(parseFloat(item['estatistica_saeb.porcentagem_rasura']) * 100).toFixed(1).replace('.', ',')}%` : 
                                        '--'
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabelaItem;
