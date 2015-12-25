from unittest import TestCase
from unittest.mock import MagicMock
from database.records.book_record import BookRecord
from database.mappers.book_mapper import BookMapper

class TestBookMapper(TestCase):

    def create_book_record(self):
        return MagicMock(
            id=2,
            isbn='9783596302987',
            title='Book title',
            publisher='Aschehoug',
            publication_year=2001,
            publication_month=9,
            publication_day=20
        )

    def test_book_record_title_is_mapped_to_model(self):
        book_record = self.create_book_record()
        book_model = BookMapper.to_model(book_record, [])
        assert book_model.title == 'Book title'

    def test_book_record_publisher_is_mapped_to_model(self):
        book_record = self.create_book_record()
        book_model = BookMapper.to_model(book_record, [])
        assert book_model.publisher == 'Aschehoug'

    def test_book_record_isbn_is_mapped_to_model(self):
        book_record = self.create_book_record()
        book_model = BookMapper.to_model(book_record, [])
        assert book_model.isbn == '9783596302987'
