from unittest.mock import MagicMock

def create_reference_model():
    return MagicMock(
        id=1,
        title='Reference title',
        authors=[],
        publication_date=MagicMock(
            year=2008,
            month=8,
            day=5
        )
    )
