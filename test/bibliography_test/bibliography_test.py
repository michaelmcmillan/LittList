import unittest
from unittest.mock import MagicMock
from bibliography import Bibliography
from bibliography import DuplicateReferenceAddedError, ReferenceNotInBibliographyError

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
        with self.assertRaises(DuplicateReferenceAddedError):
            bibliography.add(reference)

    def test_removing_a_reference_that_is_not_added_raises_error(self):
        bibliography = Bibliography()
        reference = MagicMock(id=1)
        with self.assertRaises(ReferenceNotInBibliographyError):
            bibliography.remove(reference)

    def test_adding_multiple_references_at_once_works(self):
        bibliography = Bibliography()
        first_reference, second_reference = MagicMock(id=1), MagicMock(id=2)
        bibliography.add([first_reference, second_reference])
        assert len(bibliography) == 2

    def test_two_bibliographies_are_equal_if_order_is_same(self):
        first_bibliography, second_bibliography = Bibliography(), Bibliography()
        first_book, second_book = MagicMock(), MagicMock()
        first_bibliography.add([first_book, second_book])
        second_bibliography.add([first_book, second_book])
        assert first_bibliography == second_bibliography 

    def test_two_bibliographies_are_inequal_if_order_is_not_same(self):
        first_bibliography, second_bibliography = Bibliography(), Bibliography()
        first_book, second_book = MagicMock(), MagicMock()
        first_bibliography.add([first_book, second_book])
        second_bibliography.add([second_book, first_book])
        assert first_bibliography != second_bibliography 

