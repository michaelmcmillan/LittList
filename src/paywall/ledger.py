from pickle import dump, load
from collections import deque
from . import Settings

class Ledger:

    def __init__(self):
        self.payments = deque()

    def persist(self):
        with open(Settings.LEDGER_FILE, 'wb') as f:
            dump(self.payments, f)

    def sync(self):
        try:
            with open(Settings.LEDGER_FILE, 'rb') as f:
                self.payments = load(f) 
        except IOError:
            pass

    def insert(self, payment):
        self.payments.appendleft(payment)
        self.persist()

    def retrieve_payment(self, user):
        self.sync()
        return next((payment for payment in self.payments \
            if payment.user == user), None)
