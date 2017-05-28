from library import Library
from paywall import Paywall
from bibliography import BibliographyRepository, BibliographyGenerator

paywall = Paywall()
library = Library()
generator = BibliographyGenerator()
repository = BibliographyRepository('./data')
