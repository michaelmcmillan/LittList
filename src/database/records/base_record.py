from peewee import Model
from database.database import db

class BaseModel(Model):
    class Meta:
        database = db
