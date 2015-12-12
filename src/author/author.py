class Author:

    def __init__(self):
        self._first_name = 'Jo'
        self._last_name = ''

    @property
    def first_name(self):
        return self._first_name

    @first_name.setter
    def first_name(self, first_name):
        self._first_name = first_name.strip()

    @property
    def last_name(self):
        return self._last_name.strip()

    @last_name.setter
    def last_name(self, last_name):
        self._last_name = last_name
