from peewee import ForeignKeyField, CharField, IntegerField
from database.records.base_record import BaseRecord
from database.records.bibliography_record import BibliographyRecord
from database.records.reference_record import ReferenceRecord

class ReferenceInBibliographyRecord(BaseRecord):
    bibliography = ForeignKeyField(BibliographyRecord, related_name='contains')
    reference = ForeignKeyField(ReferenceRecord, related_name='references')
