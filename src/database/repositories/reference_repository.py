from database.persistors.reference_persister import ReferencePersister
from database.mappers.reference_mapper import ReferenceMapper

class ReferenceRepository:

    @staticmethod
    def create(reference):
        record = ReferencePersister.insert(reference)
        reference = ReferenceMapper.from_record(record)
        return reference

    @staticmethod
    def read(reference_id):
        record = ReferencePersister.select(reference_id)
        reference = ReferenceMapper.from_record(record)
        return reference

