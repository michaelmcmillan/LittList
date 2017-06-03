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

    def render(self, references, style):
        json = dumps({'references': references, 'style': style})
        output = self.cache.get_or_set(json, lambda: self.call(json))
        metadata, bibliography = loads(output)
        references = self.flatten(metadata['entry_ids'])
        return list(zip(references, bibliography))

    @staticmethod
    def flatten(iterable):
        return [item[0] for item in iterable]
