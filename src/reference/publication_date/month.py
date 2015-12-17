class Month:

    def __init__(self, month):
        self.number = month if self.is_valid(month) else None

    def is_valid(self, month):
        if month is None:
            return True
        elif month < 1 or month > 12:
            raise ValueError('Month must be between 1 and 12.')
        return True
