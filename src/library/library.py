from oria import Oria
from nasjonalbiblioteket import Nasjonalbiblioteket

class Library:

    SOURCES = {
        'Oria': Oria(),
        'NB': Nasjonalbiblioteket()
    }

    def __init__(self, sources=None):
        self.sources = sources or self.SOURCES

    def search(self, query):
        results = []
        for name, source in self.sources.items():
            identifiers = source.search(query)
            results += [(name, result) for result \
                in source.read_multiple(identifiers)]
        return results
