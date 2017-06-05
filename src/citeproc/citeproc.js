const fs = require('fs');
const CSL = require('../../lib/citeproc-js/citeproc.js').CSL;

const stylesPaths = {
  'apa': 'apa.csl',
  'chicago': 'chicago-author-date.csl',
  'harvard': 'harvard-cite-them-right.csl',
  'vancouver': 'vancouver-author-date.csl',
  'american-medical-association': 'american-medical-association.csl',
}

const localesPaths = {
  'english': 'locales-en-US.xml',
  'norwegian-bokmål': 'locales-nb-NO.xml',
  'norwegian-nynorsk': 'locales-nn-NO.xml'
}

let buffer = '';
process.stdin.on('data', chunk => buffer += chunk);

const generateBibliography = (references, style, locale) => {
  const citeprocSys = {
    retrieveItem: (id) =>
      references.find(reference => reference.id == id),
    retrieveStyle: (style) =>
        fs.readFileSync(__dirname + '/styles/' + stylesPaths[style], 'utf-8'),
    retrieveLocale: () => 
      fs.readFileSync(__dirname + '/locales/' + localesPaths[locale], 'utf-8')
  };

  const engine = new CSL.Engine(citeprocSys, citeprocSys.retrieveStyle(style));
  engine.updateItems(references.map(reference => reference.id));
  const bibliography = engine.makeBibliography();
  return bibliography; 
}

process.stdin.on('end', () => {
  const input = JSON.parse(buffer);
  const bibliography = generateBibliography(input['references'], input['style'], input['locale']);
  const output = JSON.stringify(bibliography);
  process.stdout.write(output);
});
