from mail import Gmail, Message
from configuration import Configuration
from urllib.parse import quote as urlencode

class Notifier:

    enabled = False

    @classmethod
    def send(cls, message):
        if not cls.enabled:
            return

        gmail = Gmail()
        gmail.connect()
        gmail.send(message)
        gmail.disconnect()

    @classmethod
    def survey_was_answered(cls, selected_school):
        selected_school = urlencode(selected_school)
        message = Message(
            subject='LittList: %s' % selected_school,
            body='En bruker huket av %s' % selected_school
        )
        cls.send(message)

    @classmethod
    def customer_rendered(cls, customer, bibliography):
        message = Message(
            subject='Render',
            body=customer.phone_number \
                + '\n' + '\n'.join(bibliography.references)
        )
        cls.send(message)

    @classmethod
    def modified(cls, query):
        message = Message(
            subject=None,
            body='Modified: ' + query
        )
        cls.send(message)

    @classmethod
    def customer_entered_paywall(cls):
        message = Message(
            subject='Paywall',
            body='Paywall'
        )
        cls.send(message)

    @classmethod
    def customer_requested_payment(cls, customer):
        url = Configuration.hostname + '/paywall/admin'
        phone_number = str(customer.phone_number)
        message = Message(
            subject='Requested payment',
            body='\r\n' + \
            '\n1. Anerkjenn: %s?phone_number=%s&action=acknowledge&secret=%s' %
                (url, phone_number, Configuration.admin_secret) + \
            '\n2. Sendt Vipps-request: %s?phone_number=%s&action=responded&secret=%s' %
                (url, phone_number, Configuration.admin_secret) + \
            '\n3. Motatt betaling: %s?phone_number=%s&action=received_payment&secret=%s' %
                (url, phone_number, Configuration.admin_secret)
        )
        cls.send(message)
