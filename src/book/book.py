from reference.reference import Reference
from .isbn import ISBN
from .publisher import Publisher

class Book(Reference):

    def __init__(self):
        Reference.__init__(self)
        self._isbn = ISBN()
        self._publisher = Publisher('Unknown publisher')

    @property
    def isbn(self):
        return self._isbn.number

    @isbn.setter
    def isbn(self, number):
        self._isbn = ISBN(number)

    @property
    def publisher(self):
        return self._publisher.name

    @publisher.setter
    def publisher(self, name):
        self._publisher = Publisher(name)
