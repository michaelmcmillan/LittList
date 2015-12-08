from title import Title
from author_list import AuthorList
from publication_date import PublicationDate

class Book:

    def __init__(self):
        self._title = Title('Unknown title')
        self._authors = AuthorList([])
        self._publication_date = PublicationDate()

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
        return self._publication_date

    @publication_date.setter
    def publication_date(self, publication_date):
        self._publication_date = PublicationDate(publication_date)
