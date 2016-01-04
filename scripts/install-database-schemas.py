import sys
sys.path.append('../src')
from database.database import db
from database.records.book_record import BookRecord
from database.records.author_record import AuthorRecord
from database.records.author_record import AuthorReferenceRecord
from database.records.reference_record import ReferenceRecord
from database.records.bibliography_record import BibliographyRecord
from database.records.bibliography_record import BibliographyReferenceRecord


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
