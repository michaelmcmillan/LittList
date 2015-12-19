from unittest.mock import MagicMock
import unittest
from reference.reference import Reference
from database.mappers.reference_mapper import ReferenceMapper
from database.records.reference_record import ReferenceRecord

mock_reference = MagicMock(
    title = 'Reference',
    publication_date = MagicMock(
        year = 2001,
        month = 1,
        day = 1
    )
)

mock_record = MagicMock(
    title = "Reference",
    publication_year = 2008,
    publication_month = 1,
    publication_day = 1
)

class TestReferenceMapper(unittest.TestCase):

    def test_returns_record_when_given_reference(self):
        reference = mock_reference
        record = ReferenceMapper.from_reference(reference)
        self.assertIsInstance(record, ReferenceRecord)

    def test_returns_reference_when_given_record(self):
        record = mock_record
        reference = ReferenceMapper.from_record(record)
        self.assertIsInstance(reference, Reference)

    def test_maps_properties_from_reference_to_record(self):
        reference = mock_reference
        record = ReferenceMapper.from_reference(reference)
        assert record.title == "Reference"

    def test_maps_properties_from_record_to_reference(self):
        reference = mock_reference
        record = ReferenceMapper.from_reference(reference)
        assert record.title == "Reference"
