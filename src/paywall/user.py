class User:

    def __init__(self, phone_number):
        self.phone_number = phone_number

    def __repr__(self):
        return '<User phone_number=%s>' % self.phone_number
