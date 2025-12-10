import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

async function loadJsonFile(filePath) {
  const json = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(json);
}

async function dumpStats(stats, outputPath) {
  const json = JSON.stringify(stats, null, 2);
  await fs.writeFile(outputPath, json, 'utf-8');
}

async function main() {
  const startTime = Date.now();

  const dataDir = path.join(__dirname, '../../data');

  try {
    const mapper = await loadJsonFile(path.join(dataDir, 'mapper.json'));
    const { commonWords } = await loadJsonFile(
      path.join(dataDir, 'common.json')
    );

    const promises = [];

    for (const descriptor of Object.values(mapper)) {
      const filePath = path.join(dataDir, descriptor.txt);
      const promise = fs.readFile(filePath, 'utf-8').then((content) => {
        const stats = analyze(content, commonWords);
        return { ...descriptor, stats };
      });
      promises.push(promise);
    }

    const results = await Promise.all(promises);

    await dumpStats(results, path.join(__dirname, '../../results/stats.json'));
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

main();
