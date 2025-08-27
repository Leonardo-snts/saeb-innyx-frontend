import { fetchProcessesFromLooker } from '../services/lookerApi.js';

export const getProcesses = async (req, res) => {
  try {
    const { lookId, ...filters } = req.query;

    if (!lookId) {
      return res.status(400).json({ error: 'lookId é obrigatório.' });
    }

    console.log('Filtros recebidos no backend:', filters);

    const data = await fetchProcessesFromLooker(Number(lookId), filters);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar processos.', detalhe: error.message });
  }
};