class User:

    def __init__(self, phone_number):
        self.phone_number = phone_number

    def __eq__(self, other_user):
        '''Equal if phone numbers are similar.'''
        normalize = lambda number: number.replace('+47', '').replace(' ', '')
        return normalize(self.phone_number) == normalize(other_user.phone_number)

    def __repr__(self):
        return '<User phone_number=%s>' % self.phone_number
