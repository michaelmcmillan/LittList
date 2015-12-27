from .title import Title
from .byline import Byline
from .publication_date.publication_date import PublicationDate

class Reference:

    def __init__(self):
        self._title = Title()
        self._bylines = Byline()
        self._publication_date = PublicationDate()

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
        self._publication_date = PublicationDate(*date)
