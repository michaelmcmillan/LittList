from datetime import datetime
from .year import Year
from .month import Month
from .day import Day

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
        elif self.all_date_components_are_defined() and self.invalid_date():
            raise ValueError('Date is invalid.')

    def all_date_components_are_defined(self):
        return self.year and self.month and self.day

    def invalid_date(self):
        try:
            datetime(self.year, self.month, self.day)
            return False
        except ValueError:
            return True
