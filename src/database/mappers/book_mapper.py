from database.records.book_record import BookRecord
from database.mappers.author_mapper import AuthorMapper
from database.mappers.reference_mapper import ReferenceMapper
from book.book import Book

class BookMapper:

    @classmethod
    def to_model(cls, reference_record, book_record, author_records):
        book_model = Book()
        book_model.id = reference_record.id
        book_model.title = reference_record.title
        book_model.publisher = book_record.publisher
        book_model.isbn = book_record.isbn
        book_model.publication_date = (
            reference_record.publication_year,
            reference_record.publication_month,
            reference_record.publication_day
        )
        book_model.authors = [AuthorMapper.to_model(author) \
            for author in author_records]

        return book_model

    @classmethod
    def to_record(cls, book_model):
        reference_records = ReferenceMapper.to_record(book_model)
        book_record = BookRecord()
        book_record.isbn = book_model.isbn
        book_record.publisher = book_model.publisher
        book_record.reference = reference_records['reference']
        return {
            'reference': reference_records['reference'],
            'authors': reference_records['authors'],
            'book': book_record
        }
