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

class Month:

    def __init__(self, month):
        self.number = month if self.is_valid(month) else None

    def is_valid(self, month):
        if month is None:
            return True
        elif month < 1 or month > 12:
            raise ValueError('Month must be between 1 and 12.')
        return True

class Day:

    def __init__(self, day):
        self.number = day if self.is_valid(day) else None

    def is_valid(self, day):
        if day is None:
            return True
        elif day < 1 or day > 31:
            raise ValueError('Day must be between 1 and 31.')
        return True

class PublicationDate:

    def __init__(self, year=None, month=None, day=None):
        self.year = Year(year).number
        self.month = Month(month).number
        self.day = Day(day).number
        self.validate(year, month, day)

    def validate(self, year, month, day):
        if month and not self.year:
            raise ValueError('Month can not be set without year.')
        elif day and not self.month:
            raise ValueError('Day can not be set without month.')
        elif self.all_date_components_are_defined() and not \
        self.is_valid_date_context(self.year, self.month, self.day):
            raise ValueError('Date is invalid.')

    def all_date_components_are_defined(self):
        return self.year and self.month and self.day

    def is_valid_date_context(self, year, month, day):
        try:
            datetime(year, month, day)
            return True
        except ValueError:
            return False
