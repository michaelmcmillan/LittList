from re import sub as substitute

class EndNoteToCSL:

    @classmethod
    def convert(cls, endnote):
        csl = {}
        csl['author'] = []
        csl['issued'] = []
        csl['type'] = 'book'
        csl['id'] = endnote.get('ID', None)
        csl['title'] = endnote.get('T1', None)

        # Authors
        for author in endnote.get('A1', []):
            family, given = cls.extract_full_name(author)
            author = {'family': family, 'given': given}
            csl['author'].append(author)

        # Published year
        if 'Y1' in endnote:
            year = cls.extract_year_from_published_year(endnote['Y1'])
            issued_year = {'date-parts': [year]}
            csl['issued'].append(issued_year)

        return csl

    @classmethod
    def remove_years_from_name(cls, name):
        '''Removes years like "1960-", "1960-2000".'''
        return substitute(r'\s\d*\-\d*$', '', name)

    @staticmethod
    def extract_year_from_published_year(published_year):
        '''Extracts "2009" from "2009///".'''
        return int(published_year.replace('///', ''))

    @classmethod
    def extract_full_name(cls, author):
        '''Extracts "Nesbø, Jo" as ('Nesbø', 'Jo').'''
        try:
            family, given = author.split(', ')
            given = cls.remove_years_from_name(given)
        except ValueError:
            family, given = author, None
            family = cls.remove_years_from_name(family)
        return family, given
