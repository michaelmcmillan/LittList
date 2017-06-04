from unittest import TestCase, skip
from unittest.mock import MagicMock
from fixtures import load_fixture
from library import Oria
from cache import Cache

class TestOriaSearchResults(TestCase):

    def test_returns_zero_results_if_no_matches(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/no_results.html')
        oria = Oria(http_client)
        results = oria.search('efwewefwef')
        self.assertEqual(results, [])

    def test_returns_one_result_if_one_match(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/one_result.html')
        oria = Oria(http_client)
        results = oria.search('71466426580002201')
        self.assertEqual(results, ['BIBSYS_ILS71466426580002201'])

    def test_returns_nine_results_if_nine_bibsys_matches(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/ten_results.html')
        oria = Oria(http_client)
        results = oria.search('ingvar ambjørnsen')
        self.assertEqual(len(results), 9)

    def test_returns_zero_results_if_oria_is_down(self):
        http_client = MagicMock()
        http_client.get.return_value = None
        oria = Oria(http_client)
        results = oria.search('snømannen')
        self.assertEqual(results, [])

class TestOriaCache(TestCase):

    def setUp(self):
        Cache.flush()

    def test_does_not_hit_server_twice_for_same_query(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/one_result.html')
        oria = Oria(http_client)
        oria.search('ambjørnsen')
        oria.search('ambjørnsen')
        self.assertEqual(http_client.get.call_count, 1)

    def test_does_hit_server_twice_if_first_read_failed(self):
        http_client = MagicMock()
        http_client.get.side_effect = [None, load_fixture('oria/one_result.html')]
        oria = Oria(http_client)
        oria.search('ambjørnsen')
        oria.search('ambjørnsen')
        self.assertEqual(http_client.get.call_count, 2)

    def test_does_not_hit_server_twice_for_same_identifier(self):
        http_client = MagicMock()
        http_client.post.return_value = load_fixture('oria/ambjørnsen.enw')
        oria = Oria(http_client)
        oria.read('BIBSYS_ILS71466426580002201')
        oria.read('BIBSYS_ILS71466426580002201')
        self.assertEqual(http_client.post.call_count, 1)

    def test_does_hit_server_twice_if_first_search_failed(self):
        http_client = MagicMock()
        http_client.post.side_effect = [None, load_fixture('oria/ambjørnsen.enw')]
        oria = Oria(http_client)
        oria.read('BIBSYS_ILS71466426580002201')
        oria.read('BIBSYS_ILS71466426580002201')
        self.assertEqual(http_client.post.call_count, 2)

class TestOriaRead(TestCase):

    def setUp(self):
        Cache.flush()

    def test_it_fetches_enw_data_for_the_id(self):
        http_client = MagicMock()
        http_client.post.return_value = load_fixture('oria/ambjørnsen.enw')
        oria = Oria(http_client)
        book = oria.read('BIBSYS_ILS71466426580002201')
        self.assertEqual(book.title, 'Ingvar Ambjørnsen: et forfatterhefte')

    def test_it_returns_no_fields_if_enw_could_not_be_fetched(self):
        http_client = MagicMock()
        http_client.post.return_value = None
        oria = Oria(http_client)
        book = oria.read('BIBSYS_ILS71466426580002201')
        self.assertEqual(book, None)

    def test_it_concurrently_fetches_enw_data(self):
        http_client = MagicMock()
        http_client.post.side_effect = [load_fixture('oria/ambjørnsen.enw')] * 10
        oria = Oria(http_client)
        identifiers = ['BIBSYS_ILS71466426580002201'] * 10
        results = oria.read_multiple(identifiers)
        self.assertEqual(len(results), 10)

class TestOriaLogging(TestCase):

    def test_it_logs_that_a_query_was_made(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/one_result.html')
        oria = Oria(http_client)
        with self.assertLogs('Oria') as logger:
            oria.search('ambjørnsen')
            self.assertIn('INFO:Oria:ambjørnsen', logger.output)
