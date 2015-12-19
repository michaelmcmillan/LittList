from database.mappers.book_mapper import BookMapper
from database.persistors.reference_persister import ReferencePersister

class BookPersister:

    @staticmethod
    def insert(book):
        reference_record = ReferencePersister.insert(book)
        book_record = BookMapper.from_book(book)
        book_record.inherits = reference_record
        book_record.save()
        return book_record

    @staticmethod
    def select(reference_id):
        return ReferencePersister.select(reference_id)
