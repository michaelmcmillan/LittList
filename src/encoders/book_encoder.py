from json import JSONEncoder

class PublicationDateToDateParts:

    @staticmethod
    def convert(date):
        if date.year and not date.month:
            return [[date.year]]
        elif date.year and date.month and not date.day:
            return [[date.year], [date.month]]
        elif date.year and date.month and date.day:
            return [[date.year], [date.month], [date.day]]
        else:
            return None

class BookEncoder(JSONEncoder):

    def default(self, book):
        values = {}
        self.extract_title(values, book)
        self.extract_type(values, book)
        self.extract_publisher(values, book)
        self.extract_issued(values, book)
        return values

    def extract_type(self, values, book):
        values['type'] = 'book'

    def extract_title(self, values, book):
        if book.title:
            values['title'] = book.title

    def extract_publisher(self, values, book):
        if book.publisher:
            values['publisher'] = book.publisher

    def extract_issued(self, values, book):
        parts = self.extract_date_parts(book.publication_date)
        if parts:
            values['issued'] = {'date-parts': parts}

    def extract_date_parts(self, publication_date):
        return PublicationDateToDateParts.convert(publication_date)
