import { parentPort } from 'worker_threads';
import { analyze } from '../lib/analyze.js';

parentPort.on('message', async (message) => {
  try {
    const { filePath, descriptor, commonWords } = message;
    const fs = await import('fs/promises');
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = analyze(content, commonWords);
    parentPort.postMessage({
      success: true,
      result: { ...descriptor, stats },
    });
  } catch (error) {
    parentPort.postMessage({
      success: false,
      error: error.message,
    });
  }
});
