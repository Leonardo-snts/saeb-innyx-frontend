import { fetchProcessesFromLooker, fetchProcessesWithPagination } from '../services/lookerApi.js';

export const getProcesses = async (req, res) => {
  try {
    const { lookId, page = 1, limit = 100, paginated = false } = req.query;
    const filters = { ...req.query };
    
    // Remover parâmetros de paginação dos filtros
    delete filters.lookId;
    delete filters.page;
    delete filters.limit;
    delete filters.paginated;

    if (!lookId) {
      return res.status(400).json({ error: 'lookId é obrigatório.' });
    }

    console.log('🔧 getProcesses - Parâmetros:', { lookId, page, limit, paginated, filters });

    let result;
    
    if (paginated === 'true') {
      // Buscar dados com paginação completa (dados + contagem total)
      console.log('📄 Buscando dados com paginação completa...');
      result = await fetchProcessesWithPagination(Number(lookId), filters, parseInt(page), parseInt(limit));
    } else {
      // Buscar dados simples (compatibilidade)
      console.log('📊 Buscando dados simples...');
      result = await fetchProcessesFromLooker(Number(lookId), filters, parseInt(page), parseInt(limit));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Erro no controller:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
};