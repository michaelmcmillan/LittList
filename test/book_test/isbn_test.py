import unittest
from book.book import Book

class TestISBN(unittest.TestCase):

    def test_raises_exception_if_invalid(self):
        with self.assertRaisesRegex(ValueError, 'ISBN'):
            book = Book()
            book.isbn = '01234567891'

    def test_does_not_raise_exception_if_valid(self):
        book = Book()
        book.isbn = '978-1-56619-909-4'
        assert '978' in book.isbn

    def test_dashes_are_removed_from_isbn(self):
        book = Book()
        book.isbn = '979-10-90636-07-1'
        assert book.isbn == '9791090636071'
