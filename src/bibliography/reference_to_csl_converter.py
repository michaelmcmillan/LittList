from library import Book, Website
from .book_to_csl_converter import BookToCSL
from .website_to_csl_converter import WebsiteToCSL

class ReferenceToCSL:

    @staticmethod
    def convert(reference):
        if isinstance(reference, Book):
            return BookToCSL.convert(reference)
        elif isinstance(reference, Website):
            return WebsiteToCSL.convert(reference)
