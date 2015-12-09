from isbn import ISBN
from title import Title
from authors import Authors
from publisher import Publisher
from publication_date import PublicationDate

class Book:

    def __init__(self):
        self._isbn = ISBN()
        self._title = Title('Unknown title')
        self._authors = Authors()
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
        return str(self._title)

    @title.setter
    def title(self, text):
        self._title = Title(text)

    @property
    def authors(self):
        return self._authors

    @authors.setter
    def authors(self, authors):
        self._authors.add(authors)

    @property
    def publication_date(self):
        return self._publication_date.date

    @publication_date.setter
    def publication_date(self, date):
        self._publication_date = PublicationDate(date)

    @property
    def publisher(self):
        return self._publisher.name

    @publisher.setter
    def publisher(self, name):
        self._publisher = Publisher(name)
