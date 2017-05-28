class WebsiteToCSL:

    @classmethod
    def convert(cls, website):
        csl = {}
        csl['id'] = website.url
        csl['type'] = 'website'
        csl['title'] = website.title
        csl['issued'] = {'raw': str(website.publication_date) if website.publication_date else None}
        csl['author'] = [author.__dict__ for author in website.authors]
        return csl
