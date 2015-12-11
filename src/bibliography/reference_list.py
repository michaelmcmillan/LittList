from collections import OrderedDict

class ReferenceNotInListError(Exception):
    pass

class ReferenceAlreadyInListError(Exception):
    pass

class ReferenceList:

    def __init__(self):
        self._references = OrderedDict()

    @property
    def references(self):
        return self._references

    def add(self, reference):
        if self._reference_in_list(reference):
            raise ReferenceAlreadyInListError()
        else:
            self._references[reference.id] = reference

    def add_multiple(self, references):
        for reference in references:
            self.add(reference)

    def remove(self, reference):
        if not self._reference_in_list(reference):
            raise ReferenceNotInListError()
        else:
            del self._references[reference.id]

    def _reference_in_list(self, reference):
        return reference.id in self._references

    def __len__(self):
        return len(self._references)

    def __eq__(self, other_reference_list):
        return other_reference_list.references == self.references
