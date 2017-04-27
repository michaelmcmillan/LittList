from logging import getLogger
from http.cookiejar import CookieJar
from urllib.request import HTTPCookieProcessor, build_opener
from .url import URL

class HTTPClient:

    def __init__(self):
        self.logger = getLogger(self.__class__.__name__)

    def get(self, url, parameters):
        '''Sends an HTTP GET request.'''
        url = URL(url, parameters)
        response = self.request('GET', url)
        return response

    def request(self, method, url):
        '''Returns HTTP response.'''
        processor = HTTPCookieProcessor(CookieJar())
        opener = build_opener(processor)
        try:
            response = opener.open(str(url))
            data = response.read().decode('utf-8')
        except Exception as error:
            self.logger.error(error)
            return None
        return data
