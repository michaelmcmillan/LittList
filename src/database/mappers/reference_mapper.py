from reference.reference import Reference
from database.records.reference_record import ReferenceRecord

class ReferenceMapper:

    @staticmethod
    def from_record(record):
        reference = Reference()
        reference.id = record.id
        reference.title = record.title
        reference.publication_date = (
            record.publication_year,
            record.publication_month,
            record.publication_day
        )
        return reference

    @staticmethod
    def from_reference(reference):
        record = ReferenceRecord()
        record.title = reference.title
        record.publication_year = reference.publication_date.year
        record.publication_month = reference.publication_date.month
        record.publication_day = reference.publication_date.day
        return record
