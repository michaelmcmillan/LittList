from .repository import Repository

class ReferenceRepository(Repository):

    table = 'reference'
    schema = """
    CREATE TABLE {0} (
        id int primary key,
        title varchar(255)
    )
    """.format(table)

    def create(self, database, reference):
        database.execute(
            """INSERT INTO {0} (title) values (?)"""
            .format(self.table), [reference.title]
        )

    def setup(self, database):
        database.execute(self.schema.format(self.table))

    def tear_down(self, database):
        database.execute(
            """DROP TABLE IF EXISTS {0}"""
            .format(self.table)
        )
