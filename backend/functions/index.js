import { onRequest } from 'firebase-functions/v2/https';
import { app } from '../index.js';

// Exportar como Firebase Function
export const api = onRequest({
  region: 'us-central1',
  maxInstances: 10,
  timeoutSeconds: 60,
  memory: '256MiB'
}, app); 