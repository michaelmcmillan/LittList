import unittest
from book.book import Book

class TestPublisher(unittest.TestCase):

    def test_default_is_none(self):
        book = Book()
        assert book.publisher == None

    def test_encodes_html_characters(self):
        book = Book()
        book.publisher = '<script>alert(1);</script>'
        assert book.publisher == '&lt;script&gt;alert(1);&lt;/script&gt;' 

    def test_name_is_capitalized(self):
        book = Book()
        book.publisher = 'publisher'
        assert book.publisher == 'Publisher' 

    def test_can_not_be_longer_than_max_length_threshold(self):
        with self.assertRaisesRegex(ValueError, 'long'):
            book = Book()
            book.publisher = 'P' * (256 + 1)

    def test_name_can_not_be_empty(self):
        with self.assertRaisesRegex(ValueError, 'empty'):
            book = Book()
            book.publisher = ''
