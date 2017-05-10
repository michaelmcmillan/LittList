from shelve import open
from . import Settings

class Ledger:

    def get_key(self, user):
        # TODO: This needs to be a lot safer. Only store numbers.
        return user.phone_number.replace('+47', '').replace(' ', '')

    def insert(self, payment):
        payments = open(Settings.LEDGER_FILE, writeback=True)
        key = self.get_key(payment.user)
        payments[key] = payments.get(key, []) + [payment]
        payments.close()

    def reset(self, user):
        payments = open(Settings.LEDGER_FILE, writeback=True)
        key = self.get_key(user)
        payments[key] = []
        payments.close()

    def retrieve(self, user):
        payments = open(Settings.LEDGER_FILE, writeback=True)
        key = self.get_key(user)
        users_payments = payments.get(key, [])
        payments.close()
        return users_payments
