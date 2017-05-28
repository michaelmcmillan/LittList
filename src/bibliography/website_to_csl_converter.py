class WebsiteToCSL:

    @classmethod
    def convert(cls, website):
        csl = {}
        csl['id'] = website.url or False
        csl['type'] = 'webpage'
        csl['title'] = website.title or False
        csl['author'] = [author.__dict__ for author in website.authors]
        csl['issued'] = {'raw': website.publication_date.strftime('%Y-%m-%d') \
            if website.publication_date else None}
        csl['accessed'] = {'raw': website.accessed_date.strftime('%Y-%m-%d')}
        return csl
