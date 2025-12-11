import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

function loadJsonFile(filePath) {
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
}

function dumpStats(stats, outputPath) {
  const json = JSON.stringify(stats, null, 2);
  fs.writeFileSync(outputPath, json, 'utf-8');
}

function main() {
  const startTime = Date.now();

  const dataDir = path.join(__dirname, '../../data');

  try {
    const mapper = loadJsonFile(path.join(dataDir, 'mapper.json'));
    const { commonWords } = loadJsonFile(path.join(dataDir, 'common.json'));

    const results = [];

    for (const descriptor of Object.values(mapper)) {
      const filePath = path.join(dataDir, descriptor.txt);
      const content = fs.readFileSync(filePath, 'utf-8');
      const stats = analyze(content, commonWords);
      results.push({ ...descriptor, stats });
    }

    dumpStats(results, path.join(__dirname, '../../results/stats.json'));
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime} ms`);
}

main();
