from html import escape

class Publisher:

    max_name_length = 256

    def __init__(self, name=None):
        if self.is_valid(name):
            self._name = name

    @staticmethod
    def is_valid(name):
        if len(name) > Publisher.max_name_length:
            raise ValueError('Name is too long.')
        return True

    @staticmethod
    def capitalize(text):
        return text[0].upper() + text[1:]

    @property
    def name(self):
        capitalized_name = self.capitalize(self._name)
        return escape(capitalized_name)
