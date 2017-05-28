class Message:

    def __init__(self, recipient, sender, subject, body):
        self.body = body
        self.sender = sender
        self.recipient = recipient
        self.subject = subject
