from unittest import TestCase
from unittest.mock import MagicMock
from library import Book, Website
from paywall import Customer, Paywall
from bibliography import Bibliography, BibliographyGenerator, BibliographyRepository

class TestGenerator:

    def setUp(self):
        self.paywall = MagicMock()
        self.library = MagicMock()
        self.repository = BibliographyRepository('./test/fixtures/bibliography/read')

    def test_returns_blurred_images_if_customer_has_not_paid(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        self.paywall.has_access.return_value = False
        output, formatted = generator.render_only_if_paid(Customer('95015843'), 1)
        self.assertEqual(output, 'blur')

    def test_returns_ids_with_blurred_images(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.paywall.has_access.return_value = False
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        output, formatted = generator.render(Customer('95015843'), 1)
        identifier, image = formatted[0]
        self.assertEqual(identifier, '1')

    def test_returns_formatted_bibliography_if_customer_has_paid(self):
        generator = BibliographyGenerator(self.library, self.paywall, self.repository)
        self.library.retrieve.return_value = Book(id=1, title='Snømannen')
        self.paywall.has_access.return_value = True
        output, formatted = generator.get_formatted_bibliography(Customer('95015843'), 1)
        self.assertEqual(output, 'bibliography')

class TestRenderOnlyIfPaid(TestCase):

    def test_returns_blurred_images_if_customer_has_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Book(id=1, title='Snømannen'), '<p>Snømannen</p>')]
        bibliography = generator.render_only_if_paid(paid, rendered_bibliography)
        self.assertFalse(all(blurred for blurred, reference, rendered in bibliography))

    def test_returns_unblurred_images_if_customer_has_paid(self):
        generator = BibliographyGenerator()
        paid = True 
        rendered_bibliography = [(Book(id=1, title='Snømannen'), '<p>Snømannen</p>')]
        bibliography = generator.render_only_if_paid(paid, rendered_bibliography)
        self.assertTrue(all(blurred for blurred, reference, rendered in bibliography))

class TestRenderOnlyBooks(TestCase):

    def test_returns_blurred_websites_if_customer_has_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Website(id=1, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_books(paid, rendered_bibliography)
        self.assertFalse(bibliography[0][0])

    def test_returns_unblurred_websites_if_customer_has_paid(self):
        generator = BibliographyGenerator()
        paid = True 
        rendered_bibliography = [(Website(id=1, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_books(paid, rendered_bibliography)
        self.assertTrue(bibliography[0][0])

    def test_returns_unblurred_books_if_customer_has_not_paid(self):
        generator = BibliographyGenerator()
        paid = False 
        rendered_bibliography = [(Book(id=1, title='Snømannen'), '<p>Snømannen</p>')]
        bibliography = generator.render_only_books(paid, rendered_bibliography)
        self.assertTrue(bibliography[0][0])

class TestRenderOnlyEvenIds(TestCase):

    def test_returns_blurred_reference_if_id_sums_to_even_and_customer_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Website(id=21, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_odd_ids(paid, rendered_bibliography)
        self.assertFalse(bibliography[0][0])

    def test_returns_unblurred_reference_if_id_is_missing_and_customer_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Website(id=None, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_odd_ids(paid, rendered_bibliography)
        self.assertTrue(bibliography[0][0])

    def test_returns_blurred_reference_if_id_is_string_and_customer_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Website(id='b', url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_odd_ids(paid, rendered_bibliography)
        self.assertTrue(bibliography[0][0])

    def test_returns_unblurred_reference_if_id_sums_to_odd_and_customer_not_paid(self):
        generator = BibliographyGenerator()
        paid = False
        rendered_bibliography = [(Website(id=1, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_odd_ids(paid, rendered_bibliography)
        self.assertFalse(bibliography[0][0])

    def test_returns_unblurred_reference_if_id_sums_to_even_and_customer_has_paid(self):
        generator = BibliographyGenerator()
        paid = True 
        rendered_bibliography = [(Website(id=1, url='VG.no'), '<p>vg.no</p>')]
        bibliography = generator.render_only_odd_ids(paid, rendered_bibliography)
        self.assertTrue(bibliography[0][0])
