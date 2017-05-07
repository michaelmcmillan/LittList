from . import Settings
from datetime import datetime as dt

class Payment:

    def __init__(self, user, amount, verified):
        self.user = user
        self.amount = amount
        self.verified = verified
        self.timestamp = dt.now()

    def __repr__(self):
        return '<Payment user=%r, amount=%d, verified=%r, timestamp=%s>' % \
            (self.user, self.amount, self.verified, self.timestamp)
