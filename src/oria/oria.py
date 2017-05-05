from .html_result_parser import HTMLResultParser

class Oria:

    HOST = 'https://bibsys-almaprimo.hosted.exlibrisgroup.com'
    READ = HOST + '/primo_library/libweb/action/PushToAction.do'
    SEARCH = HOST + '/primo_library/libweb/action/search.do'

    def __init__(self, http_client):
        self.http_client = http_client

    def extract_identifiers(self, html):
        '''Extracts BIBSYS identifiers from HTML.'''
        parser = HTMLResultParser()
        parser.feed(html or '')
        identifiers = [identifier for identifier in parser.identifiers \
            if identifier.startswith('BIBSYS')]
        return identifiers

    def search(self, query):
        '''Finds identifiers that matches query.'''
        parameters = ('fn', 'search'), ('vl(freeText0)', query)
        html = self.http_client.get(self.SEARCH, parameters)
        identifiers = self.extract_identifiers(html)
        return identifiers

    def read(self, identifier):
        return {'T1': 'Snømannen'}
