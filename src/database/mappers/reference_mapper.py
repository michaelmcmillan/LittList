from database.records.author_record import AuthorReferenceRecord
from database.records.reference_record import ReferenceRecord
from database.mappers.author_mapper import AuthorMapper
from reference.reference import Reference

class ReferenceMapper:

    @classmethod
    def to_model(cls, reference_record, author_records):
        reference_model = Reference()
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

        return reference_model

    @classmethod
    def to_record(cls, reference_model):
        reference_record = ReferenceRecord()
        reference_record.title = reference_model.title
        publication_date = reference_model.publication_date
        reference_record.publication_year = publication_date.year
        reference_record.publication_month = publication_date.month
        reference_record.publication_day = publication_date.day

        author_records = [AuthorMapper.to_record(author)['author'] \
            for author in reference_model.authors]

        author_reference_records = [cls.relate(reference_record, author_record)\
            for author_record in author_records]

        return {
            'authors': author_records,
            'reference': reference_record,
            'author_references': author_reference_records
        }

    @classmethod
    def relate(cls, reference_record, author_record):
        return AuthorReferenceRecord(
            author=author_record,
            reference=reference_record
        )
