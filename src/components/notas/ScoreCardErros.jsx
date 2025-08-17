import React from 'react';

const ScoreCardErros = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-orange-500 rounded-lg shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <h3 className="text-xl font-semibold text-white mb-4">Erro</h3>
          <div className="text-4xl font-bold text-white">-</div>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="bg-orange-500 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Erro</h3>
        <div className="text-4xl font-bold text-white">-</div>
      </div>
    );
  }

  // Extrair a porcentagem de erros dos dados
  const errosData = data[0];
  const porcentagemErros = errosData ? 
    (parseFloat(errosData['desempenho_notas.porcet_total_erros'] || 0) * 100).toFixed(1) : 
    '-';

  return (
    <div className="bg-orange-500 rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Erro</h3>
      <div className="text-4xl font-bold text-white">
        {porcentagemErros === '-' ? '-' : `${porcentagemErros}%`}
      </div>
    </div>
  );
};

export default ScoreCardErros;
