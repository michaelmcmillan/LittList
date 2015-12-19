from database.persistors.book_persister import BookPersister
from database.mappers.book_mapper import BookMapper

class BookRepository:

    @staticmethod
    def create(book):
        record = BookPersister.insert(book)
        book = BookMapper.from_record(record)
        return book

    @staticmethod
    def read(book_id):
        record = BookPersister.select(book_id)
        book = BookMapper.from_record(record)
        return book
