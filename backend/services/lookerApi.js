import { LookerNodeSDK } from '@looker/sdk-node';
import dotenv from 'dotenv';

dotenv.config();

const sdk = LookerNodeSDK.init40();

export async function fetchProcessesFromLooker(lookId, filters = {}) {
  try {
    console.log(`Executando Look ID ${lookId} com filtros:`, filters);

    if (Object.keys(filters).length > 0) {
      const look = await sdk.ok(sdk.look(lookId));

      const fullQuery = await sdk.ok(sdk.query(look.query_id));

      console.log('Campos disponíveis para filtros (fields):', fullQuery.fields);
      console.log('Filtros atuais da query:', fullQuery.filters);

      const inlineQueryBody = {
        model: fullQuery.model,
        view: fullQuery.view,
        fields: fullQuery.fields,
        filters: filters,
        sorts: fullQuery.sorts,
        limit: fullQuery.limit,
        dynamic_fields: fullQuery.dynamic_fields,
        filter_expression: fullQuery.filter_expression,
        vis_config: fullQuery.vis_config,
        timezone: fullQuery.timezone,
      };

      const result = await sdk.ok(
        sdk.run_inline_query({
          result_format: 'json',
          body: inlineQueryBody,
        })
      );

      return result;
    }

    // Sem filtros → usa o look direto
    const result = await sdk.ok(
      sdk.run_look({
        look_id: lookId,
        result_format: 'json',
      })
    );

    return result;
  } catch (error) {
    console.error('Erro ao buscar dados do Looker:', error);
    throw error;
  }
}
