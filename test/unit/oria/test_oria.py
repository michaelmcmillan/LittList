from unittest import TestCase, skip
from unittest.mock import MagicMock
from fixtures import load_fixture

from oria import Oria

class TestOriaSearchResults(TestCase):

    def xtest_real_deal(self):
        from http_client import HTTPClient
        http_client = HTTPClient()
        oria = Oria(http_client)
        identifiers = oria.search('ingvar ambjørnsen')
        print(identifiers)
        #books = nasjonalbiblioteket.read_multiple(identifiers)
        #for book in books:
        #    print("\n")
        #    for field in book:
        #        print(field, book[field])

        #    print(endnote_to_csl(book))

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

class TestOriaRead(TestCase):

    def test_it_fetches_enw_data_for_the_id(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('oria/ambjørnsen.enw')
        oria = Oria(http_client)
        fields = oria.read('BIBSYS_ILS71466426580002201')
        self.assertEqual(fields['T1'], 'Snømannen')

    @skip('')
    def test_it_returns_no_fields_if_enw_could_not_be_fetched(self):
        http_client = MagicMock()
        http_client.get.return_value = None
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        fields = nasjonalbiblioteket.read('83c36abdeb9a0303b51dbed56a2992d9')
        self.assertEqual(fields, {})

    @skip('')
    def test_it_concurrently_fetches_enw_data(self):
        http_client = MagicMock()
        http_client.get.side_effect = [load_fixture('snowman.enw')] * 10
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        identifiers = ['83c36abdeb9a0303b51dbed56a2992d9'] * 10
        nasjonalbiblioteket.read_multiple(identifiers)
        self.assertEqual(http_client.get.call_count, 10)

class TestNBLogging(TestCase):

    @skip('')
    def test_it_logs_that_a_query_was_made(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('one_result.xml')
        nasjonalbiblioteket = Nasjonalbiblioteket(http_client)
        with self.assertLogs('Nasjonalbiblioteket') as logger:
            nasjonalbiblioteket.search('snømannen')
            self.assertIn('INFO:Nasjonalbiblioteket:snømannen', logger.output)
