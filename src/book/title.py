from html import escape

class Title:

    max_length = 256

    def __init__(self, text=None):
        if self.is_text_valid(text):
            self._text = text

    def is_text_valid(self, text):
        if self.is_empty(text):
            raise ValueError('Title can not be empty.')
        elif self.is_too_long(text):
            raise ValueError('Title is longer than %d.' % self.max_length)
        return True

    def is_empty(self, text):
        return not text or text.isspace()

    def is_too_long(self, text):
        return len(text) > self.max_length

    def __str__(self):
        return escape(self._text)
