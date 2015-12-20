from peewee import ForeignKeyField, CharField
from database.records.reference_record import ReferenceRecord
from database.records.base_record import BaseRecord

class BookRecord(BaseRecord):
    reference = ForeignKeyField(ReferenceRecord, related_name='inherits')
    isbn = CharField(null=True)
    publisher = CharField(null=True)
