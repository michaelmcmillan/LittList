from html import escape

class Publisher:

    max_name_length = 256

    def __init__(self, name=None):
        if self.is_valid(name):
            self._name = name

    def is_valid(self, name):
        if len(name) > Publisher.max_name_length:
            raise ValueError('Name is too long.')
        return True

    def capitalize(self, text):
        return text[0].upper() + text[1:]

    @property
    def name(self):
        return escape(self.capitalize(self._name))
