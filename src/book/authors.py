class Authors:

    def __init__(self, authors=None):
        self._authors = authors or []

    def add(self, author):
        if isinstance(author, list):
            self._add_multiple(author)
        else:
            self._add_single(author)

    def _add_single(self, author):
        if author in self._authors:
            raise ValueError('Author already added.')
        self._authors.append(author)

    def _add_multiple(self, authors):
        for author in authors:
            self.add(author)

    def __len__(self):
        return len(self._authors)
