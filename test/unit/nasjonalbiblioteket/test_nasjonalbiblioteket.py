from unittest import TestCase
from unittest.mock import MagicMock
from fixtures import load_fixture
from endnote import endnote_to_csl
from nasjonalbiblioteket import Nasjonalbiblioteket

class TestNBSearchResults(TestCase):

    def xtest_real_deal(self):
        from http_client import HTTPClient
        http_client = HTTPClient()
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        identifiers = nasjonalbiblioteket.search('sult')
        books = nasjonalbiblioteket.read_multiple(identifiers)
        for book in books:
            print("\n")
            for field in book:
                print(field, book[field])

            print(endnote_to_csl(book))

    def test_returns_zero_results_if_no_matches(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('nasjonalbiblioteket/no_results.xml')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        results = nasjonalbiblioteket.search('efwewefwef')
        self.assertEqual(results, [])

    def test_returns_one_result_if_one_match(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('nasjonalbiblioteket/one_result.xml')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        results = nasjonalbiblioteket.search('snømannen')
        self.assertEqual(results, ['83c36abdeb9a0303b51dbed56a2992d9'])

    def test_returns_ten_results_if_ten_matches(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('nasjonalbiblioteket/ten_results.xml')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        results = nasjonalbiblioteket.search('erlend loe')
        self.assertEqual(len(results), 10)

    def test_returns_zero_results_if_nasjonalbiblioteket_is_down(self):
        http_client = MagicMock()
        http_client.get.return_value = None
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        results = nasjonalbiblioteket.search('snømannen')
        self.assertEqual(results, [])

class TestNBRead(TestCase):

    def test_it_fetches_enw_data_for_the_id(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('nasjonalbiblioteket/snowman.enw')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        fields = nasjonalbiblioteket.read('83c36abdeb9a0303b51dbed56a2992d9')
        self.assertEqual(fields['T1'], 'Snømannen')

    def test_it_returns_no_fields_if_enw_could_not_be_fetched(self):
        http_client = MagicMock()
        http_client.get.return_value = None
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        fields = nasjonalbiblioteket.read('83c36abdeb9a0303b51dbed56a2992d9')
        self.assertEqual(fields, {})

    def test_it_concurrently_fetches_enw_data(self):
        http_client = MagicMock()
        http_client.get.side_effect = [load_fixture('nasjonalbiblioteket/snowman.enw')] * 10
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        identifiers = ['83c36abdeb9a0303b51dbed56a2992d9'] * 10
        nasjonalbiblioteket.read_multiple(identifiers)
        self.assertEqual(http_client.get.call_count, 10)

class TestNBLogging(TestCase):

    def test_it_logs_that_a_query_was_made(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('nasjonalbiblioteket/one_result.xml')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        with self.assertLogs('Nasjonalbiblioteket') as logger:
            nasjonalbiblioteket.search('snømannen')
            self.assertIn('INFO:Nasjonalbiblioteket:snømannen', logger.output)
