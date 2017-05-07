from json import loads, dumps
from .user_directory import UserDirectory

class BibliographyRepository:

    def __init__(self, root_directory):
        self.root_directory = root_directory

    def create(self, user_id, bibliography):
        '''Creates a new bibliography file in the users directory.'''
        directory = UserDirectory(self.root_directory, user_id)
        directory.create()
        bibliography_id = directory.get_next_identifier()
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))
        return bibliography_id

    def add(self, user_id, bibliography_id, identifier):
        if not identifier:
            return
        directory = UserDirectory(self.root_directory, user_id)
        bibliography = self.read(user_id, bibliography_id)
        bibliography.append(identifier)
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))

    def remove(self, user_id, bibliography_id, identifier):
        if not identifier:
            return
        directory = UserDirectory(self.root_directory, user_id)
        bibliography = self.read(user_id, bibliography_id)
        bibliography.remove(identifier)
        with open(directory.get_path_to_bibliography(bibliography_id), 'w') as f:
            f.write(dumps(bibliography))

    def read(self, user_id, bibliography_id):
        '''Returns an existing bibliography if it exists.'''
        directory = UserDirectory(self.root_directory, user_id)
        if bibliography_id not in directory.get_bibliographies():
            return None
        with open(directory.get_path_to_bibliography(bibliography_id), 'r') as f:
            return loads(f.read())
