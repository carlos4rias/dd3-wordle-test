import fs from  'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const accentMarks = ['á', 'é', 'í', 'ó', 'ú'];
const accentMarksReplacement = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
}
let words;

fetch('https://gitlab.com/d2945/words/-/raw/main/words.txt')
  .then(response => response.text())
  .then(data => {
    words = data.split('\n').filter(str => {
        if (str.length === 5) {
          return str;
        }
      }
    ).map(word => {
      let newWord = "";
      for (let c of word) {
        if (accentMarks.indexOf(c) !== -1) {
          newWord += accentMarksReplacement[c];
        } else {
          newWord += c;
        }
      }
      
      return newWord;
    })

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log(__dirname)

    fs.writeFile(path.join(__dirname, 'rawWords.json'), JSON.stringify([...new Set(words)]), {encoding: 'utf8'})
      .then(() => {console.log('saved words')});
  });
