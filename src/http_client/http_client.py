from logging import getLogger
from http.cookiejar import CookieJar
from urllib.request import HTTPCookieProcessor, build_opener
from urllib.parse import urlencode
from .url import URL

class HTTPClient:

    def __init__(self):
        self.logger = getLogger(self.__class__.__name__)

    def get(self, url, parameters):
        '''Sends an HTTP GET request.'''
        url = URL(url, parameters)
        response = self.request('GET', url)
        return response

    def post(self, url, parameters, data):
        '''Sends an HTTP POST request.'''
        url = URL(url, parameters)
        response = self.request('POST', url, data)
        return response

    def request(self, method, url, data=None):
        '''Returns HTTP response.'''
        processor = HTTPCookieProcessor(CookieJar())
        opener = build_opener(processor)
        try:
            if method == 'POST':
                data = urlencode(data).encode('utf-8')
                response = opener.open(str(url), data)
            elif method == 'GET':
                response = opener.open(str(url))
            data = response.read().decode('utf-8')
        except Exception as error:
            self.logger.error(error)
            return None
        return data
