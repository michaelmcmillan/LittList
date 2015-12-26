import unittest
from book.book import Book

class TestBook(unittest.TestCase):

    def test_default_is_none(self):
        book = Book()
        assert book.title == None

    def test_can_be_set_to_none(self):
        book = Book()
        book.title = None
        assert book.title == None

    def test_raises_error_if_title_is_only_whitespace(self):
        with self.assertRaisesRegex(ValueError, 'empty'):
            book = Book()
            book.title = ' '

    def test_raises_error_if_title_is_empty(self):
        with self.assertRaisesRegex(ValueError, 'empty'):
            book = Book()
            book.title = ''

    def test_encodes_html_characters(self):
        book = Book()
        book.title = '<b>The Great Gatsby</b>'
        assert book.title == '&lt;b&gt;The Great Gatsby&lt;/b&gt;' 

    def test_can_contain_weird_utf8_characters(self):
        book = Book()
        book.title = 'Một ngày tốt lành, thế giới!'
        assert len(book.title) == 28

    def test_can_not_be_longer_than_max_length_threshold(self):
        with self.assertRaisesRegex(ValueError, 'long'):
            book = Book()
            book.title = 'A' * (256 + 1)
