from book.book import Book

class BookMapper:

    # Should partly delegate to ReferenceMapper
    @classmethod
    def to_model(self, book_record):
        book_model = Book()
        book_model.id = book_record.id
        return book_model

