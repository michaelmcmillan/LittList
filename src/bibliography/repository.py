from json import loads, dumps
from .user_directory import UserDirectory

class BibliographyRepository:

    def __init__(self, root_directory='./data'):
        self.root_directory = root_directory

    def create(self, user_id, bibliography):
        '''Creates a new bibliography file in the users directory.'''
        directory = UserDirectory(self.root_directory, user_id)
        directory.create()
        bibliography_id = directory.get_next_identifier()
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))
        return bibliography_id

    def read(self, user_id, bibliography_id):
        '''Returns an existing bibliography if it exists.'''
        directory = UserDirectory(self.root_directory, user_id)
        if bibliography_id not in directory.get_bibliographies():
            return None
        with open(directory.get_path_to_bibliography(bibliography_id), 'r') as f:
            return loads(f.read())

    def update(self, method, user_id, bibliography_id, identifier):
        if not identifier:
            return
        directory = UserDirectory(self.root_directory, user_id)
        bibliography = self.read(user_id, bibliography_id)
        try:
            getattr(bibliography, method)(identifier)
        except ValueError:
            return
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))

    def add(self, user_id, bibliography_id, identifier):
        self.update('append', user_id, bibliography_id, identifier)

    def remove(self, user_id, bibliography_id, identifier):
        self.update('remove', user_id, bibliography_id, identifier)
