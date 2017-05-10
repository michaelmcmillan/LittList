class Book:

    def __init__(self, id=None, title=None):
        self.id = id
        self.title = title
        self.authors = []
        self.publisher = None
        self.publisher_place = None
        self.publication_year = None

    def __repr__(self):
        return '<Book id=%r>' % (self.id)
