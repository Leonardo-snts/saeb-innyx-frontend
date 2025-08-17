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
        const response = await getProcesses({ lookId: 426 }); // Look para simulados
        const unique = [
          ...new Set(
            response.map((item) => item['desempenho_notas.simulado']).filter(Boolean)
          ),
        ];
        setSimulados(unique);
      } catch (err) {
        console.error('Erro ao buscar simulados:', err);
      }
    }

    async function fetchDistritos() {
      try {
        const response = await getProcesses({ lookId: 427 }); // Look para distritos
        const unique = [
          ...new Set(
            response.map((item) => item['desempenho_notas.distrito']).filter(Boolean)
          ),
        ];
        setDistritos(unique);
      } catch (err) {
        console.error('Erro ao buscar distritos:', err);
      }
    }

    async function fetchEscolas() {
      try {
        const response = await getProcesses({ lookId: 428 }); // Look para escolas
        const unique = [
          ...new Set(
            response.map((item) => item['desempenho_notas.escola']).filter(Boolean)
          ),
        ];
        setEscolas(unique);
      } catch (err) {
        console.error('Erro ao buscar escolas:', err);
      }
    }

    async function fetchFases() {
      try {
        const response = await getProcesses({ lookId: 429 }); // Look para fases
        const unique = [
          ...new Set(
            response.map((item) => item['desempenho_notas.fase']).filter(Boolean)
          ),
        ];
        setFases(unique);
      } catch (err) {
        console.error('Erro ao buscar fases:', err);
      }
    } 

    async function fetchTurmas() {
      try {
        const response = await getProcesses({ lookId: 430 }); // Look para turmas
        const unique = [
          ...new Set(
            response.map((item) => item['desempenho_notas.turma']).filter(Boolean)
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
    <div className="bg-cyan-600 p-4 rounded-none">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
        {/* Título */}
        <div className="text-white">
          <h1 className="text-2xl font-bold">Desempenho de Notas</h1>
        </div>

        {/* Filtros */}
        <div className="flex items-end space-x-4">
          {/* Filtro Simulado */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Simulado</label>
            <select
              className="input-field w-32 h-10"
              value={filters.simulado || 'Todos'}
              onChange={(e) => handleFilterChange('simulado', e.target.value)}
            >
              <option value="Todos">Todos</option>
              {simulados.map((simulado, index) => (
                <option key={index} value={simulado}>
                  {simulado}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Distrito */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Distrito</label>
            <select
              className="input-field w-32 h-10"
              value={filters.distrito || 'Todos'}
              onChange={(e) => handleFilterChange('distrito', e.target.value)}
            >
              <option value="Todos">Todos</option>
              {distritos.map((distrito, index) => (
                <option key={index} value={distrito}>
                  {distrito}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Escola */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Escola</label>
            <select
              className="input-field w-32 h-10"
              value={filters.escola || 'Todos'}
              onChange={(e) => handleFilterChange('escola', e.target.value)}
            >
              <option value="Todos">Todos</option>
              {escolas.map((escola, index) => (
                <option key={index} value={escola}>
                  {escola}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Fase */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Fase</label>
            <select
              className="input-field w-32 h-10"
              value={filters.fase || 'Todos'}
              onChange={(e) => handleFilterChange('fase', e.target.value)}
            >
              <option value="Todos">Todos</option>
              {fases.map((fase, index) => (
                <option key={index} value={fase}>
                  {fase}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Turma */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-1">Turma</label>
            <select
              className="input-field w-32 h-10"
              value={filters.turma || 'Todos'}
              onChange={(e) => handleFilterChange('turma', e.target.value)}
            >
              <option value="Todos">Todos</option>
              {turmas.map((turma, index) => (
                <option key={index} value={turma}>
                  {turma}
                </option>
              ))}
            </select>
          </div>

          {/* Botão Limpar Filtros */}
          <div className="flex flex-col">
            <div className="h-5"></div> {/* Espaçador para alinhar com os labels */}
            <button
              onClick={onClearFilters}
              className="btn-primary h-10 px-4"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtros;
