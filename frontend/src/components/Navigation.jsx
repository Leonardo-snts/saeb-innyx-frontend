import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-teal-950 shadow-lg z-50">
      <div className="flex flex-col items-center py-8 space-y-8">
        {/* Participação */}
        <Link
          to="/participacoes"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            location.pathname === '/participacoes'
              ? 'bg-blue-800 shadow-lg scale-110'
              : 'bg-cyan-600 hover:bg-cyan-800 hover:scale-105'
          }`}
          title="Participação"
        >
          <img 
            src="/icons/participacoes.svg" 
            alt="Participação" 
            className="w-6 h-6 filter brightness-0 invert"
          />
        </Link>

        {/* Notas */}
        <Link
          to="/notas"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            location.pathname === '/notas'
              ? 'bg-blue-800 shadow-lg scale-110'
              : 'bg-cyan-600 hover:bg-cyan-800 hover:scale-105'
          }`}
          title="Notas"
        >
          <img 
            src="/icons/notas.svg" 
            alt="Notas" 
            className="w-6 h-6 filter brightness-0 invert"
          />
        </Link>

        {/* Médias */}
        <Link
          to="/medias"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            location.pathname === '/medias'
              ? 'bg-blue-800 shadow-lg scale-110'
              : 'bg-cyan-600 hover:bg-cyan-800 hover:scale-105'
          }`}
          title="Médias"
        >
          <img 
            src="/icons/media.svg" 
            alt="Médias" 
            className="w-6 h-6 filter brightness-0 invert"
          />
        </Link>

        {/* Estatística */}
        <Link
          to="/estatistica"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            location.pathname === '/estatistica'
              ? 'bg-blue-800 shadow-lg scale-110'
              : 'bg-cyan-600 hover:bg-cyan-800 hover:scale-105'
          }`}
          title="Estatística"
        >
          <img 
            src="/icons/estatistica.svg" 
            alt="Estatística" 
            className="w-6 h-6 filter brightness-0 invert"
          />
        </Link>

        {/* Turma */}
        <Link
          to="/turma"
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
            location.pathname === '/turma'
              ? 'bg-blue-800 shadow-lg scale-110'
              : 'bg-cyan-600 hover:bg-cyan-800 hover:scale-105'
          }`}
          title="Turma"
        >
          <img 
            src="/icons/class-report.svg" 
            alt="Turma" 
            className="w-6 h-6 filter brightness-0 invert"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
