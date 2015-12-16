import unittest
from datetime import datetime, timedelta
from book.book import Book

class TestPublicationDate(unittest.TestCase):

    def test_is_none_by_default(self):
        book = Book()
        assert book.publication_date == None

    def test_does_not_raise_error_if_in_past(self):
        book = Book()
        today = datetime.now()
        tomorrow = today + timedelta(days = -1)
        book.publication_date = tomorrow
        assert book.publication_date == tomorrow

    def test_raises_error_if_set_in_the_future(self):
        with self.assertRaisesRegex(ValueError, 'future'):
            book = Book()
            today = datetime.now()
            book.publication_date = today + timedelta(days = 1)
