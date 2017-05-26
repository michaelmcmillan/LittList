from unittest import TestCase
from fixtures import load_fixture
from library import Book
from blur import Blur

class TestBlur(TestCase):
    
    def xtest_same_texts_generates_identical_images(self):
        first_image = Blur('Mary had a little lamb.').render()
        second_image = Blur('Mary had a little lamb.').render()
        self.assertEqual(first_image.getvalue(), second_image.getvalue())

    def xtest_different_texts_generates_different_images(self):
        first_image = Blur('Mary had a little lamb.').render()
        second_image = Blur('Tom had a little lamb.').render()
        self.assertNotEqual(first_image.getvalue(), second_image.getvalue())

    def test_it_can_return_base64_encoded_images(self):
        image = Blur('Mary had a little lamb that she did not really care much for, the little stinking bitch face. Mary was in fact a real bitch bus donk.').render_base64()
        self.assertIsInstance(image, str)
