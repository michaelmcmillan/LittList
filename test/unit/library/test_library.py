from unittest import TestCase
from fixtures import load_fixture
from unittest.mock import MagicMock
from library import Library

class TestLibrarySearch(TestCase):

    def test_returns_empty_list_if_sources_found_nothing(self):
        oria = MagicMock(name='Oria')
        oria.search.return_value = []
        oria.read_multiple.return_value = []
        library = Library(sources={'Oria': oria})
        results = library.search('ingvar')
        self.assertEqual(results, [])

    def test_returns_oria_result_if_oria_found_match(self):
        result = {'TI': 'Ambjørnsen'}
        oria = MagicMock()
        oria.search.return_value = ['1']
        oria.read_multiple.return_value = [result]
        library = Library(sources={'Oria': oria})
        results = library.search('ingvar')
        self.assertIn(('Oria', result), results)

    def test_returns_results_from_multiple_sources(self):
        first_result = {'TI': 'Ambjørnsen'}
        second_result = {'TI': 'Haraldsen'}
        nb, oria = MagicMock(name='NB'), MagicMock(name='Oria')
        nb.search.return_value = ['x1']
        oria.search.return_value = ['y1']
        nb.read_multiple.return_value = [first_result]
        oria.read_multiple.return_value = [second_result]
        library = Library(sources={'Oria': oria, 'NB': nb})
        results = library.search('ingvar')
        self.assertIn(('NB', first_result), results)
        self.assertIn(('Oria', second_result), results)

    def xtest_the_real_deal(self):
        library = Library()
        results = library.search('ingvar ambjørnsen')
