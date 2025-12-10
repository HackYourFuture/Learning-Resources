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

function main() {
  const dataDir = path.join(__dirname, '../../data');

  loadJsonFile(path.join(dataDir, 'common.json'), (err, commonData) => {
    if (err) {
      console.error('Error loading common.json:', err);
      process.exit(1);
    }

    const { commonWords } = commonData;

    const filePath = path.join(dataDir, 'txt/11.txt');
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) {
        console.error('Error reading file:', err);
        process.exit(1);
      }

      const stats = analyze(content, commonWords);
      console.log(stats);
    });
  });
}

main();
