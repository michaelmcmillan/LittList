from logging import getLogger
from . import User, Payment, Ledger, Settings
from datetime import datetime as dt, timedelta as delta

class Paywall:

    STATUS = {
        'ACCESS': 'Du har nå tilgang!',
        'PAY': 'Litteraturlisten vil ikke være uthvisket etter at du har betalt.',
        'HOLD': 'Vennligst vent litt til overføringen er godkjent.'
    }

    def __init__(self):
        self.ledger = Ledger()
        self.logger = getLogger(self.__class__.__name__)

    def customer_asks_to_pay(self, user):
        payment = Payment(user, 10, verified=False)
        self.ledger.insert(payment)
        self.logger.info(payment)

    def customer_asks_to_start_over(self, user):
        self.ledger.reset(user)
        self.customer_asks_to_pay(user)

    def owner_received_payment(self, user):
        payment = Payment(user, 10, verified=True)
        self.ledger.insert(payment)

    def has_access(self, user):
        payments = self.ledger.retrieve(user)
        return any(payment.verified for payment in payments)

    def get_status(self, user):
        payments = self.ledger.retrieve(user)
        if any(payment.verified for payment in payments):
            return self.STATUS['ACCESS']
        elif payments:
            return self.STATUS['HOLD']
        else:
            return self.STATUS['PAY']
