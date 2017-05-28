from unittest import TestCase
from shutil import rmtree
from os.path import isdir, isfile
from tempfile import TemporaryDirectory
from bibliography import BibliographyRepository

class TestCreateRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/create'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_after_10_is_11(self):
        repository = BibliographyRepository(self.fixture_directory)
        for i in range(10):
            repository.create(bibliography=[])
        bibliography_id = repository.create(bibliography=[])
        self.assertEqual(bibliography_id, 11)

    def test_creating_a_bibliography_creates_a_bibliography_file(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(bibliography=[])
        self.assertTrue(isfile(self.fixture_directory + '/1'))

    def test_creating_a_another_bibliography_creates_a_new_bibliography_file(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(bibliography=[])
        repository.create(bibliography=[])
        self.assertTrue(isfile(self.fixture_directory + '/2'))

    def test_creating_a_bibliography_stores_its_contents(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(bibliography=['BIBSYS_ISL2000'])
        bibliography = repository.read(bibliography_id=1)
        self.assertTrue(bibliography, ['BIBSYS_ISL2000'])

class TestAddRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_added(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(bibliography=[])
        repository.add(bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, ['BIBSYS_ISL1234'])

    def test_bibliography_has_nothing_added_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(bibliography=[])
        repository.add(bibliography_id, None)
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, [])

class TestRemoveRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/remove'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_removed(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(bibliography=[])
        repository.add(bibliography_id, 'BIBSYS_ISL1234')
        repository.remove(bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, [])

    def test_bibliography_has_nothing_removed_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(bibliography=[])
        repository.remove(bibliography_id, None)
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, [])

    def test_bibliography_has_nothing_removed_if_identifier_is_not_in_list(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(bibliography=[])
        repository.remove(bibliography_id, '1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, [])

    def test_bibliography_has_the_correct_state_after_removing_two_references(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = [
            'oria:BIBSYS_ILS71513221680002201',
            'oria:BIBSYS_ILS71466426580002201',
            'oria:BIBSYS_ILS71492651770002201'
        ]
        bibliography_id = repository.create(bibliography=bibliography)
        repository.remove(bibliography_id, 'oria:BIBSYS_ILS71466426580002201')
        repository.remove(bibliography_id, 'oria:BIBSYS_ILS71513221680002201')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, ['oria:BIBSYS_ILS71492651770002201'])

class TestReadRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/read'

    def test_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=1)
        self.assertEqual(bibliography, ['BIBSYS_ISL1234'])

    def test_none_is_returned_if_bibliography_does_not_exist(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=2)
        self.assertEqual(bibliography, None)

    def test_other_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=3)
        self.assertEqual(bibliography, ['BIBSYS_ISL4321'])
