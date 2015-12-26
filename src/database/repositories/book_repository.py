from database.records.book_record import BookRecord
from database.mappers.book_mapper import BookMapper

class BookRepository:

    @classmethod
    def create(cls, book_model):
        records = BookMapper.to_record(book_model)
        reference_record = records['reference']
        reference_record.save()
        book_record = records['book']
        book_record.save()
        for author_record in records['authors']:
            author_record.save()
        return book_record

    @classmethod
    def read(cls, reference_id):
        book_record = BookRecord.get(BookRecord.reference == reference_id)
        reference_record = book_record.reference
        book_model = BookMapper.to_model(reference_record, book_record, [])
        return book_model
