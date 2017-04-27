const fs = require('fs');
const CSL = require('../../lib/citeproc-js/citeproc.js').CSL;
const stdin = process.stdin;
const stdout = process.stdout;

let input = '';
stdin.on('data', function (chunk) {
  input += chunk;
});

stdin.on('end', function () {
  const references = JSON.parse(input);
  const bibliography = generateBibliography(references);
  const output = JSON.stringify(bibliography);
  process.stdout.write(output);
});

function generateBibliography(references) {
  const citeprocSys = {
    retrieveItem: (id) =>
      references.find(reference => reference.id == id),
    retrieveStyle: (style) =>
        fs.readFileSync(__dirname + '/styles/apa.csl', 'utf-8'),
    retrieveLocale: (lang) => 
      fs.readFileSync(__dirname + '/locales/locales-nb-NO.xml', 'utf-8')
  };

  const engine = new CSL.Engine(citeprocSys, citeprocSys.retrieveStyle());
  engine.updateItems(references.map(reference => reference.id));
  const bibliography = engine.makeBibliography();
  return bibliography[1].join(''); 
}
