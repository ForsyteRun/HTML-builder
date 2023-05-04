const { mkdir, copyFile } = require('node:fs/promises');
let { readdir } = require('fs');
const path = require('path');

const nextPath = path.join(__dirname, './files-copy')
const currentPath = path.join(__dirname, './files')

const createDir = async () => {
  try {
    await mkdir(nextPath, { recursive: true })
    readdir(currentPath, (err, files) => {
      if(err) {
        throw err
      } else {
        for (const i of files) {
          const filePath = path.join(__dirname,'files', i)
          copyFile(filePath, path.join(__dirname,'files-copy', i))
        }
      } 
   });
  } catch (err) {
    console.error(err.message);
  }
}

createDir();
