from bibliography.bibliography import Bibliography
from database.records.bibliography_record import BibliographyRecord

class BibliographyMapper:

    @staticmethod
    def to_bibliography(bibliography_record, references):
        bibliography = Bibliography()
        bibliography.id = record.id
        bibliography.created_at = record.created_at
        bibliography.add(references)
        return bibliography

    @staticmethod
    def to_record(bibliography):
        record = BibliographyRecord()
        return record
