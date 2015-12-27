from unittest.mock import MagicMock

def create_author_record():
    author_record = MagicMock()
    author_record.id = 1
    author_record.name = 'Ingvar Ambjørnsen'
    return author_record
