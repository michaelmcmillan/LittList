from unittest import TestCase, skip
from unittest.mock import MagicMock
from database.records.reference_record import ReferenceRecord
from database.mappers.reference_mapper import ReferenceMapper
from reference.reference import Reference

class TestReferenceMapper(TestCase):

    def create_reference_record(self):
        return MagicMock(
            id=120,
            title='Reference title',
            publication_year=2008,
            publication_month=5,
            publication_day=12
        )

    def test_reference_record_title_is_mapped_to_model(self):
        reference_record = self.create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.title == 'Reference title'

    def test_reference_record_id_is_mapped_to_model(self):
        reference_record = self.create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.id == 120

    def test_reference_record_publication_date_is_mapped_to_model(self):
        reference_record = self.create_reference_record()
        reference_model = ReferenceMapper.to_model(reference_record, [])
        assert reference_model.publication_date.year == 2008
        assert reference_model.publication_date.month == 5 
        assert reference_model.publication_date.day == 12 

    def test_reference_record_with_author_is_mapped_to_model_with_author(self):
        reference_record = self.create_reference_record()
        author_records = [MagicMock()]
        reference_model = ReferenceMapper.to_model(reference_record, author_records)
        assert len(reference_model.authors) == 1

    def test_reference_record_with_two_authors_is_mapped_to_model_with_two_authors(self):
        reference_record = self.create_reference_record()
        author_records = [MagicMock(), MagicMock()]
        reference_model = ReferenceMapper.to_model(reference_record, author_records)
        assert len(reference_model.authors) == 2

    @skip('')
    def test_bibliography_with_one_reference_does_generate_relationship(self):
        bibliography = Bibliography()
        bibliography.add(MagicMock())
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 1

    @skip('')
    def test_bibliography_with_two_references_generates_two_relationships(self):
        bibliography = Bibliography()
        bibliography.add([MagicMock(), MagicMock()])
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 2

    @skip('')
    def test_bibliography_record_with_no_references_maps_to_empty_model(self):
        bibliography_record = BibliographyRecord()
        bibliography = BibliographyMapper.to_model(bibliography_record, [], [])
        assert len(bibliography.references) == 0

    @skip('')
    def test_bibliography_record_with_book_reference_maps_to_model_with_reference(self):
        bibliography_record = BibliographyRecord()
        book_records = [MagicMock(id=1)]
        bibliography = BibliographyMapper.to_model(bibliography_record, book_records, [])
        assert len(bibliography.references) == 1
