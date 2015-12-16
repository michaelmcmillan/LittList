import unittest
from author.author import Author

class TestAuthor(unittest.TestCase):

    def test_gets_stripped_of_trailing_space(self):
        author = Author()
        author.name = 'Jo  '
        assert author.name == 'Jo'

    def test_can_not_be_empty(self):
        author = Author()
        with self.assertRaisesRegex(ValueError, 'empty'):
            author.name = ''
