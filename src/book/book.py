from title import Title

class Book:

    def __init__(self):
        self._title = Title('Unknown title')

    @property
    def title(self):
        return str(self._title)

    @title.setter
    def title(self, text):
        self._title = Title(text)
