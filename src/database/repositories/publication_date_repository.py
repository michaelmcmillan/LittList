from .repository import Repository

class PublicationDateRepository(Repository):

    table = 'publication_date'
    schema = """
    CREATE TABLE {0} (
        id int primary key,
        year int,
        month int,
        day int
    )
    """.format(table)

    def create(self, database, publication_date):
        database.execute(
            """INSERT INTO {0} (year, month, day) values (?, ?, ?)"""
            .format(self.table), [
                publication_date.year,
                publication_date.month,
                publication_date.day
            ]
        )

    def setup(self, database):
        database.execute(self.schema.format(self.table))

    def tear_down(self, database):
        database.execute(
            """DROP TABLE IF EXISTS {0}"""
            .format(self.table)
        )
