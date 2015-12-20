import unittest
from database.database import db
from database.repositories.reference_repository import ReferenceRepository
from database.records.reference_record import ReferenceRecord
from reference.reference import Reference

class TestReferencePersistence(unittest.TestCase):

    def create_reference(self):
        reference = Reference()
        reference.title = 'Reference title'
        reference.publication_date = (2011, 5, 8)
        return reference 
    
    def drop_table(self):
        try:
            db.drop_table(ReferenceRecord)
        except Exception:
            pass 

    def setUp(self):
        db.connect()
        self.drop_table()
        db.create_tables([ReferenceRecord])

    def tearDown(self):
        self.drop_table()

    def test_inserting_reference_stores_a_row_in_referencerecord_table(self):
        reference = self.create_reference()
        ReferenceRepository.create(reference)
        row = db.execute_sql('select * from referencerecord').fetchone()
        assert 'Reference title' in row
        assert 2011 in row
        assert 5 in row
        assert 8 in row

    def test_reading_reference_returns_a_reference_model_from_the_database(self):
        stored_reference = ReferenceRepository.create(self.create_reference())
        reference = ReferenceRepository.read(stored_reference.id)
        assert reference.title == 'Reference title' 
        assert reference.publication_date.year == 2011
        assert reference.publication_date.month == 5
        assert reference.publication_date.day == 8
