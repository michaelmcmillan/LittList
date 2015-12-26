from unittest import TestCase, skip
from unittest.mock import MagicMock
from .fixtures.author_model import create_author_model
from .fixtures.author_record import create_author_record
from database.mappers.author_mapper import AuthorMapper

class TestAuthorMapper(TestCase):

    def test_author_record_title_is_mapped_to_model(self):
        author_record = create_author_record()
        author_model = AuthorMapper.to_model(author_record)
        assert author_model.name == 'Ingvar Ambjørnsen'

    def test_author_record_id_is_mapped_to_model(self):
        author_record = create_author_record()
        author_model = AuthorMapper.to_model(author_record)
        assert author_model.id == 1

    def test_author_model_is_mapped_to_record(self):
        author_model = create_author_model()
        records = AuthorMapper.to_record(author_model)
        assert records['author'].name == 'Ingvar Ambjørnsen'
