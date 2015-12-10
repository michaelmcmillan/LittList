from collections import OrderedDict

class ReferenceNotInBibliographyError(Exception):
    pass

class DuplicateReferenceAddedError(Exception):
    pass

class Bibliography:

    def __init__(self):
        self._references = OrderedDict()

    def add(self, reference):
        if isinstance(reference, list):
            self._add_multiple(reference)
        else:
            self._add_single(reference)

    def _add_single(self, reference):
        if self.reference_in_bibliography(reference):
            raise DuplicateReferenceAddedError()
        self._references[reference.id] = reference

    def _add_multiple(self, references):
        for reference in references:
            self.add(reference)

    def remove(self, reference):
        if not self.reference_in_bibliography(reference):
            raise ReferenceNotInBibliographyError()
        del self._references[reference.id]

    def reference_in_bibliography(self, reference):
        return reference.id in self._references

    def __eq__(self, other_bibliography):
        return other_bibliography._references == self._references

    def __len__(self):
        return len(self._references)
