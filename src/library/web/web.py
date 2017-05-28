from newspaper import Article
from http_client import HTTPClient
from .converter import WebConverter

class Web:

    def __init__(self, http_client=None):
        self.http_client = http_client or HTTPClient()

    def parse(self, url, html):
        '''Parses HTML using Newspaper.'''
        article = Article(url)
        article.set_html(html)
        article.parse()
        return article.__dict__

    def read(self, url):
        '''Fetches the HTML from the url.'''
        html = self.http_client.get(url, {})
        fields = self.parse(url, html)
        return WebConverter.convert(fields)
