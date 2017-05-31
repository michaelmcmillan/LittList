from unittest import TestCase
from fixtures import load_fixture
from unittest.mock import MagicMock
from datetime import datetime
from library import Web, Author
from cache import Cache

class TestWebsite(TestCase):

    def setUp(self):
        Cache.flush()

    def test_returns_title(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.title, 'Slik blir Johaugs skjebnedøgn i Sveits')

    def test_returns_url_as_id(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.id, 'web:http://www.vg.no/a/24008092')

    def test_returns_url(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.url, 'http://www.vg.no/a/24008092')

    def test_returns_published_time(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092-og-published-time.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.published, datetime(2017, 5, 28))

    def test_returns_published_time_as_none_if_no_og_tag(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.published, None)

    def test_returns_author(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertIn(Author(family='Anders K. Christiansen', given=None), website.authors)

    def test_returns_site_name_if_open_graph_elements_exist(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.name, 'VG')

    def test_returns_site_name_as_none_if_open_graph_elements_dont_exist(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092-no-og.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.name, None)

    def test_returns_none_if_title_is_missing(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092-no-title.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/2408092-no-title')
        self.assertEqual(website.title, None)

class TestWebCache(TestCase):

    def setUp(self):
        Cache.flush()

    def test_does_not_hit_server_twice_for_same_query(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092-no-title.html')
        web = Web(http_client)
        web.read('http://vg.no/a/2408092')
        web.read('http://vg.no/a/2408092')
        self.assertEqual(http_client.get.call_count, 1)