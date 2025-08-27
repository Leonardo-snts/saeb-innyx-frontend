import React from 'react';

const ScoreCardAcertos = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-teal-700 rounded-lg shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <h3 className="text-xl font-semibold text-white mb-4">Acertos</h3>
          <div className="text-4xl font-bold text-white">-</div>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="bg-teal-700 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Acertos</h3>
        <div className="text-4xl font-bold text-white">-</div>
      </div>
    );
  }

  // Extrair a porcentagem de acertos dos dados
  const acertosData = data[0];
  const porcentagemAcertos = acertosData ? 
    (parseFloat(acertosData['desempenho_notas.porcet_total_acertos'] || 0) * 100).toFixed(1) : 
    '-';

  return (
    <div className="bg-teal-700 rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Acertos</h3>
      <div className="text-4xl font-bold text-white">
        {porcentagemAcertos === '-' ? '-' : `${porcentagemAcertos}%`}
      </div>
    </div>
  );
};

export default ScoreCardAcertos;
