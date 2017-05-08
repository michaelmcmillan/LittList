from cache import Cache
from logging import getLogger
from endnote import EndNoteParser
from http_client import HTTPClient
from concurrent.futures import ThreadPoolExecutor
from .html_result_parser import HTMLResultParser

class Oria:

    HOST = 'https://bibsys-almaprimo.hosted.exlibrisgroup.com'
    READ = HOST + '/primo_library/libweb/action/PushToAction.do'
    SEARCH = HOST + '/primo_library/libweb/action/search.do'

    def __init__(self, http_client=None):
        self.cache = Cache()
        self.http_client = http_client or HTTPClient()
        self.logger = getLogger(self.__class__.__name__)

    def extract_identifiers(self, html):
        '''Extracts BIBSYS identifiers from HTML.'''
        parser = HTMLResultParser()
        parser.feed(html or '')
        identifiers = [identifier for identifier in parser.identifiers \
            if identifier.startswith('BIBSYS')]
        return identifiers

    def search(self, query):
        '''Finds identifiers that matches query.'''
        self.logger.info(query)
        parameters = ('fn', 'search'), ('vl(freeText0)', query)
        html = self.cache.get_or_set(query,
            lambda: self.http_client.get(self.SEARCH, parameters)
        )
        identifiers = self.extract_identifiers(html)
        return identifiers

    def search_concurrently(self, query):
        with ThreadPoolExecutor() as concurrent:
            return concurrent.submit(self.search, query).result()

    def read(self, identifier):
        '''Reads metadata for an identifier.'''
        endnote_parser = EndNoteParser()
        data = {'encode': 'UTF-8'}
        parameters = ('pushToType', 'EndNote'), ('docs', identifier)
        raw_endnote = self.cache.get_or_set(identifier,
            lambda: self.http_client.post(self.READ, parameters, data)
        )
        return endnote_parser.parse(raw_endnote)

    def read_multiple(self, identifiers):
        '''Concurrently retrieves metadata for identifiers.'''
        with ThreadPoolExecutor() as concurrent:
            endnotes = concurrent.map(self.read, identifiers)
            return list(endnotes)
