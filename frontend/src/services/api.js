import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// ======================================== TELA PARTICIPAÇÕES ========================================

// Função para buscar dados do look de tabela (look 411)
export async function getParticipacoesTabela(filters = {}) {
  try {
    const params = {
      lookId: 411,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da tabela:', error);
    throw error;
  }
}

// Função para buscar dados do gráfico por distrito (look 410)
export async function getParticipacoesPorDistrito(filters = {}) {
  try {
    const params = {
      lookId: 410,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados por distrito:', error);
    throw error;
  }
}

// Função para buscar dados do gráfico total (look 412)
export async function getParticipacoesTotal(filters = {}) {
  try {
    const params = {
      lookId: 412,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados totais:', error);
    throw error;
  }
}

// Função para buscar todos os dados de participação
export async function getAllParticipacoesData(filters = {}) {
  try {
    const [tabelaData, distritoData, totalData] = await Promise.all([
      getParticipacoesTabela(filters),
      getParticipacoesPorDistrito(filters),
      getParticipacoesTotal(filters)
    ]);

    return {
      tabela: tabelaData.data || [],
      distrito: distritoData.data || [],
      total: totalData.data || []
    };
  } catch (error) {
    console.error('Erro ao buscar todos os dados:', error);
    throw error;
  }
}

// ======================================== Filtros ========================================

// Função para buscar dados dos filtros
export async function getProcesses({ lookId, ...filters }) {
  try {
    const params = {
      lookId,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados dos filtros:', error);
    throw error;
  }
}

// ======================================== TELA NOTAS ========================================

export async function getNotasAcertos(filters = {}) {
  try {
    const params = {
      lookId: 413,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de acertos:', error);
    throw error;
  }
}

export async function getNotasErros(filters = {}) {
  try {
    const params = {
      lookId: 414,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de erros:', error);
    throw error;
  }
}

export async function getNotasPorDistrito(filters = {}) {
  try {
    const params = {
      lookId: 415,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de notas por distrito:', error);
    throw error;
  }
}

export async function getAllNotasData(filters = {}) {
  try {
    const [scoreAcertos, scoreErros, colunaDistrito] = await Promise.all([
      getNotasAcertos(filters),
      getNotasErros(filters),
      getNotasPorDistrito(filters)
    ]);

    return {
      acertos: scoreAcertos.data || [],
      erros: scoreErros.data || [],
      distrito: colunaDistrito.data || []
    };
  } catch (error) {
    console.error('Erro ao buscar todos os dados de notas:', error);
    throw error;
  }
}

// ======================================== TELA MÉDIAS ========================================

export async function getMediasLP(filters = {}) {
  try {
    const params = {
      lookId: 416,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de médias LP:', error);
    throw error;
  }
}

export async function getMediasMA(filters = {}) {
  try {
    const params = {
      lookId: 417,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de médias MA:', error);
    throw error;
  }
}

export async function getMediasPorDistrito(filters = {}) {
  try {
    const params = {
      lookId: 418,
      ...filters,
    };
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados de médias por distrito:', error);
    throw error;
  }
}

export async function getAllMediasData(filters = {}) {
  try {
    const [mediaLP, mediaMA, colunaDistrito] = await Promise.all([
      getMediasLP(filters),
      getMediasMA(filters),
      getMediasPorDistrito(filters)
    ]);

    return {
      mediaLP: mediaLP.data || [],
      mediaMA: mediaMA.data || [],
      distrito: colunaDistrito.data || []
    };
  } catch (error) {
    console.error('Erro ao buscar todos os dados de médias:', error);
    throw error;
  }
}

// ======================================== TELA ESTATÍSTICA ========================================

export async function getGraficoColuna(filters = {}) {
  try {
    const params = {
      lookId: 419,
      ...filters,
    };
    console.log('📊 getGraficoColuna - params:', params);
    
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    console.log('📊 getGraficoColuna - response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar dados do gráfico coluna:', error);
    throw error;
  }
}

export async function getTabelaItem(filters = {}) {
  try {
    const params = {
      lookId: 420,
      ...filters,
    };
    console.log('📋 getTabelaItem - params:', params);
    
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    console.log('📋 getTabelaItem - response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar dados da tabela item:', error);
    throw error;
  }
}

export async function getAllEstatisticaData(filters = {}) {
  try {
    console.log('📡 getAllEstatisticaData recebeu filtros:', filters);
    
    const [graficoColuna, tabelaItem] = await Promise.all([
      getGraficoColuna(filters),
      getTabelaItem(filters)
    ]);

    console.log('📊 Dados do gráfico coluna:', graficoColuna);
    console.log('📋 Dados da tabela item:', tabelaItem);

    const result = {
      graficoColuna: graficoColuna.data || [],
      tabelaItem: tabelaItem.data || []
    };

    console.log('✅ Resultado final getAllEstatisticaData:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar todos os dados de estatística:', error);
    throw error;
  }
}

// ======================================== TELA TURMA ========================================

export async function getTabelaTurma(filters = {}, page = 1, limit = 100, paginated = true, sortConfig = null) {
  try {
    const params = {
      lookId: 498,
      page,
      limit,
      paginated: paginated ? 'true' : 'false',
      ...filters,
    };
    
    // Adicionar parâmetros de ordenação se fornecidos
    if (sortConfig && sortConfig.field) {
      params.sortBy = sortConfig.field;
      params.sortOrder = sortConfig.direction;
    }
    
    console.log('📋 getTabelaTurma - params:', params);
    
    const response = await axios.get(`${BASE_URL}/processes`, { params });
    console.log('📋 getTabelaTurma - response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar dados da tabela turma:', error);
    throw error;
  }
}

export async function getAllTurmaData(filters = {}, page = 1, limit = 100, sortConfig = null) {
  try {
    console.log('📡 getAllTurmaData recebeu filtros:', filters, 'ordenação:', sortConfig);
    
    const tabelaTurma = await getTabelaTurma(filters, page, limit, true, sortConfig);
    
    console.log('📋 Dados da tabela turma:', tabelaTurma);

    const result = {
      tabelaTurma: tabelaTurma,
    };

    console.log('✅ Resultado final getAllTurmaData:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar todos os dados de turma:', error);
    throw error;
  }
}