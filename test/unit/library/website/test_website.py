from unittest import TestCase
from fixtures import load_fixture
from unittest.mock import MagicMock
from library import Web, Author

class TestWebsite(TestCase):

    def test_returns_title(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.title, 'Slik blir Johaugs skjebnedøgn i Sveits')

    def test_returns_url(self):
        http_client = MagicMock()
        http_client.get.return_value = load_fixture('web/vg-2408092.html')
        web = Web(http_client)
        website = web.read('http://www.vg.no/a/24008092')
        self.assertEqual(website.url, 'http://www.vg.no/a/24008092')

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
