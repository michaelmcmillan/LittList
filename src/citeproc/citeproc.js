const fs = require('fs');
const CSL = require('../../lib/citeproc-js/citeproc.js').CSL;

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);

const generateBibliography = references => {
  const citeprocSys = {
    retrieveItem: (id) =>
      references.find(reference => reference.id == id),
    retrieveStyle: (style) =>
        //fs.readFileSync(__dirname + '/styles/apa.csl', 'utf-8'),
        fs.readFileSync(__dirname + '/styles/harvard-cite-them-right.csl', 'utf-8'),
    retrieveLocale: (lang) => 
      fs.readFileSync(__dirname + '/locales/locales-nb-NO.xml', 'utf-8')
  };

  const engine = new CSL.Engine(citeprocSys, citeprocSys.retrieveStyle());
  engine.updateItems(references.map(reference => reference.id));
  const bibliography = engine.makeBibliography();
  return bibliography; 
}

process.stdin.on('end', () => {
  const references = JSON.parse(buffer);
  const bibliography = generateBibliography(references);
  const output = JSON.stringify(bibliography);
  process.stdout.write(output);
});
