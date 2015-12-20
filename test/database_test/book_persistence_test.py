import unittest
from database.database import db
from database.repositories.book_repository import BookRepository
from database.records.book import BookRecord
from database.records.reference_record import ReferenceRecord
from book.book import Book

class TestBookPersistence(unittest.TestCase):

    def create_book(self):
        book = Book()
        book.title = 'Book title'
        book.isbn = '9783161484100'
        book.publisher = 'Aschehoug'
        book.publication_date = (2001, 2, 8)
        return book
    
    def drop_table(self):
        try:
            db.drop_table(ReferenceRecord)
            db.drop_table(BookRecord)
        except Exception:
            pass 

    def setUp(self):
        db.connect()
        self.drop_table()
        db.create_tables([ReferenceRecord, BookRecord])

    def tearDown(self):
        self.drop_table()

    def test_inserting_book_stores_a_row_in_bookrecord_table(self):
        book = self.create_book()
        BookRepository.create(book)
        row = db.execute_sql('select * from bookrecord').fetchone()
        assert 'Aschehoug' in row
        assert '9783161484100' in row

    def test_inserting_book_stores_a_row_in_referencerecord_table(self):
        book = self.create_book()
        BookRepository.create(book)
        row = db.execute_sql('select * from referencerecord').fetchone()
        assert 'Book title' in row
        assert 2001 in row
        assert 2 in row
        assert 8 in row

    def test_reading_book_returns_a_book_model_from_the_database(self):
        stored_book = BookRepository.create(self.create_book())
        book = BookRepository.read(stored_book.id)
        assert book.title == 'Book title' 
        assert book.isbn == '9783161484100'
        assert book.publisher == 'Aschehoug'
        assert book.publication_date.year == 2001
        assert book.publication_date.month == 2
        assert book.publication_date.day == 8
