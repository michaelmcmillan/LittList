from unittest import TestCase, skip
from datetime import datetime
from fixtures import load_fixture
from library import Author
from library.web import General

class TestGeneralHandler(TestCase):

    def test_returns_title(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.title, 'Slik blir Johaugs skjebnedøgn i Sveits')

    def test_returns_url_as_id(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.id, 'web:http://www.vg.no/a/24008092')

    def test_returns_url(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.url, 'http://www.vg.no/a/24008092')

    def test_returns_published_time(self):
        html = load_fixture('web/vg-2408092-og-published-time.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.publication_date, datetime(2017, 5, 28))

    def test_returns_published_time_as_none_if_no_og_tag(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.publication_date, None)

    def test_returns_author(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertIn(Author(family='Anders K. Christiansen', given=None), website.authors)

    def test_returns_site_name_if_open_graph_elements_exist(self):
        html = load_fixture('web/vg-2408092.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.name, 'VG')

    def test_returns_site_name_as_none_if_open_graph_elements_dont_exist(self):
        html = load_fixture('web/vg-2408092-no-og.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.name, None)

    def test_returns_none_if_title_is_missing(self):
        html = load_fixture('web/vg-2408092-no-title.html')
        website = General('http://www.vg.no/a/24008092').parse(html)
        self.assertEqual(website.title, None)
