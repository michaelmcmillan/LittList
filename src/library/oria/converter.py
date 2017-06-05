from re import sub as substitute
from ..book import Book
from ..author import Author

class OriaConverter:

    @classmethod
    def convert(cls, fields):
        if not fields:
            return None
        book = Book()
        book.title = cls.extract_title(fields.get('TI', None))
        book.publisher_place = cls.extract_publisher_place(fields.get('CY', None))
        book.id = cls.generate_identifier(fields.get('ID', None))
        book.authors = cls.generate_authors(fields)
        publication_year = fields.get('Y1', None) or fields.get('PB', None)
        book.publication_year = cls.extract_year(publication_year)
        publisher = fields.get('PB', None)
        book.publisher = cls.extract_publisher(publisher, book.publication_year)
        return book

    @classmethod
    def generate_authors(cls, fields):
        author_fields = fields.get('A1', []) + fields.get('AU', [])
        author_fields = [field for field in author_fields \
            if field != fields.get('PB', None)]
        return list(map(cls.extract_author, author_fields))

    @staticmethod
    def generate_identifier(ID):
        return 'oria:%s' % ID if ID else None

    @staticmethod
    def extract_title(TI):
        return TI.replace(' :', ':') if TI else None

    @staticmethod
    def extract_publisher_place(CY):
        bracketed = CY and CY.startswith('[') and CY.endswith(']')
        return CY[1:-1] if bracketed else CY

    @classmethod
    def extract_publisher(cls, PB, publication_year):
        publisher, publication_year = PB, str(publication_year)
        if not publisher or publisher == publication_year:
            return None
        elif publisher.endswith(publication_year):
            publisher = PB.rstrip(publication_year)
        return publisher.strip().rstrip(',')

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
        except ValueError:
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
