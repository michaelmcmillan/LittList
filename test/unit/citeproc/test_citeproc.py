from json import loads
from unittest import TestCase
from fixtures import load_fixture
from citeproc import Citeproc

class TestCiteproc(TestCase):

    def test_bibliography_is_correctly_rendered_with_one_journal(self):
        citeproc = Citeproc()
        asimow = loads(load_fixture('bibliography/asimow.json'))
        formatted_bibliography = citeproc.render([asimow])
        expected_bibliography = \
            [('2656243/WJUV5TCE',
            '  <div class="csl-entry">' \
            + 'Asimow, M. (1995–1996) «When Lawyers Were Heroes Symposium: ' \
            + 'Picturing Justice: Images of Law and Lawyers in the Visual ' \
            + 'Media: Essay», <i>University of San Francisco Law Review</i>, ' \
            + '30, s. 1131–1138.</div>\n')]
        self.assertEqual(formatted_bibliography, expected_bibliography)

    def test_bibliography_is_correctly_rendered_with_two_journals(self):
        citeproc = Citeproc()
        asimow = loads(load_fixture('bibliography/asimow.json'))
        abrams = loads(load_fixture('bibliography/abrams.json'))
        formatted_bibliography = citeproc.render([asimow, abrams])
        first_entry = ('2656243/G7B3GE28', \
            '  <div class="csl-entry">' \
            + 'Abrams, D. E. (2013) «The Little League Champions Benched by ' \
            + 'Jim Crow in 1955: Resistance and Reform after Brown v. Board ' \
            + 'of Education», <i>Journal of Supreme Court History</i>, 38(1), s. ' \
            + '51–62. doi: 10.1111/j.1540-5818.2013.12003.x.</div>\n')
        second_entry = ('2656243/WJUV5TCE', \
            '  <div class="csl-entry">' \
            + 'Asimow, M. (1995–1996) «When Lawyers Were Heroes Symposium: ' \
            + 'Picturing Justice: Images of Law and Lawyers in the Visual ' \
            + 'Media: Essay», <i>University of San Francisco Law Review</i>, ' \
            + '30, s. 1131–1138.</div>\n')
        self.assertEqual(formatted_bibliography, [first_entry, second_entry])
