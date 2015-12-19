import sqlite3
from os.path import dirname, abspath, join

class Database:

    connection = None
    location = join(dirname(abspath(__file__)), 'example.db')

    @staticmethod
    def connect():
        Database.connection = sqlite3.connect(Database.location)

    @staticmethod
    def commit():
        Database.connection.commit()

    @staticmethod
    def disconnect():
        Database.connection.close()

    @staticmethod
    def cursor():
        return Database.connection.cursor()
