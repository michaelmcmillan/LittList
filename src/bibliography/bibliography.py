class Bibliography:

    def __init__(self, references=None, previous_bibliography_id=None):
        self.references = references or set()
        self.previous_bibliography_id = previous_bibliography_id

    def __iter__(self):
        return iter(self.references)

    def __contains__(self, reference):
        return reference in self.references

    def __eq__(self, other_bibliography):
        return self.references == other_bibliography.references
