from unittest import TestCase
from library import Book, Author
from citeproc import ReferenceToCSL

class TestType(TestCase):

    def test_type_is_converted(self):
        book = Book()
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['type'], 'book')

class TestTitle(TestCase):

    def test_title_is_converted(self):
        book = Book(title='Snømannen')
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['title'], 'Snømannen')

class TestSerial(TestCase):

    def test_id_is_converted(self):
        book = Book(id='oria:990932349374702202')
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['id'], 'oria:990932349374702202')

class TestPublicationYear(TestCase):

    def test_publication_year_is_converted(self):
        book = Book()
        book.publication_year = 2009
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['issued'], {'raw': '2009'})

    def test_publication_year_is_not_converted_if_missing(self):
        book = Book()
        book.publication_year = None
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['issued'], {'raw': None})

class TestPublisher(TestCase):

    def test_publisher_is_converted(self):
        book = Book()
        book.publisher = 'Aschehoug'
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['publisher'], 'Aschehoug')

    def test_publisher_is_not_converted_if_missing(self):
        book = Book()
        book.publisher = None
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['publisher'], False)

class TestPublisherPlace(TestCase):

    def test_publisher_place_is_converted(self):
        book = Book()
        book.publisher_place = 'Oslo'
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['publisher-place'], 'Oslo')

    def test_publisher_place_is_not_converted_if_missing(self):
        book = Book()
        book.publisher_place = None
        csl = ReferenceToCSL.convert(book)
        self.assertEqual(csl['publisher-place'], False)

class TestAuthor(TestCase):

    def test_single_author_is_converted(self):
        book = Book()
        book.authors = [Author(given='Jo', family='Nesbø')]
        csl = ReferenceToCSL.convert(book)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': 'Jo'})

    def test_author_with_family_name_only_works_fine(self):
        book = Book()
        book.authors = [Author(given='Jo', family=None)]
        csl = ReferenceToCSL.convert(book)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': None, 'given': 'Jo'})
