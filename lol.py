from bibliography.bibliography import Bibliography
from reference.reference import Reference 
from src.database.repositories.bibliography_repository import BibliographyRepository

reference = Reference()
reference.id = 1
reference.title = "Wee, I am saved to a bibliography!"

bibliography = Bibliography()
bibliography.add(reference)

stored_bibliography = BibliographyRepository.create(bibliography)

