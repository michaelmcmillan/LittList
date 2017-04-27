from logging import getLogger
from . import User, Payment, Ledger, Settings
from datetime import datetime as dt, timedelta as delta

class Paywall:

    STATUS = {
        'PROCESSING': 'Vennligst vent 1 minutt til overføringen er godkjent.',
        'REFUND': 'Vi beklager at du ikke har fått tilgang. ' \
           + 'Beløpet ditt blir refundert så snart som mulig.',
        'THANK_YOU': 'Tusen takk! Du har nå tilgang i %d minutter.' \
            % Settings.MINUTES_OF_ACCESS,
        'EXPIRED': 'Tiden din er utløpt. Vennligst betal på nytt.',
        'PLEASE_PAY': 'Vennligst overfør %d,- for å få tilgang.' \
            % Settings.PRICE_NOK
    }

    def __init__(self):
        self.ledger = Ledger()
        self.logger = getLogger(self.__class__.__name__)

    def mark_as_paid(self, user, timestamp=None):
        payment = Payment(user, Settings.PRICE_NOK, timestamp)
        self.ledger.insert(payment)
        self.logger.info('Purchase from %r.' % user)

    def has_expired(self, payment):
        threshold = Settings.MINUTES_OF_ACCESS
        return payment.timestamp + delta(minutes=threshold) < dt.now()

    def has_access(self, user):
        payment = self.ledger.retrieve_payment(user)
        return payment and not self.has_expired(payment)

    def get_status(self, user):
        payment = self.ledger.retrieve_payment(user)
        if not payment:
            return self.STATUS['PLEASE_PAY']
        elif self.has_access(user):
            return self.STATUS['THANK_YOU']
        elif self.has_expired(payment):
            return self.STATUS['EXPIRED']
        else:
            return self.STATUS['PROCESSING']
