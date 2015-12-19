from src.database.database import db
from src.database.records.book_record import BookRecord
from src.database.records.reference_record import ReferenceRecord

db.create_tables([BookRecord, ReferenceRecord])
