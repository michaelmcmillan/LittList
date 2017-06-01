from json import loads, dumps
from .user_directory import UserDirectory

class BibliographyRepository:

    def __init__(self, root_directory='./data'):
        self.root_directory = root_directory

    def create(self, bibliography):
        '''Creates a new bibliography file in the users directory.'''
        directory = UserDirectory(self.root_directory)
        directory.create()
        bibliography_id = directory.get_next_identifier()
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))
        return bibliography_id

    def read(self, bibliography_id):
        '''Returns an existing bibliography if it exists.'''
        directory = UserDirectory(self.root_directory)
        if bibliography_id not in directory.get_bibliographies():
            return None
        with open(directory.get_path_to_bibliography(bibliography_id), 'r') as f:
            return loads(f.read())

    def add(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with added reference.'''
        bibliography = self.read(bibliography_id)
        bibliography.append(identifier)
        updated_bibliography_id = self.create(bibliography)
        return updated_bibliography_id

    def remove(self, bibliography_id, identifier):
        '''Creates a copy of the old bibliography with removed reference.'''
        bibliography = self.read(bibliography_id)
        bibliography.remove(identifier) \
            if identifier in bibliography else None
        updated_bibliography_id = self.create(bibliography)
        return updated_bibliography_id
