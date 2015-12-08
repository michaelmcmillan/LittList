import unittest
from book.book import Book

class TestBook(unittest.TestCase):

    def test_default_title_is_unknown(self):
        book = Book()
        assert book.title == 'Unknown title'

    def test_raises_error_if_title_is_only_whitespace(self):
        with self.assertRaisesRegex(TypeError, 'empty'):
            book = Book()
            book.title = ' '

    def test_raises_error_if_title_is_empty(self):
        with self.assertRaisesRegex(TypeError, 'empty'):
            book = Book()
            book.title = ''

    def test_title_encodes_html_characters(self):
        book = Book()
        book.title = '<b>The Great Gatsby</b>'
        assert book.title == '&lt;b&gt;The Great Gatsby&lt;/b&gt;' 
