from title import Title
from author_list import AuthorList

class Book:

    def __init__(self):
        self._title = Title('Unknown title')
        self._authors = AuthorList([])

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
