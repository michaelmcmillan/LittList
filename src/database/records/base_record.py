from peewee import Model
from database.database import db

class BaseRecord(Model):
    class Meta:
        database = db
