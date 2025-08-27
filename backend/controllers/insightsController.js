import { fetchProcessesFromLooker } from '../services/lookerApi.js';

export const getInsights = async (req, res) => {
  try {
    const { pergunta, id } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: 'Pergunta é obrigatória.' });
    }

    console.log('Pergunta recebida:', pergunta);

    // Aqui você pode implementar a lógica para processar a pergunta
    // Por enquanto, vou retornar uma resposta baseada nos dados do Looker
    
    // Buscar dados relevantes do Looker para responder a pergunta
    const processosData = await fetchProcessesFromLooker(31, {});
    const valorTotalData = await fetchProcessesFromLooker(30, {});
    const processosAtrasadosData = await fetchProcessesFromLooker(26, {});

    // Processar a pergunta e gerar insights
    let resposta = '';
    
    if (pergunta.toLowerCase().includes('processo') || pergunta.toLowerCase().includes('processos')) {
      const totalProcessos = processosData[0]?.['dag_sesc_looker.qtd_numero_do_processo'] || 0;
      const atrasados = processosAtrasadosData[0]?.['dag_sesc_looker.processos_atrasados'] || 0;
      
      resposta = `Atualmente temos ${totalProcessos} processos ativos, sendo ${atrasados} processos atrasados. Isso representa ${((atrasados/totalProcessos)*100).toFixed(1)}% de processos em atraso.`;
    } else if (pergunta.toLowerCase().includes('valor') || pergunta.toLowerCase().includes('gasto') || pergunta.toLowerCase().includes('total')) {
      const valorTotal = valorTotalData[0]?.['dag_sesc_looker.qtd_valor_total'] || 0;
      resposta = `O valor total dos processos é R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`;
    } else if (pergunta.toLowerCase().includes('atraso') || pergunta.toLowerCase().includes('atrasados')) {
      const atrasados = processosAtrasadosData[0]?.['dag_sesc_looker.processos_atrasados'] || 0;
      resposta = `Temos ${atrasados} processos atrasados no momento. Recomendo priorizar a análise destes processos para identificar gargalos.`;
    } else {
      resposta = `Com base nos dados disponíveis, posso informar que temos ${processosData[0]?.['dag_sesc_looker.qtd_numero_do_processo'] || 0} processos ativos, com valor total de R$ ${valorTotalData[0]?.['dag_sesc_looker.qtd_valor_total']?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0} e ${processosAtrasadosData[0]?.['dag_sesc_looker.processos_atrasados'] || 0} processos em atraso.`;
    }

    res.status(200).json({ 
      resposta,
      dados: {
        totalProcessos: processosData[0]?.['dag_sesc_looker.qtd_numero_do_processo'] || 0,
        valorTotal: valorTotalData[0]?.['dag_sesc_looker.qtd_valor_total'] || 0,
        processosAtrasados: processosAtrasadosData[0]?.['dag_sesc_looker.processos_atrasados'] || 0
      }
    });
  } catch (error) {
    console.error('Erro ao processar pergunta:', error);
    res.status(500).json({ error: 'Erro ao processar pergunta.', detalhe: error.message });
  }
}; 