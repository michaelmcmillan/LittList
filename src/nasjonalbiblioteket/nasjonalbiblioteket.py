from logging import getLogger
from . import AtomParser
from endnote import EndNoteParser
from concurrent.futures import ThreadPoolExecutor

class Nasjonalbiblioteket:

    HOST = 'http://www.nb.no'
    READ = HOST + '/nbsok/content/reference'
    SEARCH = HOST + '/services/search/v2/search'

    def __init__(self, http_client):
        self.http_client = http_client
        self.logger = getLogger(self.__class__.__name__)

    def extract_identifiers(self, xml):
        '''Extracts identifiers from the sesamids in the entry tags.'''
        sesam_identifiers = AtomParser(xml).sesam_identifiers
        urls = [sesam_id.text for sesam_id in sesam_identifiers]
        return urls

    def extract_fields(self, endnote):
        '''Extracts fields from EndNote text.'''
        endnote_parser = EndNoteParser()
        fields = endnote_parser.parse(endnote)
        return fields

    def read(self, identifier):
        '''Reads metadata for an identifier.'''
        parameters = ('id', identifier), ('format', 'enw')
        endnote = self.http_client.get(self.READ, parameters)
        return self.extract_fields(endnote) if endnote else {}

    def read_multiple(self, identifiers):
        '''Concurrently retrieves metadata for identifiers.'''
        with ThreadPoolExecutor() as concurrent:
            endnotes = concurrent.map(self.read, identifiers)
            return list(endnotes)

    def search(self, query):
        '''Finds identifiers that matches query.'''
        self.logger.info(query)
        parameters = ('itemsPerPage', 10), ('q', query)
        xml = self.http_client.get(self.SEARCH, parameters)
        return self.extract_identifiers(xml) if xml else []
