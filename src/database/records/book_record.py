from peewee import *
from base_record import BaseModel

class BookRecord(BaseModel):
    reference = ForeignKeyField(ReferenceRecord, related_name='inherits')
    isbn = IntegerField(null=True)
    publisher = CharField(null=True)

