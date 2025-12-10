import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { Worker } from 'worker_threads';

const __dirname = import.meta.dirname;

async function loadJsonFile(filePath) {
  const json = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(json);
}

async function dumpStats(stats, outputPath) {
  const json = JSON.stringify(stats, null, 2);
  await fs.writeFile(outputPath, json, 'utf-8');
}

// Create a worker pool that processes files
function createWorker() {
  return new Worker(path.join(__dirname, 'worker.js'));
}

function workerTask(worker, message) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Worker task timeout'));
    }, 30000);

    const onMessage = (result) => {
      clearTimeout(timeout);
      worker.removeListener('message', onMessage);
      worker.removeListener('error', onError);
      if (result.success) {
        resolve(result.result);
      } else {
        reject(new Error(result.error));
      }
    };

    const onError = (error) => {
      clearTimeout(timeout);
      reject(error);
    };

    worker.on('message', onMessage);
    worker.on('error', onError);
    worker.postMessage(message);
  });
}

async function main() {
  const startTime = Date.now();

  const dataDir = path.join(__dirname, '../../data');

  try {
    const mapper = await loadJsonFile(path.join(dataDir, 'mapper.json'));
    const { commonWords } = await loadJsonFile(
      path.join(dataDir, 'common.json')
    );

    // Determine the number of workers (use CPU count or a reasonable default)
    const numWorkers = Math.min(os.cpus().length, Object.keys(mapper).length);
    const workers = Array.from({ length: numWorkers }, () => createWorker());

    const descriptors = Object.values(mapper);
    const results = [];
    let taskIndex = 0;

    // Create worker tasks
    const workerPromises = workers.map(async (worker) => {
      while (taskIndex < descriptors.length) {
        const currentIndex = taskIndex++;
        const descriptor = descriptors[currentIndex];
        const filePath = path.join(dataDir, descriptor.txt);

        try {
          const result = await workerTask(worker, {
            filePath,
            descriptor,
            commonWords,
          });
          results[currentIndex] = result;
        } catch (error) {
          console.error(`Error processing ${descriptor.txt}:`, error.message);
          throw error;
        }
      }
    });

    // Wait for all workers to complete
    await Promise.all(workerPromises);

    // Clean up workers
    workers.forEach((worker) => worker.terminate());

    // Sort results by original descriptor order
    const sortedResults = results.filter((r) => r !== undefined);

    await dumpStats(
      sortedResults,
      path.join(__dirname, '../../results/stats.json')
    );
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

main();
