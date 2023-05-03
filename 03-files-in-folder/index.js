const { readdir } = require('node:fs/promises');
const path = require('path');
const fs = require('fs');
const { log } = require('node:console');

const correctPath = path.join(__dirname, './secret-folder')

const getPath = async () => {
  try {
    const files = await readdir(correctPath, {withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        let quary = path.extname(file.name).slice(1);
        let fileName = path.parse(file.name);
        const absolutePath = path.resolve('./03-files-in-folder/secret-folder', file.name );
        fs.stat(absolutePath, (err, stats) => {
          console.log(fileName.name + ' - ' + quary + ' - ' + stats.size);
        })
      };
    }
  } catch (err) {
    console.error(err);
  }
};

getPath();