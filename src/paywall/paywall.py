from .notifier import Notifier
from datetime import datetime as dt, timedelta as delta

class Paywall:

    status = {
        'paid': 1,
        'timeout': 2,
        'responded': 3,
        'acknowledged': 4,
        'unacknowledged': 5
    }

    def __init__(self):
        self.payments = {}

    def get_status(self, customer):
        expired = False
        responded = False
        acknowledged = False
        waited_too_long = False
        received_payment = False
        requested_payment = False

        for action in self.payments.get(customer.phone_number, []):
            name, when = action
            if name == 'request_payment':
                requested_payment = True
                waited_too_long = dt.now() - delta(seconds=30) > when
            elif name == 'acknowledge':
                acknowledged = True
                waited_too_long = dt.now() - delta(seconds=120) > when
            elif name == 'received_payment':
                received_payment = True
                expired = dt.now() - delta(minutes=20) > when
            elif name == 'responded':
                responded = True
 
        if not requested_payment or (received_payment and expired):
            return None
        elif received_payment:
            return self.status['paid']
        elif responded:
            return self.status['responded']
        elif acknowledged and waited_too_long:
            return self.status['timeout']
        elif acknowledged:
            return self.status['acknowledged']
        elif not acknowledged and waited_too_long:
            return self.status['timeout']
        elif not acknowledged:
            return self.status['unacknowledged']

    def has_access(self, customer):
        return self.get_status(customer) in (self.status['timeout'], self.status['paid'])

    def received_payment(self, customer, when=None):
        action = ('received_payment', when or dt.now())
        self.payments[customer.phone_number].append(action)

    def responded(self, customer, when=None):
        action = ('responded', when or dt.now())
        self.payments[customer.phone_number].append(action)

    def acknowledge(self, customer, when=None):
        action = ('acknowledge', when or dt.now())
        self.payments[customer.phone_number].append(action)

    def request_payment(self, customer, when=None):
        if self.has_access(customer):
            raise Exception
        self.payments[customer.phone_number] = [
            ('request_payment', when or dt.now())
        ]
        Notifier.customer_requested_payment(customer)
