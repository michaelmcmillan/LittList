from unittest import TestCase
from .fixtures.author_model import create_author_model
from .fixtures.reference_model import create_reference_model
from .fixtures.reference_record import create_reference_record
from .fixtures.author_record import create_author_record
from database.mappers.reference_mapper import ReferenceMapper

class TestReferenceMapper(TestCase):

    def test_reference_record_title_is_mapped_to_model(self):
        reference_record = create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.title == 'Reference title'

    def test_reference_record_id_is_mapped_to_model(self):
        reference_record = create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.id == 120

    def test_reference_record_publication_date_is_mapped_to_model(self):
        reference_record = create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.publication_date.year == 2008
        assert reference_model.publication_date.month == 5 
        assert reference_model.publication_date.day == 12 

    def test_reference_record_with_author_is_mapped_to_model_with_author(self):
        reference_record = create_reference_record()
        author_records = [create_author_record()]
        reference_model = ReferenceMapper.to_model(reference_record, author_records)
        assert len(reference_model.authors) == 1

    def test_reference_record_with_two_authors_is_mapped_to_model_with_two_authors(self):
        reference_record = create_reference_record()
        author_records = [create_author_record(), create_author_record()]
        reference_model = ReferenceMapper.to_model(reference_record, author_records)
        assert len(reference_model.authors) == 2

    def test_reference_model_without_authors_is_mapped_to_record_without_authors(self):
        reference_model = create_reference_model()
        records = ReferenceMapper.to_record(reference_model)
        assert len(records['authors']) == 0

    def test_reference_model_with_authors_is_mapped_to_record_with_authors(self):
        reference_model = create_reference_model()
        author_model = create_author_model()
        reference_model.authors = [author_model]
        records = ReferenceMapper.to_record(reference_model)
        assert len(records['authors']) == 1

    def test_reference_model_with_author_is_mapped_to_author_reference_record(self):
        reference_model = create_reference_model()
        author_model = create_author_model()
        reference_model.authors = [author_model]
        records = ReferenceMapper.to_record(reference_model)
        assert len(records['author_references']) == 1

    def test_reference_model_title_is_mapped_to_record(self):
        reference_model = create_reference_model()
        records = ReferenceMapper.to_record(reference_model)
        reference_record = records['reference']
        assert reference_record.title == 'Reference title'

    def test_reference_model_publication_date_is_mapped_to_record(self):
        reference_model = create_reference_model()
        records = ReferenceMapper.to_record(reference_model)
        reference_record = records['reference']
        assert reference_record.publication_year == 2008
        assert reference_record.publication_month == 8
        assert reference_record.publication_day == 5
