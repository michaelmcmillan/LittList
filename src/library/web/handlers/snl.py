from json import loads
from datetime import datetime
from http_client import HTTPClient
from library.author import Author
from library.website import Website

class SNL:

    def __init__(self, url):
        print("GO")
        self.url = url
        self.http_client = HTTPClient()

    def get_api_url(self):
        '''Generates the API URL.'''
        return self.url \
            if self.url.endswith('.json') else self.url + '.json'

    def request(self):
        '''Requests and returns response.'''
        api_url = self.get_api_url()
        return self.http_client.get(api_url, {})

    def parse(self, json):
        '''Parses JSON from SNL API.'''
        fields = loads(json)
        website = Website()
        website.id = 'web:%s' % self.url
        website.url = self.url
        website.title = fields['title']
        date, time = fields['created_at'].split('T')
        website.publication_date = datetime.strptime(date, '%Y-%m-%d')
        website.authors = [Author(family=author['full_name'], given=None) for author in fields['authors']]
        website.name = 'Store Norske Leksikon'
        return website
