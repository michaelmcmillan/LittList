from isbnlib import is_isbn10, is_isbn13, get_canonical_isbn

class ISBN:

    def __init__(self, number=None):
        self._number = number \
            if self.is_valid(number) else None

    def is_valid(self, number):
        if number is None:
            return True
        elif not self.is_properly_formatted(number):
            raise ValueError('Invalid ISBN number.')
        else:
            return True

    def is_properly_formatted(self, number):
        return is_isbn10(number) or is_isbn13(number)

    @property
    def number(self):
        return get_canonical_isbn(self._number) \
            if self._number else None
