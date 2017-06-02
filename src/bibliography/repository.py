from .bibliography import Bibliography
from uuid import uuid4
from os.path import join
from json import loads, dumps

def from_json_to_bibliography(json):
    json = loads(json)
    return Bibliography(
        set(json['references']),
        json['previous_bibliography_id']
    )

def from_bibliography_to_json(bibliography):
    json = {
        'references': list(bibliography.references),
        'previous_bibliography_id': bibliography.previous_bibliography_id
    }
    return dumps(json)

class BibliographyRepository:

    def __init__(self, root_directory='./data'):
        self.root_directory = root_directory

    def get_path_to_bibliography(self, bibliography_id):
        '''Returns the path to a bibliography directory.'''
        return join(self.root_directory, str(bibliography_id))

    def get_next_identifier(self):
        '''Generates a random and unique identifier.'''
        return str(uuid4())

    def create(self, bibliography):
        '''Creates a new bibliography file in the users directory.'''
        bibliography_id = self.get_next_identifier()
        with open(self.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(from_bibliography_to_json(bibliography))
        return bibliography_id

    def read(self, bibliography_id):
        '''Returns an existing bibliography if it exists.'''
        try:
            path = join(self.root_directory, str(bibliography_id))
            with open(path, 'r') as f:
                return from_json_to_bibliography(f.read())
        except IOError:
            return None

    def add(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with added reference.'''
        bibliography = self.read(bibliography_id)
        if not identifier:
            return bibliography_id
        bibliography = Bibliography(bibliography.references.union({identifier}), bibliography_id)
        return self.create(bibliography)

    def remove(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with removed reference.'''
        bibliography = self.read(bibliography_id)
        if identifier not in bibliography:
            return bibliography_id
        bibliography = Bibliography(bibliography.references.difference({identifier}), bibliography_id)
        return self.create(bibliography)
