from unittest import TestCase
from unittest.mock import MagicMock
from http_client import HTTPClient, URL

class TestURL(TestCase):

    def test_returns_http_if_http_is_protocol(self):
        url = URL('http://www.nb.no/services/search/v2/search')
        self.assertEqual(url.protocol, 'http://')
         
    def test_returns_https_if_https_is_protocol(self):
        url = URL('https://www.nb.no/services/search/v2/search')
        self.assertEqual(url.protocol, 'https://')

    def test_returns_www_dot_nb_dot_no_as_host(self):
        url = URL('https://www.nb.no/services/search/v2/search')
        self.assertEqual(url.host, 'www.nb.no')

    def test_returns_path(self):
        url = URL('https://www.nb.no/services/search/v2/search')
        self.assertEqual(url.path, '/services/search/v2/search')

    def test_it_escapes_query_parameters_in_url(self):
        url = URL('http://www.nb.no/services/search/v2/search', [('q', 'q=snømannen')])
        self.assertEqual(url.querystring, '?q=q%3Dsn%C3%B8mannen')

    def test_it_combines_all_url_components(self):
        url = URL('http://vg.no/article', [('id', 1)])
        self.assertEqual(str(url), 'http://vg.no/article?id=1')
