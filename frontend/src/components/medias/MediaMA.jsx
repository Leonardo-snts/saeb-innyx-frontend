import React from 'react';

const MediaMA = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <h3 className="text-xl font-semibold text-white mb-4">Média MA</h3>
          <div className="text-4xl font-bold text-white">-</div>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Média MA</h3>
        <div className="text-4xl font-bold text-white">-</div>
      </div>
    );
  }

  // Extrair a média MA dos dados
  const mediaMAData = data[0];
  const mediaMA = mediaMAData ? 
    (parseFloat(mediaMAData['medias_saeb.media_ma_avg'] || 0)).toFixed(1) : 
    '-';

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Média MA</h3>
      <div className="text-4xl font-bold text-white">
        {mediaMA === '-' ? '-' : `${mediaMA.replace('.', ',')}`}
      </div>
    </div>
  );
};

export default MediaMA;
