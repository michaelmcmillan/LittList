from blur import Blur
from paywall import Paywall
from citeproc import Citeproc
from library import Library, Book
from .repository import BibliographyRepository

class BibliographyGenerator:

    def __init__(self, library=None, paywall=None, repository=None):
        self.citeproc = Citeproc()
        self.library = library or Library()
        self.paywall = paywall or Paywall()
        self.repository = repository or BibliographyRepository()

    def render(self, customer, bibliography_id):
        customer_paid = self.paywall.has_access(customer)
        bibliography = self.repository.read(bibliography_id)
        references = [self.library.retrieve(reference) for reference in bibliography]
        rendered_bibliography = self.citeproc.render(references, bibliography.style, bibliography.language)
        return self.render_only_odd_ids(customer_paid, rendered_bibliography)

    def render_only_if_paid(self, paid, rendered_bibliography):
        '''Blurs all references if customer has not paid.'''
        if paid:
            return [(True, reference, rendered) \
                for reference, rendered in rendered_bibliography]
        else:
            return [(False, reference, Blur(rendered).render_base64()) \
                for reference, rendered in rendered_bibliography]

    def render_only_odd_ids(self, paid, rendered_bibliography):
        '''Blurs references if id chars sum to an odd number.'''
        sums_to_odd = lambda reference_id : not sum(map(ord, str(reference_id))) % 2
        if paid:
            return [(True, reference, rendered) \
                for reference, rendered in rendered_bibliography]
        else:
            return [(sums_to_odd(reference.id), reference, \
                    rendered if sums_to_odd(reference.id) else Blur(rendered).render_base64()) \
                for reference, rendered in rendered_bibliography]

    def render_only_books(self, paid, rendered_bibliography):
        '''Blurs website references if customer has not paid.'''
        if paid:
            return [(True, reference, rendered) \
                for reference, rendered in rendered_bibliography]
        else:
            return [(isinstance(reference, Book), reference, \
                    rendered if isinstance(reference, Book) else Blur(rendered).render_base64()) \
                for reference, rendered in rendered_bibliography]
