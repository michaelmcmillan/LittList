from newspaper import Article
from .converter import WebConverter

class Web:

    def __init__(self, http_client):
        self.http_client = http_client

    def parse(self, url, html):
        '''Parses HTML using Newspaper.'''
        article = Article(url)
        article.set_html(html)
        article.parse()
        return article.__dict__

    def read(self, url):
        '''Fetches the HTML from the url.'''
        html = self.http_client.get()
        fields = self.parse(url, html)
        return WebConverter.convert(fields)
