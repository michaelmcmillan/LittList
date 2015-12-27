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

        author_records = records['authors']
        for author_record in author_records:
            author_record.save()

        author_reference_records = records['author_references']
        for author_reference_record in author_reference_records:
            author_reference_record.save()

        return book_record

    @classmethod
    def read(cls, reference_id):
        book_record = BookRecord.get(BookRecord.reference == reference_id)
        reference_record = book_record.reference
        author_records = [reference_record.author \
            for reference_record in reference_record.author]
        book_model = BookMapper.to_model(
            reference_record, book_record, author_records
        )
        return book_model
