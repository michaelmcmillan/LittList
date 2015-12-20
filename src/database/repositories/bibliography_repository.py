from database.persistors.bibliography_persister import BibliographyPersister
from database.mappers.bibliography_mapper import BibliographyMapper
from database.records.bibliography_record import BibliographyRecord
from database.repositories.reference_in_bibliography_repository import ReferenceInBibliographyRepository

class BibliographyRepository:

    @staticmethod
    def create(bibliography):
        bibliography_record = BibliographyMapper.to_record(bibliography)
        stored_bibliography_record = BibliographyPersister.insert(bibliography_record)
        references = ReferenceInBibliographyPersistor.create(
            stored_bibliography_record, bibliography.references
        )
        bibliography = BibliographyMapper.to_bibliography(stored_bibliography_record, references)
        return bibliography

    @staticmethod
    def read(bibliography_id):
        record = BibliographyPersister.select(bibliography_id)

        #references = BibliographyRecord.select().join(
        #    ReferenceInBibliographyRecord, on=ReferenceInBibliographyRecord.reference,
        #).where(ReferenceInBibliographyRecord.bibliography == record)
        #print("contains: ", len(references))

        bibliography = BibliographyMapper.from_record(record)
        return bibliography
