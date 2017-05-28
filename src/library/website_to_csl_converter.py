class WebsiteToCSL:

    @classmethod
    def convert(cls, website):
        csl = {}
        csl['id'] = website.url
        csl['type'] = 'website'
        csl['title'] = website.title
        csl['author'] = [author.__dict__ for author in website.authors]
        csl['issued'] = {'raw': str(website.publication_date) if website.publication_date else None}
        csl['accessed'] = {'raw': str(website.accessed_date)}
        return csl
