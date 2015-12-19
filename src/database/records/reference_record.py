from peewee import CharField, IntegerField
from database.records.base_record import BaseRecord

class ReferenceRecord(BaseRecord):
    title = CharField(null=True)
    publication_year = IntegerField(null=True)
    publication_month = IntegerField(null=True)
    publication_day = IntegerField(null=True)
