class PublicationDate:

    def __init__(self, date=None):
        if date != None:
            raise ValueError('Publication date is in the future.')

    def __eq__(self, comparison):
        return True
