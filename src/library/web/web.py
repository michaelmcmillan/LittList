from cache import Cache
from newspaper import Article
from http_client import HTTPClient
from .converter import WebConverter

class Web:

    def __init__(self, http_client=None):
        self.cache = Cache()
        self.http_client = http_client or HTTPClient()

    def parse(self, url, html):
        '''Parses HTML using Newspaper.'''
        article = Article(url)
        article.set_html(html)
        article.parse()
        return article.__dict__

    def read(self, url):
        '''Fetches the HTML from the url.'''
        fields = self.cache.get_or_set(url, lambda: 
            self.parse(url, self.http_client.get(url, {}))
        )
        return WebConverter.convert(fields)
