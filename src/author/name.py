class Name:

    def __init__(self, name=None):
        self._name = name if self.is_valid(name) else None

    def is_valid(self, name):
        if name is None:
            return True
        elif name == '':
            raise ValueError('Name can not be empty.')
        else:
            return True

    @property
    def text(self):
        return self._name.strip()
