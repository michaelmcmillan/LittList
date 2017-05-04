from shelve import open
from . import Settings

class Ledger:

    def get_key(self, user):
        return user.phone_number.replace('+47', '').replace(' ', '')

    def insert_payment(self, payment):
        payments = open(Settings.LEDGER_FILE, writeback=True)
        key = self.get_key(payment.user)
        payments[key] = payments.get(key, []) + [payment]
        payments.close()

    def retrieve_payment(self, user):
        payments = open(Settings.LEDGER_FILE, writeback=True)
        key = self.get_key(user)
        users_payments = payments.get(key, [])
        payments.close()
        return next((payment for payment in users_payments), None)
