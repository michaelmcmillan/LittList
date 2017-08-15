from datetime import datetime as dt, timedelta as delta
from .ticket import Ticket
from .notifier import Notifier

class Paywall:

    status = {
        'paid': 1,
        'timeout': 2,
        'responded': 3,
        'acknowledged': 4,
        'unacknowledged': 5
    }

    def __init__(self):
        self.actions = {}

    def get_status(self, customer):
        actions = self.actions.get(customer.phone_number, [])
        ticket = Ticket(actions)
        if ticket.invalid:
            return None
        elif ticket.received_payment:
            return self.status['paid']
        elif ticket.waited_too_long:
            return self.status['timeout']
        elif ticket.responded:
            return self.status['responded']
        elif ticket.acknowledged:
            return self.status['acknowledged']
        elif not ticket.acknowledged:
            return self.status['unacknowledged']

    def on_hold(self, customer):
        return self.get_status(customer) in (
            self.status['responded'],
            self.status['acknowledged'],
            self.status['unacknowledged']
        )

    def has_access(self, customer):
        return self.get_status(customer) in (
            self.status['paid'],
            self.status['timeout']
        )

    def received_payment(self, customer, when=None):
        action = ('received_payment', when or dt.now())
        self.actions[customer.phone_number].append(action)

    def responded(self, customer, when=None):
        action = ('responded', when or dt.now())
        self.actions[customer.phone_number].append(action)

    def acknowledge(self, customer, when=None):
        action = ('acknowledge', when or dt.now())
        self.actions[customer.phone_number].append(action)

    def request_payment(self, customer, when=None):
        if self.has_access(customer):
            raise Exception
        self.actions[customer.phone_number] = [
            ('request_payment', when or dt.now())
        ]
        Notifier.customer_requested_payment(customer)
