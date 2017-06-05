from unittest import TestCase, skip
from fixtures import load_fixture
from datetime import datetime
from library import Author
from library.web import NDLA

class TestNDLAHandler(TestCase):

    def test_returns_title(self):
        html = load_fixture('web/ndla-60409.html')
        website = NDLA('http://ndla.no/nb/node/60409?fag=7').parse(html)
        self.assertEqual(website.title, 'Fjellet')

    def test_returns_other_title(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertEqual(website.title, 'Føre var – bærekraftig utvikling')

    def test_returns_url_as_id(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertEqual(website.id, 'web:http://ndla.no/nb/node/11045?fag=7')

    def test_returns_url(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertEqual(website.url, 'http://ndla.no/nb/node/11045?fag=7')

    def test_returns_published_time(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertEqual(website.publication_date, datetime(2010, 10, 13))

    def test_returns_authors(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertIn(Author(family='Bjørg Rindal', given=None), website.authors)
        self.assertIn(Author(family='Kristin Bøhle', given=None), website.authors)
        self.assertIn(Author(family='Svein Gunnar Råen', given=None), website.authors)

    def test_returns_NDLA_as_site_name(self):
        html = load_fixture('web/ndla-11045.html')
        website = NDLA('http://ndla.no/nb/node/11045?fag=7').parse(html)
        self.assertEqual(website.name, 'Nasjonal digital læringsarena')
