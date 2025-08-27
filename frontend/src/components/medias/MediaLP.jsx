import React from 'react';

const MediaLP = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <h3 className="text-xl font-semibold text-white mb-4">Média LP</h3>
          <div className="text-4xl font-bold text-white">-</div>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Média LP</h3>
        <div className="text-4xl font-bold text-white">-</div>
      </div>
    );
  }

  // Extrair a média LP dos dados
  const mediaLPData = data[0];
  const mediaLP = mediaLPData ? 
    (parseFloat(mediaLPData['medias_saeb.media_lp_avg'] || 0)).toFixed(1) : 
    '-';

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Média LP</h3>
      <div className="text-4xl font-bold text-white">
        {mediaLP === '-' ? '-' : `${mediaLP.replace('.', ',')}`}
      </div>
    </div>
  );
};

export default MediaLP;
