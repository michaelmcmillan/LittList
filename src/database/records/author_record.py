from peewee import CharField
from database.records.base_record import BaseRecord

class AuthorRecord(BaseRecord):
    name = CharField(null=True)
