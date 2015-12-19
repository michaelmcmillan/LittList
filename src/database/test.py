from book.book import Book
from database.repositories.book_repository import BookRepository

book = Book()
book.title = "Wow, nice pattern"
book.publication_date = (2014, 1, 1)
book.publisher = "Aschehoug"
stored_book = BookRepository.create(book)

print(stored_book.publisher)
