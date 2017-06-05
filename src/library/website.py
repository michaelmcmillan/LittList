from datetime import datetime

class Website:

    def __init__(self):
        self.id = None
        self.url = None
        self.name = None
        self.title = None
        self.authors = []
        self.publication_date = None
        self.accessed_date = datetime.now()

    def __repr__(self):
        return '<Website url=%r>' % (self.url)
