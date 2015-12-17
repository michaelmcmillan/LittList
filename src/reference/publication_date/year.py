from datetime import datetime

class Year:

    def __init__(self, year):
        self.number = year if self.is_valid(year) else None

    def is_valid(self, year):
        if year is None:
            return True
        if year > Year.get_current():
            raise ValueError('Year can not be in the future.')
        elif year <= 0:
            raise ValueError('Year must be positive.')
        return True

    @staticmethod
    def get_current():
        return datetime.today().year
