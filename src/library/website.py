class Website:

    def __init__(self):
        self.url = None
        self.name = None
        self.title = None
        self.authors = []
        self.publication_date = None

    def __repr__(self):
        return '<Website url=%r>' % (self.url)
