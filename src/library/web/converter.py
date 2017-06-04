from pprint import pprint as print
#from ..website import Website
#from ..author import Author

class WebConverter:

    @classmethod
    def convert(cls, fields):
        website = Website()
        website.id = 'web:%s' % fields['url']
        website.published = fields['publish_date']
        website.url = fields['url']
        website.name = cls.extract_site_name(fields['meta_data'])
        website.title = fields['title'] \
            if fields['title'] else None
        website.authors = [Author(family=name, given=None) \
            for name in fields['authors']]
        return website

    @staticmethod
    def extract_site_name(meta_data):
        try:
            return meta_data['og']['site_name']
        except (TypeError, KeyError):
            return None
