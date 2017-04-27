from xml.etree import ElementTree

class AtomParser:

    ATOM_NAMESPACE = 'http://www.w3.org/2005/Atom'
    NB_NAMESPACE = 'http://www.nb.no/xml/search/1.0/'

    def __init__(self, xml):
        self.root = ElementTree.fromstring(xml)

    @property
    def entries(self):
        '''Returns the <Entry> nodes.'''
        return self.root.findall('{%s}entry' % self.ATOM_NAMESPACE)

    @property
    def sesam_identifiers(self):
        '''Returns the <SesamId> nodes inside the <Entry> nodes.'''
        return [entry.find('{%s}sesamid' % self.NB_NAMESPACE) \
            for entry in self.entries]
