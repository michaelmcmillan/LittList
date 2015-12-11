from reference_list import ReferenceList

class Bibliography:

    def __init__(self):
        self._references = ReferenceList()

    def add(self, reference):
        if isinstance(reference, list):
            self._references.add_multiple(reference)
        else:
            self._references.add(reference)

    def remove(self, reference):
        self._references.remove(reference)

    def __len__(self):
        return len(self._references)

    @property
    def references(self):
        return self._references
