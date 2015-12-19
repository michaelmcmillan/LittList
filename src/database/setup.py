from database import Database
from repositories.reference_repository import ReferenceRepository
from repositories.publication_date_repository import PublicationDateRepository

Database.connect()
repositories = [ReferenceRepository(), PublicationDateRepository()]
for repository in repositories:
    repository.tear_down(Database.cursor())
    repository.setup(Database.cursor())
Database.disconnect()
