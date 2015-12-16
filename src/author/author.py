from .name import Name

class Author:

    def __init__(self):
        self._name = Name()

    @property
    def name(self):
        return self._name.text

    @name.setter
    def name(self, name):
        self._name = Name(name)
