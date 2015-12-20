from peewee import DateTimeField
from datetime import datetime
from database.records.base_record import BaseRecord

class BibliographyRecord(BaseRecord):
    created_at = DateTimeField(default=datetime.now(), null=False)
