from unittest import TestCase, skip
from fixtures import load_fixture
from datetime import datetime
from library import Author
from library.web import SNL

class TestSNLURL(TestCase):

    def test_it_transforms_the_url_by_appending_dot_json(self):
        api_url = SNL('https://snl.no/Norge').get_api_url()
        self.assertEqual(api_url, 'https://snl.no/Norge.json')

    def test_it_does_not_transform_the_url_if_it_ends_in_dot_json(self):
        api_url = SNL('https://snl.no/Norge.json').get_api_url()
        self.assertEqual(api_url, 'https://snl.no/Norge.json')

class TestSNLHandler(TestCase):

    def test_returns_title(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertEqual(website.title, 'Norge')

    def test_returns_other_title(self):
        json = load_fixture('web/snl-sverige.json')
        website = SNL('https://snl.no/Sverige').parse(json)
        self.assertEqual(website.title, 'Sverige')

    def test_returns_url_as_id(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertEqual(website.id, 'web:https://snl.no/Norge')

    def test_returns_url(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertEqual(website.url, 'https://snl.no/Norge')

    def test_returns_published_time(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertEqual(website.publication_date, datetime(2009, 2, 14))

    def test_returns_authors(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertIn(Author(family='Sissel Røvik', given=None), website.authors)
        self.assertIn(Author(family='Geir Thorsnæs', given=None), website.authors)
        self.assertIn(Author(family='Nils Petter Thuesen', given=None), website.authors)

    def test_returns_SNL_as_site_name(self):
        json = load_fixture('web/snl-norge.json')
        website = SNL('https://snl.no/Norge').parse(json)
        self.assertEqual(website.name, 'Store Norske Leksikon')
