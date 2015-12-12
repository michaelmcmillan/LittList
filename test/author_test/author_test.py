import unittest
from author import Author

class TestAuthor(unittest.TestCase):

    def test_first_name_gets_stripped_of_trailing_space(self):
        author = Author()
        author.first_name = 'Jo  '
        assert author.first_name == 'Jo'

    def test_last_name_gets_stripped_of_trailing_space(self):
        author = Author()
        author.last_name = 'Nesbø '
        assert author.last_name == 'Nesbø'
