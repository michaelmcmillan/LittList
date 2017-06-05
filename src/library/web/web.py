from . import SNL, NDLA, General
from cache import Cache
from urllib.parse import urlparse

class Web:

    handlers = {
        'snl.no': SNL,
        'ndla.no': NDLA,
        'general': General
    }

    def __init__(self, http_client=None):
        self.cache = Cache()

    def get_handler(self, url):
        '''Returns an appropriate handler for the url.'''
        hostname = urlparse(url).hostname
        return self.handlers.get(hostname, self.handlers['general'])

    def retrieve_and_parse(self, url):
        '''Requests and parses response.'''
        handler_class = self.get_handler(url)
        handler = handler_class(url)
        data = handler.request()
        website = handler.parse(data)
        return website

    def read(self, url):
        '''Returns a Website with metadata.'''
        if not url.startswith('http'):
            url = 'http://%s' % url
        website = self.cache.get_or_set(url, lambda: self.retrieve_and_parse(url))
        return website
