const { copyFile, readdir, unlink } = require('node:fs/promises');
let fs = require('fs');
const path = require('path');

const nextPath = path.join(__dirname, './files-copy');
const currentPath = path.join(__dirname, './files');

const copyDir = async () => {
  fs.mkdir(nextPath, { recursive: true }, () => {});

  await readdir(nextPath, {withFileTypes: true})
    .then(elements => {

      elements.forEach((el) => {
        unlink(path.join(nextPath, el.name));
      });
    });

  await readdir(currentPath, {withFileTypes: true})
    .then(files => {

      files.forEach((file) => {
        copyFile(path.join(currentPath, file.name), path.join(nextPath, file.name));
      });
    });
};

copyDir();