from unittest import TestCase
#from .fixtures.bibliography_model import create_bibliography_model 
from .fixtures.book_record import create_book_record
from .fixtures.book_model import create_book_model
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
        bibliography.add(create_book_model())
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 1

    def test_bibliography_with_two_references_generates_two_relationships(self):
        bibliography = Bibliography()
        bibliography.add([create_book_model(), create_book_model()])
        records = BibliographyMapper.to_records(bibliography)
        assert len(records['bibliography_references']) == 2

    def test_bibliography_record_with_no_references_maps_to_empty_model(self):
        bibliography_record = BibliographyRecord()
        bibliography = BibliographyMapper.to_model(bibliography_record, [], [])
        assert len(bibliography.references) == 0

    def test_bibliography_record_with_book_record_maps_to_model_with_reference(self):
        bibliography_record = BibliographyRecord()
        book_records = [create_book_record()]
        bibliography = BibliographyMapper.to_model(bibliography_record, book_records, [])
        assert len(bibliography.references) == 1
