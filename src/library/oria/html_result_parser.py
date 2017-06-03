from html.parser import HTMLParser

class HTMLResultParser(HTMLParser):

    def __init__(self):
        super().__init__()
        self.digesting = False
        self.identifiers = []

    def handle_starttag(self, tag, attributes):
        '''Starts to "digest" if needle tag found.'''
        if tag == 'td' and ('class', 'EXLThumbnail') in attributes:
            self.digesting = True
        elif self.digesting and tag == 'a':
            identifier = dict(attributes).get('name')
            self.identifiers.append(identifier)

    def handle_endtag(self, tag):
        '''Stops "digesting" if needle tag ended.'''
        if self.digesting and tag == 'a':
           self.digesting = False
