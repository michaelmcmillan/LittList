from . import Settings
from datetime import datetime as dt, timedelta as delta

class Payment:

    def __init__(self, user, amount, timestamp):
        self.user = user
        self.amount = amount
        self.timestamp = timestamp if timestamp else dt.now()

    @property
    def expired(self):
        minutes = Settings.MINUTES_OF_ACCESS
        return self.timestamp + delta(minutes=minutes) < dt.now()

    @property
    def taken_long_time(self):
        seconds = Settings.VERIFICATION_TIMEOUT_SECONDS
        return self.timestamp + delta(seconds=seconds) < dt.now()

    def __repr__(self):
        return '<Payment user=%r, amount=%d, timestamp=%s>' % \
            (self.user, self.amount, self.timestamp)
