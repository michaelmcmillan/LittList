from datetime import datetime as dt, timedelta as delta

class Ticket:

    def __init__(self, actions):
        self.actions = actions

    @property
    def invalid(self):
        return not self.requested_payment or self.expired \
        and (self.acknowledged or self.received_payment or self.requested_payment)

    @property
    def requested_payment(self):
        return any(name for (name, when) in self.actions if name == 'request_payment')

    @property
    def acknowledged(self):
        return any(name for (name, when) in self.actions if name == 'acknowledge')

    @property
    def responded(self):
        return any(name for (name, when) in self.actions if name == 'responded')

    @property
    def received_payment(self):
        return any(name for (name, when) in self.actions if name == 'received_payment')

    @property
    def expired(self):
        return any(when for (name, when) in self.actions if dt.now() - delta(minutes=20) > when)

    @property
    def waited_too_long(self):
        return any(when for (name, when) in self.actions if dt.now() - delta(seconds=30) > when)
