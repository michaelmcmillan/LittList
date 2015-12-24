from bibliography.bibliography import Bibliography
from database.mappers.book_mapper import BookMapper
from database.mappers.reference_mapper import ReferenceMapper
from database.records.bibliography_record import BibliographyRecord, BibliographyReferenceRecord

class BibliographyMapper:
    """ 
    When creating a mapper for an object, 
    only think about what rows in what 
    tables *needs* to be created. Because
    those exact tables are what we return
    in records.

    Also, references need to exist in order
    to be added. Existence is determined by
    the id attribute.
    """
    @classmethod
    def to_records(self, bibliography_model):
        bibliography_record = BibliographyRecord()
        bibliography_reference_records = []

        for reference in bibliography_model.references:
            reference_record = ReferenceMapper.to_record(reference)
            bibliography_reference_record = self.relate(
                bibliography_record, reference_record 
            )
            bibliography_reference_records.append(bibliography_reference_record)

        return {
            'bibliography': bibliography_record,
            'bibliography_references': bibliography_reference_records 
        }

    """
    Think about what we records we depend on.
    These records need to be arguments in this method.
    Then the models needs to be constructed from the 
    records.
    """
    @classmethod
    def to_model(self, bibliography_record, book_records, website_records):
        bibliography_model = Bibliography()
        bibliography_model.id = bibliography_record.id
        book_models = [BookMapper.to_model(record) for record in book_records]
        bibliography_model.add([book_models])
        return bibliography_model

    @classmethod
    def relate(self, bibliography_record, reference_record):
        return BibliographyReferenceRecord(
            bibliography=bibliography_record,
            reference=reference_record
        )
