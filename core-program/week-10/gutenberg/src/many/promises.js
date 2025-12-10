import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

function loadJsonFile(filePath) {
  return fs.readFile(filePath, 'utf-8').then((json) => JSON.parse(json));
}

function dumpStats(stats, outputPath) {
  const json = JSON.stringify(stats, null, 2);
  return fs.writeFile(outputPath, json, 'utf-8');
}

function processDescriptors(descriptors, dataDir, commonWords) {
  const descriptorArray = Object.values(descriptors);
  const results = [];
  let promise = Promise.resolve();

  descriptorArray.forEach((descriptor) => {
    promise = promise.then(() => {
      const filePath = path.join(dataDir, descriptor.txt);
      return fs.readFile(filePath, 'utf-8').then((content) => {
        const stats = analyze(content, commonWords);
        results.push({ ...descriptor, stats });
      });
    });
  });

  return promise.then(() => results);
}

function main() {
  const startTime = Date.now();
  const dataDir = path.join(__dirname, '../../data');

  return Promise.all([
    loadJsonFile(path.join(dataDir, 'mapper.json')),
    loadJsonFile(path.join(dataDir, 'common.json')),
  ])
    .then(([mapper, { commonWords }]) => {
      return processDescriptors(mapper, dataDir, commonWords);
    })
    .then((results) => {
      return dumpStats(
        results,
        path.join(__dirname, '../../results/stats.json')
      );
    })
    .then(() => {
      const endTime = Date.now();
      console.log(`Execution time: ${endTime - startTime} ms`);
    })
    .catch((err) => {
      console.error('Error:', err);
      process.exit(1);
    });
}

main();
