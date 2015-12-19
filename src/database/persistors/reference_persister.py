from mappers.reference_mapper import ReferenceMapper

class ReferencePersister:

    @staticmethod
    def insert(reference):
        reference_record = ReferenceMapper.from_reference(reference)
        reference_record.save()
        return reference_record

    @staticmethod
    def select(reference_id):
        return ReferenceRecord.get(ReferenceRecord.id == reference_id)

