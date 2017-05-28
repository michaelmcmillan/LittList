from .web import Web
from .oria import Oria
from .nasjonalbiblioteket import Nasjonalbiblioteket

class Library:

    def __init__(self):
        self.web = Web()
        self.oria = Oria()
        self.nasjonalbiblioteket = Nasjonalbiblioteket()

    def retrieve(self, identifier):
        service, identifier = identifier.split(':', 1)
        if service == 'web':
            return self.web.read(identifier)
        elif service == 'oria':
            return self.oria.read(identifier)
        elif service == 'nb':
            return self.nasjonalbiblioteket.read(identifier)

    def search(self, query):
        if query.startswith('http://'):
            web_results = [self.web.read(query)]
            return web_results
        else:
            oria_identifiers = self.oria.search(query)
            oria_matches = self.oria.read_multiple(oria_identifiers)
            oria_results = [fields for fields in oria_matches]
            oria_results = [result for result in oria_results if result]
            return oria_results
