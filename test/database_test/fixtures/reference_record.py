from unittest.mock import MagicMock

def create_reference_record():
    return MagicMock(
        id=120,
        title='Reference title',
        publication_year=2008,
        publication_month=5,
        publication_day=12
    )
