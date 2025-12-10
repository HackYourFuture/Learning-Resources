import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

function loadJsonFile(filePath) {
  return fs.readFile(filePath, 'utf-8').then((json) => {
    return JSON.parse(json);
  });
}

function main() {
  const dataDir = path.join(__dirname, '../../data');

  loadJsonFile(path.join(dataDir, 'common.json'))
    .then(({ commonWords }) => {
      const filePath = path.join(dataDir, 'txt/11.txt');
      return fs.readFile(filePath, 'utf-8').then((content) => {
        const stats = analyze(content, commonWords);
        console.log(stats);
      });
    })
    .catch((err) => {
      console.error('Error:', err);
      process.exit(1);
    });
}

main();
