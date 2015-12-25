from database.records.reference_record import ReferenceRecord
from database.mappers.author_mapper import AuthorMapper
from reference.reference import Reference

class ReferenceMapper:

    @classmethod
    def to_model(cls, reference_record, author_records):
        reference_model = Reference()
        cls.add_attributes(
            reference_model,
            reference_record,
            author_records
        )
        return reference_model

    @classmethod
    def add_attributes(cls, reference_model, reference_record, author_records):
        reference_model.id = reference_record.id
        reference_model.title = reference_record.title
        reference_model.publication_date = (
            reference_record.publication_year,
            reference_record.publication_month,
            reference_record.publication_day
        )
        author_models = [AuthorMapper.to_model(author) \
            for author in author_records]
        reference_model.authors = author_models

    @classmethod
    def to_record(cls, reference_model):
        reference_record = ReferenceRecord()
        reference_record.id = reference_model.id
        return reference_record
