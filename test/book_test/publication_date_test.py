import unittest
from datetime import datetime, timedelta
from book.book import Book

class TestPublicationDate(unittest.TestCase):

    def test_does_not_raise_error_if_year_in_past(self):
        book = Book()
        book.publication_date = (2008, None, None)
        self.assertEqual(book.publication_date.year, 2008)

    def test_raise_error_if_year_is_negative(self):
        with self.assertRaisesRegex(ValueError, 'positive'):
            book = Book()
            book.publication_date = (-1, None, None)

    def test_raise_error_if_year_is_zero(self):
        with self.assertRaisesRegex(ValueError, 'positive'):
            book = Book()
            book.publication_date = (0, None, None)

    def test_raises_error_if_year_is_in_the_future(self):
        with self.assertRaisesRegex(ValueError, 'future'):
            book = Book()
            book.publication_date = (2999, None, None)

    def test_does_not_raise_error_if_year_and_month_in_past(self):
        book = Book()
        book.publication_date = (2008, 1, None)
        assert book.publication_date.month == 1

    def test_raise_error_if_month_is_greater_than_12(self):
        with self.assertRaisesRegex(ValueError, '12'):
            book = Book()
            book.publication_date = (2008, 13, None)

    def test_raise_error_if_month_is_smaller_than_1(self):
        with self.assertRaisesRegex(ValueError, '12'):
            book = Book()
            book.publication_date = (2008, 0, None)

    def test_raise_error_if_day_is_smaller_than_1(self):
        with self.assertRaisesRegex(ValueError, '1'):
            book = Book()
            book.publication_date = (2008, 1, 0)

    def test_raise_error_if_day_is_greater_than_31(self):
        with self.assertRaisesRegex(ValueError, '31'):
            book = Book()
            book.publication_date = (2008, 1, 32)

    def test_year_must_be_supplied_for_month_to_work(self):
        with self.assertRaisesRegex(ValueError, 'year'):
            book = Book()
            book.publication_date = (None, 1, 1)

    def test_month_must_be_supplied_for_day_to_work(self):
        with self.assertRaisesRegex(ValueError, 'month'):
            book = Book()
            book.publication_date = (2008, None, 1)

    def test_invalid_date_raises_error(self):
        with self.assertRaisesRegex(ValueError, 'invalid'):
            book = Book()
            book.publication_date = (2008, 2, 31)

    def test_valid_date_does_not_raise_error(self):
        book = Book()
        book.publication_date = (2008, 2, 28)
        assert book.publication_date.year == 2008
        assert book.publication_date.month == 2
        assert book.publication_date.day == 28
