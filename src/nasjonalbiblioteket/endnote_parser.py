class EndNoteParser:

    NEWLINE = '\n'
    DELIMITER = '  - '
    REPEATABLE_KEYS = ('A1', 'AU', 'KW')

    def extract_field_from_line(self, line):
        '''Extracts "key  - value" pairs from a line.'''
        try:
            key, value = line.split(self.DELIMITER, 1)
        except ValueError:
            return None, None
        return key.strip(), value.strip()

    def parse(self, string):
        '''Parses RIS from multiple lines of text.'''
        fields = {}
        for line in string.split(self.NEWLINE):
            key, value = self.extract_field_from_line(line)
            if not (key and value): continue
            fields[key] = fields.get(key, []) + [value] \
                if key in self.REPEATABLE_KEYS else value
        return fields
