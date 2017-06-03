from configuration import Configuration

class Message:

    def __init__(self, subject, body):
        self.body = body
        self.sender = Configuration.email_username
        self.recipient = Configuration.email_username
        self.subject = subject
