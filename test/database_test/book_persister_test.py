from unittest.mock import MagicMock, patch
import unittest
from database.persistors.book_persister import BookPersister

class TestBookPersister(unittest.TestCase):

    @unittest.mock.patch("database.persistors.book_persister.BookMapper")
    @unittest.mock.patch("database.persistors.book_persister.ReferencePersister")
    def test_persister_delegates_to_reference_persister_on_insert(self, reference_persister, mapper):
        book = MagicMock()
        BookPersister.insert(book)
        reference_persister.insert.assert_called_with(book)

    @unittest.mock.patch("database.persistors.book_persister.ReferencePersister")
    def test_persister_delegates_to_reference_persistor_on_select(self, persister):
        BookPersister.select(1)
        persister.select.assert_called_with(1)
