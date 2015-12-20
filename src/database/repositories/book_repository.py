from book.book import Book
from database.repositories.reference_repository import ReferenceRepository
from database.records.book_record import BookRecord

class BookRepository:

    @staticmethod
    def create(book_model):
        reference_model = ReferenceRepository.create(book_model)
        book_record = BookRepository.model_to_record(
            book_model, reference_model
        )
        book_record.save()
        book_model = BookRepository.record_to_model(
            book_record,
            reference_model
        )
        return book_model

    @staticmethod
    def read(reference_id):
        book_record = BookRecord.get(BookRecord.reference == reference_id)
        reference_record = book_record.reference
        return BookRepository.record_to_model(book_record, reference_record)

    @staticmethod
    def model_to_record(book_model, reference_model):
        book_record = BookRecord()
        book_record.reference = reference_model.id
        book_record.title = reference_model.title
        book_record.isbn = book_model.isbn
        book_record.publisher = book_model.publisher
        return book_record

    @staticmethod
    def record_to_model(book_record, reference_record):
        book_model = Book()
        book_model.id = book_record.reference_id
        book_model.title = book_record.reference.title
        book_model.isbn = book_record.isbn
        book_model.publisher = book_record.publisher
        book_model.publication_date = (
            book_record.reference.publication_year,
            book_record.reference.publication_month,
            book_record.reference.publication_day,
        )
        return book_model
