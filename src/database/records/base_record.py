from peewee import Model
from database.database import db
from database.records.reference_record import ReferenceRecord
from database.records.book_record import BookRecord

class BaseModel(Model):
    class Meta:
        database = db

def create_tables():
    db.create_tables([ReferenceRecord, BookRecord])
