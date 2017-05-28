from .tlds import tlds

class URLRecognizer:

    @staticmethod
    def is_url(url):
        if not url:
            return False

        starts_with_protocol = \
            (url.startswith('http://') \
            or url.startswith('https://') \
            or url.startswith('www.'))
        if starts_with_protocol:
            return True

        contains_tld = any(tld in url for tld in tlds)
        if contains_tld and '/' in url:
            return True

        return False
