from database.records.book_record import BookRecord
from book.book import Book

class BookMapper:

    @staticmethod
    def from_record(record):
        book = Book()
        book.id = record.id
        book.title = record.title
        book.isbn = record.isbn
        book.publisher = record.publisher
        return book

    @staticmethod
    def from_book(book):
        record = BookRecord()
        record.title = book.title
        record.publisher = book.publisher
        record.isbn = book.isbn
        return record
