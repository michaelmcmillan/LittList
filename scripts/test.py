from src.author.author import Author
from src.book.book import Book
from src.database.repositories.book_repository import BookRepository

ingvar = Author()
ingvar.name = 'Ingvar Ambjørnsen'

tore = Author()
tore.name = 'Dickie'

book = Book()
book.title = 'Lolert'
book.isbn = '979-10-90636-07-1'
book.authors = [ingvar, tore]

stored_book = BookRepository.create(book)
read_book = BookRepository.read(stored_book.id)
print(read_book.authors[0].name)

print(read_book.title)
print(read_book.isbn)
