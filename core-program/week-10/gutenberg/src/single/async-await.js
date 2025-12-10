import fs from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

import { analyze } from '../lib/analyze.js';

async function loadJsonFile(filePath) {
  const json = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(json);
}

async function main() {
  try {
    const dataDir = path.join(__dirname, '../../data');
    const { commonWords } = await loadJsonFile(
      path.join(dataDir, 'common.json')
    );

    const filePath = path.join(dataDir, 'txt/11.txt');
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = analyze(content, commonWords);
    console.log(stats);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
