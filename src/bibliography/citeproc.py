from json import dumps, loads
from os.path import join, dirname
from subprocess import call, Popen, PIPE

class Citeproc:

    def call(self, stdin):
        script = join(dirname(__file__), 'citeproc.js')
        node = Popen(['node', script], stdout=PIPE, stdin=PIPE)
        node.stdin.write(stdin.encode())
        stdout, errors = node.communicate()
        return stdout.decode('utf-8')

    def render(self, references):
        json_references = dumps(references)
        json_bibliography = self.call(json_references)
        bibliography = loads(json_bibliography)
        return bibliography
