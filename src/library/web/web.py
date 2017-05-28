from newspaper import Article
from .converter import WebConverter

class Web:

    def __init__(self, http_client):
        self.http_client = http_client

    def parse(self, url, html):
        article = Article(url)
        article.set_html(html)
        article.parse()
        return article.__dict__

    def read(self, url):
        html = self.http_client.get()
        fields = self.parse(url, html)
        return WebConverter.convert(fields)
