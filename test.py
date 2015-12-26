from src.book.book import Book
from src.database.repositories.book_repository import BookRepository

book = Book()
book.title = 'Lolert'
book.isbn = '979-10-90636-07-1'

stored_book = BookRepository.create(book)

read_book = BookRepository.read(stored_book.id)
print(read_book)
print(read_book.title)
print(read_book.isbn)
