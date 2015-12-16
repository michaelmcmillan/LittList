import unittest
from unittest.mock import MagicMock
from bibliography.formatter import Formatter

class TestFormatter(unittest.TestCase):

    @unittest.skip('')
    def test_renders_empty_string_on_bibliography_without_references(self):
        empty_bibliography = MagicMock(references=[])
        output = Formatter().format(empty_bibliography)
        assert output == ''
