from unittest import TestCase
from fixtures import load_fixture
from blur import Blur

class TestBlur(TestCase):
    
    def test_same_texts_generates_identical_images(self):
        first_image = Blur('Mary had a little lamb.').generate_image()
        second_image = Blur('Mary had a little lamb.').generate_image()
        self.assertEqual(first_image.getvalue(), second_image.getvalue())

    def test_different_texts_generates_different_images(self):
        first_image = Blur('Mary had a little lamb.').generate_image()
        second_image = Blur('Tom had a little lamb.').generate_image()
        self.assertNotEqual(first_image.getvalue(), second_image.getvalue())
