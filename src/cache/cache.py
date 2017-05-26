class Cache:

    pairs = {}

    def get(self, key):
        return self.pairs.get(key, None)

    def set(self, key, value):
        if not value:
            return
        pair = {key: value}
        self.pairs.update(pair)

    def get_or_set(self, key, value_func):
        if not self.get(key):
            self.set(key, value_func())
        return self.get(key)

    @classmethod
    def flush(cls):
        cls.pairs = {}
