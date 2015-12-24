import unittest
from unittest.mock import MagicMock
from bibliography.bibliography import Bibliography
from bibliography.reference_list import ReferenceAlreadyInListError, ReferenceNotInListError

class TestBibliography(unittest.TestCase):

    def test_is_empty_by_default(self):
        bibliography = Bibliography()
        assert len(bibliography) == 0

    def test_reference_can_be_added(self):
        bibliography = Bibliography()
        reference = MagicMock()
        bibliography.add(reference)
        assert len(bibliography) == 1

    def test_reference_can_be_removed(self):
        bibliography = Bibliography()
        reference = MagicMock()
        bibliography.add(reference)
        bibliography.remove(reference)
        assert len(bibliography) == 0

    def test_reference_can_not_be_added_more_than_once(self):
        bibliography = Bibliography()
        reference = MagicMock()
        bibliography.add(reference)
        with self.assertRaises(ReferenceAlreadyInListError):
            bibliography.add(reference)

    def test_removing_a_reference_that_is_not_added_raises_error(self):
        bibliography = Bibliography()
        reference = MagicMock()
        with self.assertRaises(ReferenceNotInListError):
            bibliography.remove(reference)

    def test_adding_multiple_references_at_once_works(self):
        bibliography = Bibliography()
        first_reference, second_reference = MagicMock(id=1), MagicMock(id=2)
        bibliography.add([first_reference, second_reference])
        assert len(bibliography) == 2
