from blur import Blur
from paywall import Paywall
from library import Library, Book
from .citeproc import Citeproc
from .repository import BibliographyRepository
from .reference_to_csl_converter import ReferenceToCSL

class BibliographyGenerator:

    def __init__(self, library=None, paywall=None, repository=None):
        self.citeproc = Citeproc()
        self.library = library or Library()
        self.paywall = paywall or Paywall()
        self.repository = repository or BibliographyRepository()

    def render(self, customer, bibliography_id):
        bibliography = self.repository.read(bibliography_id)
        references = [self.library.retrieve(reference) for reference in bibliography if reference]
        csl = [ReferenceToCSL.convert(reference) for reference in references]
        formatted_bibliography = self.citeproc.render(csl)
        if self.paywall.has_access(customer):
            return ('bibliography', formatted_bibliography)
        else:
            return ('blur', [(identifier, Blur(entry).render_base64()) \
                for identifier, entry in formatted_bibliography])
