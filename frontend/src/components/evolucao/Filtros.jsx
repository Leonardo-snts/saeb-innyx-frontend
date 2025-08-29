import React, { useState, useEffect } from 'react';
import { getProcesses } from '../../services/api';

const Filtros = ({ filters, onFilterChange, onClearFilters }) => {
  const [simulados, setSimulados] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [fases, setFases] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    async function fetchSimulados() {
      try {
        const response = await getProcesses({ lookId: 511 }); // Look para simulados
        const unique = [
          ...new Set(
            (response.data || []).map((item) => item['evolucao_saeb.simulado']).filter(Boolean)
          ),
        ];
        setSimulados(unique);
      } catch (err) {
        console.error('Erro ao buscar simulados:', err);
      }
    }

    async function fetchDistritos() {
      try {
        const response = await getProcesses({ lookId: 512 }); // Look para distritos
        const unique = [
          ...new Set(
            (response.data || []).map((item) => item['evolucao_saeb.distrito']).filter(Boolean)
          ),
        ];
        setDistritos(unique);
      } catch (err) {
        console.error('Erro ao buscar distritos:', err);
      }
    }

    async function fetchEscolas() {
      try {
        const response = await getProcesses({ lookId: 513 }); // Look para escolas
        const unique = [
          ...new Set(
            (response.data || []).map((item) => item['evolucao_saeb.escola']).filter(Boolean)
          ),
        ];
        setEscolas(unique);
      } catch (err) {
        console.error('Erro ao buscar escolas:', err);
      }
    }

    async function fetchFases() {
      try {
        const response = await getProcesses({ lookId: 514 }); // Look para fases
        const unique = [
          ...new Set(
            (response.data || []).map((item) => item['evolucao_saeb.fase']).filter(Boolean)
          ),
        ];
        setFases(unique);
      } catch (err) {
        console.error('Erro ao buscar fases:', err);
      }
    } 

    async function fetchTurmas() {
      try {
        const response = await getProcesses({ lookId: 515 }); // Look para turmas
        const unique = [
          ...new Set(
            (response.data || []).map((item) => item['evolucao_saeb.turma']).filter(Boolean)
          ),
        ];
        setTurmas(unique);
      } catch (err) {
        console.error('Erro ao buscar turmas:', err);
      }
    }

    fetchDistritos();
    fetchSimulados();
    fetchEscolas();
    fetchFases();
    fetchTurmas();
  }, []);

  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="bg-[#18adb6] px-8 py-5 rounded-tr-[50px] rounded-br-[50px]">
      <div className="grid grid-cols-[auto_1fr_auto] items-end gap-5">
        {/* Título (esquerda) */}
        <div className="flex items-center h-full text-white text-center justify-self-center" style={{ minHeight: '64px' }}>
          <h1 className="text-2xl font-bold">Evolução</h1>
        </div>

        {/* Filtros */}
        <div className="justify-self-center flex items-end space-x-4">
          {/* Filtro Simulado */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-semibold mb-1">Simulado</label>
            <div className="relative">
              <select
                className="w-32 h-10 px-3 pr-8 bg-[#18adb6] text-white border border-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none focus:text-black"
                value={filters.simulado || 'Todos'}
                onChange={(e) => handleFilterChange('simulado', e.target.value)}
              >
                <option value="Todos" className="text-black">Todos</option>
                {simulados.map((simulado, index) => (
                  <option key={index} value={simulado} className="text-black">
                    {simulado}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">▾</span>
            </div>
          </div>

          {/* Filtro Distrito */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-semibold mb-1">Distrito</label>
            <div className="relative">
              <select
                className="w-32 h-10 px-3 pr-8 bg-[#18adb6] text-white border border-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none focus:text-black"
                value={filters.distrito || 'Todos'}
                onChange={(e) => handleFilterChange('distrito', e.target.value)}
              >
                <option value="Todos" className="text-black">Todos</option>
                {distritos.map((distrito, index) => (
                  <option key={index} value={distrito} className="text-black">
                    {distrito}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">▾</span>
            </div>
          </div>

          {/* Filtro Escola */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-semibold mb-1">Escola</label>
            <div className="relative">
              <select
                className="w-32 h-10 px-3 pr-8 bg-[#18adb6] text-white border border-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none focus:text-black"
                value={filters.escola || 'Todos'}
                onChange={(e) => handleFilterChange('escola', e.target.value)}
              >
                <option value="Todos" className="text-black">Todos</option>
                {escolas.map((escola, index) => (
                  <option key={index} value={escola} className="text-black">
                    {escola}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">▾</span>
            </div>
          </div>

          {/* Filtro Ano (usa campo fase) */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-semibold mb-1">Ano</label>
            <div className="relative">
              <select
                className="w-32 h-10 px-3 pr-8 bg-[#18adb6] text-white border border-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none focus:text-black"
                value={filters.fase || 'Todos'}
                onChange={(e) => handleFilterChange('fase', e.target.value)}
              >
                <option value="Todos" className="text-black">Todos</option>
                {fases.map((fase, index) => (
                  <option key={index} value={fase} className="text-black">
                    {fase}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">▾</span>
            </div>
          </div>

          {/* Filtro Turma */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-semibold mb-1">Turma</label>
            <div className="relative">
              <select
                className="w-32 h-10 px-3 pr-8 bg-[#18adb6] text-white border border-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/60 appearance-none focus:text-black"
                value={filters.turma || 'Todos'}
                onChange={(e) => handleFilterChange('turma', e.target.value)}
              >
                <option value="Todos" className="text-black">Todos</option>
                {turmas.map((turma, index) => (
                  <option key={index} value={turma} className="text-black">
                    {turma}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white">▾</span>
            </div>
          </div>
        </div>

        {/* Botão (direita) */}
        <div className="justify-self-end -mr-4">
          <button
            onClick={onClearFilters}
            className="h-16 px-3 py-2 bg-[#033f41] text-white font-medium rounded-full shadow-none text-lg"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtros;
