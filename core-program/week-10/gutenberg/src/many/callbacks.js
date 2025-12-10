import fs from 'fs';
import path from 'path';

import { analyze } from '../lib/analyze.js';
const __dirname = import.meta.dirname;

function loadJsonFile(filePath, cb) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return cb(err, null);
    }
    try {
      const json = JSON.parse(data);
      cb(null, json);
    } catch (parseErr) {
      cb(parseErr, null);
    }
  });
}

function dumpStats(stats, outputPath, cb) {
  const json = JSON.stringify(stats, null, 2);
  fs.writeFile(outputPath, json, 'utf-8', cb);
}

function exitOnError(err, msg = 'Error') {
  if (err) {
    console.error(`${msg}:`, err);
    process.exit(1);
  }
}

function main() {
  const startTime = Date.now();

  const dataDir = path.join(__dirname, '../../data');

  loadJsonFile(path.join(dataDir, 'mapper.json'), (err, mapper) => {
    exitOnError(err, 'Error loading mapper.json');

    loadJsonFile(path.join(dataDir, 'common.json'), (err, commonData) => {
      exitOnError(err, 'Error loading common.json');

      const { commonWords } = commonData;
      const results = [];
      const descriptors = Object.values(mapper);
      let pending = descriptors.length;

      for (const descriptor of descriptors) {
        const filePath = path.join(dataDir, descriptor.txt);
        fs.readFile(filePath, 'utf-8', (err, content) => {
          exitOnError(err, 'Error reading file');

          const stats = analyze(content, commonWords);
          results.push({ ...descriptor, stats });

          if (--pending === 0) {
            dumpStats(
              results,
              path.join(__dirname, '../../results/stats.json'),
              (err) => {
                exitOnError(err, 'Error dumping stats');
                const endTime = Date.now();
                console.log(`Execution time: ${endTime - startTime} ms`);
              }
            );
          }
        });
      }
    });
  });
}

main();
