from unittest import TestCase
from .doubles.book_record import create_book_record
from .doubles.reference_record import create_reference_record
from .doubles.book_model import create_book_model
from .doubles.author_model import create_author_model
from database.records.book_record import BookRecord
from database.mappers.book_mapper import BookMapper

class TestBookMapper(TestCase):

    def test_book_record_title_is_mapped_to_model(self):
        book_record = create_book_record()
        reference_record = create_reference_record()
        book_model = BookMapper.to_model(reference_record, book_record, [])
        assert book_model.title == 'Reference title'

    def test_book_record_publisher_is_mapped_to_model(self):
        book_record = create_book_record()
        reference_record = create_reference_record()
        book_model = BookMapper.to_model(reference_record, book_record, [])
        assert book_model.publisher == 'Aschehoug'

    def test_book_record_publication_date_is_mapped_to_model(self):
        book_record = create_book_record()
        reference_record = create_reference_record()
        book_model = BookMapper.to_model(reference_record, book_record, [])
        assert book_model.publication_date.year == 2008
        assert book_model.publication_date.month == 5
        assert book_model.publication_date.day == 12

    def test_book_record_isbn_is_mapped_to_model(self):
        book_record = create_book_record()
        reference_record = create_reference_record()
        book_model = BookMapper.to_model(reference_record, book_record, [])
        assert book_model.isbn == '9783596302987'

    def test_book_model_is_mapped_to_reference_record(self):
        book_model = create_book_model()
        records = BookMapper.to_record(book_model)
        assert records['reference']

    def test_book_model_with_authors_is_mapped_to_authors_records(self):
        book_model = create_book_model()
        author_model = create_author_model()
        book_model.authors = [author_model]
        records = BookMapper.to_record(book_model)
        assert len(records['authors']) == 1

    def test_book_model_publisher_is_mapped_to_book_record(self):
        book_model = create_book_model()
        records = BookMapper.to_record(book_model)
        assert records['book'].publisher == 'Aschehoug'

    def test_book_model_isbn_is_mapped_to_book_record(self):
        book_model = create_book_model()
        records = BookMapper.to_record(book_model)
        assert records['book'].isbn == '9783596302987'
