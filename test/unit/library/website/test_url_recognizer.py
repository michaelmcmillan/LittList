from unittest import TestCase
from library import URLRecognizer

class TestURLRecognizer(TestCase):

    def test_returns_true_if_proper_url(self):
        self.assertTrue(URLRecognizer.is_url('http://vg.no'))

    def test_returns_true_if_proper_https_url(self):
        self.assertTrue(URLRecognizer.is_url('https://vg.no'))

    def test_returns_true_if_www_starts_url(self):
        self.assertTrue(URLRecognizer.is_url('www.vg.no'))

    def test_returns_true_if_tld_and_slash(self):
        self.assertTrue(URLRecognizer.is_url('vg.no/a/1234'))

    def test_returns_true_if_com_tld_and_slash(self):
        self.assertTrue(URLRecognizer.is_url('vg.com/a/1234'))

    def test_returns_false_if_tld_but_no_slash(self):
        self.assertFalse(URLRecognizer.is_url('vg.no'))

    def test_returns_false_if_none_url(self):
        self.assertFalse(URLRecognizer.is_url(None))

    def test_returns_false_if_improper_url(self):
        self.assertFalse(URLRecognizer.is_url('ingvar ambjørnsen'))
