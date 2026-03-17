import fs from 'node:fs';

const path1 = 'data/file1.txt';
const path2 = 'data/file2.txt';
const path3 = 'data/file3.txt';

let content = '';

fs.readFile(path1, (err, result1) => {
  if (err) return;
  content += result1;
  fs.readFile(path2, (err, result2) => {
    if (err) return;
    content += result2;
    fs.writeFile(path3, content, (err) => {
      if (err) return;
      console.log('All done!');
    });
  });
});
