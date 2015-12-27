from database.records.author_record import AuthorRecord
from database.mappers.author_mapper import AuthorMapper

class AuthorRepository:

    @classmethod
    def create(cls, author_model):
        records = AuthorMapper.to_record(author_model)
        author_record = records['author']
        author_record.save()
        return author_record

    @classmethod
    def read(cls, author_id):
        author_record = AuthorRecord.get(AuthorRecord.id == author_id)
        author_model = AuthorMapper.to_model(author_record)
        return author_model
