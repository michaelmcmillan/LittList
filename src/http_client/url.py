from urllib.parse import urlencode, urlparse

class URL:

    def __init__(self, url, parameters=None):
        self.components = urlparse(url)
        self.parameters = parameters

    @property
    def protocol(self):
        return self.components.scheme + '://'

    @property
    def host(self):
        return self.components.netloc

    @property
    def querystring(self):
        return '?' + urlencode(self.parameters)

    @property
    def path(self):
        return self.components.path

    def __str__(self):
        return ''.join([self.protocol, self.host, self.path, self.querystring])
