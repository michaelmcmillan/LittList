class Day:

    def __init__(self, day):
        self.number = day if self.is_valid(day) else None

    def is_valid(self, day):
        if day is None:
            return True
        elif day < 1 or day > 31:
            raise ValueError('Day must be between 1 and 31.')
        return True
