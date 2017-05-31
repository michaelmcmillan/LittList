from mail import Gmail, Message
from configuration import Configuration

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
    def customer_rendered(cls, customer, bibliography):
        message = Message(
            sender=Configuration.email_username,
            recipient=Configuration.email_username,
            subject=None,
            body='\r\nRender\r\n'\
                + customer.phone_number \
                + '\n' + '\n'.join(bibliography)
        )
        cls.send(message)

    @classmethod
    def modified(cls, query):
        message = Message(
            sender=Configuration.email_username,
            recipient=Configuration.email_username,
            subject=None,
            body='\r\nModified: ' + query
        )
        cls.send(message)

    @classmethod
    def customer_entered_paywall(cls):
        message = Message(
            sender=Configuration.email_username,
            recipient=Configuration.email_username,
            subject=None,
            body='\r\nPaywall'
        )
        cls.send(message)

    @classmethod
    def customer_requested_payment(cls, customer):
        url = Configuration.hostname + '/paywall/admin'
        phone_number = str(customer.phone_number)
        message = Message(
            sender=Configuration.email_username,
            recipient=Configuration.email_username,
            subject=None,
            body='\r\n' + \
            '\n1. Anerkjenn: %s?phone_number=%s&action=acknowledge&secret=%s' %
                (url, phone_number, Configuration.admin_secret) + \
            '\n2. Sendt Vipps-request: %s?phone_number=%s&action=responded&secret=%s' %
                (url, phone_number, Configuration.admin_secret) + \
            '\n3. Motatt betaling: %s?phone_number=%s&action=received_payment&secret=%s' %
                (url, phone_number, Configuration.admin_secret)
        )
        cls.send(message)
