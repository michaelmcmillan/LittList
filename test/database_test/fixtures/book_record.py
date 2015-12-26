from unittest.mock import MagicMock
from .reference_record import create_reference_record

def create_book_record():
    return MagicMock(
        id=2,
        isbn='9783596302987',
        publisher='Aschehoug',
        reference=create_reference_record()
    )
