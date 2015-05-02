var assert = require('assert');
var WikiParser = require('../../parsers/wikipedia/wikiparser.js');

describe('Wikipedia citeparser', function () {

    it('should take in wikipedia articles in html in the constructor', function () {
        var wikiparser = new WikiParser('<html>Wikipedia article</html>');
        assert.equal(wikiparser.getArticleHTML(), '<html>Wikipedia article</html>');
    });

    it('should parse tags with an id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<li id="cite_note-1">This is a reference</li>');
        assert.equal(wikiparser.getLiTags().length, 1);
    });
    
    it('should return a length of 0 when suppliying an undefined as html', function () {
        var wikiparser = new WikiParser(undefined);
        assert.equal(wikiparser.getLiTags().length, 0);
    });    

    it('should not parse tags without id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<html><li id="citation-yall">This is a reference</li></html>');
        assert.equal(wikiparser.getLiTags().length, 0);
    });

    it('should parse url from citation tag if it contains a link with "external" class', function () {
        var wikiHtml = '<li id="cite_note-9"><b><a href="#cite_ref-9">^</a></b>' + 
            '<span class="reference-text"><a rel="nofollow" class="external text"  ' +
            'href="http://www.ssb.no/emner/02/01/10/innvbef/">'+
            'SSB: Rekordstor vekst i innvandrerbefolkningen</a></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(9).url, 'http://www.ssb.no/emner/02/01/10/innvbef/');
    });

    it('should should return the reference text from the li tag if present', function () {
        var wikiHtml = '<li id="cite_note-9"><b><a href="#cite_ref-9">^</a></b>' + 
            '<span class="reference-text"><a rel="nofollow" class="external text"  ' +
            'href="http://www.ssb.no/emner/02/01/10/innvbef/">'+
            'SSB: Rekordstor vekst i innvandrerbefolkningen</a></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(9).text, 'SSB: Rekordstor vekst i innvandrerbefolkningen');
    });

    it('should not include a reference date text when extracting the text from a li tag', function () {
        var wikiHtml = '<li id="cite_note-19"><b><a href="#cite_ref-19">^</a></b>' + 
            '<span class="reference-text"><span class="citation web">Statistisk sentralbyrå ' +
            '(9. april 2015). <a rel="nofollow" class="external text" ' +
            'href="http://www.ssb.no/223508/tettsteder.folkemengde-og-areal-etter-kommune.1.januar-2014">' +
            '«Tettsteder. Folkemengde og areal, etter kommune.»</a><span class="reference-accessdate">. ' +
            'Besøkt 11. april 2015</span>.</span><span title="ctx_ver=" class="Z3988">' + 
            '<span style="display:none;">&nbsp;</span></span></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(19).text, 'Statistisk sentralbyrå (9. april 2015). «Tettsteder. Folkemengde og areal, etter kommune.».');
    });

    it('should not matter what language the content is in when extracting text', function () {
        var wikiHtml = '<li id="cite_note-79"><span class="mw-cite-backlink">' + 
               '<b><a href="#cite_ref-79">^</a>' + 
               '</b></span> <span class="reference-text"><span class="citation web">' + 
               '<a rel="nofollow" class="external text" ' + 
               'href="http://www.bbc.co.uk/history/british/victorians/foundling_01.shtml">' + 
               '"The Foundling Hospital"</a>. BBC History. 17 February 2011' + 
               '<span class="reference-accessdate">. Retrieved <span class="nowrap">' + 
               '13 December</span> 2011</span>.</span><span title="ctx_ver=" class="Z3988">' + 
               '<span style="display:none;">&nbsp;</span></span></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(79).url, 'http://www.bbc.co.uk/history/british/victorians/foundling_01.shtml');
        assert.equal(wikiparser.getCitation(79).text, '"The Foundling Hospital". BBC History. 17 February 2011.');
    });

    it('should get footnotes tags (sup) from text', function () {
        var wikiHtml   = 'Nordmenn har i gjennomsnitt verdens fjerde høyeste inntekt, ' + 
            'og er verdens største produsent av olje og gass per capita utenfor Midt-Østen. ' +
            'Petroleumsindustrien står for omlag en fjerdedel av Norges brutto nasjonalprodukt. ' +
            'Norge opprettholder en velferdsmodell lik den man finner i de andre nordiske landene, ' + 
            'hvor helsetjenester og høyere utdanning er statsfinansiert, og landet har et ' + 
            'omfattende velferdssystem for sine innbyggere. ' + 
            'Siden 2001<sup id="cite_ref-2" class="reference"><a href="#cite_note-2">[2]</a></sup>' +
            'har FN rangert Norge som verden beste land å bo i.';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getFootnote(2).id, 2);
    });

    it('should extract sup and its corresponding citation', function () {
        var wikiHtml = 'Siden 2001<sup id="cite_ref-2" class="reference">' +
            '<a href="#cite_note-2">[2]</a></sup>' +
            'har FN rangert Norge som verden beste land å bo i. ' +
            '<li id="cite_note-2"><b><a href="#cite_ref-2">^</a></b>' +
            '<span class="reference-text"><a rel="nofollow" class="external free"' + 
            'href="http://hdr.undp.org/en/media/HDI_2008_EN_Tables.pdf">' + 
            'http://hdr.undp.org/en/media/HDI_2008_EN_Tables.pdf</a>' + 
            '<i>Human Development Report</i>, hdr.undp.org. Besøkt 30. desember 2012' +
            '<span class="bjeller" style="color: gray;cursor:help;" title="engelsk">' + 
            '<small>(en)</small></span></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getFootnoteWithCitation(2).id, 2);
    });

    it('should extract all paragraphs from a wikipedia article', function () {
        var wikiHtml = 
        
            // Paragraph
            '<p>I øst grenser fastlandet til Sverige, i nordøst til Finland og Russland.</p>' + 

            // Paragraph
            '<p>Kongeriket Norge (nynorsk: Kongeriket Noreg) er et nordisk, europeisk land og en selvstendig ' +
            'stat vest på den skandinaviske halvøy. Landet er langt og smalt, og kysten strekker seg langs ' + 
            'Nordatlanteren, hvor også Norges kjente fjorder befinner seg. Totalt dekker det relativt tynt ' +
            'befolkede landet 385 000 kvadratkilometer med litt over fem millioner innbyggere.</p>' + 
            
            // Text
            'Norge er et flott land å bo i.' + 

            // Paragraph
            '<p>Norges folketall passerte 5 millioner i mars 2012, den første millionen ble passert i 1822.[5] ' + 
            'Kjønnsfordelingen var ved inngangen til 2012 på 50,1 % menn og 49,9 % kvinner.[6] Dette var ' + 
            'første gang det er mannsoverskudd i Norge siden det ble gjort folketelling fordelt på kjønn ' + 
            'første gang i 1769. Aldersfordelingen er 25 % fra 0 til 20 år, 62 % fra 20 til 66 år, og 13 % ' + 
            'fra 66 år og oppover.[7] Omkring 34 % av landets befolkning bor i de fire små Oslofjord-fylkene ' + 
            'Akershus, Østfold, Vestfold og Oslo, som kun dekker 3,6 % av landets areal.[8]</p>';

           var wikiparser = new WikiParser(wikiHtml); 
           assert.equal(wikiparser.getParagraphs().length, 3);
    });

    it('should return paragraphs that have footnotes and discard those who does not', function () {
        var wikiHtml = 

            // Paragraph with a single footnote
            '<p>Språket ble styrket gjennom språkmeldingen av 2008, der det fikk en offisiell status som språk ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.<sup id="cite_ref-15" class="reference">' + 
            '<a href="#cite_note-15">[15]</a></sup></p>' + 
            
            // Paragraph without footnote
            '<p>Denne påstanden derimot, den har ingen fotnoter. Det vil si at vi ikke inkluderer den i de filtrerte ' + 
            'avsnittene</p>' + 
        
            // Paragraph where footnotes are not directly descendants of the paragraph
            '<p><span class="inner">Dette avsnittet er inni et span element, men det gjør ingenting ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.<sup id="cite_ref-16" class="reference">' + 
            '<a href="#cite_note-16">[16]</a></sup></p></span>'; 

           var wikiparser = new WikiParser(wikiHtml); 
           assert.equal(wikiparser.getParagraphsWithFootnotes().length, 2);
    });
    
    it('should find the parent paragraph tag of a provided text', function () {
        var wikiHtml = 

            '<p>Språket ble styrket gjennom språkmeldingen av 2008, der det fikk en offisiell status som språk ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.<sup id="cite_ref-15" class="reference">' + 
            '<a href="#cite_note-15">[15]</a></sup></p>';

           var wikiparser = new WikiParser(wikiHtml); 
           assert.equal(wikiparser.getParagraphByText('Døveforbundet lenge hadde kjempet for').name, 'p');
    });

    it('should provide a method for getting the footnote of a provided text', function () {
        var wikiHtml = 

            '<p>Språket ble styrket gjennom språkmeldingen av 2008, der det fikk en offisiell status som språk ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.<sup id="cite_ref-15" class="reference">' + 
            '<a href="#cite_note-15">[15]</a></sup></p>';

           var wikiparser = new WikiParser(wikiHtml); 
           assert.equal(wikiparser.getFootnotesByText('Døveforbundet lenge hadde kjempet for').get(0).name, 'sup');
    });

    it('should get citation of a provided text', function () {
        var wikiHtml = 
            
            // Paragraph with footnote
            '<p>Språket ble styrket gjennom språkmeldingen av 2008, der det fikk en offisiell status som språk ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.<sup id="cite_ref-15" class="reference">' + 
            '<a href="#cite_note-15">[15]</a></sup></p>' + 

            // Reference
            '<li id="cite_note-15"><b><a href="#cite_ref-15">^</a></b> <span class="reference-text">' + 
            '<span class="citation web"><a rel="nofollow" class="external text" ' + 
            'href="http://www.regjeringen.no/nn/dep/kud/dokument/proposisjonar-og-meldingar/'+
            'stortingsmeldingar/2007-2008/stmeld-nr-35-2007-2008-.html?id=519923">' + 
            '«St.meld. nr. 35. Mål og meining&#160;: Ein heilskapleg norsk språkpolitikk»</a>.' + 
            'Kultur- og kirkedepartementet. 27. juni 2008.</span><span title="" class="Z3988">' + 
            '<span style="display:none;">&#160;</span></span></span></li>';

           var wikiparser = new WikiParser(wikiHtml); 
           assert.equal(wikiparser.getCitationByText('Døveforbundet lenge hadde kjempet for').url,
            'http://www.regjeringen.no/nn/dep/kud/dokument/proposisjonar-og-meldingar/'+
            'stortingsmeldingar/2007-2008/stmeld-nr-35-2007-2008-.html?id=519923');
    });

    it('should return an array of citations if there are multiple footnotes in the paragraph of provided text', function () {
        var wikiHtml = 
            
            // Paragraph
            '<p>Språket ble styrket gjennom språkmeldingen av 2008, der det fikk en offisiell status som språk ' + 
            'i Norge, noe Døveforbundet lenge hadde kjempet for.' + 
            
                // First footnote 
                '<sup id="cite_ref-15" class="reference"><a href="#cite_note-15">[15]</a></sup>' + 
                
                // Second footnote
                '<sup id="cite_ref-16" class="reference"><a href="#cite_note-16">[16]</a></sup>' + 
                
            // End paragraph
            '</p>' + 

            // References for both of the footnotes
            '<li id="cite_note-15"><b><a href="#cite_ref-15">^</a></b> <span class="reference-text">' + 
            '<span class="citation web"><a rel="nofollow" class="external text" ' + 
            'href="http://www.regjeringen.no/nn/dep/kud/dokument/proposisjonar-og-meldingar/'+
            'stortingsmeldingar/2007-2008/stmeld-nr-35-2007-2008-.html?id=519923">' + 
            '«St.meld. nr. 35. Mål og meining&#160;: Ein heilskapleg norsk språkpolitikk»</a>.' + 
            'Kultur- og kirkedepartementet. 27. juni 2008.</span><span title="" class="Z3988">' + 
            '<span style="display:none;">&#160;</span></span></span></li>' + 

            '<li id="cite_note-16"><b><a href="#cite_ref-16">^</a></b> <span class="reference-text">' + 
            '<span class="citation web"><a rel="nofollow" class="external text" ' + 
            'href="http://www.vg.no/art/1234">VG.no - Norsk ekke fett</a></span>' + 
            '<span title="" class="Z3988"><span style="display:none;">&#160;</span></span></span></li>';

       var wikiparser = new WikiParser(wikiHtml); 
       var citationsFromText = wikiparser.getCitationByText('Døveforbundet lenge hadde kjempet for');
       assert.strictEqual(citationsFromText.constructor, Array);
    });
});
