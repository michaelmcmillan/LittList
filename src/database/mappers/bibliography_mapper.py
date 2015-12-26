from bibliography.bibliography import Bibliography
from database.mappers.book_mapper import BookMapper
from database.mappers.reference_mapper import ReferenceMapper
from database.records.bibliography_record import \
    BibliographyRecord, BibliographyReferenceRecord

class BibliographyMapper:

    @classmethod
    def to_records(cls, bibliography_model):
        bibliography_record = BibliographyRecord()
        bibliography_reference_records = []

        for reference in bibliography_model.references:
            reference_record = ReferenceMapper.to_record(reference)
            bibliography_reference_record = cls.relate(
                bibliography_record, reference_record
            )
            bibliography_reference_records.append(bibliography_reference_record)

        return {
            'bibliography': bibliography_record,
            'bibliography_references': bibliography_reference_records
        }

    @classmethod
    def to_model(cls, bibliography_record, book_records, website_records):
        bibliography_model = Bibliography()
        bibliography_model.id = bibliography_record.id
        book_models = [
            BookMapper.to_model(book_record.reference, book_record, []) \
            for book_record in book_records
        ]
        bibliography_model.add([book_models])
        return bibliography_model

    @classmethod
    def relate(cls, bibliography_record, reference_record):
        return BibliographyReferenceRecord(
            bibliography=bibliography_record,
            reference=reference_record
        )
