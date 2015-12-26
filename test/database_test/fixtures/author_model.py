from unittest.mock import MagicMock

def create_author_model():
    author_model = MagicMock()
    author_model.id = 1
    author_model.name = 'Ingvar Ambjørnsen'
    return author_model
