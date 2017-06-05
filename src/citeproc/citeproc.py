from .reference_to_csl_converter import ReferenceToCSL
from cache import Cache
from json import dumps, loads
from os.path import join, dirname
from subprocess import call, Popen, PIPE

class Citeproc:

    def __init__(self):
        self.cache = Cache()

    def call(self, stdin):
        script = join(dirname(__file__), 'citeproc.js')
        node = Popen(['node', script], stdout=PIPE, stdin=PIPE)
        node.stdin.write(stdin.encode())
        stdout, errors = node.communicate()
        return stdout.decode('utf-8')

    def render(self, references, style, language):
        csl = [ReferenceToCSL.convert(reference) for reference in references]
        json = dumps({'references': csl, 'style': style, 'locale': language})
        output = self.cache.get_or_set(json, lambda: self.call(json))
        metadata, bibliography = loads(output)
        identifiers = self.flatten(metadata['entry_ids'])
        rendered_entries = list(zip(identifiers, bibliography))

        zipped = []
        for identifier, entry in rendered_entries:
            ref = next(ref for ref in references if ref.id == identifier)
            zipped.append((ref, entry))
        return zipped

    @staticmethod
    def flatten(iterable):
        return [item[0] for item in iterable]
