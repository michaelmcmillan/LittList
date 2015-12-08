import unittest
from book import Book
from unittest.mock import MagicMock

class TestBook(unittest.TestCase):

    def test_default_title_is_unknown(self):
        book = Book()
        assert book.title == 'Unknown title'

    def test_raises_error_if_title_is_only_whitespace(self):
        with self.assertRaisesRegex(ValueError, 'empty'):
            book = Book()
            book.title = ' '

    def test_raises_error_if_title_is_empty(self):
        with self.assertRaisesRegex(ValueError, 'empty'):
            book = Book()
            book.title = ''

    def test_title_encodes_html_characters(self):
        book = Book()
        book.title = '<b>The Great Gatsby</b>'
        assert book.title == '&lt;b&gt;The Great Gatsby&lt;/b&gt;' 

    def test_title_can_contain_weird_utf8_characters(self):
        book = Book()
        book.title = 'Một ngày tốt lành, thế giới!'
        assert len(book.title) == 28

    def test_title_can_not_be_longer_than_max_length_threshold(self):
        with self.assertRaisesRegex(ValueError, 'long'):
            book = Book()
            book.title = 'A' * (256 + 1)

    def test_there_are_no_authors_by_default(self):
        book = Book()
        assert len(book.authors) == 0

    def test_single_author_can_be_added(self):
        book = Book()
        book.authors = MagicMock('Author')
        assert len(book.authors) == 1

    def test_multiple_authors_can_be_added_at_once(self):
        book = Book()
        book.authors = [MagicMock('Author'), MagicMock('Author')]
        assert len(book.authors) == 2

    def test_same_author_can_not_be_added_twice(self):
        with self.assertRaisesRegex(ValueError, 'already'):
            book = Book()
            author = MagicMock('Author')
            book.authors = [author, author]
