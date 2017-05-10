from re import sub as substitute
from ..book import Book
from ..author import Author

class NasjonalbiblioteketConverter:

    @classmethod
    def convert(cls, fields):
        if fields.get('TY', None) != 'BOOK':
            return None

        book = Book()
        book.title = fields.get('T1', None)
        book.publisher = fields.get('PB', None)
        book.publisher_place = fields.get('CY', None)
        book.authors = list(map(cls.extract_author, fields.get('A1', [])))
        book.publication_year = cls.extract_year(fields.get('Y1', None))
        return book

    @staticmethod
    def extract_year(Y1):
        # Try to extract the publication year as a string
        try:
            assert Y1 
            year, month, date = Y1.split('/')[:3]
        except ValueError:
            year = Y1
        except AssertionError:
            return None

        # Try converting the potential year to an integer
        try:
            return int(year) 
        except:
            return None

    @staticmethod
    def remove_years_from_name(name):
        return substitute(r'\s\d*\-\d*$', '', name)

    @staticmethod
    def extract_year_from_published_year(published_year):
        return int(published_year.replace('///', ''))

    @classmethod
    def extract_author(cls, A1):
        try:
            family, given = A1.split(', ')
            given = cls.remove_years_from_name(given)
        except ValueError:
            family, given = A1, None
            family = cls.remove_years_from_name(family)
        return Author(given, family)
