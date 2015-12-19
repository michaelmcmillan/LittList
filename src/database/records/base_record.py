from peewee import *
from database import db

class BaseModel(Model):
    pass
    class Meta:
        database = db

def create_tables():
    db.create_tables([ReferenceRecord, BookRecord])
