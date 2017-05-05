from unittest import TestCase
from bibliography import EndNoteToCSL

class TestType(TestCase):

    def test_type_is_converted(self):
        endnote = {'TY': 'BOOK'}
        csl = EndNoteToCSL.convert(endnote)
        self.assertEqual(csl['type'], 'book')

class TestTitle(TestCase):

    def test_title_is_converted(self):
        endnote = {'T1': 'Snømannen'}
        csl = EndNoteToCSL.convert(endnote)
        self.assertEqual(csl['title'], 'Snømannen')

class TestId(TestCase):

    def test_id_is_converted(self):
        endnote = {'ID': '990932349374702202'}
        csl = EndNoteToCSL.convert(endnote)
        self.assertEqual(csl['id'], '990932349374702202')

class TestPublicationYear(TestCase):

    def test_publication_year_is_converted(self):
        endnote = {'Y1': '2009///'}
        csl = EndNoteToCSL.convert(endnote)
        self.assertEqual(csl['issued'], [{'date-parts': [2009]}])

class TestAuthor(TestCase):

    def test_single_author_is_converted(self):
        endnote = {'A1': ['Nesbø, Jo']}
        csl = EndNoteToCSL.convert(endnote)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': 'Jo'})

    def test_multiple_authors_are_converted(self):
        endnote = {'A1': ['Nesbø, Jo', 'Dahl, Britt']}
        csl = EndNoteToCSL.convert(endnote)
        second_author = csl['author'][1]
        self.assertEqual(second_author, {'family': 'Dahl', 'given': 'Britt'})

    def test_author_birthyear_is_ignored(self):
        endnote = {'A1': ['Nesbø, Jo 1960-']}
        csl = EndNoteToCSL.convert(endnote)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': 'Jo'})

    def test_author_birthyear_and_deathyear_is_ignored(self):
        endnote = {'A1': ['Nesbø, Jo 1960-2011']}
        csl = EndNoteToCSL.convert(endnote)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': 'Jo'})

    def test_author_with_family_name_only_works_fine(self):
        endnote = {'A1': ['Nesbø']}
        csl = EndNoteToCSL.convert(endnote)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': None})

    def test_author_with_family_name_only_has_years_ignored(self):
        endnote = {'A1': ['Nesbø 2001-2002']}
        csl = EndNoteToCSL.convert(endnote)
        first_author = csl['author'][0]
        self.assertEqual(first_author, {'family': 'Nesbø', 'given': None})
