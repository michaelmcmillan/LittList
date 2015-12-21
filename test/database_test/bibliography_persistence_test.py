import unittest
from database.database import db
from database.repositories.bibliography_repository import BibliographyRepository
from database.repositories.reference_repository import ReferenceRepository 
from database.records.bibliography_record import BibliographyRecord, BibliographyReferenceRecord
from database.records.reference_record import ReferenceRecord
from bibliography.bibliography import Bibliography
from reference.reference import Reference

class TestBibliographyPersistence(unittest.TestCase):

    def create_bibliography(self):
        bibliography = Bibliography()
        reference = self.create_reference()
        return bibliography 

    def create_reference(self):
        reference = Reference()
        reference.title = 'Reference in bibliography'
        return reference

    def drop_table(self):
        try:
            db.drop_table(BibliographyRecord)
            db.drop_table(ReferenceRecord)
            db.drop_table(BibliographyReferenceRecord)
        except Exception:
            pass 

    def setUp(self):
        db.connect()
        self.drop_table()
        db.create_tables([ReferenceRecord, BibliographyRecord, BibliographyReferenceRecord])

    def tearDown(self):
        self.drop_table()

    def test_inserting_bibliography_stores_a_row_in_bibliographyreferencerecord_table(self):
        reference = self.create_reference() 
        stored_reference = ReferenceRepository.create(reference)
        bibliography = self.create_bibliography()
        bibliography.add(stored_reference)
        BibliographyRepository.create(bibliography)
        row = db.execute_sql('select * from bibliographyreferencerecord').fetchone()
        assert row

    def test_reading_bibliography_returns_a_bibliography_model_from_the_database(self):
        first_reference, second_reference = self.create_reference(), self.create_reference() 
        bibliography = self.create_bibliography()
        first_stored_reference = ReferenceRepository.create(first_reference)
        second_stored_reference = ReferenceRepository.create(second_reference)
        bibliography.add([first_stored_reference, second_stored_reference])
        stored_bibliography = BibliographyRepository.create(bibliography)
        bibliography = BibliographyRepository.read(stored_bibliography.id)
        self.assertEqual(len(bibliography.references), 2)
