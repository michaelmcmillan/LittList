from unittest.mock import MagicMock

def create_book_model(id=2):
    return MagicMock(
        id=id,
        isbn='9783596302987',
        title='Book title',
        publisher='Aschehoug',
        publication_date=MagicMock(
            year=2001,
            month=9,
            day=20
        )
    )

