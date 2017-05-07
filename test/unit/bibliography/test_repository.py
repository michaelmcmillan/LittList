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

    def test_creating_a_bibliography_creates_a_user_directory(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(user_id='95015843', bibliography=[])
        self.assertTrue(isdir(self.fixture_directory + '/95015843'))

    def test_maliciously_crafted_user_id_does_not_break_out_of_path(self):
        repository = BibliographyRepository(self.fixture_directory)
        with TemporaryDirectory() as directory_outside_scope:
            malicious_path = '../' * 10 + directory_outside_scope
            repository.create(user_id=malicious_path, bibliography=[])
            self.assertFalse(isdir(malicious_path + '1'))

    def test_creating_a_bibliography_creates_a_bibliography_file(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(user_id='99234564', bibliography=[])
        self.assertTrue(isfile(self.fixture_directory + '/99234564/1'))

    def test_creating_a_another_bibliography_creates_a_new_bibliography_file(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(user_id='99234564', bibliography=[])
        repository.create(user_id='99234564', bibliography=[])
        self.assertTrue(isfile(self.fixture_directory + '/99234564/2'))

    def test_creating_a_bibliography_stores_its_contents(self):
        repository = BibliographyRepository(self.fixture_directory)
        repository.create(user_id='99234564', bibliography=['BIBSYS_ISL2000'])
        bibliography = repository.read(user_id='99234564', bibliography_id=1)
        self.assertTrue(bibliography, ['BIBSYS_ISL2000'])

class TestAddRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_added(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(user_id='95015843', bibliography=[])
        repository.add('95015843', bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read('95015843', bibliography_id)
        self.assertEqual(bibliography, ['BIBSYS_ISL1234'])

    def test_bibliography_has_nothing_added_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(user_id='95015843', bibliography=[])
        repository.add('95015843', bibliography_id, None)
        bibliography = repository.read('95015843', bibliography_id)
        self.assertEqual(bibliography, [])

class TestRemoveRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/remove'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_removed(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(user_id='95015843', bibliography=[])
        repository.add('95015843', bibliography_id, 'BIBSYS_ISL1234')
        repository.remove('95015843', bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read('95015843', bibliography_id)
        self.assertEqual(bibliography, [])

    def test_bibliography_has_nothing_removed_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(user_id='95015843', bibliography=[])
        repository.remove('95015843', bibliography_id, None)
        bibliography = repository.read('95015843', bibliography_id)
        self.assertEqual(bibliography, [])

class TestReadRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/read'

    def test_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(user_id='95015843', bibliography_id=1)
        self.assertEqual(bibliography, ['BIBSYS_ISL1234'])

    def test_none_is_returned_if_user_directory_does_not_exist(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(user_id='12345678', bibliography_id=1)
        self.assertEqual(bibliography, None)

    def test_none_is_returned_if_bibliography_does_not_exist(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(user_id='95015843', bibliography_id=2)
        self.assertEqual(bibliography, None)

    def test_other_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(user_id='95015843', bibliography_id=3)
        self.assertEqual(bibliography, ['BIBSYS_ISL4321'])
