from html import escape

class Title:

    def __init__(self, text=None):
        if self.is_text_valid(text):
            self._text = text

    def is_text_valid(self, text):
        if not text or text.isspace():
            raise TypeError('Text can not be empty.')
        return True

    def __str__(self):
        return escape(self._text)
