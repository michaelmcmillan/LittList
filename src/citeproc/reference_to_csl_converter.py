from library import Book, Website

class ReferenceToCSL:

    @classmethod
    def convert(cls, reference):
        if isinstance(reference, Book):
            return cls.convert_book(reference)
        elif isinstance(reference, Website):
            return cls.convert_website(reference)

    @classmethod
    def convert_book(cls, book):
        csl = {}
        csl['id'] = book.id
        csl['type'] = 'book'
        csl['title'] = book.title
        csl['issued'] = {'raw': str(book.publication_year) if book.publication_year else None}
        csl['author'] = [author.__dict__ for author in book.authors]
        csl['publisher'] = book.publisher if book.publisher else False
        csl['publisher-place'] = book.publisher_place if book.publisher_place else False
        return csl

    @classmethod
    def convert_website(cls, website):
        csl = {}
        csl['id'] = website.id or False
        csl['URL'] = website.url or False
        csl['type'] = 'webpage'
        csl['title'] = website.title or False
        csl['author'] = [author.__dict__ for author in website.authors]
        csl['issued'] = {'raw': website.publication_date.strftime('%Y-%m-%d') \
            if website.publication_date else None}
        csl['accessed'] = {'raw': website.accessed_date.strftime('%Y-%m-%d')}
        return csl
