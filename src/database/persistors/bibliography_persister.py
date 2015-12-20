from database.database import db
from database.mappers.bibliography_mapper import BibliographyMapper
from database.records.bibliography_record import BibliographyRecord

class BibliographyPersister:

    @staticmethod
    def insert(bibliography_record):
        bibliography_record.save()
        return bibliography_record

    @staticmethod
    def select(bibliography_id):
        return BibliographyRecord.get(
            BibliographyRecord.id == bibliography_id
        )
