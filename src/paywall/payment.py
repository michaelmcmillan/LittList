from . import Settings
from datetime import datetime as dt

class Payment:

    def __init__(self, user, amount, timestamp):
        self.user = user
        self.amount = amount
        self.timestamp = timestamp if timestamp else dt.now()

    def __repr__(self):
        return '<Payment user=%r, amount=%d, timestamp=%s>' % \
            (self.user, self.amount, self.timestamp)
