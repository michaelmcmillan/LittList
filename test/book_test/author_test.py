import unittest
from book.book import Book
from unittest.mock import MagicMock

class TestBook(unittest.TestCase):

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

    def test_authors_can_be_fetched_by_index(self):
        book = Book()
        book.authors = [MagicMock(id=2, name='Author')]
        assert book.authors[0].id == 2
