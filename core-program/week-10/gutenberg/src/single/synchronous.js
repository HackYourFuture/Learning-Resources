import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

function loadJsonFile(filePath) {
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
}

function main() {
  try {
    const dataDir = path.join(__dirname, '../../data');
    const { commonWords } = loadJsonFile(path.join(dataDir, 'common.json'));

    const filePath = path.join(dataDir, 'txt/11.txt');
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = analyze(content, commonWords);
    console.log(stats);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
