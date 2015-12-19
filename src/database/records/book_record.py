from peewee import ForeignKeyField, IntegerField, CharField
from database.records.reference_record import ReferenceRecord
from database.records.base_record import BaseModel

class BookRecord(BaseModel):
    reference = ForeignKeyField(ReferenceRecord, related_name='inherits')
    isbn = IntegerField(null=True)
    publisher = CharField(null=True)

