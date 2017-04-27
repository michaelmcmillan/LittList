from logging import getLogger
from . import User, Payment, Ledger, Settings

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
        self.complaints = []
        self.ledger = Ledger()
        self.logger = getLogger(self.__class__.__name__)

    def mark_as_paid(self, user, timestamp=None):
        verified_payment = Payment(user, Settings.PRICE_NOK, True, timestamp)
        self.ledger.insert(verified_payment)
        self.logger.info('Purchase from %r.' % user)

    def claims_payment(self, user, timestamp=None):
        if self.has_access(user):
            return
        unverified_payment = Payment(user, Settings.PRICE_NOK, False, timestamp)
        self.ledger.insert(unverified_payment)

    def has_access(self, user):
        payment = self.ledger.retrieve_payment(user)
        return payment and payment.verified and not payment.expired

    def complain(self, user):
        self.complaints.append(user)

    def get_status(self, user):
        payment = self.ledger.retrieve_payment(user)
        if not payment:
            return self.STATUS['PLEASE_PAY']
        elif self.has_access(user):
            return self.STATUS['THANK_YOU']
        elif payment.verified and payment.expired:
            return self.STATUS['EXPIRED']
        elif user in self.complaints and payment.taken_long_time:
            self.logger.info('Refund %d,- to %r.' % (Settings.PRICE_NOK, user))
            return self.STATUS['REFUND']
        else:
            return self.STATUS['PROCESSING']
