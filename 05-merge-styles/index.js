const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const pathStylesDir = path.join(__dirname, 'styles');
const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');

const writeStream = fs.createWriteStream(pathBundle)

const mergeStyles = async () => {
  const readStyles = await readdir(pathStylesDir, () => {});
  for (const i of readStyles) {
    const ext = path.extname(i);
    if (ext === '.css') {
      const pathStylesDir = path.join(__dirname, 'styles', i);
     const readStream = fs.createReadStream(pathStylesDir);
     readStream.pipe(writeStream)
   }
  }
};

mergeStyles()