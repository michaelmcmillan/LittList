from blur import Blur
from paywall import User, Paywall
from library import Library, Book, BookToCSL
from .citeproc import Citeproc
from .repository import BibliographyRepository

class BibliographyGenerator:

    def __init__(self, library=None, paywall=None, repository=None):
        self.citeproc = Citeproc()
        self.library = library or Library()
        self.paywall = paywall or Paywall()
        self.repository = repository or BibliographyRepository()

    def get_formatted_bibliography(self, user, bibliography_id):
        bibliography = self.repository.read(user.phone_number, bibliography_id)
        references = [self.library.retrieve(reference) for reference in bibliography if reference]
        csl = [BookToCSL.convert(reference) for reference in references]
        formatted_bibliography = self.citeproc.render(csl)
        if self.paywall.has_access(user):
            return ('bibliography', formatted_bibliography)
        else:
            blurred = [(reference, Blur(formatted).render_base64()) \
                    for reference, formatted in formatted_bibliography]
            return ('blur', blurred)
