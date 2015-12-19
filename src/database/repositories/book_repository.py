from persistors.book_persister import BookPersister
from mappers.book_mapper import ReferenceMapper

class BookRepository:

    @staticmethod
    def create(book):
        record = BookPersister.insert(book)
        book = BookMapper.from_record(record)
        return book 

    @staticmethod
    def read(book_id):
        record = BookPersister.select(book)
        book = BookMapper.from_record(record)
        return book 
