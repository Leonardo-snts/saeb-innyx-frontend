import React, { useState, useEffect } from 'react';
import Filtros from '../components/turma/Filtro';
import Tabela from '../components/turma/Tabela';
import { getAllTurmaData } from '../services/api';

const Turma = () => {
    const [data, setData] = useState({
        tabelaTurma: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        Simulados: 'Todos',
        Distrito: 'Todos',
        Escola: 'Todos',
        Ano: 'Todos',
        Turma: 'Todos'
    });
    
    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    // Estado para ordenação
    const [sortConfig, setSortConfig] = useState({
        field: null,
        direction: 'asc'
    });

    useEffect(() => {
        fetchData(filters, currentPage, pageSize);
    }, [currentPage, pageSize, sortConfig]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        setCurrentPage(1); // Reset para primeira página ao filtrar
        fetchData(newFilters, 1, pageSize);
    };

    const buildLookerFilters = (currentFilters) => {
        const lookerFilters = {};
        for (const key in currentFilters) {
          if (currentFilters[key] && currentFilters[key] !== 'Todos') {
            // Usar o prefixo correto para os looks de notas
            lookerFilters[`relatorio_turma_saeb.${key}`] = currentFilters[key];
          }
        }
        return lookerFilters;
    };

    const fetchData = async (newFilters, page = 1, limit = 100) => {
        try {
            console.log('🚀 fetchData iniciado com filtros:', newFilters, 'página:', page, 'limite:', limit, 'ordenação:', sortConfig);
            setLoading(true);
            setError(null);

            const lookerFilters = buildLookerFilters(newFilters);
            console.log('🔧 Filtros convertidos para Looker:', lookerFilters);

            console.log('📡 Chamando getAllTurmaData com paginação e ordenação...');
            const result = await getAllTurmaData(lookerFilters, page, limit, sortConfig);
            console.log('📊 Resultado recebido da API:', result);

            setData(result);
            
            // Atualizar informações de paginação
            if (result.tabelaTurma && result.tabelaTurma.pagination) {
                setTotalRecords(result.tabelaTurma.pagination.total);
                setTotalPages(result.tabelaTurma.pagination.totalPages);
            }
            
            console.log('✅ Dados atualizados no estado:', result);
        } catch (err) {
            console.error('❌ Erro ao buscar dados:', err);
            setError('Erro ao carregar dados da turma');
        } finally {
            setLoading(false);
            console.log('🏁 Loading finalizado');
        }
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            Simulados: 'Todos',
            Distrito: 'Todos',
            Escola: 'Todos',
            Ano: 'Todos',
            Turma: 'Todos'
        };
        setFilters(clearedFilters);
        setCurrentPage(1);
        fetchData(clearedFilters, 1, pageSize);
    };

    // Funções de paginação
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };
    
    // Função para lidar com ordenação
    const handleSort = (field) => {
        let direction = 'asc';
        if (sortConfig.field === field && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        
        const newSortConfig = { field, direction };
        setSortConfig(newSortConfig);
        setCurrentPage(1); // Reset para primeira página ao ordenar
        console.log('🔄 Nova configuração de ordenação:', newSortConfig);
    };

    // Calcular informações de paginação
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

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

            {/* Tabela de dados */}
            <div className="mx-8 mb-8">
                <Tabela
                    data={data.tabelaTurma?.data || []}
                    loading={loading}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
                
                {/* Controles de Paginação */}
                {!loading && data.tabelaTurma && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            {/* Informações da página */}
                            <div className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{startRecord}</span> a <span className="font-medium">{endRecord}</span> de <span className="font-medium">{totalRecords.toLocaleString()}</span> registros
                            </div>
                            
                            {/* Seletor de tamanho da página */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-700">Registros por página:</span>
                                <select
                                    value={pageSize}
                                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#18adb6] focus:border-transparent"
                                >
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                    <option value={200}>200</option>
                                    <option value={500}>500</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Navegação de páginas */}
                        <div className="flex items-center justify-center space-x-2 mt-4">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Primeira
                            </button>
                            
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Anterior
                            </button>
                            
                            {/* Páginas numeradas */}
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === pageNum
                                                    ? 'bg-[#18adb6] text-white'
                                                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Próxima
                            </button>
                            
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Última
                            </button>
                        </div>
                        
                        {/* Informação da página atual */}
                        <div className="text-center mt-2">
                            <span className="text-sm text-gray-500">
                                Página {currentPage} de {totalPages}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Turma;
