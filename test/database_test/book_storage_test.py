from unittest.mock import MagicMock
import unittest
from database.repositories.book_repository import BookRepository
from book.book import Book

class TestBookStorage(unittest.TestCase):

    @unittest.skip('')
    def test_book_can_be_stored_to_database(self):
        book = Book()
        book.title = "Hello world"
        stored_book = BookRepository.create(book)
        assert stored_book.title == "Hello world"
