class ReferenceInBibliographyRepository:

    @staticmethod
    def create(bibliography_record, references):
        bibliography_record = BibliographyMapper.to_record(bibliography)
        stored_bibliography_record = BibliographyPersister.insert(record)
        bibliography = BibliographyMapper.to_bibliography(stored_bibliography_record, references)
        return bibliography

    @staticmethod
    def read(bibliography_id):
        record = BibliographyPersister.select(bibliography_id)

        #references = BibliographyRecord.select().join(
        #    ReferenceInBibliographyRecord, on=ReferenceInBibliographyRecord.reference,
        #).where(ReferenceInBibliographyRecord.bibliography == record)
        #print("contains: ", len(references))

        bibliography = BibliographyMapper.from_record(record)
        return bibliography
