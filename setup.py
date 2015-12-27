from src.database.database import db
from src.database.records.book_record import BookRecord
from src.database.records.author_record import AuthorRecord
from src.database.records.author_record import AuthorReferenceRecord
from src.database.records.reference_record import ReferenceRecord
from src.database.records.bibliography_record import BibliographyRecord
from src.database.records.bibliography_record import BibliographyReferenceRecord

def setup():
    db.create_tables([
        AuthorRecord,
        AuthorReferenceRecord,
        ReferenceRecord,
        BibliographyRecord,
        BookRecord,
        BibliographyReferenceRecord
    ])

def tear_down():
    db.drop_table(BookRecord)
    db.drop_table(AuthorRecord)
    db.drop_table(AuthorReferenceRecord)
    db.drop_table(ReferenceRecord)
    db.drop_table(BibliographyRecord)
    db.drop_table(BibliographyReferenceRecord)

tear_down()
setup()
