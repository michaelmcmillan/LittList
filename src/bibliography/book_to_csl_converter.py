class BookToCSL:

    @classmethod
    def convert(cls, book):
        csl = {}
        csl['id'] = book.id
        csl['type'] = 'book'
        csl['title'] = book.title
        csl['issued'] = {'raw': str(book.publication_year) if book.publication_year else None}
        csl['author'] = [author.__dict__ for author in book.authors]
        csl['publisher'] = book.publisher if book.publisher else False
        csl['publisher-place'] = book.publisher_place if book.publisher_place else False
        return csl
