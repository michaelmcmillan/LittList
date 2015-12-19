from unittest.mock import MagicMock
import unittest
from book.book import Book
from database.mappers.book_mapper import BookMapper
from database.records.book_record import BookRecord

class TestBookMapper(unittest.TestCase):

    def test_returns_record_when_given_book(self):
        book = MagicMock(title='Hello world', isbn='123456789', publisher='Aschehoug')
        record = BookMapper.from_book(book)
        self.assertIsInstance(record, BookRecord)

    def test_returns_book_when_given_record(self):
        record = MagicMock(title='Hello world', isbn='9783161484100', publisher='Aschehoug')
        book = BookMapper.from_record(record)
        self.assertIsInstance(book, Book)

    def test_maps_properties_from_book_to_record(self):
        book = MagicMock(title='Hello world', isbn='123456789', publisher='Aschehoug')
        record = BookMapper.from_book(book)
        assert record.title == "Hello world"
        assert record.isbn == "123456789"
        assert record.publisher == "Aschehoug"

    def test_maps_properties_from_record_to_book(self):
        book = MagicMock(title='Hello world', isbn='123456789', publisher='Aschehoug')
        record = BookMapper.from_book(book)
        assert record.title == "Hello world"
        assert record.isbn == "123456789"
        assert record.publisher == "Aschehoug"
