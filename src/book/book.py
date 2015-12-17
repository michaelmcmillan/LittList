from .isbn import ISBN
from .title import Title
from .byline import Byline
from .publisher import Publisher
from .publication_date import PublicationDate

class Book:

    def __init__(self):
        self._isbn = ISBN()
        self._title = Title('Unknown title')
        self._bylines = Byline()
        self._publisher = Publisher('Unknown publisher')
        self._publication_date = PublicationDate()

    @property
    def isbn(self):
        return self._isbn.number

    @isbn.setter
    def isbn(self, number):
        self._isbn = ISBN(number)

    @property
    def title(self):
        return self._title.text

    @title.setter
    def title(self, text):
        self._title = Title(text)

    @property
    def authors(self):
        return self._bylines

    @authors.setter
    def authors(self, authors):
        self._bylines.add(authors)

    @property
    def publication_date(self):
        return self._publication_date

    @publication_date.setter
    def publication_date(self, date):
        year, month, day = date
        self._publication_date = PublicationDate(year, month, day)

    @property
    def publisher(self):
        return self._publisher.name

    @publisher.setter
    def publisher(self, name):
        self._publisher = Publisher(name)
