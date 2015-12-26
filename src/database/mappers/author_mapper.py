from author.author import Author
from database.records.author_record import AuthorRecord

class AuthorMapper:

    @classmethod
    def to_model(cls, author_record):
        author_model = Author()
        author_model.id = author_record.id
        author_model.name = author_record.name
        return author_model

    @classmethod
    def to_record(cls, author_model):
        author_record = AuthorRecord()
        author_record.name = author_model.name
        return {
            'author': author_record
        }
