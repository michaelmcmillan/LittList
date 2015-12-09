from datetime import datetime

class PublicationDate:

    def __init__(self, date=None):
        self._date = date if self.is_valid(date) else None

    @staticmethod
    def is_valid(date):
        if date == None:
            return False
        elif PublicationDate.is_in_future(date):
            raise ValueError('Date can not be in the future.')
        else:
            return True

    @staticmethod
    def is_in_future(date):
        return datetime.now() < date
        
    @property
    def date(self):
        return self._date
