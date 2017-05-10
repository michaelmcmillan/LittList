from unittest import TestCase, skip
from library import NasjonalbiblioteketConverter, Book, Author

class TestType(TestCase):

    def test_result_is_book_if_type_is_book(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIsInstance(book, Book)

    def test_result_is_none_if_type_is_not_book(self):
        fields = {'TY': 'GEN'}
        other_than_book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(other_than_book, None)

class TestBookTitle(TestCase):

    def test_returns_title_if_T1_is_provided(self):
        fields = {'TY': 'BOOK', 'T1': 'Snømannen'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.title, 'Snømannen')

    def test_returns_None_if_T1_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.title, None)

class TestBookPublisher(TestCase):

    def test_returns_publisher_if_T1_is_provided(self):
        fields = {'TY': 'BOOK', 'PB': 'Aschehoug'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publisher, 'Aschehoug')

    def test_returns_None_if_T1_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publisher, None)

class TestBookPublisherPlace(TestCase):

    def test_returns_place_if_CY_is_provided(self):
        fields = {'TY': 'BOOK', 'CY': 'Oslo'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publisher_place, 'Oslo')

    def test_returns_None_if_CY_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publisher_place, None)

    def test_returns_None_if_CY_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publisher_place, None)

class TestBookPublicationYear(TestCase):

    def test_returns_year_if_Y1_is_provided(self):
        fields = {'TY': 'BOOK', 'Y1': '2009///'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publication_year, 2009)

    def test_returns_year_if_Y1_is_provided_with_month(self):
        fields = {'TY': 'BOOK', 'Y1': '2010/11//'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publication_year, 2010)

    def test_returns_year_if_Y1_is_provided_without_slashes(self):
        fields = {'TY': 'BOOK', 'Y1': '2011'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publication_year, 2011)

    def test_returns_None_if_Y1_is_bogus(self):
        fields = {'TY': 'BOOK', 'Y1': 'bogus'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.publication_year, None)

class TestBookAuthor(TestCase):

    def test_is_empty_list_if_A1_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertEqual(book.authors, [])

    def test_contains_author_if_one_A1_is_provided(self):
        fields = {'TY': 'BOOK', 'A1': ['Ambjørnsen, Ingvar']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Ambjørnsen', given='Ingvar'), book.authors)

    def test_contains_author_with_year_stripped_if_A1_is_provided(self):
        fields = {'TY': 'BOOK', 'A1': ['Hansen, Ingvar 1960-']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Hansen', given='Ingvar'), book.authors)

    def test_contains_multiple_authors_if_A1_contains_multiple_authors(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo', 'Dahl, Britt']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)
        self.assertIn(Author(family='Dahl', given='Britt'), book.authors)

    def test_strips_author_birthyear(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo 1960-']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)

    def test_author_birthyear_and_deathyear_is_ignored(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo 1960-2011']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)

    def test_author_with_family_name_only_works_fine(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given=None), book.authors)

    def test_author_with_family_name_only_has_years_ignored(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø 1945-2011']}
        book = NasjonalbiblioteketConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given=None), book.authors)
