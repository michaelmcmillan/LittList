from os import listdir, makedirs
from os.path import isdir, isfile, join, basename

class UserDirectory:

    def __init__(self, root_directory):
        self.path = root_directory

    def create(self):
        '''Creates a directory for a user if it does not exist.'''
        if not isdir(self.path):
            makedirs(self.path)

    def get_bibliographies(self):
        '''Returns a sorted list of bibliography identifiers.'''
        try:
            identifiers = [identifier for identifier in listdir(self.path) \
                if not identifier.startswith('.')]
            identifiers = list(map(int, identifiers))
            return sorted(identifiers)
        except FileNotFoundError:
            return []

    def get_next_identifier(self):
        '''Returns the next available identifier.'''
        identifiers = self.get_bibliographies()
        available_identifier = identifiers[-1] + 1 if identifiers else 1
        return available_identifier

    def get_path_to_bibliography(self, bibliography_id):
        '''Returns the path to a bibliography directory.'''
        return join(self.path, str(bibliography_id))
