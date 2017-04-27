from re import sub as substitute

def remove_years_from_name(name):
    '''Removes years like "1960-", "1960-2000".'''
    return substitute(r'\s\d*\-\d*$', '', name)

def extract_year_from_published_year(published_year):
    '''Extracts "2009" from "2009///".'''
    return int(published_year.replace('///', ''))

def extract_full_name(author):
    '''Extracts "Nesbø, Jo" as ('Nesbø', 'Jo').'''
    try:
        family, given = author.split(', ')
        given = remove_years_from_name(given)
    except ValueError:
        family, given = author, None
        family = remove_years_from_name(family)
    return family, given

def endnote_to_csl(endnote):
    csl = {}
    csl['author'] = []
    csl['issued'] = []
    csl['type'] = 'book'
    csl['id'] = endnote.get('ID', None)
    csl['title'] = endnote.get('T1', None)

    # Authors
    for author in endnote.get('A1', []):
        family, given = extract_full_name(author)
        author = {'family': family, 'given': given}
        csl['author'].append(author)

    # Published year
    if 'Y1' in endnote:
        year = extract_year_from_published_year(endnote['Y1'])
        issued_year = {'date-parts': [year]}
        csl['issued'].append(issued_year)

    return csl
