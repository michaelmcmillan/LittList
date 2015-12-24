from unittest import TestCase
from unittest.mock import MagicMock
from database.records.bibliography_record import BibliographyRecord
from database.mappers.bibliography_mapper import BibliographyMapper
from bibliography.bibliography import Bibliography

class TestBibliographyMapper(TestCase):

    def test_bibliography_with_no_references_does_not_generate_relationship(self):
        bibliography = Bibliography()
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 0

    def test_bibliography_with_one_reference_does_generate_relationship(self):
        bibliography = Bibliography()
        bibliography.add(MagicMock())
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 1

    def test_bibliography_with_two_references_generates_two_relationships(self):
        bibliography = Bibliography()
        bibliography.add([MagicMock(), MagicMock()])
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 2

    def test_bibliography_record_with_no_references_maps_to_empty_model(self):
        bibliography_record = BibliographyRecord()
        bibliography = BibliographyMapper.to_model(bibliography_record, [], [])
        assert len(bibliography.references) == 0

    def test_bibliography_record_with_book_reference_maps_to_model_with_reference(self):
        bibliography_record = BibliographyRecord()
        book_records = [MagicMock(id=1)]
        bibliography = BibliographyMapper.to_model(bibliography_record, book_records, [])
        assert len(bibliography.references) == 1
