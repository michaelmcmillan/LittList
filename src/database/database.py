from peewee import *
from os.path import dirname, abspath, join

location = join(dirname(abspath(__file__)), 'example.db')
db = SqliteDatabase(location)
db.connect()
