const fs = require('fs');
const path = require('path');
const { readdir, copyFile } = require('node:fs/promises');

(() => {
  
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, () => {});
  const rs = fs.createReadStream(path.join(__dirname, './template.html'));
  const ws = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
  
  let str = '';

  rs.on('data', data => {
    str = data.toString();

    const createTemplate = (fileName) => {
      return `{{${fileName}}}`;
    };

    fs.readdir(path.join(__dirname, './components'), {withFileTypes: true}, (error, data) => {
      const templates = [];
      data.forEach(el => {
        const fileName = el.name.match(/([\w]*\.)*/)[0].replace('.', '');
        templates.push(createTemplate(fileName));
      });

      readdir(path.join(__dirname, './components'), () => {}).then((n) => {
        n.forEach((comp, index) => {
          const readStream = fs.createReadStream(path.join(__dirname, './components', comp), 'utf-8');
          readStream.on('data', (data) => {
            str = str.replace(templates[index], data);

            if (!templates.find(temp => str.includes(temp))) {
              ws.write(str);
            }
          });
        });
      });
    });
  });
})();


const mergeStyles = async () => {
  const pathStylesDir = path.join(__dirname, 'styles');
  const pathBundle = path.join(__dirname, 'project-dist', 'style.css');
  const writeStream = fs.createWriteStream(pathBundle);

  const readStyles = await readdir(pathStylesDir, () => {});
  for (const i of readStyles) {
    const ext = path.extname(i);
    if (ext === '.css') {
      const pathStylesDir = path.join(__dirname, 'styles', i);
      const readStream = fs.createReadStream(pathStylesDir);
      readStream.pipe(writeStream);
    }
  }
};

mergeStyles();

const copyDir = () => {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, () => {});

  async function dirChain(fromDir, toDir) {
    await readdir(fromDir, {withFileTypes: true})
      .then(files => {
        console.log(files);
        files.forEach( async (file) => {
          if (file.isDirectory()) {
            const pathFromDir = path.join(fromDir, file.name);
            const pathToDir = path.join(toDir, file.name);
            dirChain(pathFromDir, pathToDir);
          } else {
            fs.mkdir(toDir, {recursive: true}, () => {});
            copyFile(path.join(fromDir, file.name), path.join(toDir, file.name));
          }
        });
      });
  }
  dirChain(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
};

copyDir();
