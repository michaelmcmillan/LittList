from unittest import TestCase
from os import makedirs
from shutil import rmtree
from os.path import isdir, isfile, join
from tempfile import TemporaryDirectory
from bibliography import Bibliography, BibliographyRepository
from fixtures import load_fixture

class TestCreateRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/create'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_creating_a_bibliography_creates_a_bibliography_file(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = Bibliography()
        bibliography_id = repository.create(bibliography)
        self.assertTrue(isfile(join(self.fixture_directory, str(bibliography_id))))

    def test_creating_a_bibliography_stores_its_previous_version(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = Bibliography({'BIBSYS_ISL2000'}, previous_bibliography_id=3)
        bibliography_id = repository.create(bibliography)
        stored_bibliography = repository.read(bibliography_id=bibliography_id)
        self.assertEqual(stored_bibliography.previous_bibliography_id, 3)

    def test_creating_a_bibliography_stores_its_contents(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = Bibliography({'BIBSYS_ISL2000'})
        bibliography_id = repository.create(bibliography)
        stored_bibliography = repository.read(bibliography_id=bibliography_id)
        self.assertTrue(bibliography, stored_bibliography)

class TestChangeLanguageRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_language_stored(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(language='norwegian-bokmål'))
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography(language='norwegian-bokmål'))

    def test_bibliography_has_not_language_changed_if_same_language_is_given(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(language='norwegian-bokmål'))
        updated_bibliography_id = repository.change_language(bibliography_id, 'norwegian-bokmål')
        self.assertEqual(bibliography_id, updated_bibliography_id)

    def test_bibliography_has_language_changed(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(language='norwegian-bokmål'))
        bibliography_id = repository.change_language(bibliography_id, 'english')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography(language='english'))

class TestAddRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_added(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.add(bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography({'BIBSYS_ISL1234'}))

    def test_bibliography_has_nothing_added_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.add(bibliography_id, None)
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography())

    def test_bibliography_does_not_store_new_version_if_adding_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        updated_bibliography_id = repository.add(bibliography_id, None)
        self.assertEqual(bibliography_id, updated_bibliography_id)

class TestChangeStyleRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_style_stored(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(style='harvard'))
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography(style='harvard'))

    def test_bibliography_has_not_style_changed_if_same_style_is_given(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(style='harvard'))
        updated_bibliography_id = repository.change_style(bibliography_id, 'harvard')
        self.assertEqual(bibliography_id, updated_bibliography_id)

    def test_bibliography_has_style_changed(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography(style='harvard'))
        bibliography_id = repository.change_style(bibliography_id, 'apa')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography(style='apa'))

class TestAddRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/add'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_added(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.add(bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography({'BIBSYS_ISL1234'}))

    def test_bibliography_has_nothing_added_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.add(bibliography_id, None)
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography())

    def test_bibliography_does_not_store_new_version_if_adding_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        updated_bibliography_id = repository.add(bibliography_id, None)
        self.assertEqual(bibliography_id, updated_bibliography_id)

class TestRemoveRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/remove'

    def setUp(self):
        rmtree(self.fixture_directory, ignore_errors=True)
        makedirs(self.fixture_directory)

    def tearDown(self):
        rmtree(self.fixture_directory, ignore_errors=True)

    def test_bibliography_has_identifier_removed(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        repository.add(bibliography_id, 'BIBSYS_ISL1234')
        bibliography_id = repository.remove(bibliography_id, 'BIBSYS_ISL1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography())

    def test_bibliography_has_nothing_removed_if_identifier_is_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.remove(bibliography_id, None)
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography())

    def test_bibliography_does_not_store_new_version_if_removing_none(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        updated_bibliography_id = repository.remove(bibliography_id, None)
        self.assertEqual(bibliography_id, updated_bibliography_id)

    def test_bibliography_has_nothing_removed_if_identifier_is_not_in_list(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography_id = repository.create(Bibliography())
        bibliography_id = repository.remove(bibliography_id, '1234')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography())

    def test_bibliography_has_the_correct_state_after_removing_two_references(self):
        repository = BibliographyRepository(self.fixture_directory)
        references = [
            'oria:BIBSYS_ILS71513221680002201',
            'oria:BIBSYS_ILS71466426580002201',
            'oria:BIBSYS_ILS71492651770002201'
        ]
        bibliography_id = repository.create(Bibliography(set(references)))
        bibliography_id = repository.remove(bibliography_id, 'oria:BIBSYS_ILS71466426580002201')
        bibliography_id = repository.remove(bibliography_id, 'oria:BIBSYS_ILS71513221680002201')
        bibliography = repository.read(bibliography_id)
        self.assertEqual(bibliography, Bibliography({'oria:BIBSYS_ILS71492651770002201'}))

class TestReadRepository(TestCase):

    fixture_directory = 'test/fixtures/bibliography/read'

    def test_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=1)
        self.assertEqual(bibliography, Bibliography({'BIBSYS_ISL1234'}, style='harvard'))

    def test_none_is_returned_if_bibliography_does_not_exist(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=2)
        self.assertEqual(bibliography, None)

    def test_other_bibliography_is_returned_if_it_exists(self):
        repository = BibliographyRepository(self.fixture_directory)
        bibliography = repository.read(bibliography_id=3)
        self.assertEqual(bibliography, Bibliography({'BIBSYS_ISL4321'}, style='harvard'))

    def test_maliciously_crafted_ids_do_not_break_out_of_directory(self):
        repository = BibliographyRepository(self.fixture_directory)
        path = repository.get_path_to_bibliography(bibliography_id='../../../../etc/passwd')
        self.assertEqual(path, self.fixture_directory + '/passwd')
