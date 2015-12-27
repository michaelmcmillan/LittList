from peewee import CharField, ForeignKeyField
from database.records.base_record import BaseRecord
from database.records.reference_record import ReferenceRecord

class AuthorRecord(BaseRecord):
    name = CharField(null=True)

class AuthorReferenceRecord(BaseRecord):
    reference = ForeignKeyField(ReferenceRecord, related_name='author')
    author = ForeignKeyField(AuthorRecord, related_name='reference')
