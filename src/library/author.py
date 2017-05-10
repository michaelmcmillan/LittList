class Author:

    def __init__(self, given, family):
        self.given = given
        self.family = family

    @property
    def name(self):
        return ('%s %s' % (self.given or '', self.family or '')).strip()

    def __eq__(self, other_author):
        return self.given == other_author.given \
           and self.family == other_author.family

    def __repr__(self):
        return '<Author given=%r, family=%r, name=%r>' % (self.given, self.family, self.name)
