from collections import OrderedDict

class Cache:

    pairs = OrderedDict()

    def __init__(self, capacity=4098):
        self.capacity = capacity

    def get(self, key):
        '''Gets a key value pair.'''
        return self.pairs.get(key, None)

    def set(self, key, value):
        '''Sets a key value pair.'''
        if not value:
            return
        if self.capacity <= len(self.pairs):
            self.pairs.popitem(last=False)
        pair = {key: value}
        self.pairs.update(pair)

    def get_or_set(self, key, value_func):
        '''Retrieves pair if it exists, else set return value of value_func.'''
        if not self.get(key):
            self.set(key, value_func())
        return self.get(key)

    @classmethod
    def flush(cls):
        '''Empties all the pairs.'''
        cls.pairs.clear()
