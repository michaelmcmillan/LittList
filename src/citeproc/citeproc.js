const fs = require('fs');
const CSL = require('../../lib/citeproc-js/citeproc.js').CSL;

const stylesPaths = {
  'apa': 'apa.csl',
  'chicago': 'chicago-author-date.csl',
  'harvard': 'harvard-cite-them-right.csl',
  'vancouver': 'vancouver-author-date.csl',
  'american-medical-association': 'american-medical-association.csl',
}

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);

const generateBibliography = (references, style) => {
  const citeprocSys = {
    retrieveItem: (id) =>
      references.find(reference => reference.id == id),
    retrieveStyle: (style) =>
        fs.readFileSync(__dirname + '/styles/' + stylesPaths[style], 'utf-8'),
    retrieveLocale: (lang) => 
      fs.readFileSync(__dirname + '/locales/locales-nb-NO.xml', 'utf-8')
  };

  const engine = new CSL.Engine(citeprocSys, citeprocSys.retrieveStyle(style));
  engine.updateItems(references.map(reference => reference.id));
  const bibliography = engine.makeBibliography();
  return bibliography; 
}

process.stdin.on('end', () => {
  const input = JSON.parse(buffer);
  const bibliography = generateBibliography(input['references'], input['style']);
  const output = JSON.stringify(bibliography);
  process.stdout.write(output);
});
