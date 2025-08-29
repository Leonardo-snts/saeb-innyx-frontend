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
                    pagination={data.tabelaTurma?.pagination}
                    onPageChange={handlePageChange}
                />      
            </div>
        </div>
    );
};

export default Turma;
