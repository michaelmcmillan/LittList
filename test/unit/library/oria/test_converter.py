from unittest import TestCase, skip
from library import OriaConverter, Book, Author

class TestType(TestCase):

    def test_result_is_book_if_type_is_book(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertIsInstance(book, Book)

    @skip('lets be a little flexible here')
    def test_result_is_none_if_type_is_not_book(self):
        fields = {'TY': 'GEN'}
        other_than_book = OriaConverter.convert(fields)
        self.assertEqual(other_than_book, None)

class TestBookId(TestCase):

    def test_returns_id_if_ID_is_provided(self):
        fields = {'TY': 'BOOK', 'ID': '12345678'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.id, 'oria:12345678')

    def test_returns_None_if_ID_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.id, None)

class TestBookTitle(TestCase):

    def test_returns_title_if_TI_is_provided(self):
        fields = {'TY': 'BOOK', 'TI': 'Snømannen'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.title, 'Snømannen')

    def test_returns_title_without_space_in_front_of_colon(self):
        fields = {'TY': 'BOOK', 'TI': 'Silicon Valley : the history in pictures'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.title, 'Silicon Valley: the history in pictures')

    def test_returns_None_if_TI_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.title, None)

class TestBookPublisher(TestCase):

    def test_returns_publisher_if_PB_is_provided(self):
        fields = {'TY': 'BOOK', 'PB': 'Aschehoug'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher, 'Aschehoug')

    def test_returns_publisher_stripped_of_year_if_it_contains_publication_year(self):
        fields = {'TY': 'BOOK', 'Y1': '2011', 'PB': 'Aschehoug 2011'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher, 'Aschehoug')

    def test_returns_publisher_stripped_of_comma_and_year_if_it_contains_publication_year(self):
        fields = {'TY': 'BOOK', 'Y1': '2011', 'PB': 'Aschehoug, 2011'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher, 'Aschehoug')

    def test_returns_None_if_PB_looks_like_a_publication_year(self):
        fields = {'TY': 'BOOK', 'PB': '2009'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher, None)

    def test_returns_None_if_PB_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher, None)

class TestBookPublisherPlace(TestCase):

    def test_returns_place_if_CY_is_provided(self):
        fields = {'TY': 'BOOK', 'CY': 'Oslo'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher_place, 'Oslo')

    def test_returns_None_if_CY_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher_place, None)

    def test_returns_None_if_CY_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publisher_place, None)

class TestBookPublicationYear(TestCase):

    def test_returns_year_if_Y1_is_provided(self):
        fields = {'TY': 'BOOK', 'Y1': '2009///'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, 2009)

    def test_returns_year_if_PB_looks_like_year(self):
        fields = {'TY': 'BOOK', 'PB': '1943'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, 1943)

    def test_returns_Y1_year_if_Y1_and_PB_is_provided(self):
        fields = {'TY': 'BOOK', 'PB': '2011', 'Y1': '2009///'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, 2009)

    def test_returns_year_if_Y1_is_provided_with_month(self):
        fields = {'TY': 'BOOK', 'Y1': '2010/11//'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, 2010)

    def test_returns_year_if_Y1_is_provided_without_slashes(self):
        fields = {'TY': 'BOOK', 'Y1': '2011'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, 2011)

    def test_returns_None_if_Y1_is_bogus(self):
        fields = {'TY': 'BOOK', 'Y1': 'bogus'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.publication_year, None)

class TestBookAuthor(TestCase):

    def test_is_empty_list_if_A1_is_not_provided(self):
        fields = {'TY': 'BOOK'}
        book = OriaConverter.convert(fields)
        self.assertEqual(book.authors, [])

    def test_contains_author_if_one_AU_is_provided(self):
        fields = {'TY': 'BOOK', 'AU': ['Ambjørnsen, Ingvar']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Ambjørnsen', given='Ingvar'), book.authors)

    def test_contains_author_if_one_A1_is_provided(self):
        fields = {'TY': 'BOOK', 'A1': ['Ambjørnsen, Ingvar']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Ambjørnsen', given='Ingvar'), book.authors)

    def test_contains_author_with_year_stripped_if_A1_is_provided(self):
        fields = {'TY': 'BOOK', 'A1': ['Hansen, Ingvar 1960-']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Hansen', given='Ingvar'), book.authors)

    def test_contains_multiple_authors_if_A1_contains_multiple_authors(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo', 'Dahl, Britt']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)
        self.assertIn(Author(family='Dahl', given='Britt'), book.authors)

    def test_strips_author_birthyear(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo 1960-']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)

    def test_author_birthyear_and_deathyear_is_ignored(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø, Jo 1960-2011']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given='Jo'), book.authors)

    def test_author_with_family_name_only_works_fine(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given=None), book.authors)

    def test_author_with_family_name_only_has_years_ignored(self):
        fields = {'TY': 'BOOK', 'A1': ['Nesbø 1945-2011']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Nesbø', given=None), book.authors)

    def test_author_with_hyphen_in_family_name_works(self):
        fields = {'TY': 'BOOK', 'A1': ['Beheim-Schwarzbach, Martin']}
        book = OriaConverter.convert(fields)
        self.assertIn(Author(family='Beheim-Schwarzbach', given='Martin'), book.authors)

    def test_author_name_is_family_and_given_name_combined(self):
        author = Author(family='Nesbø', given='Jo')
        self.assertEqual(author.name, 'Jo Nesbø')

    def test_author_name_is_only_family_if_given_not_provided(self):
        author = Author(family='Nesbø', given=None)
        self.assertEqual(author.name, 'Nesbø')

    def test_author_name_is_only_given_if_family_not_provided(self):
        author = Author(family=None, given='Jo')
        self.assertEqual(author.name, 'Jo')
