from unittest import TestCase
from datetime import datetime
from library import Website, Author
from bibliography import WebsiteToCSL

class TestType(TestCase):

    def test_type_is_converted(self):
        website = Website()
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['type'], 'webpage')

class TestTitle(TestCase):

    def test_title_is_converted(self):
        website = Website()
        website.title = 'Snømannen'
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['title'], 'Snømannen')

class TestSerial(TestCase):

    def test_id_is_converted(self):
        website = Website()
        website.url = 'http://vg.no'
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['id'], 'http://vg.no')

class TestAccessedDate(TestCase):

    def test_todays_date_is_converted_to_accessed(self):
        website = Website()
        website.accessed_date = datetime(2009, 1, 2)
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['accessed'], {'raw': '2009-01-02'})

class TestPublicationDate(TestCase):

    def test_publication_date_is_converted_to_issued(self):
        website = Website()
        website.publication_date = datetime(2009, 1, 2)
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['issued'], {'raw': '2009-01-02'})

    def test_publication_date_is_not_converted_if_missing(self):
        website = Website()
        website.publication_date = None
        csl = WebsiteToCSL.convert(website)
        self.assertEqual(csl['issued'], {'raw': None})

class TestAuthor(TestCase):

    def test_single_author_is_converted(self):
        website = Website()
        website.authors = [Author(given='Jo', family='Nesbø')]
        csl = WebsiteToCSL.convert(website)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': 'Jo'})

    def test_author_with_family_name_only_works_fine(self):
        website = Website()
        website.authors = [Author(given='Jo', family=None)]
        csl = WebsiteToCSL.convert(website)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': None, 'given': 'Jo'})
