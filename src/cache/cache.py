from collections import OrderedDict

class Cache:

    pairs = OrderedDict()
    coldest_entry = (0, None)

    def __init__(self, capacity=4098):
        self.capacity = capacity

    def get(self, key):
        '''Gets a key value pair.'''
        accessed, value = self.pairs.get(key, (None, None))
        if value:
            self.increment_times_accessed(accessed, key, value)
        return value

    def increment_times_accessed(self, previous_access_count, key, value):
        '''Increments the access counter to make key warm.'''
        updated_access_count = previous_access_count + 1
        self.pairs[key] = (updated_access_count, value)
        least_accesses, coldest_key = self.coldest_entry
        if not coldest_key or updated_access_count <= least_accesses:
            self.coldest_entry = (updated_access_count, key)

    def evict_coldest_key(self):
        '''Deletes the least used entry.'''
        least_accesses, coldest_key = self.coldest_entry
        if not coldest_key:
            self.pairs.popitem(last=False)
        else:
            self.pairs.pop(coldest_key)

    def set(self, key, value):
        '''Sets a key value pair.'''
        if not value:
            return

        if self.capacity <= len(self.pairs):
            self.evict_coldest_key()

        pair = {key: (0, value)}
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
