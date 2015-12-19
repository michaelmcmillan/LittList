from peewee import *
from .base_record import BaseModel

class ReferenceRecord(BaseModel):
    title = CharField(null=True)
    publication_year = IntegerField(null=True)
    publication_month = IntegerField(null=True)
    publication_day = IntegerField(null=True)
