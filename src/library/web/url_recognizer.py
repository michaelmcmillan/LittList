from .tlds import tlds

class URLRecognizer:

    @classmethod
    def is_url(cls, url):
        return url is not None and (
          cls.starts_with_protocol(url) \
          or cls.contains_top_level_domain(url) \
          and '/' in url
        )

    @staticmethod
    def starts_with_protocol(url):
        return (url.startswith('http://') \
            or url.startswith('https://') \
            or url.startswith('www.'))

    @staticmethod
    def contains_top_level_domain(url):
        return any(tld in url for tld in tlds)
