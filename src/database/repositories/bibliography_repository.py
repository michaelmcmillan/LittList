from bibliography.bibliography import Bibliography
from database.records.bibliography_record import BibliographyRecord
from database.records.bibliography_record import BibliographyReferenceRecord
from database.records.reference_record import ReferenceRecord
from database.repositories.reference_repository import ReferenceRepository

class BibliographyRepository:

    @staticmethod
    def create(bibliography_model):
        bibliography_record = BibliographyRepository.model_to_record(
            bibliography_model
        )
        bibliography_record.save()
        BibliographyRepository.create_bibliography_reference(
            bibliography_model, bibliography_record
        )
        bibliography_model = BibliographyRepository.record_to_model(
            bibliography_record
        )
        return bibliography_model

    @staticmethod
    def create_bibliography_reference(bibliography_model, bibliography_record):
        for reference_model in bibliography_model.references:
            reference_record = ReferenceRepository.model_to_record(
                reference_model
            )
            BibliographyReferenceRecord.create(
                reference=reference_record,
                bibliography=bibliography_record
            )

    @staticmethod
    def read(bibliography_id):
        bibliography_reference_record = (BibliographyReferenceRecord.select()
        .join(BibliographyRecord, on=(
            BibliographyReferenceRecord.bibliography == BibliographyRecord.id)
        )
        .join(ReferenceRecord, on=(
            BibliographyReferenceRecord.reference == ReferenceRecord.id)
        )
        .where(BibliographyReferenceRecord.bibliography == bibliography_id))

        bibliography_record = bibliography_reference_record.get().bibliography
        reference_records = [bibliography.reference \
            for bibliography in bibliography_reference_record]
        bibliography_model = BibliographyRepository.record_to_model(
            bibliography_record, reference_records
        )
        return bibliography_model

    @staticmethod
    def model_to_record(bibliography_model):
        bibliography_record = BibliographyRecord()
        return bibliography_record

    @staticmethod
    def record_to_model(bibliography_record, reference_records=None):
        bibliography_model = Bibliography()
        bibliography_model.id = bibliography_record.id
        if reference_records is not None:
            for reference_record in reference_records:
                reference_model = ReferenceRepository.record_to_model(
                    reference_record
                )
                bibliography_model.add(reference_model)
        return bibliography_model
