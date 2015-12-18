from json import JSONEncoder

class PublicationDateToDateParts:

    @staticmethod
    def convert(date):
        if date.year and not date.month:
            return [[date.year]]
        elif date.year and date.month and not date.day:
            return [[date.year],[date.month]]
        elif date.year and date.month and date.day:
            return [[date.year],[date.month],[date.day]]
        else:
            return None

class BookEncoder(JSONEncoder):

    def default(self, book):
        values = {}
        values['title'] = self.extract_title(book)
        values['type'] = self.extract_type(book)
        values['publisher'] = self.extract_publisher(book)
        values['issued'] = self.extract_issued(book)
        return values

    def extract_type(self, book):
        return 'book'

    def extract_title(self, book):
        return book.title

    def extract_publisher(self, book):
        return book.publisher

    def extract_issued(self, book):
        parts = self.extract_date_parts(book.publication_date)
        return { 'date-parts': parts }

    def extract_date_parts(self, publication_date):
        return PublicationDateToDateParts.convert(publication_date)
