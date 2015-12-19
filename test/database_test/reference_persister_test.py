from unittest.mock import MagicMock, patch
import unittest
from database.persistors.reference_persister import ReferencePersister

class TestReferencePersister(unittest.TestCase):

    @patch("database.persistors.reference_persister.ReferenceMapper")
    def test_persister_calls_save_on_record(self, mapper):
        reference = MagicMock()
        record = MagicMock()
        mapper.from_reference.return_value = record
        ReferencePersister.insert(reference)
        record.save.assert_called_once_with()

    @patch("database.persistors.reference_persister.ReferenceRecord")
    def test_persister_calls_get_on_record(self, reference_record):
        ReferencePersister.select(1)
        assert reference_record.get.called == True
