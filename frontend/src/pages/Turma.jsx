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
            // Usar o prefixo correto para os looks de notas
            lookerFilters[`relatorio_turma_saeb.${key}`] = currentFilters[key];
          }
        }
        return lookerFilters;
      };;

    const fetchData = async (newFilters) => {
        try {
            console.log('🚀 fetchData iniciado com filtros:', newFilters);
            setLoading(true);
            setError(null);

            const lookerFilters = buildLookerFilters(newFilters);
            console.log('🔧 Filtros convertidos para Looker:', lookerFilters);

            console.log('📡 Chamando getAllTurmaData...');
            const result = await getAllTurmaData(lookerFilters);
            console.log('📊 Resultado recebido da API:', result);

            setData(result);
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

            {/* Tabela de dados */}
            <div className="mx-8 mb-8">
                <Tabela
                    data={data.tabelaTurma}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Turma;
