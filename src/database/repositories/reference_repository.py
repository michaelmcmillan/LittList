from reference.reference import Reference
from database.records.reference_record import ReferenceRecord

class ReferenceRepository:

    @staticmethod
    def create(reference_model):
        reference_record = ReferenceRepository.model_to_record(reference_model)
        reference_record.save()
        reference_model = ReferenceRepository.record_to_model(reference_record)
        return reference_model

    @staticmethod
    def read(reference_id):
        reference_record = ReferenceRecord.get(
            ReferenceRecord.id == reference_id
        )
        reference_model = ReferenceRepository.record_to_model(reference_record)
        return reference_model

    @staticmethod
    def model_to_record(reference_model):
        reference_record = ReferenceRecord()
        if hasattr(reference_model, 'id'):
            reference_record.id = reference_model.id
        reference_record.title = reference_model.title
        reference_record.publication_year = \
            reference_model.publication_date.year
        reference_record.publication_month = \
            reference_model.publication_date.month
        reference_record.publication_day = \
            reference_model.publication_date.day
        return reference_record

    @staticmethod
    def record_to_model(reference_record):
        reference_model = Reference()
        reference_model.id = reference_record.id
        reference_model.title = reference_record.title
        reference_model.publication_date = (
            reference_record.publication_year,
            reference_record.publication_month,
            reference_record.publication_day
        )
        return reference_model
