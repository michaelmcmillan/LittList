from unittest.mock import MagicMock, patch
import unittest
from book.book import Book
from database.repositories.book_repository import BookRepository
from database.records.book_record import BookRecord

class TestBookRepository(unittest.TestCase):

    @unittest.mock.patch("database.repositories.book_repository.BookMapper")
    @unittest.mock.patch("database.repositories.book_repository.BookPersister")
    def test_repository_delegates_to_persistor_on_create(self, persister, mapper):
        book = MagicMock()
        BookRepository.create(book)
        persister.insert.assert_called_with(book)

    @unittest.mock.patch("database.repositories.book_repository.BookMapper")
    @unittest.mock.patch("database.repositories.book_repository.BookPersister")
    def test_repository_delegates_to_persistor_on_read(self, persister, mapper):
        BookRepository.read(1)
        persister.select.assert_called_with(1)
