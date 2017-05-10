from .oria import Oria, OriaConverter
from .book_to_csl_converter import BookToCSL
from .nasjonalbiblioteket import Nasjonalbiblioteket, NasjonalbiblioteketConverter

class Library:

    def __init__(self):
        self.oria = Oria()
        self.nasjonalbiblioteket = Nasjonalbiblioteket()

    def retrieve(self, identifier):
        service, identifier = identifier.split(':')
        if service == 'oria':
            return self.oria.read(identifier)
        elif service == 'nb':
            return self.nasjonalbiblioteket.read(identifier)
        else:
            return None

    def search(self, query):
        oria_identifiers = self.oria.search(query)
        oria_matches = self.oria.read_multiple(oria_identifiers)
        oria_results = [fields for fields in oria_matches]
        oria_results = [result for result in oria_results if result]
        return oria_results
