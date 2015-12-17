from datetime import datetime

class PublicationDate:

    def __init__(self, year=None, month=None, day=None):
        self.year = year \
            if self.is_valid_year(year) else None
        self.month = month \
            if self.is_valid_month(month) else None
        self.day = day \
            if self.is_valid_day(day) else None

        if self.year and self.month and self.day:
            self.is_valid_date(self.year, self.month, self.day)

    def is_valid_day(self, day):
        if day is None:
            return True
        elif not self.month:
            raise ValueError('Day can not be set without month.')
        elif day < 1 or day > 31:
            raise ValueError('Day must be between 1 and 31.')
        return True

    def is_valid_month(self, month):
        if month is None:
            return True
        elif not self.year:
            raise ValueError('Month can not be set without year.')
        elif month < 1 or month > 12:
            raise ValueError('Month must be between 1 and 12.')
        return True

    def is_valid_year(self, year):
        if year is None:
            return True
        if year > self.get_current_year():
            raise ValueError('Year can not be in the future.')
        elif year <= 0:
            raise ValueError('Year must be positive.')
        return True

    def get_current_year(self):
        return datetime.today().year

    def is_valid_date(self, year, month, day):
        try:
            datetime(year, month, day)
        except ValueError:
            raise ValueError('Date is invalid.')
