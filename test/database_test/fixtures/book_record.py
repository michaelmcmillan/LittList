from unittest.mock import MagicMock

def create_book_record():
    return MagicMock(
        id=2,
        isbn='9783596302987',
        title='Book title',
        publisher='Aschehoug',
        publication_year=2001,
        publication_month=9,
        publication_day=20
    )
