from smtplib import SMTP
from configuration import Configuration

class Gmail:

    def __init__(self):
        self.credentials = (Configuration.email_username, Configuration.email_password)
        self.connection = SMTP('smtp.gmail.com', 587)

    def connect(self):
        self.connection.ehlo()
        self.connection.starttls()
        self.connection.login(*self.credentials)

    def disconnect(self):
        self.connection.close()

    def send(self, message):
        header = 'Subject: %s\r\n\r\n' % message.subject
        self.connection.sendmail(message.sender, message.recipient, header + message.body)
