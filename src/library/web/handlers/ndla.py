from datetime import datetime
from bs4 import BeautifulSoup
from http_client import HTTPClient
from library.author import Author
from library.website import Website

class NDLA:

    def __init__(self, url):
        self.url = url
        self.soup = None
        self.http_client = HTTPClient()

    def request(self):
        return self.http_client.get(self.url, {})

    def parse_title(self):
        title = self.soup.find(attrs={'property': 'og:title'}).get('content', None)
        return title

    def parse_publication_date(self):
        label, date, rest = self.soup.find(id='edit-dates').text.split(' ', 2)
        publication_date = datetime.strptime(date, '%d.%m.%Y,')
        return publication_date

    def parse_authors(self):
        author_anchors = self.soup.find(attrs={'class': 'owner'}).findAll('a')
        authors = [Author(family=anchor.text, given=None) for anchor in author_anchors]
        return authors

    def parse(self, html):
        self.soup = BeautifulSoup(html, 'html.parser')

        website = Website()
        website.url = self.url
        website.id = 'web:%s' % self.url
        website.title = self.parse_title()
        website.authors = self.parse_authors()
        website.name = 'Nasjonal digital læringsarena'
        website.publication_date = self.parse_publication_date()
        return website
