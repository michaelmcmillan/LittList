from unittest import TestCase
from unittest.mock import MagicMock
from io import BytesIO
from library import Book
from paywall import User, Paywall
from bibliography import BibliographyGenerator, BibliographyRepository

class TestGenerator(TestCase):

    def setUp(self):
        self.paywall = MagicMock()
        self.library = MagicMock()
        self.repository = BibliographyRepository('./test/fixtures/bibliography/read')

    def test_returns_blurred_images_if_customer_has_not_paid(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        self.paywall.has_access.return_value = False
        output, formatted = generator.get_formatted_bibliography(User('95015843'), 1)
        self.assertEqual(output, 'blur')

    def test_returns_ids_with_blurred_images(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.paywall.has_access.return_value = False
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        output, formatted = generator.get_formatted_bibliography(User('95015843'), 1)
        identifier, image = formatted[0]
        self.assertEqual(identifier, '1')

    def test_returns_formatted_bibliography_if_customer_has_paid(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        self.paywall.has_access.return_value = True
        output, formatted = generator.get_formatted_bibliography(User('95015843'), 1)
        self.assertEqual(output, 'bibliography')
