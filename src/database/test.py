from reference.reference import Reference
from book.book import Book
from repositories.reference_repository import ReferenceRepository

book = Book()
book.title = "Wow, nice pattern"
book.publication_date = (2014, 1, 1)
book.publisher = "Aschehoug"
stored_book = BookRepository.create(book)

print(stored_book.publisher)
