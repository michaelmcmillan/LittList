from unittest import TestCase, skip
from library import Web

class TestDetermineHandler(TestCase):

    def test_it_returns_general_and_original_url(self):
        web = Web()
        handler = web.get_handler('https://vg.no/a/24008092')
        self.assertEqual(handler, web.handlers['general'])

    def test_it_returns_general_and_original_url_for_url_that_looks_like_snl(self):
        web = Web()
        handler = web.get_handler('https://vg.no/a/24008092?ref=snl.no')
        self.assertEqual(handler, web.handlers['general'])
