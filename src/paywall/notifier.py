from mail import Gmail, Message
from configuration import Configuration

class Notifier:

    enabled = False

    @classmethod
    def customer_requested_payment(self, customer):
        if not self.enabled:
            return

        url = 'http://littlist.no/paywall/admin'
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
        gmail = Gmail()
        gmail.connect()
        gmail.send(message)
        gmail.disconnect()
