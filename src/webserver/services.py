from library import Library
from paywall import Paywall, Notifier
from configuration import Configuration
from bibliography import BibliographyRepository, BibliographyGenerator

paywall = Paywall()
library = Library()

notifier = Notifier
notifier.enabled = True

generator = BibliographyGenerator(paywall=paywall)
repository = BibliographyRepository(Configuration.data_path)
