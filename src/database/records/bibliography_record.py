from datetime import datetime
from peewee import DateTimeField, ForeignKeyField
from database.records.base_record import BaseRecord
from database.records.reference_record import ReferenceRecord

class BibliographyRecord(BaseRecord):
    created_at = DateTimeField(default=datetime.now(), null=False)

class BibliographyReferenceRecord(BaseRecord):
    reference = ForeignKeyField(ReferenceRecord, related_name='reference')
    bibliography = ForeignKeyField(BibliographyRecord, \
        related_name='bibliography')
