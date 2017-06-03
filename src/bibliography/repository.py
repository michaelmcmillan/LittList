from .bibliography import Bibliography
from os.path import join, basename
from json import loads, dumps
from uuid import uuid4

class BibliographyRepository:

    def __init__(self, root_directory='./data'):
        self.root_directory = root_directory

    def get_path_to_bibliography(self, bibliography_id):
        '''Returns the path to a bibliography directory.'''
        return join(self.root_directory, basename(str(bibliography_id)))

    def get_next_identifier(self):
        '''Generates a random and unique identifier.'''
        return str(uuid4())

    def create(self, bibliography):
        '''Creates a new bibliography file in the users directory.'''
        bibliography_id = self.get_next_identifier()
        with open(self.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(self.from_bibliography_to_json(bibliography))
        return bibliography_id

    def read(self, bibliography_id):
        '''Returns an existing bibliography if it exists.'''
        try:
            with open(self.get_path_to_bibliography(bibliography_id), 'r') as f:
                return self.from_json_to_bibliography(f.read())
        except IOError:
            return None

    def change_style(self, bibliography_id, style):
        '''Creates a copy of the old bibliography with given style.'''
        bibliography = self.read(bibliography_id)
        bibliography = Bibliography(bibliography.references, bibliography_id, style) 
        return self.create(bibliography)

    def add(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with added reference.'''
        bibliography = self.read(bibliography_id)
        if not identifier:
            return bibliography_id
        bibliography = Bibliography(bibliography.references | {identifier}, bibliography_id)
        return self.create(bibliography)

    def remove(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with removed reference.'''
        bibliography = self.read(bibliography_id)
        if identifier not in bibliography:
            return bibliography_id
        bibliography = Bibliography(bibliography.references - {identifier}, bibliography_id)
        return self.create(bibliography)

    @staticmethod
    def from_json_to_bibliography(json):
        json = loads(json)
        return Bibliography(
            style=json['style'],
            references=set(json['references']),
            previous_bibliography_id=json['previous_bibliography_id']
        )

    @staticmethod
    def from_bibliography_to_json(bibliography):
        json = {
            'style': bibliography.style,
            'references': list(bibliography.references),
            'previous_bibliography_id': bibliography.previous_bibliography_id
        }
        return dumps(json)
