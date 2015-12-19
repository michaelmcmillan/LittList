from unittest.mock import MagicMock, patch
import unittest
from reference.reference import Reference
from database.repositories.reference_repository import ReferenceRepository
from database.records.reference_record import ReferenceRecord

class TestReferenceRepository(unittest.TestCase):

    @unittest.mock.patch("database.repositories.reference_repository.ReferenceMapper")
    @unittest.mock.patch("database.repositories.reference_repository.ReferencePersister")
    def test_repository_delegates_to_persistor_on_create(self, persister, mapper):
        reference = MagicMock()
        ReferenceRepository.create(reference)
        persister.insert.assert_called_with(reference)

    @unittest.mock.patch("database.repositories.reference_repository.ReferenceMapper")
    @unittest.mock.patch("database.repositories.reference_repository.ReferencePersister")
    def test_repository_delegates_to_persistor_on_read(self, persister, mapper):
        ReferenceRepository.read(1)
        persister.select.assert_called_with(1)
