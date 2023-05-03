const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const dataPath = path.join(__dirname, './text.txt');
const writeStream = fs.createWriteStream(dataPath);

console.log('Enter something, please!');

rl.on('line', (answer) => {
    if (answer === 'exit') {
        rl.close()
    } else {
        writeStream.write(answer + '\n');
    }
});

rl.on('close', () => console.log('Thanks and goodluck!'));