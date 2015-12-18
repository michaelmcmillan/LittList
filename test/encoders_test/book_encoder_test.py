from unittest.mock import MagicMock
import unittest
from datetime import datetime
from encoders.book_encoder import BookEncoder, PublicationDateToDateParts

class MockBook(MagicMock):
    title = 'Boundaries of Dissent'
    publisher = 'Routledge'
    publication_date = datetime.today()

class TestJSONRepresentation(unittest.TestCase):

    def test_title_is_represented(self):
        book = MockBook()
        json = BookEncoder().encode(book)
        assert '"title": "Boundaries of Dissent"' in json

    def test_type_is_represented(self):
        book = MockBook()
        json = BookEncoder().encode(book)
        assert '"type": "book"' in json

    def test_publisher_is_represented(self):
        book = MockBook()
        json = BookEncoder().encode(book) 
        assert '"publisher": "Routledge"' in json

    def test_issued_is_not_represented_if_no_publication_date(self):
        publication_date = MagicMock(year=None, month=None, day=None)
        book = MockBook(publication_date=publication_date)
        json = BookEncoder().encode(book)
        assert '"issued":' not in json

    def test_converts_year_to_2d_array(self):
        publication_date = MagicMock(year=2000, month=None, day=None)
        converted_date = PublicationDateToDateParts.convert(publication_date)
        assert converted_date == [[2000]]

    def test_converts_year_and_month_to_2d_array(self):
        publication_date = MagicMock(year=2005, month=1, day=None)
        converted_date = PublicationDateToDateParts.convert(publication_date)
        assert converted_date == [[2005],[1]]

    def test_converts_year_and_month_and_day_to_2d_array(self):
        publication_date = MagicMock(year=2005, month=2, day=5)
        converted_date = PublicationDateToDateParts.convert(publication_date)
        assert converted_date == [[2005],[2],[5]]

    def test_converts_empty_publication_date_to_none(self):
        publication_date = MagicMock(year=None, month=None, day=None)
        converted_date = PublicationDateToDateParts.convert(publication_date)
        assert converted_date == None
