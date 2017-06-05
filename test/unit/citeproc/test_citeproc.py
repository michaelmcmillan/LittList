from json import loads
from unittest import TestCase
from citeproc import Citeproc
from library import Book, Author

class TestCiteproc(TestCase):

    def setUp(self):
        self.book = Book()
        self.book.id = '1'
        self.book.title = 'Title'
        self.book.publisher = 'Publisher'
        self.book.publication_year = 2008
        self.book.publication_place = 'Place'

        self.other_book = Book()
        self.other_book.id = '2'
        self.other_book.title = 'Title'
        self.other_book.publisher = 'Publisher'
        self.other_book.publication_year = 2008
        self.other_book.publication_place = 'Place'

    def test_bibliography_is_correctly_rendered_with_one_book(self):
        citeproc = Citeproc()
        formatted_bibliography = citeproc.render([self.book], 'apa', 'norwegian-bokmål')
        expected_bibliography = [
            (self.book, '  <div class="csl-entry"><i>Title</i>. (2008). Publisher.</div>\n')
        ]
        self.assertEqual(formatted_bibliography, expected_bibliography)

    def test_bibliography_is_correctly_rendered_with_two_journals(self):
        citeproc = Citeproc()
        formatted_bibliography = citeproc.render([self.book, self.other_book], 'harvard', 'norwegian-bokmål')
        expected_bibliography = [
            (self.book, '  <div class="csl-entry"><i>Title</i> (2008a). Publisher.</div>\n'),
            (self.other_book, '  <div class="csl-entry"><i>Title</i> (2008b). Publisher.</div>\n')
        ]
        self.assertEqual(formatted_bibliography, expected_bibliography)
