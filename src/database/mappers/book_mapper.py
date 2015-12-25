from database.mappers.reference_mapper import ReferenceMapper
from book.book import Book

class BookMapper:

    @classmethod
    def to_model(cls, book_record, author_records):
        book_model = Book()
        ReferenceMapper.add_attributes(
            book_model, book_record, author_records
        )
        book_model.publisher = book_record.publisher
        book_model.isbn = book_record.isbn
        return book_model
