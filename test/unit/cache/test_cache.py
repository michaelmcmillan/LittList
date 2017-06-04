from unittest import TestCase
from cache import Cache

class TestCache(TestCase):

    def setUp(self):
        Cache.flush()

    def tearDown(self):
        Cache.flush()

    def test_returns_none_if_key_does_not_exist(self):
        cache = Cache()
        value = cache.get('foo')
        self.assertEqual(value, None)

    def test_returns_value_if_key_exists(self):
        cache = Cache()
        cache.set('foo', 'bar')
        value = cache.get('foo')
        self.assertEqual(value, 'bar')

    def test_returns_none_after_flush(self):
        cache = Cache()
        cache.set('foo', 'bar')
        cache.flush()
        value = cache.get('foo')
        self.assertEqual(value, None)

    def test_returns_value_from_value_func_if_no_key_exist(self):
        cache = Cache()
        value = cache.get_or_set('foo', lambda: 'bar')
        self.assertEqual(value, 'bar')

    def test_returns_existing_value_if_key_exist(self):
        cache = Cache()
        value = cache.set('foo', 'rab')
        value = cache.get_or_set('foo', lambda: 'bar')
        self.assertEqual(value, 'rab')

    def xtest_evicts_first_key_if_full(self):
        cache = Cache(capacity=2)
        cache.set('foo', 'bar')
        cache.set('baz', 'baz')
        cache.set('bar', 'foo')
        self.assertEqual(cache.get('foo'), None)
        self.assertEqual(cache.get('baz'), 'baz')
        self.assertEqual(cache.get('bar'), 'foo')

    def test_evicts_coldest_key_if_full(self):
        cache = Cache(capacity=2)
        cache.set('foo', 'bar')
        cache.get('foo')
        cache.get('foo')

        cache.set('baz', 'baz')
        cache.get('baz')

        cache.set('bar', 'foo')

        self.assertEqual(cache.get('foo'), 'bar')
        self.assertEqual(cache.get('baz'), None)
        self.assertEqual(cache.get('bar'), 'foo')

    def test_evicts_oldest_key_if_full_and_no_key_is_ever_accessed(self):
        cache = Cache(capacity=1)
        cache.set('foo', 'bar')
        cache.set('baz', 'baz')
        cache.set('bar', 'foo')
        self.assertEqual(cache.get('foo'), None)
