import unittest
from book.book import Book

class TestISBN(unittest.TestCase):

    def test_raises_exception_if_invalid(self):
        with self.assertRaisesRegex(ValueError, 'ISBN'):
            book = Book()
            book.isbn = '01234567891'

    def test_dashes_are_removed_from_isbn(self):
        book = Book()
        book.isbn = '979-10-90636-07-1'
        assert book.isbn == '9791090636071'

    def test_isbn_can_be_set_to_none(self):
        book = Book()
        book.isbn = None
        assert book.isbn == None

    def test_isbn_is_initially_set_to_none(self):
        book = Book()
        assert book.isbn == None
