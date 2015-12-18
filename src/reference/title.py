from html import escape

class Title:

    max_title_length = 256

    def __init__(self, text=None):
        self._text = text \
            if self.is_text_valid(text) else None

    def is_text_valid(self, text):
        if text is None:
            return True
        elif self.is_empty(text):
            raise ValueError('Title can not be empty.')
        elif self.is_too_long(text):
            raise ValueError('Title is longer than %d.' % self.max_title_length)
        return True

    def is_empty(self, text):
        return not text or text.isspace()

    def is_too_long(self, text):
        return len(text) > self.max_title_length

    @property
    def text(self):
        return escape(self._text) \
            if self._text else None
