from newspaper import Article
from http_client import HTTPClient
from library.author import Author
from library.website import Website
from warnings import catch_warnings, filterwarnings

class General:

    def __init__(self, url):
        self.url = url
        self.http_client = HTTPClient()

    def request(self):
        '''Requests and returns response.'''
        return self.http_client.get(self.url, {})

    def extract_with_newspaper(self, html):
        '''Parses HTML using Newspaper.'''
        filterwarnings('ignore', category=DeprecationWarning)
        with catch_warnings():
            article = Article(self.url)
            article.set_html(html)
            article.parse()
            return article.__dict__

    def parse(self, html):
        '''Converts Newspaper fields into Website.'''
        fields = self.extract_with_newspaper(html)
        website = Website()
        website.id = 'web:%s' % fields['url']
        website.publication_date = fields['publish_date']
        website.url = fields['url']
        website.name = self.extract_site_name(fields['meta_data'])
        website.title = fields['title'] \
            if fields['title'] else None
        website.authors = [Author(family=name, given=None) \
            for name in fields['authors']]
        return website

    @staticmethod
    def extract_site_name(meta_data):
        try:
            return meta_data['og']['site_name']
        except (TypeError, KeyError):
            return None
