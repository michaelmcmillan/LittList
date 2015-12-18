from html import escape

class Publisher:

    max_name_length = 256

    def __init__(self, name=None):
        self._name = name \
            if self.is_valid(name) else None

    def is_valid(self, name):
        if name == None:
            return True
        if name.isspace() or not name:
            raise ValueError('Name is empty.')
        elif len(name) > Publisher.max_name_length:
            raise ValueError('Name is too long.')
        return True

    def capitalize(self, text):
        return text[0].upper() + text[1:]

    @property
    def name(self):
        return escape(self.capitalize(self._name)) \
            if self._name else None
