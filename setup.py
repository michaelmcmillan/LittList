from src.database.database import db
from src.database.records.book_record import BookRecord
from src.database.records.reference_record import ReferenceRecord
from src.database.records.bibliography_record import BibliographyRecord
from src.database.records.reference_in_bibliography_record import ReferenceInBibliographyRecord

db.create_tables([
    BookRecord,
    ReferenceRecord,
    BibliographyRecord,
    ReferenceInBibliographyRecord
])
