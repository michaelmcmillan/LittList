class ReferenceNotInListError(Exception):
    pass

class ReferenceAlreadyInListError(Exception):
    pass

class ReferenceList:

    def __init__(self):
        self._references = {}

    def add(self, reference):
        if isinstance(reference, list):
            self.add_multiple(reference)
        else:
            self.add_single(reference)

    def remove(self, reference):
        if not self._reference_in_list(reference):
            raise ReferenceNotInListError()
        else:
            del self._references[reference]

    def add_single(self, reference):
        if self._reference_in_list(reference):
            raise ReferenceAlreadyInListError()
        else:
            self._references[reference] = reference

    def add_multiple(self, references):
        for reference in references:
            self.add(reference)

    def _reference_in_list(self, reference):
        return reference in self._references

    def __len__(self):
        return len(self._references)

    @property
    def references(self):
        return self._references
