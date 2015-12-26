from peewee import ForeignKeyField, CharField
from database.records.base_record import BaseRecord
from database.records.reference_record import ReferenceRecord

class BookRecord(BaseRecord):
    reference = ForeignKeyField(ReferenceRecord, related_name='book')
    isbn = CharField(null=True)
    publisher = CharField(null=True)
